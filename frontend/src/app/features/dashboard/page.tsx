import Resource from '@/app/components/resource';
import { mockResources } from './mockResource';


export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {mockResources.map((resource, index) => (
        <Resource
          key={index}
          title={resource.title}
          category={resource.category}
        />
      ))}
    </div>
  );
}
