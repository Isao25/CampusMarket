import { ModalMessage } from "@/components/Epica1/ModalMessage";
import { useTrademark } from "@/hooks/useTrademark";
import { Ban } from "lucide-react";

export const GratisModal = () => {
  const { membresia, gratisModal, setGratisModal } = useTrademark();

  return (
    <ModalMessage
      icon={Ban}
      title="Cancelar suscripción"
      isOpen={gratisModal}
      setIsOpen={setGratisModal}
    >
      <div className="p-5">
        <div className="text-center">
          <p className="text-center font-bold">
            ¿Estás seguro de que deseas cancelar tu sucripcion?
          </p>
          <p>
            Esta acción es irreversible y perderás todos los beneficios de tu
            plan una vez dada la fecha de vencimiento.
          </p>
        </div>

        <div className="pt-5 px-12 flex flex-col gap-6">
          <div className="flex justify-between">
            <p>Tu plan actual</p>
            <p>Marcas</p>
          </div>
          <div className="flex justify-between">
            <p>Fecha de activación</p>
            <p>{membresia?.fecha_final}</p>
          </div>
        </div>
      </div>
    </ModalMessage>
  );
};
