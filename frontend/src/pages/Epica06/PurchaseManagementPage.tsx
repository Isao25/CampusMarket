import { Helmet } from "react-helmet-async";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function PurchaseManagementPage() {
  const location = useLocation();
  const mainPage = location.pathname === "/purchase-management";

  return (
    <>
      <Helmet>
        <title>Gestión de compras</title>
      </Helmet>
      {mainPage && (
        <div className="flex flex-col py-6 gap-2 mb-8">
          <p className="font-semibold text-2xl text-terciaryLight">
            Gestión de compras
          </p>
          <p className="font-medium text-[16px] mb-6">
            Administra todas tus compras en un solo lugar. <br /> Revisa tus
            productos adquiridos, compras pendientes y el historial de tus
            transacciones.
          </p>
          <Link
            to="purchase-history"
            className="flex justify-between items-center self-stretch py-2 px-4 mb-2 hover:bg-terciaryLight/5 rounded-[8px]"
          >
            Historial de compras <ChevronRight></ChevronRight>
          </Link>
          <Link
            to="pending-purchase"
            className="flex justify-between items-center self-stretch py-2 px-4 mb-2 hover:bg-terciaryLight/5 rounded-[8px]"
          >
            Compras pendientes <ChevronRight></ChevronRight>
          </Link>
        </div>
      )}
      <Outlet></Outlet>
    </>
  );
}
