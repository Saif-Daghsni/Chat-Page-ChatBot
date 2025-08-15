import mongoose from "mongoose";

const orderUserinfo = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: orderUserinfo },
  title: {
    type: String,
    trim: true,
    default: "",
  },
  type: {
    type: String,
    enum: ["Achat", "Vente", "Matières premières", "Emballage"],
  },
  gamme: {
    type: String,
    trim: true,
    default: "",
  },
  quantite: {
    type: Number,
    min: 1,
  },
  prix: {
    type: Number,
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
  content: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  image: { type: String, default: null },
  order: { type: orderSchema, default: null },
});

const ConversationSchema = new mongoose.Schema({
  members: { type: [String], required: true },
  messages: [messageSchema],
});

export default mongoose.model("Conversation", ConversationSchema);
