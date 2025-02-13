"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Password {
  website: string;
  username: string;
  password: string;
}

export async function addCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  console.log("✅ addCardServer function is running!"); // Check if function is triggered

  try {
    // Fetch the user from Clerk
    const user = await clerkClient.users.getUser(userId);

    console.log("📌 Fetched user:", user); // Log user data

    let passwords: { cardNo: string; expiry: string; cvv: number }[] = [];

    // Ensure privateMetadata.passwords exists and is an array
    if (Array.isArray(user.privateMetadata.passwords)) {
      passwords = user.privateMetadata.passwords;
    }

    // Push the new card details
    passwords.push({ cardNo, expiry, cvv });

    console.log("🔐 Updated passwords array:", passwords);

    // Update the user metadata with new passwords array
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: passwords,
      },
    });

    console.log("✅ User metadata updated successfully!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error adding card:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function addPasswordServer(website:string, username:string,password: Password, userId: string) {
 const client = await clerkClient()
 const user = await client.users.getUser(userId)
 let cards: Password[] = []
 if(Array.isArray(user.privateMetadata.cards)){
  cards = user.privateMetadata.cards || []
  cards.push(website,username,password)
 }

 await client.users.updateUserMetadata(userId, {
  privateMetadata:{
    cards:cards
  },
 })
}
