import { useTrademark } from "@/hooks/useTrademark";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Plan } from "@/types";
import { toast } from "sonner";

interface PlanCardProps{
  planCard:Plan,
}

export const PlanCard = ({planCard}:PlanCardProps) => {
  const navigate = useNavigate();
  const { marca, plan, setGratisModal} = useTrademark();

  function handleSeleccionarPlan() {
    if (planCard.nombre != "plan gratuito" && marca) {
      localStorage.setItem("planSeleccionado", JSON.stringify(planCard));
      navigate("/pay-plan");
      toast.info("Usted cuenta con una marca previamente registrada");
    } else if (planCard.nombre != "plan gratuito" && !marca) {
      localStorage.setItem("planSeleccionado", JSON.stringify(planCard));
      navigate("/register-trademark");
    } else {
      setGratisModal(true);
    }
  }

  return (
    <div className="border-secondaryLight border-2 bg-secondaryLightMoreOpacity rounded-2xl text-sm  p-10 flex flex-col justify-start w-3/4 gap-36">
      <div className="flex flex-col">
        <h3 className="font-bold text-xl capitalize">{planCard.nombre}</h3>
        <p className="pt-5">
          <span className="text-secondaryLight text-2xl font-black ">
            S/{planCard.precio}.00
          </span>
          {planCard.duracion>0 ? (
            <span className="text-xs ml-1">
              por {planCard.duracion}
              {planCard.duracion == 1 ? " mes" : " meses"}
            </span>
          ) : (
            ""
          )}
        </p>
        <p className="pt-5 md:px-5">{planCard.descripcion}</p>
        <div className="text-start pt-5 pb-5">
          <p className="font-semibold text-base">Beneficios:</p>
          <ul>
            {planCard.beneficios?.map((beneficio, index) => (
              <li key={index} className="pt-3 flex items-center gap-2">
                <CircleCheck size={13} className="min-w-3" color="green" />
                <div>{beneficio}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        className="bg-secondaryLight hover:bg-secondaryLightHovered text-sm rounded-xl mt-auto"
        disabled={!plan && planCard.nombre === "plan gratuito"}
        onClick={handleSeleccionarPlan}
      >
        Seleccionar plan
      </Button>
    </div>
  );
};
