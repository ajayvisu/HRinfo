import React from "react";
import './dash.css'
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Dash = () => {
  const data = [
    { time: "09:00-11:00", work: 10 },
    { time: "11:00-01:00", work: 9 },
    { time: "02:00-04:00", work: 7 },
    { time: "04:00-03:00", work: 6 },
  ];

  return (

      <div className="flex">
        <BarChart
          width={400}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="time"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="work" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        <div className="round">
     <PieChart width={400} height={400}>
          <Pie
            dataKey="work"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Dash;