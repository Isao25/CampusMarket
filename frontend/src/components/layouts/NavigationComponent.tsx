import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MapPin } from "lucide-react";

import { SheetComponent } from "./SheetComponent";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const navigationItems = [
  { item: 'Venta', link: '/products-management' },
  { item: 'Vendedores estudiantiles', link: '/sellers' },
  { item: 'Chat', link: '/chat' },
];

export const NavigationComponent = () => {
  const navigate=useNavigate();

  const handleNavigationClick = (link:string) => {
      navigate(link);
    
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="space-x-8 flex flex-wrap">
          <NavigationMenuItem>
            <SheetComponent />
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