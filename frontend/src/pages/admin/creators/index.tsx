import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Creator {
  id: number;
  name: string;
  email: string;
  bio: string;
  followers: number;
  engagement: number;
  niches: string[];
  platforms: string[];
  rate: number;
  verified: boolean;
  profilePictureUrl?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

export default function CreatorsPage() {
  const router = useRouter();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNiche, setFilterNiche] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCreators(data);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = filterNiche === 'all' || creator.niches.includes(filterNiche);
    const matchesPlatform = filterPlatform === 'all' || creator.platforms.includes(filterPlatform);
    return matchesSearch && matchesNiche && matchesPlatform;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading creators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Creators</h1>
            <p className="text-gray-600">Manage your creator network</p>
          </div>
          <Link
            href="/admin/creators/import"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            + Import Creator
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niche
              </label>
              <select
                value={filterNiche}
                onChange={(e) => setFilterNiche(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Niches</option>
                <option value="fashion">Fashion</option>
                <option value="fitness">Fitness</option>
                <option value="beauty">Beauty</option>
                <option value="food">Food</option>
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Creators</p>
            <p className="text-3xl font-bold text-purple-600">{creators.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Verified</p>
            <p className="text-3xl font-bold text-green-600">
              {creators.filter(c => c.verified).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Avg Followers</p>
            <p className="text-3xl font-bold text-blue-600">
              {creators.length > 0
                ? Math.round(creators.reduce((sum, c) => sum + c.followers, 0) / creators.length).toLocaleString()
                : '0'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Showing</p>
            <p className="text-3xl font-bold text-gray-900">{filteredCreators.length}</p>
          </div>
        </div>

        {/* Creators Grid */}
        {filteredCreators.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
            <p className="text-gray-600 mb-4">Get started by importing your first creator</p>
            <Link
              href="/admin/creators/import"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Import Creator
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map(creator => (
              <Link
                key={creator.id}
                href={`/admin/creators/${creator.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={creator.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=9333ea&color=fff`}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{creator.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{creator.email}</p>
                      {creator.verified && (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{creator.bio}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Followers</p>
                      <p className="text-lg font-bold text-blue-600">
                        {creator.followers.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600">Engagement</p>
                      <p className="text-lg font-bold text-green-600">
                        {creator.engagement}%
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {creator.niches.slice(0, 3).map(niche => (
                      <span
                        key={niche}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded"
                      >
                        {niche}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex gap-2">
                      {creator.platforms.map(platform => (
                        <span key={platform} className="text-gray-600 text-sm capitalize">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${creator.rate}/post
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
