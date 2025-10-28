import { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api-natrualfarms-in.onrender.com/product', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        const productList = data.data?.products || data.products || data.data || [];
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="text-center text-red-600 mb-6 p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (!products || products.length === 0) ? (
          <div className="col-span-full text-center text-gray-600 py-8">No products found.</div>
        ) : (
          products.map((product) => (
            <div key={product._id || product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
                {product.isOrganic && (
                  <span className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Organic</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                {product.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                  <span className="text-sm text-gray-500">per {product.unit}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Stock: {product.stock}</div>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium">Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
