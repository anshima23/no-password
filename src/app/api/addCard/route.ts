import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("📌 Received Data in API Route:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
