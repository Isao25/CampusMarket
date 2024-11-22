import { createContext, useEffect, useState, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";  
import axios from "axios";
import {AuthState, Tokens, DecodedToken} from "@/types/types";



interface AuthContextType {
    verificado: boolean;
    setVerificado: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    

    const [verificado, setVerificado] = useState(false)

    return (
        <AuthContext.Provider value={{ verificado, setVerificado }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

