import { connectDB } from "../../../lib/mongodb"
import Shop from "../../../models/Shop"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const shops = await Shop.find().sort({ created_at: -1 })
  return NextResponse.json(shops)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const shop = await Shop.create(body)
  return NextResponse.json(shop)
}
