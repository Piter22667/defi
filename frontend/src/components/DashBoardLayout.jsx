import React from "react";
import { Box, Typography } from "@mui/material";

const DashBoardLayout = ({
         title ,
         topChart,
         leftChart,
         rightChart,
        children,
        isHidden
     }) => (
    <Box
        sx={{
            flexGrow: 1,
            px: { xs: 1, md: 3 },
            bgcolor: "#181A20",
            color: "white",
            minHeight: "100vh",
        }}
    >
        {!isHidden && (
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, pt: 1}} >
                {title}
            </Typography>
            )}


        {children ? (
                <Box sx={{ px: { xs: 1, md: 3 }, pb: 3 }}>
                    {children}
                </Box> //будемо відображати children, якщо вони є (children - тут - сторінка з транзакціями, яка буде відображатися в DashBoardLayout)
        ) : (

        <Box sx={{ px: { xs: 1, md: 3 }, pb: 3 }}>
            {/* Верхній ряд */}
            <Box sx={{ mb: 3, width: "100%" }}>
                <Box
                    sx={{
                        bgcolor: "#23262F",
                        borderRadius: 3,
                        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.15)",
                        p: { xs: 1, md: 2 },
                        height: { xs: 250, md: 310 },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {topChart?.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{topChart?.component}</Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
                <Box
                    sx={{
                        flex: 5,
                        minWidth: 0,
                        bgcolor: "#23262F",
                        borderRadius: 3,
                        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.15)",
                        p: { xs: 1, md: 2 },
                        height: { xs: 250, md: 300 },
                        display: "flex",
                        aspectRatio: "1 / 1",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {leftChart?.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{leftChart?.component}</Box>
                </Box>
                <Box
                    sx={{
                        flex: 7,
                        minWidth: 0,
                        bgcolor: "#23262F",
                        borderRadius: 3,
                        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.15)",
                        p: { xs: 1, md: 2 },
                        height: { xs: 250, md: 300 },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {rightChart?.title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{rightChart?.component}</Box>
                </Box>
            </Box>
        </Box>
        )}
    </Box>
);

export default DashBoardLayout;