import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png'; 
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* increased navbar height and slightly wider logo while keeping colors the same */}
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            {/* responsive logo sizing: small on mobile, larger on md+ */}
            <img src={logo} alt="NaturalFarms Logo" className="h-17 w-23 mr-3" />
            <h1 className="text-2xl font-bold">NaturalFarms</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome to Dashboard</span>
            <button
              onClick={handleLogout}
              className="bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-md text-sm font-medium transition duration-200"
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
