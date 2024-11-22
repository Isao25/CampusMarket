import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
//import { baseURL } from "@/api/api";

const datos = [
  {
    id: 1,
    seller: "Alonso Mallma Gutierrez",
    isPaymentMethodQR: true,
    qrCode:
      "https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024-1.jpg",
    recipient: "Alonso Juan Mallma Gonzales",
    products: [
      {
        id: 104,
        name: "Audifonos",
        price: 34.5,
        quantify: 2,
      },
      {
        id: 105,
        name: "Audifonos",
        price: 42.99,
        quantify: 1,
      },
    ],
  },
  {
    id: 2,
    seller: "Maria Rodriguez Mallma",
    isPaymentMethodQR: false,
    recipient: "Maria Rodriguez Mallma",
    products: [
      {
        id: 106,
        name: "Audifonos",
        price: 34.5,
        quantify: 2,
      },
      {
        id: 107,
        name: "Audifonos",
        price: 42.99,
        quantify: 2,
      },
    ],
  },
  {
    id: 3,
    seller: "Carlos Sanchez Vazquez",
    isPaymentMethodQR: true,
    qrCode:
      "https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024-1.jpg",
    recipient: "Carlos Sanchez Vazquez",
    products: [
      {
        id: 101,
        name: "Audifonos",
        price: 34.5,
        quantify: 2,
      },
      {
        id: 102,
        name: "Audifonos",
        price: 42.99,
        quantify: 1,
      },
    ],
  },
];

type Product = {
  id: number;
  name: string;
  price: number;
  quantify: number;
};

type Order = {
  id: number;
  seller: string;
  isPaymentMethodQR: boolean;
  qrCode?: string;
  recipient: string;
  products: Product[];
};

// Monto total de productos por vendedor
function calcularTotalVendedor(data: Order) {
  return data.products.reduce(
    (total: number, product: Product) =>
      total + product.price * product.quantify,
    0
  );
}

// Monto total de todos los productos de todos los vendedores
const totalDeTodosLosProductos = (orders: Order[]) => {
  return orders.reduce(
    (total, order) => total + calcularTotalVendedor(order),
    0
  );
};

// Cantidad total de productos
const cantidadTotalProductos = (orders: Order[]) => {
  return orders.reduce(
    (total, order) =>
      total +
      order.products.reduce(
        (productTotal, product) => productTotal + product.quantify,
        0
      ),
    0
  );
};

