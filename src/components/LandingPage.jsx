import { Link } from 'react-router-dom'; // For navigation to signup page
import logo from '../assets/logo.png'; // Import the logo
import Products from './Products'; // Import the Products component

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="NaturalFarms Logo" className="h-17 w-23 mr-3" />
            <h1 className="text-3xl font-bold text-green-700">NaturalFarms</h1>
          </div>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition">Products</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition">Contact</Link>
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Fresh, Organic, Delivered</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the finest organic products straight from nature's bounty. Join thousands of happy customers enjoying farm-fresh goodness at your doorstep.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose NaturalFarms?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-6xl mb-4">🌱</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">100% Organic</h4>
              <p className="text-gray-600">All our products are sourced from certified organic farms, ensuring purity and sustainability.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-6xl mb-4">🚚</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h4>
              <p className="text-gray-600">Fresh products delivered to your door within hours of harvest, maintaining peak freshness.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-6xl mb-4">💚</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Health Focused</h4>
              <p className="text-gray-600">Nutrient-rich, chemical-free foods that support your healthy lifestyle and well-being.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Organic Journey?</h3>
          <p className="text-xl mb-8">Join our community of health-conscious consumers today.</p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Sign Up Now
          </Link>
        </div>
        
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">NaturalFarms</h4>
              <p className="text-gray-400">
                Your trusted source for fresh, organic products delivered straight from the farm.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition">Products</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white transition">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white transition">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: support@naturalfarms.in</p>
              <p className="text-gray-400">Phone: +91 9876543210</p>
              <p className="text-gray-400">Address: 123 MG Road, Bengaluru, Karnataka 560001</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            &copy; {new Date().getFullYear()} NaturalFarms. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
