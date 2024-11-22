import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import qr from "@/assets/qr_yape_devsla.png";
import { useNavigate } from "react-router";
import { Plan } from "@/types";

export const PayPlanPage = () => {
  const navigate = useNavigate();
  const planSeleccionado:Plan  | null = JSON.parse(localStorage.getItem("planSeleccionado") || "null");

  return (
    <>
      <Helmet>
        <title>Pagar plan</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-12">
        <h1 className="font-semibold text-4xl">Pagar plan</h1>
        <p className="pt-5">
          Realice el pago utilizando el aplicativo de Yape, escaneando el código
          QR que se muestra a continuación.
        </p>
        <div className="flex flex-col md:flex-row pt-12 gap-24">
          <div className="flex">
            <img className="flex-1 justify-center" src={qr} width={500} />
          </div>
          <div className="self-center">
            <p className="font-bold text-3xl text-secondaryLight ">S/{planSeleccionado?.precio}.00</p>
            <p className="font-bold text-lg pt-4">Escanea el QR</p>
            <p className="pt-4">
              Escanea el QR mediante la aplicación de Yape para realizar el
              pago.
            </p>
            <p className="pt-4">Destinatario:</p>
            <p className="font-bold">Devsla</p>
            <p className="pt-4">Recuerda guardar el comprobante de pago.</p>
          </div>
        </div>
        <p className="pt-12">
          Una vez que haya completado el proceso de pago, por favor proceda a
          presionar el botón “Siguiente” para continuar con la operación.
        </p>
        <Button
          className="mt-12 w-1/3 self-end bg-secondaryLight hover:bg-secondaryLightHovered rounded-xl"
          onClick={() => navigate("/payment-confirmation")}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};
