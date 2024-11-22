import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { categoriasMocks, Categoria } from "../../mocks/Categorias-mocks";

export const SheetComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                    {categoriasMocks.map((categoria: Categoria) => (
                        <Button
                            key={categoria.id}
                            variant="ghost"
                            className="w-full justify-start text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            {categoria.nombre}
                        </Button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
