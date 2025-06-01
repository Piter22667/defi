import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const COLORS = [
    "#3b82f6", "#6366f1", "#06b6d4", "#22d3ee", "#a5b4fc", "#64748b", "#16a34a", "#facc15", "#f472b6", "#94a3b8"];

export default function UniTotalFeeByChainChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/dune/uniTotalFeeByChain")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#444" />

                <XAxis dataKey="chain" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                    formatter={v => `${v} b. $`}
                    contentStyle={{
                        background: "#c2c4ca",
                        borderRadius: 3,
                        color: "#000000",
                        fontWeight: "bold"
                    }}
                />
                <Legend />
                <Bar dataKey="total_swap_fee_usd" name="Total Fees" radius={[6, 6, 0, 0]} label={{ fill: '#fff', fontSize: 12 }}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}