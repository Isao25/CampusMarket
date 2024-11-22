import { createContext, ReactNode, useState, useEffect } from "react";
import { Marca, Plan, Membresia } from "@/types";
import {
  getMembresiaByMarca,
  getPlan,
  getMarcaByUsuario,
} from "@/api/apiMarcas";
import { useAuth } from "@/hooks/useAuth";

interface TrademarkContextType {
  marca: Marca | null;
  setMarca: React.Dispatch<React.SetStateAction<Marca | null>>;
  membresia: Membresia | null;
  plan: Plan | null;
  gratisModal: boolean;
  setGratisModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrademarkContext = createContext<TrademarkContextType | null>(
  null
);

export const TrademarkProvider = ({ children }: { children: ReactNode }) => {
  const [marca, setMarca] = useState<Marca | null>(null);
  const [membresia, setMembresia] = useState<Membresia | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);

  const [gratisModal, setGratisModal] = useState<boolean>(false);


  return (
    <TrademarkContext.Provider
      value={{
        marca,
        setMarca,
        membresia,
        plan,
        gratisModal,
        setGratisModal,
      }}
    >
      {children}
    </TrademarkContext.Provider>
  );
};
