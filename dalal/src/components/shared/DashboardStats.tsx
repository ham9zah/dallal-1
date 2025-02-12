'use client';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className={`rounded-lg p-6 ${color === 'blue' ? 'bg-blue-50' : color === 'green' ? 'bg-green-50' : color === 'yellow' ? 'bg-yellow-50' : 'bg-purple-50'}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'} ml-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        </div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  stats: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
