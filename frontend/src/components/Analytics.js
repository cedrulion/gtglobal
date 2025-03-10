import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F0DB4F', '#A833FF'];

const Analytics = () => {
  const { shortCode } = useParams();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/url/analytics/${shortCode}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortCode]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-orange-500">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  const formatDataForChart = (data) => {
    if (!data) return [];
    const counts = data.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([key, value], index) => ({ name: key, value, color: COLORS[index % COLORS.length] }));
  };

  const referrerData = formatDataForChart(analyticsData?.referrers);
  const deviceData = formatDataForChart(analyticsData?.devices);
  const browserData = formatDataForChart(analyticsData?.browsers);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Analytics for {shortCode}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[{ title: 'Referrers', data: referrerData }, { title: 'Devices', data: deviceData }, { title: 'Browsers', data: browserData }].map((chart, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-orange-500 mb-4">{chart.title}</h2>
            {chart.data.length > 0 ? (
              <PieChart width={250} height={250}>
                <Pie data={chart.data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                  {chart.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p className="text-gray-400">No data available.</p>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => window.history.back()} className="mt-8 bg-orange-500 px-6 py-2 rounded hover:bg-orange-600">
        Go Back
      </button>
    </div>
  );
};

export default Analytics;
