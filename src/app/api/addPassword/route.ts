import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { website, username, password } = await req.json();
    const user = await clerkClient.users.getUser(userId);
    const existingPasswords = Array.isArray(user.privateMetadata.passwords) ? user.privateMetadata.passwords : [];

    await clerkClient.users.updateUser(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        passwords: [...existingPasswords, { website, username, password }],
      },
    });

    return NextResponse.json({ success: true, message: "Password saved successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save password", details: error.message }, { status: 500 });
  }
}