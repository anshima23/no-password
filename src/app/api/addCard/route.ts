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
    const { cardNumber, cardHolder, expiryDate, cvv, cardType } = await req.json();

    // Fetch current user details
    const user = await currentUser();

    // Ensure existing card data is an array
    const existingCards = Array.isArray(user?.privateMetadata?.cards) ? user.privateMetadata.cards : [];

    // Save card details in Clerk's private metadata
    await clerkClient.users.updateUser(userId, {  // ✅ Corrected `clerkClient.users.updateUser`
      privateMetadata: {
        ...user?.privateMetadata, // Preserve existing data
        cards: [...existingCards, { cardNumber, cardHolder, expiryDate, cvv, cardType }], // Add new card
      },
    });

    return NextResponse.json({ success: true, message: "Card added successfully!" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: "Failed to add card", details: errorMessage }, { status: 500 });
  }
}
