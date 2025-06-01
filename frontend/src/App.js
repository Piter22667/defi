import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import useAuthDet from "./components/useAuthDet";


import {Box} from "@mui/material";
import SnackBarPopUp from "./components/SnackBarPopUp";
import DexProtocolDetailedChartsPage from "./components/DexProtocolDetailegChartsPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainPage from "./components/mainPage";
import AddressTxsPage from "./components/AddressTxsPage";


const darkTheme = createTheme({
    palette: {
        mode: "dark",

    },
});


function App() {
    const { token, setToken, user } = useAuthDet();
    return (
        <BrowserRouter>
            {!token ? (
                <Routes>
                    <Route path="/register" element={<Register setToken={setToken} />} />
                    <Route path="*" element={<Login setToken={setToken} />} />
                </Routes>
            ) : (
                <ThemeProvider theme={darkTheme}>
                    <Box sx={{
                        bgcolor: "#14151A",
                        minHeight: "100vh",
                        minWidth: "100vw",
                        width: "100vw",
                        height: "120%",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        overflow: "auto"
                    }}>
                        <Header setToken={setToken} />
                        <Box sx={{ display: "flex", height: "120%", bgcolor: "#181A20" }}>
                            <Sidebar user={user} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Routes>
                                    <Route path="/" element={<MainPage />} />
                                    <Route path="/dex-charts" element={<DexProtocolDetailedChartsPage />} />
                                    <Route path="/getAddressTxs" element={<AddressTxsPage />} />
                                </Routes>
                            </Box>
                        </Box>
                        <SnackBarPopUp />
                    </Box>
                </ThemeProvider>
            )}
        </BrowserRouter>
    );
}

export default App;