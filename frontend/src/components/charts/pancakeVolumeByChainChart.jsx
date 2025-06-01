import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const COLORS = [
    "#4F5D75", "#5E60CE", "#5390D9", "#80FFDB", "#6930C3", "#4361EE", "#3A0CA3"];

export default function PancakeVolumeByChainChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/dune/pancakeVolumeByChain")
            .then(res => res.json())
            .then(raw => {
                const sorted = [...raw].sort((a, b) => b.volume - a.volume);
                setData(sorted);
            });
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">

            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="2 2" stroke="#444" />

                <XAxis
                    type="number"
                    scale="log"
                    domain={['auto', 'auto']}
                    tickFormatter={v => `${(v / 1e9).toFixed(0)}B`}
                    stroke="#E0E0E0"
                />
                <YAxis
                    dataKey="blockchain"
                    type="category"
                    stroke="#E0E0E0"
                    width={90}
                    reversed={true} // змінюємо порядок (знизу вгору)
                />
                <Tooltip
                    formatter={v => `${(v / 1e9).toFixed(2)}B $`}
                    contentStyle={{
                        background: "#c2c4ca",
                        borderRadius: 3,
                        color: "#000000",
                        fontWeight: "bold"
                    }}
                />
                <Legend />
                <Bar dataKey="volume" name="Volume" barSize={24}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}