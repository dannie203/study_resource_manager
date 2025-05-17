"use client";

import ResourceList from "../../../components/ResourceList";

export default function AdminResourcesPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý tài nguyên</h1>
      <ResourceList />
    </div>
  );
}