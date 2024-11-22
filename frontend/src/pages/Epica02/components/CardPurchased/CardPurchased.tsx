import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { productsPurchasedTypes } from "./CardPurchased.types";

export function CardPurchased({
  img: imageUrl,
  product,
  price,
  isMarca,
}: productsPurchasedTypes) {
  return (
    <Card className="min-w-60 min-h-[336px] flex flex-col gap-2 p-2">
      <CardHeader className="relative flex justify-center items-center self-stretch rounded-[8px] h-52 py-2 px-4 bg-[rgba(234,228,221,0.50)]">
        <img
          src={imageUrl}
          alt="Imagen"
          className="w-44 h-44 mix-blend-multiply select-none"
        />
        <Heart className="absolute top-1 right-1 w-6 h-6 cursor-pointer text-secondaryLight"></Heart>
      </CardHeader>
      <CardContent className="py-3 px-2">
        <div className="flex gap-2">
          <Badge
            variant="default"
            className="py-1 px-4 rounded-3xl text-[14px] bg-[#FBC116] hover:bg-[#FBC116] select-none"
          >
            {" "}
            <Star className="w-4 h-4 mr-1"></Star> 4.8
          </Badge>
          {isMarca ? (
            <Badge
              variant="outline"
              className="py-1 px-4 rounded-3xl text-[14px] bg-[rgba(78,83,238,0.20)] text-[#4E53EE] select-none"
            >
              Marca
            </Badge>
          ) : (
            ""
          )}
        </div>
        <p className="text-xl font-bold text-secondaryLight mt-3">{product}</p>
        <p className="text-lg font-medium text-terciaryLight mt-3">{`S/ ${price.toFixed(
          2
        )}`}</p>
      </CardContent>
      <CardFooter className="self-stretch p-2">
        <Button
          className="w-full rounded-[16px] border-2 border-secondaryLight text-secondaryLight font-semibold text-[16px] hover:bg-secondaryLight hover:text-primaryLight"
          variant="outline"
        >
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}
