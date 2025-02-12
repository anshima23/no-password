"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function addCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  console.log("✅ addCardServer function is running!"); // Check if function is triggered

  const user = await clerkClient.users.getUser(userId);
  console.log("📌 Fetched user:", user); // Log user data

  let passwords: { cardNo: string; expiry: string; cvv: number }[] = [];

  if (Array.isArray(user.privateMetadata.passwords)) {
    passwords = user.privateMetadata.passwords; // Fix incorrect assignment syntax
  }
  passwords.push({ cardNo, expiry, cvv });

  console.log("🔐 Updated passwords array:", passwords); // Check new passwords array

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords,
    },
  });

  console.log("✅ User metadata updated successfully!");

  return NextResponse.json({ success: true });
}
