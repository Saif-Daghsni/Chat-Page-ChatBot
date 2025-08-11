const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RobotSchema = new mongoose.Schema({
  content: { type: String, required: false, default: null },
  timestamp: { type: Date, default: Date.now },
  sender: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  title: String,
  type: String,
  gamme: String,
  quantite: Number,
  prix: Number,
  quantiteNego: Number,
  prixNego: Number,
  date: String,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  orders: [orderSchema],
  robotConversation:[RobotSchema]
});

// Middleware pour hasher le mot de passe avant de sauvegarder
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour vérifier le mot de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
