import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function YourPasswords() {
  // This is a placeholder. You'll need to fetch actual password data from your database.
  const passwords = [
    { id: 1, website: "example.com", username: "johndoe" },
    { id: 2, website: "anothersite.com", username: "janedoe" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Website</TableHead>
          <TableHead>Username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {passwords.map((password) => (
          <TableRow key={password.id}>
            <TableCell>{password.website}</TableCell>
            <TableCell>{password.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

