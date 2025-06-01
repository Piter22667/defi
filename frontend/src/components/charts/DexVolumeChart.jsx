import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function DexVolumeChart() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/cr/dexVolume")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
            >
                <CartesianGrid strokeDasharray="2 2" stroke="#444" />
                <XAxis
                    dataKey="displayName"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 18, fill: "#fff" }}
                    height={40}
                    tickFormatter={(value) => value.split(" ")[0]}

                />
                <YAxis tick={{ fontSize: 18, fill: "#fff" }} tickFormatter={(value) => `${value.toFixed(0)} B`} />
                <Tooltip
                    contentStyle={{ background: "#23262F", border: "none", borderRadius: 8, color: "#fff" }}
                    formatter={(value) => [`${value} b. $`, "Volume"]}
                />
                <Bar dataKey="total7d" fill="orange" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}