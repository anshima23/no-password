"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface Password {
  website: string;
  username: string;
  password: string;
}

// ✅ Save Card
export async function addCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  try {
    const client = await clerkClient(); // FIXED
    const user = await client.users.getUser(userId);
    let cards: { cardNo: string; expiry: string; cvv: number }[] = [];

    if (Array.isArray(user.privateMetadata.cards)) {
      cards = user.privateMetadata.cards;
    }

    cards.push({ cardNo, expiry, cvv });

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        cards: cards,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ Save Password
export async function addPasswordServer(
  website: string,
  username: string,
  password: string,
  userId: string
) {
  try {
    const user = await clerkClient.users.getUser(userId);

    let passwords: Password[] = [];

    if (Array.isArray(user.privateMetadata.passwords)) {
      passwords = user.privateMetadata.passwords;
    }

    passwords.push({ website, username, password });

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        passwords: passwords,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
