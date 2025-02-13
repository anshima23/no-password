import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddCard from "@/components/AddCard";
import AddPassword from "@/components/AddPassword";
import YourCards from "@/components/YourCards";
import YourPasswords from "@/components/YourPasswords";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "NoPass - Home",
  description: "This is the homepage of my password manager",
};


export default async function Home() {
  const user = await currentUser()
console.log(user?.privateMetadata)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Password Manager
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add a Credit Card</CardTitle>
          </CardHeader>
          <CardContent>
            <AddCard />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add a Password</CardTitle>
          </CardHeader>
          <CardContent>
            <AddPassword />
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <YourCards cards={Array.isArray(user?.privateMetadata.cards)?user?.privateMetadata.cards:[]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Passwords</CardTitle>
          </CardHeader>
          <CardContent>
            <YourPasswords passwords={Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.password:[]}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
