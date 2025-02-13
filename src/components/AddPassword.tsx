"use client"

import { useAuth } from "@clerk/nextjs"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Globe, User, Lock } from "lucide-react"

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
})

type FormData = z.infer<typeof formSchema>

export default function AddPassword() {
  const { getToken, isSignedIn } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    if (!isSignedIn) {
      toast.error("You must be signed in to add a password.")
      return
    }

    try {
      const token = await getToken()
      if (!token) {
        toast.error("Authentication token missing.")
        return
      }

      const response = await fetch("/api/addPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(`Error: ${result.error}`)
      } else {
        toast.success("Password Added Successfully! 🔐")
        reset()
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 bg-opacity-20 dark:bg-opacity-40 backdrop-blur-md rounded-xl shadow-md p-4 border border-white/30 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
          🔐 Add New Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Website Input */}
          <div>
            <label htmlFor="website" className="text-black dark:text-white text-sm font-medium">
              Website
            </label>
            <div className="relative mt-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="website"
                {...register("website")}
                className="bg-transparent text-gray-900 dark:text-white w-full px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://example.com"
              />
            </div>
            {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="text-black dark:text-white text-sm font-medium">
              Username
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="username"
                {...register("username")}
                className="bg-transparent text-gray-900 dark:text-white w-full px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="johndoe@example.com"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-black dark:text-white text-sm font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                id="password"
                {...register("password")}
                className="bg-transparent text-gray-900 dark:text-white w-full px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold rounded-md shadow-md"
          >
            Add Password
          </button>
        </form>
      </div>
    </div>
  )
}
