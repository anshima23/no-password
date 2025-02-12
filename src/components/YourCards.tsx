import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function YourCards() {
  // This is a placeholder. You'll need to fetch actual card data from your database.
  const cards = [
    { id: 1, number: "**** **** **** 1234", expiry: "12/24" },
    { id: 2, number: "**** **** **** 5678", expiry: "06/25" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Card Number</TableHead>
          <TableHead>Expiry Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell>{card.number}</TableCell>
            <TableCell>{card.expiry}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

