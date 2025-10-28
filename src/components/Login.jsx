import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for form submission status
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api-natrualfarms-in.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Safely read response depending on content-type. Some servers return plain text for 404/500.
      const contentType = response.headers.get('content-type') || '';
      let result = null;

      if (contentType.includes('application/json')) {
        // Normal JSON response
        result = await response.json();
      } else {
        // Not JSON (e.g. plain text 'Not Found') — read text and wrap into an object
        const text = await response.text();
        // If non-ok, create an informative error object
        if (!response.ok) {
          // Throwing will be caught below and displayed to user
          throw new Error(`${response.status} ${response.statusText}: ${text}`);
        }
        // If it is ok but not JSON (rare), try to parse or set message
        try {
          result = JSON.parse(text);
        } catch {
          result = { message: text || 'Unexpected non-JSON response' };
        }
      }

      if (response.ok) {
        // result should be an object when OK
        toast.success('Login successful!');
        setMessage('');
        if (result && result.data) {
          localStorage.setItem('authToken', result.data.token);
          localStorage.setItem('userData', JSON.stringify(result.data.user));
        }
        setFormData({ email: '', password: '' });
        navigate('/dashboard', { replace: true });
      } else {
        // response.ok false but we didn't throw earlier (shouldn't happen often)
        const errMsg = (result && (result.message || result.error)) || 'Login failed';
        toast.error(`Error: ${errMsg}`);
        setMessage('');
      }
    } catch (err) {
      // Common root causes: 404 (Not Found), 500, CORS preflight failure, network error
      console.error('Login request failed:', err);
      // If server returned plain 'Not Found', err.message will contain that text now
      const display = err.message || 'Something went wrong. Please try again.';
      toast.error(`Error: ${display}`);
      setMessage('');
      // Helpful developer hint printed to console
      // If you keep getting 404 / "Not Found", check the backend URL and that the backend server is running.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">NaturalFarms - Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
