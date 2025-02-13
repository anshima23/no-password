import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


interface CardProps{
  cardNumber:string,
  expiryDate:string,
  cvv:number
}
export default function YourCards({cards}:{cards:CardProps[]}) {
  // This is a placeholder. You'll need to fetch actual card data from your database.
  

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Card Number</TableHead>
          <TableHead>Expiry Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card: CardProps) => (
          <TableRow key={card.cardNumber}>
            <TableCell>{card.cardNumber}</TableCell>
            <TableCell>{card.expiryDate}</TableCell>
            <TableCell>{card.cvv}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

