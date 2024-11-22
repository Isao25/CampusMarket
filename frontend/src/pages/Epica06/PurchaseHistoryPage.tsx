import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { TableHistory } from "./TableHistory";

export function PurchaseHistoryPage() {
  return (
    <>
      <Helmet>
        <title>Historial de compras</title>
      </Helmet>
      <div className="w-full py-6">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl text-terciaryLight">
            Historial de compras
          </p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/purchase-management">Gestión de compras</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Historial de compras</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <p className="my-4">Lista de todas tus compras.</p>
        <TableHistory></TableHistory>
      </div>
    </>
  );
}
