"use client";

import { useState } from "react";

export default function AddCard() {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🛠️ Form Data Before Sending:", cardData); // ✅ Log Form Data in Console

    try {
      const response = await fetch("/api/addCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      const result = await response.json();
      console.log("✅ Server Response:", result);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
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
