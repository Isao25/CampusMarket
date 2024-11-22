import { Star, Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router"

export interface IProductCardProps {
    id: number,
    name: string,
    price: number,
    isFavourite?: boolean,
    img:string
    brand?:string,
    qualification?:number,
    
}

export const ProductCard = ({
        id,
        name,
        price,
        isFavourite: initialIsFavourite,
        qualification,
        img,
        brand
    }: IProductCardProps) => {

        const [isAdded, setAdd ] = useState(false)
        const [quantity, setQuantity] = useState(0)
        const [isFavourite, setIsFavourite] = useState(initialIsFavourite)
        const navigate = useNavigate()
        const goToProduct = () => navigate(`/product/${id}`)
  return (
    <Card className="w-52 p-3 overflow-hidden relative cursor-pointer transition transform hover:scale-101 hover:shadow-lg"
        
    >
      <CardContent className="p-0"
        onClick={goToProduct}>
      <div 
                    className="absolute top-4 right-4 z-10"
                    onClick={(e) => {
                        e.stopPropagation(); // Evita que el click en el corazón dispare goToProduct
                        setIsFavourite(!isFavourite);
                    }}
                >
                    <Heart 
                        className={`w-5 h-5 transition-colors duration-100 ${isFavourite ? 'fill-primary stroke-primary' : 'text-primary stroke-primary'} ${!isFavourite && 'hover:fill-red-500 hover:stroke-red-500'}`} 
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.classList.add('hover:fill-primary')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:fill-primary')}
                    />
                </div>
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img
            src={img}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="py-3 px-2">
            <div className="flex items-center mb-3">
                <div className="flex items-center justify-center text-white bg-[#FBC116] rounded-3xl max-w-[68px] py-1 px-4">
                    <Star className="w-3 h-3 fill-white" />
                    <span className="text-xs font-sans ml-1">{qualification}</span>
                </div>
                {brand ? 
                        <div className="flex items-center bg-[#4E53EE]/20 rounded-3xl max-w-[100px] ml-2 py-1 px-4">
                        <p className="text-[#4E53EE] text-xs font-sans overflow-hidden whitespace-nowrap text-clip">
                            {brand}
                        </p>
                    </div>
                    : null}
            </div>
            <h3 className="font-sans truncate font-bold text-secondaryLight text-base mb-1">{name}</h3>
            <p className="text-sm font-bold text-terciaryLight">S/ {price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0">
      {!isAdded || quantity === 0 ? 
                    <Button 
                        variant="edit" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setAdd(true);
                            setQuantity(quantity + 1);
                        }}
                    >
                        Agregar
                    </Button> :
                    <div className="flex w-full justify-between">
                        <Button 
                            variant="outline" 
                            className="font-bold"
                            onClick={(e) => {
                                e.stopPropagation();
                                quantity > 0 ? setQuantity(quantity - 1) : null;
                            }}
                        >
                            -
                        </Button>
                        <p className="pt-1 font-bold">{quantity}</p>
                        <Button 
                            variant="outline" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setQuantity(quantity + 1);
                            }}
                            className="font-bold"
                        >
                            +
                        </Button>
                    </div>
                }            
      </CardFooter>
    </Card>
  )
}
