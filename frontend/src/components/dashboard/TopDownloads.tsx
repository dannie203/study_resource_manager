import React, { useEffect, useState } from "react";

type Resource = {
  id: number;
  title: string;
  subject: string;
  downloadCount: number;
};

export default function TopDownloads() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/resources/top-downloads?limit=5", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setResources);
  }, []);

  if (!resources.length) return <div className="py-8 text-center text-green-700 font-semibold">Đang tải top tài nguyên...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow border border-gray-100">
      <h3 className="font-semibold mb-4 text-green-800">Top tài nguyên được tải nhiều nhất</h3>
      <ol className="list-decimal ml-5 space-y-2">
        {resources.map((r, i) => (
          <li key={r.id} className="flex justify-between items-center text-gray-800">
            <span>{r.title} <span className="text-gray-400">({r.subject})</span></span>
            <span className="font-mono text-green-700 font-semibold">{r.downloadCount} lượt</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
