import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AddCard from "@/components/AddCard"
import AddPassword from "@/components/AddPassword"
import YourCards from "@/components/YourCards"
import YourPasswords from "@/components/YourPasswords"
import {Metadata} from "next"

export const metadata: Metadata={
  title: 'NoPass - Home',
  description: 'This is homepage of my password manager',
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Password Manager</h1>
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
            <YourCards />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Passwords</CardTitle>
          </CardHeader>
          <CardContent>
            <YourPasswords />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

