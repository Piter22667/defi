import React, { useEffect, useState } from 'react';
import {
    Bar,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

export default function PancakeVolumeAndTransactionsOnBnbChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/dune/pancakeVolumeAndTransactionsOnBnb")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month"
                       tickFormatter={v => v.split(" ")[0]}
                />
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickFormatter={v => `${(v / 1e9).toFixed(0)}B`}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={v => v.split(" ")[0]}
                    tickFormatter={v => `${(v / 1e6).toFixed(2)}M`}
                />
                <Tooltip
                    labelFormatter={v => v.split(" ")[0]}
                    formatter={(value, name) => {
                        if (name === "Volume") {
                            return [`${(value / 1e9).toFixed(2)} B$`, "Volume"];
                        }
                        if (name === "Users") {
                            return [
                                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                "Users"
                            ];
                        }
                        return [value, name];
                    }}
                    contentStyle={{
                        background: "#c2c4ca",
                        borderRadius: 3,
                        color: "#000000",
                        fontWeight: "bold"
                }}
                />
                <Legend />
                <Bar
                    yAxisId="left"
                    dataKey="volume"
                    barSize={18}
                    fill="#393782"
                    name="Volume"
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="user"
                    stroke="#cc5c00"
                    name="Users"
                    strokeWidth={2}
                    dot={true}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}