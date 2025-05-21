import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useI18n } from '../../context/i18nContext';
Chart.register(ArcElement, Tooltip, Legend);

type CategoryStat = { subject: string; count: number };

export default function ResourceCategoryChart() {
  const { t } = useI18n();
  const [data, setData] = useState<CategoryStat[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/resources/category-stats", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data.length) return <div className="py-8 text-center text-green-700 font-semibold">{t('loading_category_chart')}</div>;

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
      <h3 className="font-semibold mb-4 text-green-800">{t('category_chart')}</h3>
      <Pie
        data={{
          labels: data.map((d) => d.subject),
          datasets: [
            {
              data: data.map((d) => d.count),
              backgroundColor: [
                "#60a5fa",
                "#34d399",
                "#fbbf24",
                "#f87171",
                "#a78bfa",
                "#f472b6",
              ],
            },
          ],
        }}
      />
    </div>
  );
}
