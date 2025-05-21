import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { useI18n } from '../../context/i18nContext';
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type ChartData = Record<string, number>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function DownloadChart() {
  const { t } = useI18n();
  const [data, setData] = useState<ChartData>({});
  const [interval, setInterval] = useState("day");

  useEffect(() => {
    fetch(`${API_URL}/api/resources/download-chart?interval=${interval}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(setData);
  }, [interval]);

  const labels = Object.keys(data).sort();
  const values = labels.map((k) => data[k]);

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-green-800">{t('download_chart')}</h3>
        <select
          className="bg-gray-100 text-green-800 rounded px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="day">{t('day')}</option>
          <option value="week">{t('week')}</option>
          <option value="month">{t('month')}</option>
        </select>
      </div>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: t('downloads'),
              data: values,
              borderColor: "#60a5fa",
              backgroundColor: "rgba(4, 112, 245, 0.89)",
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
