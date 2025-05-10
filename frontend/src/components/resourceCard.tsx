import {
  DocumentArrowDownIcon,
  LinkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface Resource {
  id: number;
  title: string;
  subject: string;
  fileUrl: string;
  originalName: string;
  createdAt: string;
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="bg-[#1e1e1e] rounded-md p-3 flex space-x-3 select-none">
      <img
        className="w-[120px] h-[80px] object-cover rounded"
        src="/placeholder-thumbnail.jpg"
        alt="Resource Thumbnail"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xs font-bold text-white flex items-center justify-between">
          {resource.title}
          <span className="uppercase text-[10px]">{resource.subject}</span>
          <button aria-label="More info" className="text-gray-400 hover:text-gray-600 text-xs">
            <InformationCircleIcon className="h-4 w-4" />
          </button>
        </h3>
        <p className="text-[10px] text-gray-400 mt-1">Tên file: {resource.originalName}</p>
        <div className="text-[10px] text-green-400 font-mono mt-1 select-text">
          Uploaded • {new Date(resource.createdAt).toLocaleDateString()}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="bg-[#2f5d3a] text-[9px] text-green-300 px-2 py-0.5 rounded flex items-center space-x-1">
            <LinkIcon className="h-3 w-3" />
            <span>{resource.fileUrl}</span>
          </div>
          <a
            href={`http://localhost:5000/api/resources/download/${resource.fileUrl.split('/').pop()}`}
            className="bg-green-500 text-[10px] px-3 py-1 rounded flex items-center space-x-1 hover:bg-green-600"
            download
          >
            <DocumentArrowDownIcon className="h-3 w-3" />
            <span>Tải về</span>
          </a>
        </div>
      </div>
    </article>
  );
}
