import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Bank = mongoose.model("Bank", BankSchema);
export default Bank;
