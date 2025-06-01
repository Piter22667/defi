import React, {useEffect, useState} from 'react';
import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


export default function PancakeMonthVolumeChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/dune/pancakeMonthVolume")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" tickFormatter={(v) => v.split(" ")[0]} tick={{fill: "white"}} />
                <YAxis yAxisId="left" orientation="left" tickFormatter={(v) => `${(v / 1e9).toFixed(0)}B`} tick={{fill: "white"}}/>
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${(v / 1e6).toFixed(2)}M`} tick={{fill: "white"}}/>
                <Tooltip  labelFormatter={v => v.split(" ")[0]}
                          formatter={(value, name) => {
                              if (name === "Volume") {
                                  return [`${(value / 1e9).toFixed(2)}B$`, "Volume"];
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
                <Bar yAxisId="left" dataKey="volume" barSize={20} fill="#413ea0" name="Volume" />
                <Line yAxisId="right" type="monotone" dataKey="user" stroke="#ff7300" name="Users" />

            </ComposedChart>
        </ResponsiveContainer>
    );
}