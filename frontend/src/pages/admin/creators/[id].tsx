import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminNav from '../../../components/AdminNav';

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

export default function CreatorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchCreator();
    }
  }, [id]);

  const fetchCreator = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/${id}`);
      if (!response.ok) throw new Error('Creator not found');
      const data = await response.json();
      setCreator(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this creator?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      router.push('/admin/creators');
    } catch (err) {
      alert('Failed to delete creator');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <AdminNav />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading creator...</p>
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Creator not found</h2>
          <p className="text-gray-600 mb-4">{error || 'This creator does not exist'}</p>
          <Link
            href="/admin/creators"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to Creators
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/creators"
            className="text-purple-600 hover:text-purple-700 font-semibold mb-4 inline-block"
          >
            ← Back to Creators
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{creator.name}</h1>
              <p className="text-gray-600">{creator.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/creators/edit/${id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <img
                  src={creator.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=9333ea&color=fff&size=200`}
                  alt={creator.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-gray-900 mb-1">{creator.name}</h2>
                {creator.verified && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    ✓ Verified Creator
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Email</span>
                  <span className="text-gray-900 font-medium">{creator.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Rate</span>
                  <span className="text-gray-900 font-medium">${creator.rate}/post</span>
                </div>
                {creator.instagramHandle && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Instagram</span>
                    <span className="text-purple-600 font-medium">{creator.instagramHandle}</span>
                  </div>
                )}
                {creator.tiktokHandle && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">TikTok</span>
                    <span className="text-purple-600 font-medium">{creator.tiktokHandle}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Platforms */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Platforms</h3>
              <div className="space-y-2">
                {creator.platforms.map(platform => (
                  <div
                    key={platform}
                    className="px-4 py-2 bg-purple-50 text-purple-800 rounded-lg font-medium capitalize"
                  >
                    {platform}
                  </div>
                ))}
              </div>
            </div>

            {/* Niches */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Niches</h3>
              <div className="flex flex-wrap gap-2">
                {creator.niches.map(niche => (
                  <span
                    key={niche}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full capitalize"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Bio */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Followers</p>
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {creator.followers.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Engagement</p>
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">{creator.engagement}%</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Rate per Post</p>
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900">${creator.rate}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed">{creator.bio}</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Deals</h3>
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No recent deals</p>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Overview</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
