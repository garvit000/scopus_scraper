'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Users, TrendingUp, BookOpen, ArrowUpDown } from 'lucide-react';
import Layout from '@/components/Layout';
import MetricCard from '@/components/MetricCard';
import { MOCK_AUTHORS, calculateOverallStats, Author } from '@/lib/data';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Author>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const overallStats = calculateOverallStats();

  const filteredAndSortedAuthors = useMemo(() => {
    let filtered = MOCK_AUTHORS.filter(author =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.scopusId.includes(searchTerm)
    );

    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Author) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Author) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Overview of research authors and publications
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Authors"
            value={overallStats.totalAuthors}
            icon={<Users className="w-5 h-5" />}
            subtitle="Registered researchers"
          />
          <MetricCard
            title="Average H-Index"
            value={overallStats.averageHIndex}
            icon={<TrendingUp className="w-5 h-5" />}
            subtitle="Research impact metric"
          />
          <MetricCard
            title="Total Citations"
            value={overallStats.totalCitations.toLocaleString()}
            icon={<TrendingUp className="w-5 h-5" />}
            subtitle="All publications combined"
          />
          <MetricCard
            title="Total Documents"
            value={overallStats.totalDocuments}
            icon={<BookOpen className="w-5 h-5" />}
            subtitle="Published research papers"
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Authors</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search authors..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Authors Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('department')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Department
                      {getSortIcon('department')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('hIndex')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      H-Index
                      {getSortIcon('hIndex')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('totalCitations')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Citations
                      {getSortIcon('totalCitations')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('documentsCount')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Documents
                      {getSortIcon('documentsCount')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scopus ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedAuthors.map((author) => (
                  <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/${author.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900 hover:underline"
                      >
                        {author.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {author.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {author.hIndex}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {author.totalCitations.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {author.documentsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {author.scopusId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedAuthors.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No authors found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}