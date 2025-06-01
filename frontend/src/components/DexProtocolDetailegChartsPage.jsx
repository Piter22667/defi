import React, {useState} from "react";
import {Box} from "@mui/material";
import DashBoardLayout from "./DashBoardLayout";
import UniMonthVolumeChart from "./charts/UniMonthVolumeChart";
import UniFeesByPairChart from "./charts/UniFeesByPairChart";
import UniTotalFeeByChainChart from "./charts/UniTotalFeeByChainChart";
import OptionMenu from "./OptionMenu";
import PancakeMonthVolumeChart from "./charts/PancakeMonthVolumeChart";
import PancakeVolumeByChainChart from "./charts/pancakeVolumeByChainChart";
import PancakeVolumeAndTransactionsOnBnbChart from "./charts/PancakeVolumeAndTransactionsOnBnbChart";

const DEXES = [
    { value: "uniswap", label: "Uniswap" },
    { value: "pancakeswap", label: "PancakeSwap" }
];

export default function DexProtocolDetailedChartsPage() {
    const [selectedDex, setSelectedDex] = useState("uniswap"); // Default to Uniswap

    const CHARTS = {
        uniswap: {
            title: "",
            topChart: { title: "Uniswap (V1 - V4) Total Volume", component: <UniMonthVolumeChart /> },
            leftChart: { title: "Uniswap fees by top pairs", component: <UniFeesByPairChart /> },
            rightChart: { title: "Uniswap V4 Total Fees by chain", component: <UniTotalFeeByChainChart /> }
        },
        pancakeswap: {
            title: "PancakeSwap Protocol Detailed Charts",
            topChart: { title: "PancakeSwap Total volume and users", component: <PancakeMonthVolumeChart /> },
            leftChart: { title: "PancakeSwap Volume by top pairs", component: <PancakeVolumeByChainChart /> },
            rightChart: { title: "PancakeSwap Volume and Txs on Bnb chain", component: <PancakeVolumeAndTransactionsOnBnbChart /> }
        }
    };


    return (
        <Box sx={{ px: 3, pt: 2 }}>
        <OptionMenu
        selectedDex={selectedDex}
        setSelectedDex={setSelectedDex}
        DEXES={DEXES}
        CHARTS={CHARTS}
        />
            <DashBoardLayout sx={{pt:0}} isHidden={true}
                title={CHARTS[selectedDex].title}
                topChart={CHARTS[selectedDex].topChart}
                leftChart={CHARTS[selectedDex].leftChart}
                rightChart={CHARTS[selectedDex].rightChart}
            />
        </Box>
    );
}