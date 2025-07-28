"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PasswordProps {
  id: string;
  website: string;
  username: string;
  password: string;
}

interface YourPasswordsProps {
  passwords: PasswordProps[];
  loading?: boolean;
}

export default function YourPasswords({ passwords, loading = false }: YourPasswordsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Website</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : passwords.length > 0 ? (
          passwords.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.website}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>••••••••</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No passwords saved.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
