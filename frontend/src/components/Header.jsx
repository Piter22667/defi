import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ setToken }) => (
    <AppBar
        position="static"
        color="default"
        elevation={2}
        sx={{
            width: "100%",
            bgcolor: "#23262F",
            color: "#fff",
            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.15)"
        }}
    >
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
                DeFi App
            </Typography>
            <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                    setToken(null);
                    localStorage.removeItem("token");
                }}
            >
                LOG OUT
            </Button>
        </Toolbar>
    </AppBar>
);

export default Header;