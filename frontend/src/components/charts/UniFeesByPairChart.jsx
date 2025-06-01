import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const COLORS = [
    "#00FFF0", "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a569bd", "#f7b731", "#20bf6b", "#eb3b5a", "#3867d6"];

export default function UniFeesByPairChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/dune/uniTotalFeePairs")
            .then(res => res.json())
            .then(raw => {
                const sorted = [...raw].sort((a, b) => b.total_fees_usd - a.total_fees_usd);
                const top = sorted.slice(0, 5);
                const otherSum = sorted.slice(5).reduce((sum, d) => sum + d.total_fees_usd, 0);
                if (otherSum > 0) {
                    top.push({ trading_pair: "Other", total_fees_usd: otherSum });
                }
                setData(top);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="total_fees_usd"
                    nameKey="trading_pair"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={v => `${v} b.$`}
                    contentStyle={{
                        background: "#c2c4ca",
                        borderRadius: 3,
                        color: "#000000",
                        fontWeight: "bold"
                    }}
                />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
        </ResponsiveContainer>
    );
}