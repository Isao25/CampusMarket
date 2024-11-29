import routes from "./router/AppRouter"
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {AuthProvider} from "./context/AuthContext";
import { TrademarkProvider } from "./context/TrademarkContext";




export const CampusMarketApp = () => {
  return (
    <HelmetProvider>
        <AuthProvider>
          <TrademarkProvider>
            <RouterProvider router={routes} />
          </TrademarkProvider> 
        </AuthProvider> 
    </HelmetProvider>
  )
}
