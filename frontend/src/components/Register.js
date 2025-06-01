import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Register({ setToken }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),

            });
            navigate("/");
            if (!response.ok) throw new Error("Something went wrong");
            const data = await response.json();
            setToken(data.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h5" mb={2}>Вхід</Typography>
            <form onSubmit={handleSubmit1}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    error={!email}

                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    error={!password}

                    onChange={e => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    disabled={!email || !password}
                    type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Створити обліковий запис
                </Button>

            </form>
        </Box>
    );
}