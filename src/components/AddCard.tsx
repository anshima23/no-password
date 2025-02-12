"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { addCardServer } from "../../actions/actions";
import {useUser} from "@clerk/nextjs"

// Define validation schema using Zod
const formSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16, "Card number cannot exceed 16 digits"),
  cardHolder: z.string().min(3, "Cardholder name must be at least 3 characters"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
  cardType: z.enum(["Visa", "MasterCard", "American Express"], {
    required_error: "Please select a card type",
  }),
});

const AddCard = () => {

  const user = useUser()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      cardType: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    if(user.user){
      addCardServer(values.cardNumber,values.expiryDate,values.cvv,user?.user?.id)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Card Number Field */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your card number"
                  {...field} // Spread field props first
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (value.length <= 16) {
                      field.onChange(value); // Call field.onChange with sanitized value
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cardholder Name Field */}
        <FormField
          control={form.control}
          name="cardHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter cardholder name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiry Date Field */}
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date (MM/YY)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9/]/g, ""); // Allow only numbers and "/"
                    if (value.length <= 5) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CVV Field */}
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter CVV"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                    if (value.length <= 3) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddCard;
