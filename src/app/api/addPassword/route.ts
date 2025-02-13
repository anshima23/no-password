import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // ✅ Correct import

export async function POST(req: Request) {
  const authData = await auth();
  const userId = authData.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse request body
    const { website, username, password } = await req.json();

    // Fetch current user details
    const user = await currentUser();

    // Ensure existing passwords data is an array
    const existingPasswords = Array.isArray(user?.privateMetadata?.passwords)
      ? user.privateMetadata.passwords
      : [];

    // Save password details in Clerk's private metadata
    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        ...user?.privateMetadata, // Preserve existing data
        passwords: [...existingPasswords, { website, username, password }], // Add new password entry
      },
    });

    return NextResponse.json({ success: true, message: "Password added successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add password", details: error.message }, { status: 500 });
  }
}