export function PendingPurchasePay() {
  const [visibleOrders, setVisibleOrders] = useState<Order[]>(datos);
  //const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCancel = (orderId: number) => {
    setVisibleOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const totalMonto = totalDeTodosLosProductos(visibleOrders);
  const totalProductos = cantidadTotalProductos(visibleOrders);
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/consulta`);
        if (!response.ok) {
          throw new Error("Error en fetchData");
        }
        const data = await response.json();

        setVisibleOrders(data);
        setError(null);
      } catch (e) {
        console.error("Error al hacer la petición: ", e);
        setError("Problemas al cargar los datos");
      }
      fetchData();
    };
  }, []);*/

  return (
    <div className="my-4 mb-12">
      <div className="w-full flex justify-between">
        <h3 className="font-bold text-xl text-terciaryLight">
          Compras pendientes
        </h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/purchase-management">
                Gestión de compras
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Compras pendientes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <p className="text-sm my-4 text-terciaryLight">
        Lista de todos tus compras pendientes.
      </p>
      <div className="flex justify-between">
        <div className="space-y-4 w-[764px]">
          {visibleOrders.map((data) => (
            <Card key={data.id}>
              <CardHeader className="px-4 py-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="data-details" className="border-none">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="grid grid-cols-2 gap-9 text-sm">
                        <div className="text-left">
                          <p className="text-muted-foreground">Vendido por:</p>
                          <p className="font-semibold">{data.seller}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-muted-foreground">
                            Método de pago:
                          </p>
                          <p className="font-semibold">
                            {data.isPaymentMethodQR ? "QR de Yape" : "Efectivo"}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p className="font-semibold text-lg p-4">
                        Pago de la compra
                      </p>
                      {data.isPaymentMethodQR ? (
                        <div className="flex justify-center gap-9">
                          <div className="w-56 h-56">
                            <img src={data.qrCode} alt={data.seller} />
                          </div>
                          <div className="space-y-5">
                            <p className="text-lg font-bold">Escanea el QR</p>
                            <p className="text-[#555]">
                              Escanea el QR mediante la aplicación de Yape para
                              realizar el pago.
                            </p>
                            <div className="flex gap-2">
                              <p>Destinatario:</p>
                              <p className="font-bold">{data.seller}</p>
                            </div>
                            <div className="flex gap-2">
                              <p>Monto:</p>
                              <p className="font-semibold">
                                S/ {calcularTotalVendedor(data).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-[#555]">
                              Recuerda que el vendedor debe de confirmar el
                              pago.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="pl-4 space-y-2">
                          <p className="font-bold text-lg">
                            El pago se coordinará con el vendedor en persona
                          </p>
                          <p className="text-sm text-[#555]">
                            El pago y recogo de los productos aún están
                            pendientes.
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              Usa el chat para coordinar con el vendedor los
                              detalles del pago y el lugar de entre dentro de la
                              universidad.
                            </li>
                            <li>
                              Una vez que ambos se realicen, el vendedor
                              confirmará la transacción, y el sistema
                              actualizará tu historial de compras.
                            </li>
                          </ul>
                          <div className="flex gap-2">
                            <p>Destinatario:</p>
                            <p className="font-bold">{data.seller}</p>
                          </div>
                          <div className="flex gap-2">
                            <p>Monto:</p>
                            <p className="font-semibold">
                              S/ {calcularTotalVendedor(data).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-16 self-stretch justify-center items-center py-4 px-9">
                        <Button
                          variant="default"
                          className="w-full bg-secondaryLight hover:bg-secondaryLightHovered max-w-56"
                          onClick={() => {
                            toast({
                              title: "Uh oh! Something went wrong.",
                              description:
                                "There was a problem with your request.",
                            });
                          }}
                        >
                          Aceptar
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full hover:bg-accent hover:text-secondaryLight max-w-56"
                            >
                              Cancelar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Quieres eliminar los productos de este vendedor
                                del proceso de compra?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Está acción es irreversible, por lo que no
                                podrás retroceder y se eliminará los productos
                                de este vendedor.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className=" text-secondaryLight hover:text-secondaryLight hover:bg-accent">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleCancel(data.id)}
                                className="bg-secondaryLight hover:bg-secondaryLightHovered"
                              >
                                Aceptar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="h-fit sticky w-[340px] top-4 space-y-6">
          <Card className=" bg-secondaryLight/5">
            <CardContent className="p-6 space-y-6">
              <div>
                <CardTitle className="mb-4">Orden total</CardTitle>
                <Separator />
                <div className="space-y-2 my-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Productos</span>
                    <span className="text-muted-foreground">
                      {totalProductos}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>S/ {totalMonto.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="default"
                    className="w-full bg-secondaryLight hover:bg-secondaryLightHovered"
                  >
                    Continuar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estas seguro de confirmar la compra de tus productos?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irreversible, dado que no podrás cancelar
                      la compra de tus productos y pasarás al seguimiento de tus
                      productos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-1 text-secondaryLight hover:text-secondaryLight hover:bg-accent">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-secondaryLight hover:bg-secondaryLightHovered">
                      <Link to="/purchase-management/pending-purchase">
                        Aceptar
                      </Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
          <div className="text-sm text-muted-foreground px-2 space-y-2">
            <p>
              Una vez que hayas aceptado el medio de pago de cada vendedor.{" "}
              <br />
              Puedes presionar en el botón continuar para pasar al seguimiento
              de la compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
