import mongoose from "mongoose"

const ShopSchema = new mongoose.Schema(
  {
    owner_id: { type: String },
    name: { type: String, required: true },
    logo_url: { type: String },
    primary_color: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
)

export default mongoose.models.Shop ||
  mongoose.model("Shop", ShopSchema)
