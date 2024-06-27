"use client"
import axios from "axios";

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { jwtVerify } from "jose"
import jwt from "jsonwebtoken";
const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token)
        }
    }, [])
    
    const loginAction = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/users/auth", data);
            if(response.status === 200) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                window.location.href = "/"
                return true
            }
            else {
                return response.data.message
            }

            
        }
        catch(error) {
            console.log(error.message)
        }
    }

    const logOut = () => {
        setToken("");
        localStorage.removeItem("token");
        window.location.href = "/login"
      };

    const verifyAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
        else {

        try {
            const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "secret"))
        console.log(decoded)
        if (!decoded.payload) {
            window.location.href = "/login";
        }
    

        return decoded.payload;
        }
        catch(error) {
            // verify if is token expired error
            if(error.name === "JWTExpired") {
                localStorage.removeItem("token");
                window.location.href = "/login";

            }
        }
        
    }

    };

    return (
        <AuthContext.Provider value={{ token, loginAction, logOut, verifyAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}
