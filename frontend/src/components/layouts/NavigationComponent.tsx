import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MapPin } from "lucide-react";

import { SheetComponent } from "./SheetComponent";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const navigationItems = [
  { item: 'Venta', link: '/products-management' },
  { item: 'Vendedores estudiantiles', link: '/sellers' },
  { item: 'Chat', link: '#' },
];

export const NavigationComponent = () => {
  const { authState, setLoginModal } = useAuth();
  const navigate=useNavigate();

  const handleNavigationClick = (link:string) => {
    if (!authState.userId) {
      setLoginModal(true);
    } else {
      navigate(link);
    }
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="space-x-8 flex flex-wrap">
          <NavigationMenuItem>
            <SheetComponent />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">
              <Button variant="link">
                <MapPin size={20} className="mr-2" />
                Ingresa tu ubicación
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Button
                variant="link"
                onClick={() => handleNavigationClick(item.link)}
              >
                {item.item}
              </Button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};