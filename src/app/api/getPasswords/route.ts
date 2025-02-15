import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; // ✅ Correct Clerk import for API routes
import { headers } from "next/headers"; // ✅ Import headers from next/headers

export async function GET() {
  try {
    const requestHeaders = await headers(); // ✅ Await the headers() function
    const authToken = requestHeaders.get("Authorization"); // ✅ Now we can use .get()

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
