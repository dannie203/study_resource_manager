"use client";

import Header from "@/components/header";
import ResourceList from "@/components/ResourceList";
import Sidebar from "@/components/sidebar";

export default function ResourcesPage() {
  return (
    <>
      <div className="flex min-h-screen bg-[#121212] text-white font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header title={"Resources"} />
          <main className="p-4">
            <div>
              <h1 className="text-2xl font-bold mb-4">Tài liệu của bạn</h1>
              <ResourceList />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
