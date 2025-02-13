"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast"; // ✅ Import from react-hot-toast

export default function AddCard() {
  const { getToken, isSignedIn } = useAuth();  

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("You must be signed in to add a card.");
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication token missing.");
        return;
      }

      const response = await fetch("/api/addCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cardData),
      });

      const result = await response.json();
      console.log("✅ Server Response:", result);

      if (!result.success) {
        toast.error(`Error: ${result.error}`);
      } else {
        toast.success("Card Added Successfully! 🎉");

        // Reset form after success
        setCardData({
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvv: "",
          cardType: "",
        });
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} value={cardData.cardNumber} />
      <input type="text" name="cardHolder" placeholder="Card Holder Name" onChange={handleChange} value={cardData.cardHolder} />
      <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" onChange={handleChange} value={cardData.expiryDate} />
      <input type="password" name="cvv" placeholder="CVV" onChange={handleChange} value={cardData.cvv} />
      <input type="text" name="cardType" placeholder="Card Type (Visa, MasterCard)" onChange={handleChange} value={cardData.cardType} />
      <button type="submit">Add Card</button>
    </form>
  );
}
