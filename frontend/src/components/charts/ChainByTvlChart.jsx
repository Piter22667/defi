import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function ChainByTvlChart() {
    const [data, setData] = useState([]);

    useEffect(() => { // виконуємо один раз при монтуванні компонената
        fetch("http://localhost:8080/cr/tvlByChain")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 10, bottom: 50 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 16, fill: "#fff" }}
                    height={40}
                />
                <YAxis tick={{ fontSize: 18, fill: "#fff" }} tickFormatter={(value) => `${value.toFixed(0)} B`} />

                <Tooltip
                    contentStyle={{ background: "#23262F", border: "none", borderRadius: 8, color: "#fff" }}
                    formatter={(value) => [`${value} b. $`, "TVL"]} // для кожноого елемента з масиву робимо підпис. Тут value - значення tvl (вісь Y), "TVL" - назва
                />
                <Bar dataKey="tvl" fill="purple" />
            </BarChart>
        </ResponsiveContainer>
    );
}