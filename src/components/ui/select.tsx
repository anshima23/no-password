"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select"; // ✅ Ensure this matches package name
import { cn } from "@/lib/utils"; // ✅ Check if utils exist


export const Select = SelectPrimitive.Root;
export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = SelectPrimitive.Item;
