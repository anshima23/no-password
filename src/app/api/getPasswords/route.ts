import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // ✅ Correct Clerk import for API routes
import { headers } from "next/headers"; // ✅ Import headers from next/headers
import { clerkClient } from "@clerk/nextjs"; // ✅ Import clerkClient for user data

export async function GET() {
  try {
    console.log("Fetching user passwords...");

    // ✅ Await headers() before using `.get()`
    const requestHeaders = headers();
    const authToken = requestHeaders.get("Authorization");

    if (!authToken) {
      console.log("No Authorization token found");
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fetch the authenticated user from Clerk
    const user = await currentUser();
    if (!user) {
      console.log("User not authenticated");
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    console.log("Authenticated user ID:", user.id);

    // 🚀 Fetch passwords from Clerk's private metadata
    const passwordData = user.privateMetadata?.passwords || [];

    console.log("Passwords fetched:", passwordData);

    return NextResponse.json({ success: true, passwords: passwordData });
  } catch (error) {
    console.error("Error in GET /api/getPasswords:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
