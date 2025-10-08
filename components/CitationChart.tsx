'use client';

interface CitationChartProps {
  data: { year: number; count: number }[];
  className?: string;
}

export default function CitationChart({ data, className = '' }: CitationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Citations by Year</h3>
        <p className="text-gray-500">No citation data available</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count));
  const minYear = Math.min(...data.map(d => d.year));
  const maxYear = Math.max(...data.map(d => d.year));

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Citations by Year</h3>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.count / maxCount) * 100;
          const isRecent = item.year >= maxYear - 1;
          
          return (
            <div key={item.year} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-gray-600 text-right">
                {item.year}
              </div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isRecent ? 'bg-indigo-600' : 'bg-indigo-400'
                    }`}
                    style={{ 
                      width: `${percentage}%`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <div className="absolute inset-y-0 left-2 flex items-center">
                  <span className="text-xs font-medium text-white">
                    {item.count}
                  </span>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-500 text-right">
                {item.count.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Period: {minYear} - {maxYear}</span>
          <span>Peak: {maxCount.toLocaleString()} citations</span>
        </div>
      </div>
    </div>
  );
}