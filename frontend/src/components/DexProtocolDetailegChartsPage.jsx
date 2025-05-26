import React, { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const DEXES = [
    { value: "dex1", label: "PancakeSwap" },
    { value: "dex2", label: "Uniswap" }
];

export default function DexProtocolDetailedChartsPage() {
    const [selectedDex, setSelectedDex] = useState(DEXES[0].value);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`/api/dex/${selectedDex}`)
            .then(res => res.json())
            .then(setData);
    }, [selectedDex]);

    const handleChange = (event) => {
        setSelectedDex(event.target.value);
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Dex Protocol detailed charts</Typography>
            <Box sx={{ minWidth: 200, mb: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="dex-select-label">DEX</InputLabel>
                    {/*<Select*/}
                    {/*    labelId="dex-select-label"*/}
                    {/*    id="dex-select"*/}
                    {/*    value={selectedDex}*/}
                    {/*    label="DEX"*/}
                    {/*    onChange={handleChange}*/}
                    {/*>*/}
                    {/*    {DEXES.map(dex => (*/}
                    {/*        <MenuItem key={dex.value} value={dex.value}>{dex.label}</MenuItem>*/}
                    {/*    ))}*/}
                    {/*</Select>*/}
                </FormControl>
            </Box>
        </Box>
    );
}