import { ReactNode} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LucideProps } from "lucide-react";

interface ModalMessageProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  buttonName?:string;
  buttonFunc?:()=>void;
  children:ReactNode
}

export const ModalMessage = ({
  isOpen,
  setIsOpen,
  icon: Icon,
  title,
  buttonName="Aceptar",
  buttonFunc,
  children,
}: ModalMessageProps) => {

  const handleButtonClick = buttonFunc ? buttonFunc : () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] ">
        <DialogHeader>
          <div className="flex gap-4 items-center">
            {Icon && <Icon height={23} width={23} strokeWidth={4} className="text-secondaryLight" />}
            <DialogTitle className="font-black self-end text-2xl">{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="text-terciaryLight text-base">
          {children}
        </div>
        <DialogFooter className="flex">
          <Button
            className="bg-secondaryLight hover:bg-secondaryLightHovered px-20 mt-3"
            onClick={handleButtonClick}
          >
            {buttonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};