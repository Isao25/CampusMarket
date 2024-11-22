import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders } from "./PendingPurchased.data";

export function PendingPurchaseList() {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="order-details" className="border-none">
                <AccordionTrigger className="p-0 hover:no-underline">
                  <div className="flex justify-between items-center w-full">
                    <div className="grid grid-cols-4 gap-8 text-sm">
                      <div>
                        <p className="text-left text-muted-foreground">
                          Vendido por:
                        </p>
                        <p className="text-left font-semibold text-terciaryLight">
                          {order.seller}
                        </p>
                      </div>
                      <div>
                        <p className="text-left text-muted-foreground">
                          Método de pago:
                        </p>
                        <p className="text-left font-semibold text-terciaryLight">
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className="text-left text-muted-foreground">
                          Fecha:
                        </p>
                        <p className="text-left font-semibold text-terciaryLight">
                          {order.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-left text-muted-foreground">
                          Estado:
                        </p>
                        <p className="text-left font-semibold text-terciaryLight">
                          {order.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <div
                      className="flex justify-between items-center mb-2
                    "
                    >
                      <h3 className="font-semibold">Productos</h3>
                      <ChevronUp className="h-4  w-4"></ChevronUp>
                    </div>
                    <div className="space-y-4">
                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start space-x-4 border rounded-lg p-4"
                        >
                          <Link
                            to={`/product/${product.id}`}
                            className="flex justify-center items-center self-stretch rounded-[8px] w-[156px] py-2 px-4 bg-[rgba(234,228,221,0.50)]"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="rounded-md mix-blend-multiply select-none"
                            />
                          </Link>

                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col gap-2 items-start justify-between">
                              <Badge className="py-1 px-3 rounded-full bg-[#FBC116] text-xs hover:bg-[#FBC116] select-none">
                                {" "}
                                <Star className="mr-2 w-3 h-3"></Star>{" "}
                                {product.rate}
                              </Badge>
                              <div className="flex flex-col gap-2">
                                <h4 className="font-bold text-xl text-secondaryLight">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-[#555] font-semibold">
                                  Precio: S/ {product.unitPrice.toFixed(2)}
                                </p>
                                <p className="text-sm font-medium text-[#AEB1B5]">
                                  {product.description}
                                </p>
                              </div>
                              <div className="flex w-full justify-between mt-3">
                                <p className="font-bold text-terciaryLight text-[16px]">
                                  S/{" "}
                                  {(
                                    product.unitPrice * product.quantity
                                  ).toFixed(2)}
                                </p>
                                <p className="text-[16px] text-secondaryLight font-bold">
                                  x{product.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
