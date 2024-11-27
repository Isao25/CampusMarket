import { createBrowserRouter } from "react-router-dom";

// Epicas
import { LoginPage, RegisterPage } from "../pages/Epica01";
import { ProfileBuyerPage } from "../pages/Epica02";
import { MainPage, SearchPage, SearchSellers } from "../pages/Epica03";
import {
  PlansPage,
  PayPlanPage,
  PaymentConfirmation,
  RegisterTrademark,
  loader as plansLoader,
} from "../pages/Epica05";
import {
  ProductsManagementPage,
  MyPublishedProductsPage,
  PublishProductPage,
  EditProductPage,
  ShoppingCartPage,
  FavouritesPage,
} from "../pages/Epica04";
import { Layout } from "../components/layouts/Layout";
import {
  PendingPurchasesPage,
  PurchaseHistoryPage,
  PurchaseManagementPage,
} from "@/pages/Epica06";
import { Chat } from "@/pages/Epica06/Chat";
import { ContactPage } from "../pages/Epica08/ContactPage";
import { PendingPurchasePay } from "@/pages/Epica06/PendingPurchasePay";
import { ProductDetailsPage } from "@/pages/Epica06/ProductDetailsPage";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    // loader:
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <Layout />,
    // loader:
    children: [
      {
        path: "/",
        element: <MainPage />,
        // loader:
      },
      {
        path: "/search",
        element: <SearchPage />,
        // loader:
      },
      {
        path: "/sellers",
        element: <SearchSellers />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/profile-buyer",
        element: (
          <ProfileBuyerPage />
        ),
        // loader:
      },
      {
        // path: "/product/productId",
        path: "/product/:productId",
        element: <ProductDetailsPage />,
        // loader:
      },
      {
        path: "/products-management",
        element: (
          <ProductsManagementPage />
        ),
        // loader:
      },
      {
        path: "/my-published-products",
        element: (
          <MyPublishedProductsPage />
        ),
        // loader:
      },
      {
        path: "/publish-product",
        element: (
          <PublishProductPage />
        ),
        // loader:
      },
      {
        // path: "/:userId/edit-product/productId",
        path: "/edit-product/:productId",
        element: (
          <EditProductPage />
        ),
      },
      {
        path: "/favourites",
        element: (
          <FavouritesPage />
        ),
        // loader:
      },
      {
        path: "/shopping-cart",
        element: (
          <ShoppingCartPage />
        ),
        // loader:
      },
      {
        path: "/plans",
        element: (
          <PlansPage />
        ),
        loader: plansLoader,
      },
      {
        path: "/pay-plan",
        element: (
          <PayPlanPage />
        ),
      },
      {
        path: "/register-trademark",
        element: (
          <RegisterTrademark />
        ),
      },
      {
        path: "/payment-confirmation",
        element: (
          <PaymentConfirmation />
        ),
      },
      {
        path: "/purchase-management",
        element: <PurchaseManagementPage />,
        children: [
          {
            path: "purchase-history",
            element: <PurchaseHistoryPage />,
          },
          {
            path: "pending-purchase",
            element: <PendingPurchasesPage />,
          },
        ],
      },
      {
        path: "/chat",
        element: <Chat></Chat>,
      },
      {
        path: "/purchases-pay",
        element: <PendingPurchasePay></PendingPurchasePay>,
      },
    ],
  },
]);

export default routes;
