import { connectDB } from "../../../../lib/mongodb"
import Customer from "../../../../models/Customer"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

// Generate incremental user_id
async function generateNextUserId(): Promise<string> {
  const latestCustomer = await Customer.findOne({}).sort({ created_at: -1 }).lean()
  if (!latestCustomer?.user_id) return "U001"
  const numberPart = parseInt(latestCustomer.user_id.slice(1), 10)
  return `U${(numberPart + 1).toString().padStart(3, "0")}`
}

// GET all customers
export async function GET() {
  await connectDB()
  const customers = await Customer.find({}).sort({ created_at: -1 })
  return NextResponse.json(customers)
}

// POST: create new customer
export async function POST(req: Request) {
  await connectDB()
  const { name, email, phone } = await req.json()
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 })

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

// PUT: update customer
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()
  const { id } = await context.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 })
  }

  const { name, email, phone } = await req.json()
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 })

  const customer = await Customer.findById(id)
  if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 })

  customer.name = name
  if (email !== undefined) customer.email = email
  if (phone !== undefined) customer.phone = phone

  await customer.save()
  return NextResponse.json(customer)
}

// DELETE: remove customer
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()
  const { id } = await context.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 })
  }

  const customer = await Customer.findById(id)
  if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 })

  await Customer.deleteOne({ _id: id })
  return NextResponse.json({ success: true })
}
