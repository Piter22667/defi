import React from 'react';
import {Box, Typography} from "@mui/material";

const UserBlock = ({user}) => {
    return (

        <Box sx={{
            bgcolor: "#23262F",
            borderRadius: 2,
            p: 2,
            color: "#fff",
            mt: 2,
            display: "flex",
            alignItems: "center"
        }}>
        <Box>
            <Typography sx={{ fontSize: 12, color: "#aaa" }}>{user?.email || "Welcome"}</Typography>
            <Typography sx={{ fontWeight: 600 }}>{user?.username || "User Name"}</Typography>
        </Box>
        </Box>
    );
};

export default UserBlock;