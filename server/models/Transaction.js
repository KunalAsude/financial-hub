import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank", required: true },
  type: { type: String, enum: ["deposit", "withdrawal", "transfer"], required: true },
  amount: { type: Number, required: true },
  recipientAccount: { type: String, required: function () { return this.type === "transfer"; } },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;

