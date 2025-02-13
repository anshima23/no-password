import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // ✅ Correct Clerk import for API routes
import { headers } from "next/headers"; // ✅ Import headers from next/headers
import { clerkClient } from "@clerk/nextjs"; // ✅ Import clerkClient for user data

export async function GET() {
  try {
    const requestHeaders = headers();
    const authToken = requestHeaders.get("Authorization");

    if (!authToken) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fetch the authenticated user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    const passwordData = user.privateMetadata?.passwords || [];

    return NextResponse.json({ success: true, passwords: passwordData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
