import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function UniMonthVolumeChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/dune/uniMonthVolume")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
                <CartesianGrid strokeDasharray="2 2" stroke="#444" />



                <XAxis
                    dataKey="month"
                    angle={-45}
                    textAnchor="end"
                    interval={5}
                    height={1}
                    tick={{ fontSize: 16, fill: "#fff" }}
                    tickFormatter={(value) => value.split(" ")[0]}
                />
                <YAxis tick={{ fontSize: 16, fill: "#fff" }}  />
                <Tooltip
                    formatter={(value, name) => [`${(value / 1000).toFixed(3)} b. $`]}
                    contentStyle={{
                        background: "#c2c4ca",
                        borderRadius: 3,
                        color: "#000000",
                        fontWeight: "bold"
                    }}
                    itemStyle={{ borderRadius: 8, fontSize: 19, fontWeight: "bold" }}
                />

                <Bar dataKey="volume" fill="purple" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}