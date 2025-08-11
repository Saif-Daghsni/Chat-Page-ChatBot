import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectToDatabase from "../backend/Models/db.js";
import User from "./Models/User.js";
import authRouter from "./Routes/AuthRouter.js";
import cors from "cors";
import verifyToken from "./Middlewares/Auth.js";
import Conversation from "./Models/Conversation.js";
import { WebSocketServer } from "ws";
import http from "http";

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });
const onlineUsers = new Map(); // Stores userId -> WebSocket

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Database Connection
connectToDatabase();

// WebSocket Connection Handler
wss.on("connection", (ws, req) => {
  const token = req.url.split("token=")[1]?.split("&")[0];

  if (!token) {
    ws.close(1008, "Authentication required");
    return;
  }

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id;

    onlineUsers.set(userId, ws);
    broadcastOnlineUsers();

    // Heartbeat
    let isAlive = true;
    const heartbeatInterval = setInterval(() => {
      if (!isAlive) {
        ws.terminate();
        return;
      }
      isAlive = false;
      ws.ping();
    }, 30000);

    ws.on("pong", () => {
      isAlive = true;
    });

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data);
        // Handle incoming messages
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      clearInterval(heartbeatInterval);
      onlineUsers.delete(userId);
      broadcastOnlineUsers();
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      ws.close();
    });
  } catch (error) {
    console.error("Authentication failed:", error);
    ws.close(1008, "Invalid token");
  }
});

function broadcastOnlineUsers() {
  const onlineUserIds = Array.from(onlineUsers.keys());
  const message = JSON.stringify({
    type: "onlineUsers",
    data: onlineUserIds,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Routes
app.use("/api/auth", authRouter);

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.put("/addOrder/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { orders: req.body } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "Order added successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.delete("/deleteOrder/:userId/:orderId", async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { orders: { _id: orderId } } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "Order deleted successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/updateOrder/:userId/:orderId", async (req, res) => {
  const { userId, orderId } = req.params;
  const updatedOrder = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const order = user.orders.id(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    Object.keys(updatedOrder).forEach((key) => {
      order[key] = updatedOrder[key];
    });
    await user.save();
    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/conversations", verifyToken, async (req, res) => {
  const { members, messages } = req.body;
  if (!members || !Array.isArray(members) || members.length !== 2) {
    return res.status(400).json({ error: "Invalid members array" });
  }
  try {
    const sortedMembers = [...members].sort();
    let conversation = await Conversation.findOne({
      members: { $all: sortedMembers },
    });
    if (conversation) {
      conversation.messages.push(messages[0]);
      await conversation.save();
    } else {
      conversation = await Conversation.create({
        members: sortedMembers,
        messages,
      });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/GetConversations", verifyToken, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: req.user.id,
    }).populate("messages.senderId", "name email");
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/GetLastMessages", verifyToken, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: req.user.id,
    }).populate("messages.senderId", "name email");
    const lastMessages = conversations.map((conversation) => {
      const lastMessage =
        conversation.messages[conversation.messages.length - 1];
      return {
        userId: conversation.members.find((id) => id !== req.user.id),
        lastMessage: lastMessage ? lastMessage.content : "",
        timestamp: lastMessage ? lastMessage.timestamp : null,
      };
    });
    res.status(200).json(lastMessages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put(
  "/viewedmessage/:userID/:selectedUserID",
  verifyToken,
  async (req, res) => {
    const { userID, selectedUserID } = req.params;
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [userID, selectedUserID] },
      });
      if (!conversation)
        return res.status(404).json({ message: "Conversation not found" });
      conversation.messages.forEach((message) => {
        if (message.senderId.toString() === selectedUserID) {
          message.isRead = true;
        }
      });
      await conversation.save();
      res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

app.put("/addMessageToTheBot/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { robotConversation: req.body } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "Message added successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/online-status/:userId", (req, res) => {
  res.json({ online: onlineUsers.has(req.params.userId) });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);
});
