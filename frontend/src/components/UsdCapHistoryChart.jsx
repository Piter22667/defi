import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    Legend,
    Line
} from "recharts";




const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toISOString().split("T")[0];
};


const formatUsd = (value) => {
    return value/ 1e9; // конвертуємо в млрд доларів
}




export default function UsdCapHistoryChart() {
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/cr/usdCirculation")
            .then(res => res.json())
            .then(json => {
                const formattedData = json.map(item => ({
                    date: formatDate(item.date),
                    valueInBillions: formatUsd(item.totalCirculatingUSD.peggedUSD),
                }))
                console.log(formattedData);
                setData(formattedData);
            })
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    angle={-45}
                    textAnchor="end"
                    height={1}
                    tick={{ fontSize: 12, fill: "#fff" }}
                />
                <YAxis
                    tickFormatter={(value) => value.toFixed(1)}
                    domain={[0, 'auto']}
                    tick={{ fontSize: 12, fill: "#fff" }}
                />
                <Tooltip
                    formatter={(value) => [`${value.toFixed(2)} млрд $`, "Объем"]}
                    labelFormatter={(label) => `Дата: ${label}`}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="valueInBillions"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}