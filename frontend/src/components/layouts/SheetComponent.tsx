import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

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
            <SheetContent side="left" className="w-[300px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Categorías</SheetTitle>
                    <SheetDescription>
                        Selecciona una categoría para navegar por los productos.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Principales</h3>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                        >
                            Tecnología
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                        >
                            Calzado
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                        >
                            Electrohogar
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                        >
                            Accesorios de moda
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                        >
                            Electrónica
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Mundo Gamer</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Teclados
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Ratones
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Accesorios
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Audio</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Audífonos
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Parlantes
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Accesorios
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}