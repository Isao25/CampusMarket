import { Star, Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const CardFavourite = () => {
  return (
    <Card className="w-52 p-3 overflow-hidden relative">
      <CardContent className="p-0">
        <div className="absolute top-4 right-4 z-10">
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img
            src="image-card.jpg"
            alt="Sony Headphones"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="py-3 px-2">
            <div className="flex items-center mb-3">
                <div className="flex items-center justify-center text-white bg-[#FBC116] rounded-3xl w-[68px] py-1 px-4">
                    <Star className="w-3 h-3 fill-white" />
                    <span className="text-xs font-sans ml-1">4.8</span>
                </div>
                {/* Luego este componente se puede reemplazar por un badge */}
                <div className="flex items-center justify-center text-[#4E53EE] bg-[#4E53EE]/20 rounded-3xl w-[68px] text-xs font-sans py-1 px-4 ml-2">Marca</div>
            </div>
            <h3 className="font-sans font-bold text-secondaryLight text-base mb-1">Audifonos Sony</h3>
            <p className="text-sm font-bold text-terciaryLight">S/ 34.00</p>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button variant="edit">Agregar</Button>
      </CardFooter>
    </Card>
  )
}
