import { connectDB } from "../../../lib/mongodb"
import Customer from "../../../models/Customer"
import { NextResponse } from "next/server"

// Helper to generate next incremental user_id
async function generateNextUserId(): Promise<string> {
  // Find the latest user_id
  const latestCustomer = await Customer.findOne({})
    .sort({ created_at: -1 })
    .lean()

  if (!latestCustomer?.user_id) {
    return "U001"
  }

  // Extract number part: "U001" -> 1
  const numberPart = parseInt(latestCustomer.user_id.slice(1), 10)
  const nextNumber = numberPart + 1

  // Pad with leading zeros
  return `U${nextNumber.toString().padStart(3, "0")}`
}

export async function GET(req: Request) {
  await connectDB()

  // Optional: get user_id filter from query string
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get("user_id")

  const query = user_id ? { user_id } : {}

  const customers = await Customer.find(query).sort({ created_at: -1 })

  return NextResponse.json(customers)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const { name, email, phone } = body

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  // Generate the next incremental user_id automatically
  const user_id = await generateNextUserId()

  const customer = await Customer.create({
    user_id,
    name,
    email: email || null,
    phone: phone || null,
    created_at: new Date(),
  })

  return NextResponse.json(customer)
}
