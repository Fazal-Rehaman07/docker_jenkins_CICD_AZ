import { connectDB } from "../../../../lib/mongodb"
import Shop from "../../../../models/Shop"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await req.json()
  const shop = await Shop.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(shop)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB()
  await Shop.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
