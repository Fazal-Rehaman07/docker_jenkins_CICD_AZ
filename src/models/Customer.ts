import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  created_at: { type: Date, default: Date.now }
})

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema)
