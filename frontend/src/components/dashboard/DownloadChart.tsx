import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type ChartData = Record<string, number>;

export default function DownloadChart() {
  const [data, setData] = useState<ChartData>({});
  const [interval, setInterval] = useState("day");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/resources/download-chart?interval=${interval}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setData);
  }, [interval]);

  const labels = Object.keys(data).sort();
  const values = labels.map((k) => data[k]);

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-green-800">Lượt tải xuống theo thời gian</h3>
        <select
          className="bg-gray-100 text-green-800 rounded px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
        </select>
      </div>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Lượt tải xuống",
              data: values,
              borderColor: "#60a5fa",
              backgroundColor: "rgba(96,165,250,0.2)",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
}
