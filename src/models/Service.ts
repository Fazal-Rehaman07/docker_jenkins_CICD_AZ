import mongoose from "mongoose"

const ServiceSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // <- change
  vehicle: { type: String, required: true },
  service_date: { type: Date, required: true },
  reminder_months: { type: Number, default: 3 },
  reminder_date: { type: Date },
  amount: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
})

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema)


