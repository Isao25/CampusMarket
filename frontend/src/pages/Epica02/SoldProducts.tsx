import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { productSalesTypes } from "./components/CardSales/CardSales.types";
import { CardSales } from "./components/CardSales/CardSales";

export function SoldProducts() {
  return (
    <div className="flex flex-col w-full gap-6 self-stretch my-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-terciaryLight">
          Productos vendidos
        </h3>
        <Link
          to="/purchasing-management"
          className="bg-[rgba(183,183,183,0.30)] p-2 rounded-full"
        >
          <ArrowUpRight className="text-2xl text-terciaryLight" />
        </Link>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {productSales.map(
            ({ id, img, product, price }: productSalesTypes) => (
              <CarouselItem
                key={id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CardSales
                  id={id}
                  img={img}
                  product={product}
                  price={price}
                ></CardSales>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
const productSales: productSalesTypes[] = [
  {
    id: 1,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/17659332_1/w=800,h=800,fit=pad",
    product: "Audifonos Sony",
    price: 34.0,
  },
  {
    id: 2,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20646414_01/w=100,h=100,fit=pad",
    product: "Audifonos Sony",
    price: 24.9,
  },
  {
    id: 3,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/127447787_01/w=136,h=136,fit=pad",
    product: "Chocotejas Carlos",
    price: 2.5,
  },
  {
    id: 4,
    img: "https://www.falabella.com.pe/cdn-cgi/imagedelivery/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/17659331_1/width=240,height=240,quality=70,format=webp,fit=pad",
    product: "Audifonos In-Ear",
    price: 28.2,
  },
  {
    id: 5,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20093894_1/w=800,h=800,fit=pad",
    product: "Audifonos Sony",
    price: 14.8,
  },
  {
    id: 6,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/127766350_01/w=800,h=800,fit=pad",
    product: "Audifonos JB",
    price: 90.99,
  },
  {
    id: 7,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20175447_1/w=800,h=800,fit=pad",
    product: "Polera",
    price: 64.6,
  },
];
