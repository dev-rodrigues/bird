import {createContext, useCallback, useContext} from "react";
import * as React from "react";

interface AuthContextData {
    login(credentials: SignInProps): void
    logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: React.ReactNode;
}

interface SignInProps {
    user: string;
    password: string;
}

// interface JWTProps {
//     data: string;
// }

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const login = useCallback(({user, password}: SignInProps) => {

        console.log(user, password);
    }, [])

    const logout = useCallback(() => {
        console.log("Executing logout")
    }, [])

    return (
        <AuthContext.Provider value={{
            login,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export {AuthProvider, useAuth}
