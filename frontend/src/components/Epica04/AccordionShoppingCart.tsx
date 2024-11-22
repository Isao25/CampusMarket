import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { CardShoppingCart } from "./CardShoppingCart";
  import { Product } from "./Types";  // Asegúrate de tener la interfaz en un archivo de tipos.
  
  // Simulación de productos con sus respectivos vendedores
  const products: Product[] = [
    { id: 1, name: "Chaleco", price: 24, total: 28, seller: "Alonso Mallma Gutierrez", rating: 4.8, quantity: 2 },
    { id: 2, name: "Chaleco", price: 24, total: 28, seller: "Alonso Mallma Gutierrez", rating: 4.8, quantity: 2 },
    { id: 3, name: "Chaleco", price: 24, total: 28, seller: "Alwin Davila Raffo", rating: 4.8, quantity: 2 },
    { id: 4, name: "Chaleco", price: 24, total: 28, seller: "Alwin Davila Raffo", rating: 4.8, quantity: 2 },
    { id: 5, name: "Chaleco", price: 24, total: 28, seller: "Alwin Davila Raffo", rating: 4.8, quantity: 2 },
    { id: 6, name: "Chaleco", price: 24, total: 28, seller: "Shamir Mantilla Flores", rating: 4.8, quantity: 2 },
  ];
  
  // Agrupamos los productos por vendedor
  const groupBySeller = (products: Product[]): Record<string, Product[]> => {
    return products.reduce((acc, product) => {
      const seller = product.seller;
      if (!acc[seller]) acc[seller] = [];
      acc[seller].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };
  
  export const AccordionShoppingCart = () => {
    const groupedProducts = groupBySeller(products);
  
    return (
      <Accordion type="single" collapsible className="max-w-2xl">
        {Object.entries(groupedProducts).map(([seller, sellerProducts], index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="font-sans">
              <span className="text-[#555555]">Vendido por:</span>
              <span className="font-semibold">{seller}</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              {sellerProducts.map((product) => (
                <CardShoppingCart key={product.id} product={product} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };
  