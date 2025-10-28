import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://api-natrualfarms-in.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (response.ok) {
          setUser(result.user);
        } else {
          toast.error(`Error: ${result.message || 'Failed to fetch profile'}`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message || 'Something went wrong'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile not found</h2>
          <p className="text-gray-600">Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <p className="text-lg text-gray-900">{user.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-lg text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <p className="text-lg text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="text-lg text-gray-900">
                  <p>{user.address?.street}</p>
                  <p>{user.address?.city}, {user.address?.state}</p>
                  <p>{user.address?.pincode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
