import {TrademarkContext} from "@/context/TrademarkContext";
import { useContext } from "react";

export const useTrademark = ()=> {
  const context = useContext(TrademarkContext);
  if (!context) {
      throw new Error("useTrademark must be used within an TrademarkProvider");
  }
  return context;
};