import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PendingPurchaseList } from "./PendingPurchaseList";

export function PendingPurchasesPage() {
  return (
    <>
      <Helmet>
        <title>Compras pendientes</title>
      </Helmet>
      <div className="w-full py-6">
        <div className="flex justify-between">
          <p className="font-semibold text-2xl text-terciaryLight">
            Compras pendientes
          </p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/purchase-management">Gestión de compras</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Compras pendientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <p className="my-6">Lista de todas tus compras pendientes</p>
        <PendingPurchaseList></PendingPurchaseList>
        <div className="h-40"></div>
      </div>
    </>
  );
}
