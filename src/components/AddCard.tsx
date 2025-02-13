"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { CreditCard, User, Calendar, Lock, CreditCardIcon } from 'lucide-react';

export default function AddCard() {
  const { getToken, isSignedIn } = useAuth();  

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
  });

  const handleChange = (e) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
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

      if (!result.success) {
        toast.error(`Error: ${result.error}`);
      } else {
        toast.success("Card Added Successfully! 🎉");
        setCardData({
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvv: "",
          cardType: "",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 m-4 border border-white/20">
      <h2 className="text-xl font-semibold text-white text-center mb-4">Add New Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Card Number", name: "cardNumber", icon: <CreditCard className="h-5 w-5 text-gray-400" />, placeholder: "1234 5678 9012 3456" },
          { label: "Card Holder", name: "cardHolder", icon: <User className="h-5 w-5 text-gray-400" />, placeholder: "John Doe" },
          { label: "Expiry Date", name: "expiryDate", icon: <Calendar className="h-5 w-5 text-gray-400" />, placeholder: "MM/YY" },
          { label: "CVV", name: "cvv", icon: <Lock className="h-5 w-5 text-gray-400" />, placeholder: "123", type: "password" },
          { label: "Card Type", name: "cardType", icon: <CreditCardIcon className="h-5 w-5 text-gray-400" />, placeholder: "Visa, MasterCard, etc." },
        ].map(({ label, name, icon, placeholder, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-black dark:text-white">{label}</label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>
              <input
                type={type}
                name={name}
                className="bg-transparent border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 rounded-lg text-white placeholder-gray-300"
                placeholder={placeholder}
                onChange={handleChange}
                value={cardData[name]}
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition-colors py-2 rounded-lg text-white font-semibold"
        >
          Add Card
        </button>
      </form>
    </div>
  );
}
