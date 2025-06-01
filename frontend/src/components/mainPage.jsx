import React from 'react';
import DexVolumeChart from "./charts/DexVolumeChart";
import ChainByTvlChart from "./charts/ChainByTvlChart";
import UsdCapHistoryChart from "./charts/UsdCapHistoryChart";
import DashBoardLayout from "./DashBoardLayout";

const MainPage = () => {
    return (
    <DashBoardLayout title={"General overview of DEXs"}
        topChart={{ title: "DEX Volume", component: <DexVolumeChart /> }}
        leftChart={{ title: "TVL by Chain", component: <ChainByTvlChart /> }}
        rightChart={{ title: "USD Market Cap History", component: <UsdCapHistoryChart /> }}
    />
    );
};

export default MainPage;