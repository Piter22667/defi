import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const OptionMenu = ({selectedDex, setSelectedDex, DEXES, CHARTS}) => {


    return (
        <FormControl sx={{ mb: 3, minWidth: 240, pb:0, background: "#23262F", borderRadius: 2, boxShadow: 2 }}>
            <InputLabel
                id="dex-select-label"
                sx={{ color: "#fff", fontWeight: 600, fontSize: 18, '&.Mui-focused': { color: "orange" } }}
            >
                Choose DEX
            </InputLabel>
            <Select
                labelId="dex-select-label"
                value={selectedDex}
                label="DEX Protocol"
                onChange={e => setSelectedDex(e.target.value)}
                sx={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 17,
                    '.MuiOutlinedInput-notchedOutline': { borderColor: "#444" },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: "orange" },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "orange" },
                    background: "#23262F"
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            background: "#23262F",
                            color: "#fff",
                            borderRadius: 2,
                            boxShadow: 4
                        }
                    }
                }}
            >
                {DEXES.map(dex => (
                    <MenuItem
                        key={dex.value}
                        value={dex.value}
                        sx={{
                            fontWeight: 500,
                            fontSize: 16,
                            '&.Mui-selected': { background: "rgba(255,140,0,0.15)" },
                            '&:hover': { background: "rgba(255,140,0,0.25)" }
                        }}
                    >
                        {dex.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default OptionMenu;