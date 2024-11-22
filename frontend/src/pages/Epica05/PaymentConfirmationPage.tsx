import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { Copy } from 'lucide-react';
import { toast } from "sonner";

export const PaymentConfirmation = () => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("ezcommerce@gmail.com");
      toast.success("Copiado a portapapeles");
    } catch (error) {
      toast.error("Error al copiar a portapales");
    }
  };

  return (
    <>
      <Helmet>
        <title>Confirmar pago</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-20 gap-12">
          <h1 className="font-semibold text-4xl">Confirmar pago</h1>

            <h2 className=" font-bold text-xl">Envía el comprobante de pago</h2>
            <p>
              Por favor, envíanos el comprobante de pago para proceder a la
              actualización de tu plan.
            </p>
            <div className="flex gap-2"> 
              <Input disabled defaultValue={"ezcommerce@gmail.com"}/>
              <Button onClick={handleCopy}>
               <Copy/> 
              </Button>
            </div>
            <div className="text-secondaryLight font-semibold">
              <p>Tu nuevo plan de Marca se habilitará en aproximadamente 24 horas.</p>
              <p>Te notificaremos por correo una vez que esté activo.</p>
            </div>
            <p>
              Si tienes alguna pregunta, no dudes en contactarnos mediante
              nuestro canal de soporte.
            </p>

      </div>
    </>
  );
};
