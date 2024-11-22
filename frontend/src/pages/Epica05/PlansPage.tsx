import { Helmet } from "react-helmet-async";
import { PlanCard } from "@/components/Epica5/PlanCard";
import { Plan } from "@/types";
import { GratisModal } from "../../components/Epica5/GratisModal";
import { useLoaderData } from "react-router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getPlanes } from "@/api/apiMarcas";

const beneficios_basicos = [
  "Publica tus productos para llegar a más clientes potenciales.",
  "Compra productos de la comunidad universitaria.",
  "Guarda tus productos favoritos para acceder a ellos más tarde.",
  "Agrega productos a tu carrito y compra rápidamente.",
];
const beneficios_marcas = (espacios_extra: number) => {
  const nuevos_beneficios = [...beneficios_basicos];
  nuevos_beneficios.push("Destaca tus productos con publicidad en la página principal.");
  if(espacios_extra>0){
    nuevos_beneficios.push(
      `Amplía tu catálogo con ${espacios_extra}  espacios adicionales para mostrar más productos.`
    );
  }
  return nuevos_beneficios;
};
const planGratuito: Plan = {
  id: 0,
  nombre:"plan gratuito",
  descripcion: "Acceso a funcionalidades básicas.",
  espacio_extra: 0,
  precio: 0,
  duracion: 0,
  beneficios: beneficios_basicos,
};


interface LoaderData {
  planesData: Plan[] | null;
}

export async function loader(): Promise<LoaderData> {
  try {
    const planesResponse = await getPlanes();
    const planes = planesResponse.data.results as Plan[];

    planes.forEach((plan: Plan) => {
      plan.beneficios = beneficios_marcas(plan.espacio_extra);
    });
    planes.unshift(planGratuito);
  
    return { planesData: planes }; 
  } catch (error) {
    console.error("Fetching error", error);

    return { planesData: null }; 
  }
}

export const PlansPage = () => {
  const {planesData}=useLoaderData() as LoaderData;
  return (
    <>
      <Helmet>
        <title>Planes</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-12">
        <h1 className="font-semibold text-4xl mb-5">Planes</h1>
        <p>
          Suscribete a uno de nuestros planes que te brinda acceso a
          funcionaliadaes exlusivas que tranformarán la manera de vender.
        </p>
        <div className=" flex flex-col text-center pt-12">
          <h2 className="font-black text-2xl">
            <span>Aquí tienes todos</span>
            <br />
            <span className="text-secondaryLight">nuestros planes</span>
          </h2>
          <Carousel className="w-full mt-12">
            <CarouselContent>
            {planesData?.map((plan,index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-4 flex justify-center h-full">
                    
                      <PlanCard key={plan.id} planCard={plan}/>
                    
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <GratisModal />
    </>
  );
};
