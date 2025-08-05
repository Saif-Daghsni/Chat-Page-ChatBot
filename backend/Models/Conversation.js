const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
    default: "",
  },
  type: {
    type: String,
    enum: ["Achat", "Vente", "Matières premières" , "Emballage"],
    required: true,
  },
  gamme: {
    type: String,
    trim: true,
    default: "",
  },
  quantite: {
    type: Number,
    required: true,
    min: 1,
  },
  prix: {
    type: Number,
    required: true,
    min: 0,
  },
  quantiteNego: {
    type: Number,
    default: 0,
    min: 0,
  },
  prixNego: {
    type: Number,
    default: 0,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  content: { type: String, required: false, default: null },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  image: { type: String, required: false, default: null },
  order: { type: orderSchema, required: false, default: null },
});

const ConversationSchema = new mongoose.Schema({
  members: { type: [String], required: true },
  messages: [messageSchema],
});

module.exports = mongoose.model("Conversation", ConversationSchema);
