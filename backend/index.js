import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectToDatabase from "../backend/Models/db.js"; // add .js extension for ESM
import User from "./Models/User.js";
import authRouter from "./Routes/AuthRouter.js";
import cors from "cors";
import verifyToken from "./Middlewares/Auth.js";
import Conversation from "./Models/Conversation.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectToDatabase();

// Mount your auth routes
app.use("/api/auth", authRouter);

// Route to get all users
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route for logged-in user info
app.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Add a new order to a user
app.put("/addOrder/:userId", async (req, res) => {
  console.log("PUT /addOrder called"); // <-- Add this to see if route is hit
  console.log("User ID:", req.params.userId);
  console.log("Order data:", req.body);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { orders: req.body } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Order added successfully", user: updatedUser });
  } catch (error) {
    console.error("Server error:", error);
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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", user: updatedUser });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put("/updateOrder/:userId/:orderId", async (req, res) => {
  const { userId, orderId } = req.params;
  const updatedOrder = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    //  Find the order subdocument directly
    const order = user.orders.id(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    //  Update only the fields of the subdocument
    Object.keys(updatedOrder).forEach((key) => {
      order[key] = updatedOrder[key];
    });

    await user.save();

    res.status(200).json({ message: "Order updated successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/conversations", verifyToken, async (req, res) => {
  const { members, messages } = req.body;

  if (!members || !Array.isArray(members) || members.length !== 2) {
    return res.status(400).json({ error: "Invalid members array" });
  }

  try {
    // Sort members to avoid duplicate conversations (e.g., [A, B] vs [B, A])
    const sortedMembers = members.sort();

    // Check if a conversation already exists
    let conversation = await Conversation.findOne({
      members: { $all: sortedMembers },
    });

    if (conversation) {
      // Update existing conversation
      conversation.messages.push(messages[0]); // Add the new message
      await conversation.save();
    } else {
      // Create new conversation
      conversation = await Conversation.create({
        members: sortedMembers,
        messages,
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in /conversations:", error);
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
    console.error("Error fetching conversations:", error);
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
    console.error("Error fetching last messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
