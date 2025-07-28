import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CardProps {
  cardNumber: string;
  expiryDate: string;
  cvv: number;
}

export default function YourCards({ cards }: { cards: CardProps[] }) {
  if (!cards || cards.length === 0) {
    return <p className="text-center text-gray-500">No cards added yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Card Number</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>CVV</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card: CardProps, index: number) => (
          <TableRow key={index}>
            <TableCell>{card.cardNumber}</TableCell>
            <TableCell>{card.expiryDate}</TableCell>
            <TableCell>{card.cvv}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
