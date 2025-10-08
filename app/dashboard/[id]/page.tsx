'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Building, Hash, BookOpen, TrendingUp, Award } from 'lucide-react';
import Layout from '@/components/Layout';
import MetricCard from '@/components/MetricCard';
import CitationChart from '@/components/CitationChart';
import { MOCK_AUTHORS } from '@/lib/data';

export default function AuthorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const authorId = params.id as string;

  const author = useMemo(() => {
    return MOCK_AUTHORS.find(a => a.id === authorId);
  }, [authorId]);

  if (!author) {
    return (
      <Layout>
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Author not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The requested author profile could not be found.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
            <p className="mt-1 text-sm text-gray-600">Author Profile</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{author.name}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{author.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  <span className="font-mono">Scopus ID: {author.scopusId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="H-Index"
            value={author.hIndex}
            icon={<Award className="w-5 h-5" />}
            subtitle="Research impact measure"
          />
          <MetricCard
            title="Total Citations"
            value={author.totalCitations.toLocaleString()}
            icon={<TrendingUp className="w-5 h-5" />}
            subtitle="All publications combined"
          />
          <MetricCard
            title="Documents"
            value={author.documentsCount}
            icon={<BookOpen className="w-5 h-5" />}
            subtitle="Published research papers"
          />
        </div>

        {/* Charts and Publications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Citation Chart */}
          <CitationChart data={author.citationHistory} />

          {/* Publications List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Publications</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {author.publications.map((pub) => (
                <div key={pub.id} className="border-l-4 border-indigo-200 pl-4 py-2">
                  <h4 className="font-medium text-gray-900 text-sm leading-relaxed">
                    {pub.title}
                  </h4>
                  <div className="mt-2 space-y-1 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pub.journal}</span>
                      <span className="text-gray-500">{pub.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{pub.citations} citations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {author.publications.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No publications available</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Publication Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {author.publications.length}
              </div>
              <div className="text-sm text-gray-600">Tracked Publications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.round(author.totalCitations / author.publications.length) || 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Citations per Paper</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {new Date().getFullYear() - Math.min(...author.publications.map(p => p.year)) + 1}
              </div>
              <div className="text-sm text-gray-600">Years Active</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}