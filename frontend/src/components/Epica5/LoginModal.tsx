import { ModalMessage } from "@/components/Epica1/ModalMessage";
import { useAuth } from "@/hooks/useAuth";
import { UserX } from "lucide-react";
import { useNavigate } from "react-router";

export const LoginModal = () => {
  const { loginModal,setLoginModal} = useAuth();
  const navigate=useNavigate();

  return (
    <ModalMessage
      icon={UserX}
      title="Acceso requerido"
      buttonName="Iniciar sesión"
      buttonFunc={()=>navigate("/login")}
      isOpen={loginModal}
      setIsOpen={setLoginModal}
    >
      <div className="p-5">
        <p>Para poder acceder a este módulo, es imprescindible que inicie sesión en su cuenta. Por favor, autentíquese para continuar.</p>
      </div>
    </ModalMessage>
  );
};
