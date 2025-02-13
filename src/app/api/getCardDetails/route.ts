import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const cardData = user.publicMetadata.cardDetails || {};

    return NextResponse.json({ success: true, cardDetails: cardData });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
