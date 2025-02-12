import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddPassword() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="website">Website</Label>
        <Input id="website" placeholder="https://example.com" />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <Button type="submit" className="w-full">
        Add Password
      </Button>
    </form>
  )
}

