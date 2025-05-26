import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {jwtDecode} from "jwt-decode";

import {
    Typography,
    Button,
    Alert,
    Snackbar,
    Box,
    AppBar,
    Toolbar,
    ListItemIcon,
    List,
    ListItem,
    ListItemText, Grid
} from "@mui/material";


import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import SnackBarPopUp from "./components/SnackBarPopUp";
import ChartsOverviewDemo from "./components/ChartsOverviewDemo.jsx";
import MyChart from "./components/ChainByTvlChart";
import ChainByTvlChart from "./components/ChainByTvlChart";
import DexVolumeChart from "./components/DexVolumeChart";
import UsdCapHistoryChart from "./components/UsdCapHistoryChart";
import DexProtocolDetailedChartsPage from "./components/DexProtocolDetailegChartsPage";


const darkTheme = createTheme({
    palette: {
        mode: "dark",

    },
});


function App() {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
        const [open, setOpen] = useState(false);
        const [user, setUser] = useState(null);



    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setOpen(true);
            try {
                const decoded = jwtDecode(token);
                setUser({
                    email: decoded.email,
                    username: decoded.sub || decoded.username || decoded.name
                });
            } catch (e) {
                setUser(null);
            }

        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);

    if (!token) {
        return (

                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<Register onRegister={setToken} />} />
                        <Route path="*" element={<Login onLogin={setToken} />} />
                        <Route path="/dex-charts" element={<DexProtocolDetailedChartsPage />} />

                    </Routes>
                </BrowserRouter>
        );
    }

    const fetchHello = async () => {
        const res = await fetch("http://localhost:8080/api/v1/demo/hello", {
            headers: { Authorization: `Bearer ${token}` },
        });
        alert(await res.text());
    };

    return (
        <ThemeProvider theme={darkTheme}>


            <Box sx={{
                bgcolor: "#14151A",
                minHeight: "100vh",
                minWidth: "100vw",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                overflow: "auto"
            }}>
                {/* Верхній банер */}
            <AppBar position="static" color="default" elevation={2}
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

        <Box sx={{ display: "flex", height: "100%", bgcolor: "#181A20" }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: "14%",
                    bgcolor: "#20222B",
                    boxShadow: "2px 0 16px 0 rgba(0,0,0,0.25)",
                    py: 3,
                    px: 2,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    mr: 4
                }}
            >
                <Typography variant="h6" sx={{ color: "#fff", mb: 4, fontWeight: 700 }}>
                    DeFi App
                </Typography>
                <List>
                    <ListItem button selected sx={{
                        bgcolor: "#23262F",
                        mb: 2,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 18,
                        borderRadius: 2,
                        '&.Mui-selected, &:hover': {
                            bgcolor: "#23262F",
                            color: "#00FFF0",
                        },
                    }}>
                        <ListItemIcon sx={{ color: "#00FFF0", minWidth: 36 }}>
                            <DashboardOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button sx={{
                        mb: 2,
                        color: "#fff",
                        borderRadius: 2,
                        '&:hover': { bgcolor: "#23262F", color: "#00FFF0" }
                    }}>
                        <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                            <QueryStatsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dex Protocol detailed charts" />
                    </ListItem>
                    <ListItem button sx={{
                        color: "#fff",
                        borderRadius: 2,
                        '&:hover': { bgcolor: "#23262F", color: "#00FFF0" }
                    }}>
                        <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                            <BubbleChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chain detailed charts" />
                    </ListItem>
                </List>
                <Box sx={{ flexGrow: 1 }} />
                {/* Блок користувача */}
                <Box sx={{
                    bgcolor: "#23262F",
                    borderRadius: 2,
                    p: 2,
                    color: "#fff",
                    mt: 2,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        width: 40, height: 40, bgcolor: "#00FFF0", borderRadius: "50%", mr: 2
                    }} />
                    <Box>
                        <Typography sx={{ fontWeight: 600 }}>{user?.username || "User Name"}</Typography>
                        <Typography sx={{ fontSize: 12, color: "#aaa" }}>{user?.email || "Welcome"}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    px: { xs: 1, md: 3 },
                    bgcolor: "#181A20",
                    color: "white",
                    minHeight: "100vh",
                }}
            >
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700,pt: 1 }}>
                    Dashboard
                </Typography>

                    <Box sx={{ px: { xs: 1, md: 3 }, pb: 3 }}>
                    {/* Верхний ряд */}
                    <Box sx={{ mb: 3 , width: "100%"}}>
                        <Box sx={{
                            bgcolor: "#23262F",
                            borderRadius: 3,
                            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.15)",
                            p: { xs: 1, md: 2 },
                            height: { xs: 250, md: 310 },

                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>DEX Volume</Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <DexVolumeChart />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                        <Box sx={{
                            flex: 5,
                            minWidth: 0,
                            bgcolor: "#23262F",
                            borderRadius: 3,
                            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.15)",
                            p: { xs: 1, md: 2 },
                            height: { xs: 250, md: 300 },
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>TVL by Chain</Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <ChainByTvlChart />
                            </Box>
                        </Box>
                        <Box sx={{
                            flex: 7,
                            minWidth: 0,
                            bgcolor: "#23262F",
                            borderRadius: 3,
                            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.15)",
                            p: { xs: 1, md: 2 },
                            height: { xs: 250, md: 300 },
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>USD Market Cap History</Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <UsdCapHistoryChart />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>


            <SnackBarPopUp/>

            

            </Box>
        </ThemeProvider>
    );
}

export default App;