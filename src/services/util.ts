import {jwtDecode} from "jwt-decode";
import {JwtDataProps, JWTProps} from "@/context/AuthContext.tsx";

export const getDecodedData = (authorization: string): JwtDataProps => {
    const decoded = jwtDecode<JWTProps>(authorization);
    const replacedString = decoded.data.replace(/'/g, '"');
    return JSON.parse(replacedString) as JwtDataProps;
};