import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupRef = useRef(null);

  // Form state kept minimal (profile editing removed from navbar)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await fetch('https://api-natrualfarms-in.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (response.ok && result.success) {
          setUser(result.data);
        } else {
          console.error('Failed to fetch profile:', result);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  // Edit profile functionality removed from navbar (handled in full profile page)

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src={logo} alt="NaturalFarms Logo" className="h-17 w-23 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">NaturalFarms</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome to Dashboard</span>
              {user && (
                <div className="relative">
                  <button
                    onClick={toggleProfilePopup}
                    className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-200 border border-gray-200"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>

                  {showProfilePopup && (
                    <div
                      ref={popupRef}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl border border-gray-200 z-50"
                    >
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
                          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Phone</span>
                            <p className="text-sm font-medium text-gray-800">{user.phone}</p>
                          </div>
                          {user.address && (
                            <div>
                              <span className="text-xs text-gray-500 uppercase font-medium">Address</span>
                              <p className="text-sm font-medium text-gray-800">
                                {user.address.street}
                              </p>
                              <p className="text-sm text-gray-600">
                                {user.address.city}, {user.address.state} - {user.address.pincode}
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-xs text-gray-500 uppercase font-medium">Role</span>
                            <p className="text-sm font-medium text-gray-800 capitalize">{user.role}</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3 space-y-1">
                          <button
                            onClick={() => {
                              setShowProfilePopup(false);
                              navigate('/profile');
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition duration-200 font-medium"
                          >
                            View Full Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-200 font-medium"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!user && (
                <button
                  onClick={handleLogout}
                  className="bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Edit profile modal removed from navbar - profile editing handled on profile page */}
    </>
  );
}

export default Navbar;    