"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";

interface PasswordProps {
  id: string;
  website: string;
  username: string;
  password: string;
}

export default function YourPasswords() {
  const { getToken, isSignedIn } = useAuth();
  const [passwords, setPasswords] = useState<PasswordProps[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Wrap `fetchPasswords` in `useCallback` to avoid unnecessary re-renders
  const fetchPasswords = useCallback(async () => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();
      if (!token) return;

      const response = await fetch("/api/getPasswords", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setPasswords(result.passwords);
      }
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, getToken]); // ✅ Stable dependencies

  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]); // ✅ Uses `fetchPasswords`, which has stable dependencies

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
