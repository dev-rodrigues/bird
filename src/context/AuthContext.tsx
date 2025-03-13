import {createContext, useCallback, useContext, useState} from "react";
import {auth, checkToken} from "@/services/authService.ts";
import * as React from "react";
import {getDecodedData} from "@/services/util.ts";

interface AuthContextData {
    user: JwtDataProps | null;

    login(credentials: SignInProps): Promise<void>;

    logout: () => void;
    invalidToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export interface SignInProps {
    user: string;
    password: string;
}

export interface JWTProps {
    data: string;
    iss: string;
    sub: string;
    exp: number;
}

export interface JwtDataProps {
    role: string[];
    id: number;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [data, setData] = useState<JwtDataProps | null>(() => {
        const savedToken = localStorage.getItem("@bc.token");

        if (savedToken) {
            try {
                const decodedToken = getDecodedData(savedToken);
                return {
                    role: decodedToken.role,
                    id: decodedToken.id, // Certifique-se de que o token decodificado contém o ID
                };
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                return null;
            }
        }

        return null;
    });

    const login = useCallback(async ({user, password}: SignInProps) => {
        try {
            logout();
            const response = await auth({user, password});
            const decodedObject = getDecodedData(response.token);

            setData({
                role: decodedObject.role,
                id: decodedObject.id,
            });

            localStorage.setItem("@bc.token", response.token);
        } catch (error) {
            console.error("Erro durante o login:", error);
            throw new Error("Falha no login");
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("@bc.token");
        setData(null);
        console.log("Logout realizado com sucesso");
    }, []);

    const invalidToken = useCallback(async () => {
        return await checkToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                login,
                logout,
                invalidToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};