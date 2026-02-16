import { connectDB } from "../../../lib/mongodb"
import Service from "../../../models/Service"
import Customer from "../../../models/Customer"
import { NextResponse } from "next/server"


// GET all services
export async function GET() {
  await connectDB();

  const services = await Service.find()
    .populate("customer_id")
    .sort({ created_at: -1 });

  // reshape for frontend
  const formatted = services.map((s) => ({
    ...s.toObject(),
    customer: s.customer_id,       // populated object
    customer_id: s.customer_id?._id, // raw id
  }));

  return NextResponse.json(formatted);
}

// CREATE service
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const { customer_id, service_date, reminder_months, vehicle, amount } = body;

  if (!customer_id || !service_date || !vehicle) {
    return NextResponse.json(
      { error: "customer_id, vehicle and service_date are required" },
      { status: 400 }
    );
  }

  const serviceDate = new Date(service_date);
  const reminderDate = new Date(serviceDate);
  reminderDate.setMonth(reminderDate.getMonth() + Number(reminder_months || 0));

  const service = await Service.create({
    customer_id,
    vehicle,
    service_date: serviceDate,
    reminder_months: Number(reminder_months || 0),
    reminder_date: reminderDate,
    amount: Number(amount || 0),
  });

  const populated = await Service.findById(service._id).populate("customer_id");

  return NextResponse.json({
    ...populated!.toObject(),
    customer: populated!.customer_id,
    customer_id: populated!.customer_id?._id,
  });
}
