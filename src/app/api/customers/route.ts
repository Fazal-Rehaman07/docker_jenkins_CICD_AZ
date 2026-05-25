import { connectDB } from "../../../lib/mongodb"
import Customer from "../../../models/Customer"
import { NextResponse } from "next/server"

// Generate incremental user_id
async function generateNextUserId(): Promise<string> {
  const latestCustomer = await Customer.findOne({})
    .sort({ created_at: -1 })
    .lean()

  if (!latestCustomer?.user_id) {
    return "U001"
  }

  const numberPart = parseInt(
    latestCustomer.user_id.slice(1),
    10
  )

  const nextNumber = numberPart + 1

  return `U${nextNumber.toString().padStart(3, "0")}`
}

/* =========================
   GET CUSTOMERS
========================= */

export async function GET(req: Request) {
  try {
    console.log("GET /api/customers called")

    await connectDB()

    console.log("MongoDB connected")

    const { searchParams } = new URL(req.url)

    const user_id = searchParams.get("user_id")

    const query = user_id ? { user_id } : {}

    const customers = await Customer.find(query)
      .sort({ created_at: -1 })

    return NextResponse.json(customers)

  } catch (error: any) {
    console.error("GET customers error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch customers",
      },
      { status: 500 }
    )
  }
}

/* =========================
   CREATE CUSTOMER
========================= */

export async function POST(req: Request) {
  try {
    console.log("POST /api/customers called")

    await connectDB()

    console.log("MongoDB connected")

    let body

    try {
      body = await req.json()
    } catch (jsonError) {
      console.error("Invalid JSON:", jsonError)

      return NextResponse.json(
        {
          success: false,
          error: "Invalid or empty JSON body",
        },
        { status: 400 }
      )
    }

    console.log("Request body:", body)

    const { name, email, phone } = body

    // Validation
    if (!name || name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 }
      )
    }

    // Generate custom user ID
    const user_id = await generateNextUserId()

    // Create customer
    const customer = await Customer.create({
      user_id,
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      created_at: new Date(),
    })

    console.log("Customer created:", customer)

    return NextResponse.json(
      {
        success: true,
        customer,
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error("POST customers error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create customer",
      },
      { status: 500 }
    )
  }
}