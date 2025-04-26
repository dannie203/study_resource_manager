'use client';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <input
        type="text"
        placeholder="Search"
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex space-x-2 ml-4">
        <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100">Subject</button>
        <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100">Type</button>
        <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100">Date</button>
      </div>
    </div>
  );
};

export default Header;
