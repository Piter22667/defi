import { useEffect, useState } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

export default function ChainByTvlChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/cr/tvlByChain")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
            >
                <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={1}
                    tick={{ fontSize: 16, fill: "#fff" }}
                    tickFormatter={(value) => value.split(" ")[0]}
                />
                <YAxis tick={{ fontSize: 12, fill: "#fff" }} />
                <Tooltip />
                <Bar dataKey="tvl" fill="orange" />
            </BarChart>
        </ResponsiveContainer>
    );
}