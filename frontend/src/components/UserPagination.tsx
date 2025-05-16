import React from 'react';

interface UserPaginationProps {
  page: number;
  totalPages: number;
  setPage: (v: number) => void;
}

export default function UserPagination({ page, totalPages, setPage }: UserPaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-800'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
