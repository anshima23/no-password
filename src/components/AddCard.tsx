"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";  

export default function AddCard() {
  const { getToken, isSignedIn } = useAuth();  // ✅ Get Clerk token for authentication

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

    console.log("🛠️ Form Data Before Sending:", cardData);

    if (!isSignedIn) {
      alert("You must be signed in to add a card.");
      return;
    }

    try {
      const token = await getToken();  
      if (!token) {
        alert("Authentication token missing.");
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
        alert(`Error: ${result.error}`);
      } else {
        alert("Card added successfully!");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} />
      <input type="text" name="cardHolder" placeholder="Card Holder Name" onChange={handleChange} />
      <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" onChange={handleChange} />
      <input type="password" name="cvv" placeholder="CVV" onChange={handleChange} />
      <input type="text" name="cardType" placeholder="Card Type (Visa, MasterCard)" onChange={handleChange} />
      <button type="submit">Add Card</button>
    </form>
  );
}
