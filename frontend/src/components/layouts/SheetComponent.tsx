import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

import { categories } from "../../mocks/mainPage-mocks";
import { useNavigate } from "react-router";

export const SheetComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const goToCategory = (id: number) => {
        setIsOpen(false)
        navigate(`/search?etiquetas=${id}`)
    }
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="link" className="justify-between w-60 border-r-2">
                    Categorías
                    <Menu size={20}/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                    <SheetTitle>Categorías</SheetTitle>
                    <SheetDescription>
                        Selecciona una categoría para navegar por los productos.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid grid-cols-1 gap-2 mt-4">
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant="ghost"
                            className="w-full justify-start text-xl"
                            onClick={() => goToCategory(cat.id)}
                        >
                            {cat.title}
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
