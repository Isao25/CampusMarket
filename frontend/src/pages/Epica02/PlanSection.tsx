import { Button } from "@/components/ui/button";
import { useTrademark } from "@/hooks/useTrademark";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router";

export const PlanSection = () => {
  const {plan, setGratisModal}=useTrademark();
  const navigate=useNavigate();

  return (
    <section className="w-full pb-7">
      <h3 className="text-2xl font-semibold text-terciaryLight">Plan actual</h3>
      <div className="flex justify-between pt-7 flex-col md:flex-row">
        <div className="flex flex-col">
          <div className="flex gap-48">
            <div>
              <span className="font-semibold">Plan</span>
              <br />
              <span className="font-black text-xl capitalize">{plan.tipo}</span>
            </div>
            <div>
              <span className="font-semibold">Pago</span>
              <br />
              <span className="font-black text-xl">S/{plan.precio}.00 <span className="text-sm font-medium">por {plan.duracion}</span></span>
            </div>
          </div>
          <div className="pt-7">
            <p className="font-semibold">Beneficios</p>
            <ul>
              {plan.beneficios.map((beneficio)=>(<li className="flex gap-2 items-center">
                <CircleCheck size={13} color="green" />
                <div>{beneficio}</div>
              </li>))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-5 md:mt-0">
          <Button disabled={plan.tipo=="gratuito"} onClick={()=>setGratisModal(true)}className="bg-secondaryLight hover:bg-secondaryLightHovered">Cancelar suscripción</Button>
          <Button onClick={()=>navigate("/plans")}className="bg-secondaryLight hover:bg-secondaryLightHovered">Actualizar plan</Button>
        </div>
      </div>
    </section>
  );
};
