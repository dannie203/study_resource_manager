'use client';

interface Resource {
  id: string;
  title: string;
  subject: string;
  fileUrl: string;
  createdBy: string;
}

interface ResourceCardProps {
  resources: Resource[];
}

export default function ResourceCard({ resources }: ResourceCardProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Chưa có tài nguyên nào.</p>
        <a
          href="/upload"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tải tài nguyên lên
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            {resource.title || 'Không có tiêu đề'}
          </h2>
          <p className="text-gray-600 mb-2">
            Môn học: {resource.subject || 'Không rõ'}
          </p>

          {resource.fileUrl ? (
            <a
              href={`http://localhost:5000${resource.fileUrl}`}
              download
              className="text-blue-600 hover:underline"
            >
              Tải xuống tài liệu
            </a>
          ) : (
            <p className="text-red-500">Không có tệp đính kèm</p>
          )}
        </div>
      ))}
    </div>
  );
}
