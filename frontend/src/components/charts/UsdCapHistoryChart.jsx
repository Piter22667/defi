import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    Area
} from "recharts";

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString().split("T")[0];
};

const formatUsd = (value) => {
    return value / 1e9;
};

export default function UsdCapHistoryChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/cr/usdCirculation")
            .then(res => res.json())
            .then(json => {
                const formattedData = json.map(item => ({
                    date: formatDate(item.date),
                    valueInBillions: formatUsd(item.totalCirculatingUSD.peggedUSD),
                }));
                setData(formattedData);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 40,
                }}
            >
                <defs>
                    <linearGradient id="colorUsd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    interval={Math.ceil(data.length / 8)}
                    tick={{ fontSize: 11, fill: "#ccc" }}
                    label={{ value: "Date", position: "insideBottom", offset: -30, fill: "#ccc" }}
                />
                <YAxis
                    tickFormatter={(value) => value.toFixed(1)}
                    domain={[0, 'auto']}
                    tick={{ fontSize: 12, fill: "#ccc" }}
                    label={{ value: "Volume, b.$", angle: -90, position: "insideLeft", fill: "#ccc" }}
                />
                <Tooltip
                    contentStyle={{ background: "#222", border: "none", borderRadius: 8, color: "#fff" }}
                    formatter={(value) => [`${value.toFixed(2)} b.$`, "Volume"]}
                    labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ color: "#fff" }} />
                <Area
                    type="monotone"
                    dataKey="valueInBillions"
                    stroke={false}
                    fillOpacity={0.2}
                    fill="url(#colorUsd)"
                    dot={false}
                    isAnimationActive={false}
                />
                <Line
                    type="monotone"
                    dataKey="valueInBillions"
                    stroke="#8884d8"
                    activeDot={{ r: 7, fill: "#fff", stroke: "#8884d8", strokeWidth: 3 }}
                    dot={{ r: 3, fill: "#8884d8" }}
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}