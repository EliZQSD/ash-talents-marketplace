import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [creators, setCreators] = useState<any>([]);
  const [brands, setBrands] = useState([<any>]);
  const [deals, setDeals] = useState<any>([]);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchData(token);
  }, [tab]);

  const fetchData = async (token: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [stats, creators, brands, deals] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/deals/stats`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/creators`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/deals`, { headers }),
      ]);
      setStats(stats.data);
      setCreators(creators.data);
      setBrands(brands.data);
      setDeals(deals.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">ASH Talents Admin</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {tab === 'overview' && stats && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Deals</h3>
              <p className="text-4xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Completed</h3>
              <p className="text-4xl font-bold">{stats.completed}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Revenue</h3>
              <p className="text-4xl font-bold">${(stats.revenue / 100).toFixed(0)}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-6 border-b">
          {['overview', 'creators', 'brands', 'deals'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-4 font-semibold ${
                tab === t ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {tab === 'creators' && (
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Followers</th>
                </tr>
              </thead>
              <tbody>
                {creators.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2">{c.email}</td>
                    <td className="py-2">{c.followers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'brands' && (
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Industry</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{b.name}</td>
                    <td className="py-2">{b.email}</td>
                    <td className="py-2">{b.industry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'deals' && (
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Creator ID</th>
                  <th className="text-left py-2">Brand ID</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{d.creatorId.slice(0, 8)}</td>
                    <td className="py-2">{d.brandId.slice(0, 8)}</td>
                    <td className="py-2">${d.amount}</td>
                    <td className="py-2">{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
