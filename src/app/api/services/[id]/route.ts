import { connectDB } from "../../../../lib/mongodb";
import Service from "../../../../models/Service";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Helper to validate ObjectId
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// PUT /api/services/:id
export async function PUT(req: Request, { params }: { params: any }) {
  await connectDB();

  // Unwrap params
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { customer_id, vehicle, service_date, reminder_months, amount } = body;

    // Validate required fields
    if (!customer_id || !vehicle || !service_date || reminder_months == null || amount == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Calculate reminder_date
    const serviceDate = new Date(service_date);
    const reminderDate = new Date(serviceDate);
    reminderDate.setMonth(reminderDate.getMonth() + reminder_months);

    // Update service
    const service = await Service.findByIdAndUpdate(
      id,
      {
        customer_id,
        vehicle,
        service_date: serviceDate,
        reminder_months,
        reminder_date: reminderDate,
        amount,
      },
      { returnDocument: "after" } // Mongoose 7+ option
    );

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("PUT /api/services/:id error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/services/:id
export async function DELETE(_: Request, { params }: { params: any }) {
  await connectDB();

  // Unwrap params
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
  }

  try {
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/services/:id error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
