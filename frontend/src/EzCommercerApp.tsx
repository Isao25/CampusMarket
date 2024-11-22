import routes from "./router/AppRouter"
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {AuthProvider} from "./context/AuthContext";
import { TrademarkProvider } from "./context/TrademarkContext";
import { EtiquetasProvider } from "./context/EtiquetasContext";




export const EzCommercerApp = () => {
  return (
    <HelmetProvider>
      <EtiquetasProvider>
        <AuthProvider>
          <TrademarkProvider>
            <RouterProvider router={routes} />
          </TrademarkProvider> 
        </AuthProvider>
      </EtiquetasProvider>
    </HelmetProvider>
  )
}
