import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { ChevronDown, MapPin } from "lucide-react";

const faculties = ["FISI", "FCE", "FII","FCB","FCF","ALL"];

export const MenuFaculties = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center text-base">
          <MapPin className="mr-2" size={16} />
          All
          <ChevronDown className="ml-2" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {faculties.map((faculty) => (
          <DropdownMenuItem key={faculty}>{faculty}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
