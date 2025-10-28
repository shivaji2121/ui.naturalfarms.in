import { useState } from 'react';
import { toast } from 'react-toastify';

function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'pincode'].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (errors[`address.${name}`]) {
      setErrors({ ...errors, [`address.${name}`]: '' });
    }
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Registration successful!');
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          address: { street: '', city: '', state: '', pincode: '' },
        });
        setCurrentStep(1);
        setErrors({});
      } else {
        if (result.errors) {
          const errorMap = {};
          result.errors.forEach(error => {
            // For address fields, they come as 'address.pincode', etc.
            // We'll map them to the field names used in our form
            const fieldName = error.path;
            if (!errorMap[fieldName]) {
              errorMap[fieldName] = error.msg;
            } else {
              // If there are multiple errors for same field, show the first one
              // or you can concatenate them if you want to show all
              // errorMap[fieldName] += `, ${error.msg}`;
            }
          });
          setErrors(errorMap);
        } else {
          toast.error(`Error: ${result.message || 'Registration failed'}`);
        }
      }
    } catch (err) {
      toast.error(`Error: ${err.message || 'Something went wrong. Please try again.'}`);
    }
  };

  // Required fields for showing asterisks
  const requiredFields = {
    step1: ['name', 'email', 'password', 'phone'],
    step2: ['street', 'city', 'state', 'pincode']
  };

  const isFieldRequired = (fieldName) => {
    return requiredFields.step1.includes(fieldName) || requiredFields.step2.includes(fieldName);
  };

  // Helper function to get error for a field
  const getFieldError = (fieldName) => {
    return errors[fieldName] || errors[`address.${fieldName}`];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-4 px-4">
      <div className="bg-white p-4 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-2">NaturalFarms - Sign Up</h2>
          <div className="flex justify-center items-center space-x-3 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`h-0.5 w-12 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            {currentStep === 1 ? 'Personal Information' : 'Address Details'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name {isFieldRequired('name') && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('name') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                />
                {getFieldError('name') && <p className="text-red-500 text-sm mt-1">{getFieldError('name')}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address {isFieldRequired('email') && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('email') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your email"
                />
                {getFieldError('email') && <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password {isFieldRequired('password') && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('password') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Create a strong password"
                />
                {getFieldError('password') && <p className="text-red-500 text-sm mt-1">{getFieldError('password')}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number {isFieldRequired('phone') && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('phone') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your phone number"
                />
                {getFieldError('phone') && <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address {isFieldRequired('street') && <span className="text-red-500"></span>}
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('street') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter street address"
                />
                {getFieldError('street') && <p className="text-red-500 text-sm mt-1">{getFieldError('street')}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    City {isFieldRequired('city') && <span className="text-red-500"></span>}
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('city') ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="City"
                  />
                  {getFieldError('city') && <p className="text-red-500 text-sm mt-1">{getFieldError('city')}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                    State {isFieldRequired('state') && <span className="text-red-500"></span>}
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('state') ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="State"
                  />
                  {getFieldError('state') && <p className="text-red-500 text-sm mt-1">{getFieldError('state')}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode {isFieldRequired('pincode') && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ${getFieldError('pincode') ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter pincode"
                />
                {getFieldError('pincode') && <p className="text-red-500 text-sm mt-1">{getFieldError('pincode')}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-semibold"
              >
                Previous
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-semibold ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-semibold ml-auto"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;