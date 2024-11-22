import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CardPurchased } from "./components/CardPurchased/CardPurchased";
import { productsPurchasedTypes } from "./components/CardPurchased/CardPurchased.types";

export function PurchasedProducts() {
  return (
    <div className="flex flex-col w-full gap-6 self-stretch my-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-terciaryLight">
          Productos comprados
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
          {productsPurchased.map(({ id, img, product, price, isMarca }) => (
            <CarouselItem
              key={id}
              className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CardPurchased
                id={id}
                img={img}
                product={product}
                price={price}
                isMarca={isMarca}
              ></CardPurchased>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

const productsPurchased: productsPurchasedTypes[] = [
  {
    id: 1,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/17659332_1/w=800,h=800,fit=pad",
    product: "Audifonos Sony",
    price: 34.0,
    isMarca: false,
  },
  {
    id: 2,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20646414_01/w=100,h=100,fit=pad",
    product: "Audifonos Sony",
    price: 24.9,
    isMarca: false,
  },
  {
    id: 3,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/127447787_01/w=136,h=136,fit=pad",
    product: "Chocotejas Carlos",
    price: 2.5,
    isMarca: true,
  },
  {
    id: 4,
    img: "https://www.falabella.com.pe/cdn-cgi/imagedelivery/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/17659331_1/width=240,height=240,quality=70,format=webp,fit=pad",
    product: "Audifonos In-Ear",
    price: 28.2,
    isMarca: false,
  },
  {
    id: 5,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20093894_1/w=800,h=800,fit=pad",
    product: "Audifonos Sony",
    price: 14.8,
    isMarca: false,
  },
  {
    id: 6,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/127766350_01/w=800,h=800,fit=pad",
    product: "Audifonos JB",
    price: 90.99,
    isMarca: true,
  },
  {
    id: 7,
    img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/20175447_1/w=800,h=800,fit=pad",
    product: "Polera",
    price: 64.6,
    isMarca: false,
  },
];
