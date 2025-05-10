import React from 'react';
import {
  DocumentTextIcon,
  UsersIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function StatsSummary() {
  return (
    <section className="bg-[#1e1e1e] rounded-lg p-6 shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Stats Summary</h2>
      <div className="flex gap-8">
        <div>
          <div className="text-4xl font-bold">12</div>
          <div className="text-gray-400">Resources</div>
        </div>
        <div>
          <div className="text-4xl font-bold">5</div>
          <div className="text-gray-400">Uploads</div>
        </div>
        <div>
          <div className="text-4xl font-bold">3</div>
          <div className="text-gray-400">Downloads</div>
        </div>
      </div>
    </section>
  );
}