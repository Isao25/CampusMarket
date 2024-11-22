import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { productSalesTypes } from "./CardSales.types";
import { Link } from "react-router-dom";

export function CardSales({ product, img: image, price }: productSalesTypes) {
  return (
    <Card className="min-w-60 min-h-[336px] flex flex-col gap-2 p-2">
      <CardHeader className="relative flex  justify-center items-center self-stretch rounded-[8px] h-52 py-2 px-4 bg-[rgba(234,228,221,0.50)]">
        <img
          src={image}
          alt="Imagen"
          className="w-44 h-44 mix-blend-multiply select-none"
        />
        <Heart className="absolute top-1 right-2 w-6 h-6 cursor-pointer text-secondaryLight"></Heart>
      </CardHeader>
      <CardContent className="py-3 px-2">
        <div className="flex gap-2">
          <Badge
            variant="default"
            className="py-1 px-4 rounded-3xl text-[14px] bg-[#FBC116] hover:bg-[#FBC116] select-none "
          >
            {" "}
            <Star className="w-4 h-4 mr-1"></Star> 4.8
          </Badge>
        </div>
        <p className="text-xl font-bold text-secondaryLight mt-3">{product}</p>
        <p className="text-lg font-medium text-terciaryLight mt-3">{`S/ ${price.toFixed(
          2
        )}`}</p>
      </CardContent>
      <CardFooter className="self-stretch p-2 flex flex-col gap-3">
        <Link
          to="/edit-product/"
          className="inline-flex items-center justify-center w-full rounded-[16px] border-2 border-secondaryLight text-secondaryLight font-semibold text-[16px] hover:bg-secondaryLight hover:text-primaryLight text-center py-1 px-4"
        >
          Editar
        </Link>
        <Button
          className="w-full rounded-[16px] border-2 border-[#555] text-[#555] font-semibold text-[16px] hover:text-[#555]/90 hover:bg-[#555]/10"
          variant="outline"
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
