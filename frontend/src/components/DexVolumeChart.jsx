import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
                <XAxis
                    dataKey="displayName"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={1}
                    tick={{ fontSize: 16, fill: "#fff" }}
                    tickFormatter={(value) => value.split(" ")[0]}
                />
                <YAxis tick={{ fontSize: 12, fill: "#fff" }} />
                <Tooltip formatter={(value) => `${value} b$`} />
                <Bar dataKey="total7d" fill="purple" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}