import { Helmet } from "react-helmet-async";
import { FormEditComp } from "./FormEditComp";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PurchasedProducts } from "./PurchasedProducts";
import { Button } from "@/components/ui/button";
import { SoldProducts } from "./SoldProducts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router";
import { GratisModal } from "../../components/Epica5/GratisModal";
import { PlanSection } from "./PlanSection";

export function ProfileBuyerPage() {
  const navigate = useNavigate();
  const deleteAccount = async () => {
    console.log("Cuenta eliminada");
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>Mi información</title>
      </Helmet>

      <div className="flex flex-col justify-center items-start gap-7 self-stretch my-6">
        <div className="self-stretch">
          <h3 className="text-2xl font-semibold text-terciaryLight">
            Mi Información
          </h3>
          <p className="mt-4 text-[#555] text-[16px]">
            Aquí puedes observar tus datos y productos
          </p>
        </div>
        <FormEditComp></FormEditComp>
        <div className="w-full">
          <h3 className="text-2xl font-semibold text-terciaryLight">
            Notificaciones
          </h3>
          <Label className="my-6 flex py-1 px-4 justify-between items-center text-lg font-medium">
            Permitir notificaciones
            <Switch className="data-[state=checked]:bg-secondaryLight" />
          </Label>
        </div>
        <PurchasedProducts></PurchasedProducts>
        <SoldProducts></SoldProducts>
        <PlanSection/>
        <div className="mb-24 w-full">
          <h3 className="text-2xl font-semibold mb-6 text-terciaryLight">
            Eliminar cuenta
          </h3>
          <div className="flex justify-between flex-col gap-4 md:flex-row">
            <Label className="flex py-1 px-4 justify-between text-lg font-medium lg:items-center sm:items-start">
              Una vez que elimines tu cuenta, no podrás volver atrás. Asegúrate
              de hacerlo.
            </Label>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="mx-4 border-[#E33B2E] text-[#E33B2E] max-w-56 hover:bg-[#E33B2E] hover:text-white"
                >
                  Eliminar cuenta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estas seguro de eliminar tu cuenta?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Está acción no se puede deshacer. Eliminarás tu cuenta y tus
                    datos de nuestros servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-secondaryLight text-secondaryLight hover:text-secondaryLight">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-secondaryLight hover:bg-[rgba(0,54,105,0.9)]"
                    onClick={deleteAccount}
                  >
                    Aceptar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <GratisModal/>
    </>
  );
}
