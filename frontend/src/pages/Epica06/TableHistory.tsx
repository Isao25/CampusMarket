import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const shopping = [
  {
    idPurchase: "INV001",
    date: "10-10-2024",
    totalAmount: "250.00",
    state: "entregado",
  },
  {
    idPurchase: "INV003",
    date: "10-12-2024",
    totalAmount: "50.00",
    state: "cancelado",
  },
  {
    idPurchase: "INV002",
    date: "8-12-2024",
    totalAmount: "50.00",
    state: "en curso",
  },
  {
    idPurchase: "INV005",
    date: "2-12-2024",
    totalAmount: "50.00",
    state: "en curso",
  },
];

export function TableHistory() {
  return (
    <Table>
      <TableCaption>
        Todas tus compras registradas en un solo lugar
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>N° Compra</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right pr-4">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shopping.map((shopping) => (
          <TableRow key={shopping.idPurchase}>
            <TableCell className="font-medium">{shopping.idPurchase}</TableCell>
            <TableCell>{shopping.date}</TableCell>
            <TableCell>S/ {shopping.totalAmount}</TableCell>
            <TableCell className="capitalize">{shopping.state}</TableCell>
            <TableCell className="text-right pr-6">
              <Link to="/" className="flex justify-end">
                <ArrowUpRight></ArrowUpRight>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total de compras</TableCell>
          <TableCell className="text-right pr-6">{shopping.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
