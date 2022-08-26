import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function UserVisualData() {
  let data = [
    {
      name: "Attention",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Memory",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "ResponseTime",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Flexability",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },

  ];

  return (
    <ResponsiveContainer width="100%" aspect={3} height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
