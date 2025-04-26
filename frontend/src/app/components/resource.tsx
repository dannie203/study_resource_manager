type ResourceCardProps = {
    title: string;
    category: string;
  };
  
  export default function ResourceCard({ title, category }: ResourceCardProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
          {category}
        </span>
      </div>
    );
  }
  