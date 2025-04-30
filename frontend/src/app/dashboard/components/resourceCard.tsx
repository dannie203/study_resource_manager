'use client';

interface ResourceCardProps {
  resources: {
    id: string;
    title: string;
    subject: string;
    fileUrl: string;
    createdBy: string;
  }[];
}

export default function ResourceCard({ resources }: ResourceCardProps) {
  if (resources.length === 0) {
    // Render message and upload button if no data exists
    return (
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">No data in the database.</p>
        <a
          href="/upload"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Data
        </a>
      </div>
    );
  }

  // Render resource cards if data exists
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">{resource.title || 'No Title'}</h2>
          <p className="text-gray-600 mb-2">
            Môn học: {resource.subject || 'No Subject'}
          </p>
          <a
            href={resource.fileUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {resource.fileUrl ? 'Tải xuống tài liệu' : 'No File Available'}
          </a>
        </div>
      ))}
    </div>
  );
}
