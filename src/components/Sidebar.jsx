import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '🏠'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: '👤'
    },
    {
      name: 'Products',
      path: '/products',
      icon: '🛒'
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: '📦'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: '⚙️'
    }
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Menu</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition duration-200 ${
                    location.pathname === item.path
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
