import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function useAuthDet() {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            try {
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.email,
                    username: decoded.username || decoded.name
                });
            } catch {
                setUser(null);
            }
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);
    return { token, setToken, user };
}