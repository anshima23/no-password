import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function GET() {
  try {
    const { userId } = await auth(); // Fix #1
    if (!userId) {
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId); // Fix #2
    const cardData = user.publicMetadata.cardDetails || {};

    return NextResponse.json({ success: true, cardDetails: cardData });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
