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
  try {
    const client = clerkClient(); // ← Call it to get the actual client
const user = await client.users.getUser(userId); // ✅ Now this works
    let passwords: { cardNo: string; expiry: string; cvv: number }[] = [];
    if (Array.isArray(user.privateMetadata.passwords)) {
      passwords = user.privateMetadata.passwords;
    }
    passwords.push({ cardNo, expiry, cvv });
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: passwords,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
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
