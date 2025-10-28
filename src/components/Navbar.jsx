import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">NaturalFarms</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome to Dashboard</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
