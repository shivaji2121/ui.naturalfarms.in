import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // products are now handled by the Products component

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('authToken');

    if (!token) {
      toast.error('No authentication token found. Please login again.');
      setLoading(false);
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
      setLoading(false);
    }

    // product fetching moved to Products component
  }, [navigate]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Products Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
            <p className="text-gray-600">Discover our range of fresh, organic products</p>
          </div>

          {/* Render products via the dedicated Products component (uses auth token) */}
          {/* Note: corrected unit and stock range so API can return matching products */}
          <Products fetchUrl={
            "https://api-natrualfarms-in.onrender.com/product?page=1&page_size=10"
          } />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
