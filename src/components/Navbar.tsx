"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => { 
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      // If the theme is 'system', we'll set it explicitly to either light or dark
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 bg-primary h-16 text-foreground shadow-lg">
      <span className="font-bold text-2xl">NoPass</span>

      <ul className="flex gap-6 text-lg font-medium">
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">About</li>
        <li className="hover:underline cursor-pointer">Services</li>
      </ul>

      <div className="flex gap-3 items-center">
        {/* ✅ Show Sign In Button only if the user is signed out */}

        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-5 w-5 transition-all dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
          <span className="sr-only">Toggle Theme</span>
        </Button>

        <SignedOut>
          <SignInButton>
            <Button className="bg-foreground text-background">Sign In</Button>
          </SignInButton>
        </SignedOut>

        {/* ✅ Show User Profile Button when signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
