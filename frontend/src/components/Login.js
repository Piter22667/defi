import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error("Невірний логін або пароль");
            const data = await response.json();
            setToken(data.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h5" mb={2}>Вхід</Typography>
            <form onSubmit={handleSubmit}>
           <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={!email}
                helperText={!email ? "Email can't be empty" : ""}
            />
            <TextField
                label="Пароль"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={!password}
                helperText={!password ? "Password can't be empty" : ""}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!email || !password}
            >
                Увійти
            </Button>
            <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}

                onClick={() => navigate("/register")}
            >
                Реєстрація
            </Button>
            </form>
        </Box>
    );
}