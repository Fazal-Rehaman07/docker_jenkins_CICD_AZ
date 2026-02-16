import { connectDB } from "../../../lib/mongodb"
import Customer from "../../../models/Customer"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()

  const customer = await Customer.create({
    name: "Docker Test",
    email: "docker@test.com",
    phone: "1234567890"
  })

  return NextResponse.json(customer)
}
