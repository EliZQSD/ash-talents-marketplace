import { useState } from 'react';
import { useRouter } from 'next/router';

interface ImportedCreator {
  name: string;
  bio: string;
  followers: number;
  engagement: number;
  profilePictureUrl: string;
  handle: string;
  niche: string;
  platform: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

export default function ImportCreator() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [importedData, setImportedData] = useState<ImportedCreator | null>(null);

  const handleImport = async () => {
    if (!url.trim()) {
      setError('Please enter a URL or handle');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform }),
      });

      if (!response.ok) throw new Error('Failed to import profile');
      
      const data = await response.json();
      setImportedData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!importedData) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: importedData.name,
          email: `${importedData.handle.replace('@', '')}@creator.com`,
          bio: importedData.bio,
          followers: importedData.followers,
          engagement: importedData.engagement,
          niches: [importedData.niche],
          platforms: [importedData.platform],
          rate: 0,
          verified: false,
          profilePictureUrl: importedData.profilePictureUrl,
          instagramHandle: importedData.instagramHandle,
          tiktokHandle: importedData.tiktokHandle,
        }),
      });

      if (!response.ok) throw new Error('Failed to save creator');
      
      const saved = await response.json();
      router.push(`/admin/creators/${saved.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Import Creator Profile</h1>
          <p className="text-gray-600">Automatically import creator data from Instagram or TikTok</p>
        </div>

        {!importedData ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram/TikTok URL or Handle
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="@username or https://instagram.com/username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="instagram"
                      checked={platform === 'instagram'}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="mr-2"
                    />
                    Instagram
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="tiktok"
                      checked={platform === 'tiktok'}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="mr-2"
                    />
                    TikTok
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleImport}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? 'Importing...' : 'Import Profile'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Profile Preview</h2>
            
            <div className="flex items-start gap-6 mb-8">
              <img
                src={importedData.profilePictureUrl}
                alt={importedData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{importedData.name}</h3>
                <p className="text-purple-600 mb-2">{importedData.handle}</p>
                <p className="text-gray-600 text-sm">{importedData.bio}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Followers</p>
                <p className="text-2xl font-bold text-blue-600">
                  {importedData.followers.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Engagement</p>
                <p className="text-2xl font-bold text-green-600">
                  {importedData.engagement}%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Niche</p>
                <p className="text-2xl font-bold text-purple-600 capitalize">
                  {importedData.niche}
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? 'Saving...' : 'Confirm & Save Creator'}
              </button>
              <button
                onClick={() => setImportedData(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
