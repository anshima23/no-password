"use client";

import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, User, Lock } from "lucide-react";

const formSchema = z.object({
  website: z.string().url("Please enter a valid URL").min(1, "Website is required"),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function AddPassword() {
  const { getToken, isSignedIn } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isSignedIn) {
      toast.error("You must be signed in to add a password.");
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication token missing.");
        return;
      }

      const response = await fetch("/api/addPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(`Error: ${result.error}`);
      } else {
        toast.success("Password Added Successfully! 🎉");
        reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 m-4 border border-white/20">
      <h2 className="text-xl font-semibold text-white text-center mb-4">Add New Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { label: "Website", name: "website", icon: <Globe className="h-5 w-5 text-gray-400" />, placeholder: "https://example.com" },
          { label: "Username", name: "username", icon: <User className="h-5 w-5 text-gray-400" />, placeholder: "johndoe" },
          { label: "Password", name: "password", icon: <Lock className="h-5 w-5 text-gray-400" />, placeholder: "********", type: "password" },
        ].map(({ label, name, icon, placeholder, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-black dark:text-white">{label}</label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>
              <input
                {...register(name as keyof FormData)}
                type={type}
                className="bg-transparent border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 rounded-lg text-white placeholder-gray-300"
                placeholder={placeholder}
              />
              {errors[name as keyof FormData] && <p className="text-red-500 text-sm">{errors[name as keyof FormData]?.message}</p>}
            </div>
          </div>
        ))}
        <button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors py-2 rounded-lg text-white font-semibold">
          Add Password
        </button>
      </form>
    </div>
  );
}
