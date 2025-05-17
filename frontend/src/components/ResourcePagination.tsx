import React from 'react';

interface ResourcePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ResourcePagination({ page, totalPages, onPageChange }: ResourcePaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-800'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
