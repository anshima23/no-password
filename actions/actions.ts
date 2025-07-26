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
    const client = await clerkClient(); // ✅ get actual client
    const user = await client.users.getUser(userId);

    let cards: { cardNo: string; expiry: string; cvv: number }[] = [];

    if (Array.isArray(user.privateMetadata.cards)) {
      cards = user.privateMetadata.cards;
    }

    cards.push({ cardNo, expiry, cvv });

    await client.users.updateUserMetadata(userId, {
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
