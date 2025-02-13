"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface PasswordProps {
  website: string;
  username: string;
  password: string;
}

export default function YourPasswords() {
  const { getToken, isSignedIn } = useAuth();
  const [passwords, setPasswords] = useState<PasswordProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!isSignedIn) return;

      try {
        const token = await getToken(); // ✅ Fetch token
        if (!token) {
          console.log("Token not available");
          return;
        }

        console.log("Sending request with token:", token);

        const response = await fetch("/api/getPasswords", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error response:", response.status, await response.text());
          return;
        }

        const result = await response.json();
        console.log("Received passwords:", result.passwords);

        if (result.success) {
          setPasswords(result.passwords);
        }
      } catch (error) {
        console.error("Error fetching passwords:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <p className="text-red-500">You must be signed in to view saved passwords.</p>;
  }

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
            <TableRow key={item.website}>
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
