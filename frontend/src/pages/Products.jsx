import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import API from '../utils/api';

const categories = ['All', 'Outerwear', 'Shirts', 'Pants', 'Footwear', 'Athletic', 'Dresses'];

function ProductSkeleton() {
  return (
    <div className="card animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl min-h-[380px] flex flex-col">
      <div className="h-64 bg-slate-300 dark:bg-slate-700 w-full rounded-t-2xl" />
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3" />
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-5 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
        <div className="mt-auto flex gap-3">
          <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-xl flex-1" />
          <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-xl w-12" />
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { isDark } = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get('/products');
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category?.toLowerCase() === category.toLowerCase()));
    }
  };

  return (
    <>
      <SEO
        title="Products Catalog — TrialShopy | AR Try-On"
        description="Browse TrialShopy's premium fashion catalog. Try on items virtually in real-time before ordering."
      />

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-32 pb-16 text-center ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-32 -left-32 opacity-25" />
        <div className="orb orb-purple w-80 h-80 top-10 right-0 opacity-20" />
        <div className="container relative z-10">
          <span className="badge">✦ AR-Ready Catalog</span>
          <h1 className={`section-title font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Choose any item below and click "Try-On" to experience the magic of augmented reality.
          </p>
        </div>
      </section>

      {/* ─── Category & Grid ─── */}
      <section className={`py-12 ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          {/* Categories bar */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                    : isDark
                      ? 'bg-[#16213e] text-slate-300 hover:bg-white/10'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid display */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-rose-500 font-semibold mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-primary">Try Reloading</button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>No Products Found</h3>
              <p className="text-muted">No items found matching the "{selectedCategory}" category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <div
                  key={prod._id}
                  className={`card flex flex-col group relative overflow-hidden transition-all duration-300 border ${
                    isDark ? 'bg-[#16213e] border-white/5 hover:border-orange-500/20' : 'bg-white border-slate-100 hover:border-orange-500/20'
                  }`}
                >
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {prod.category}
                  </span>

                  {/* Image container */}
                  <div className="relative h-72 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <img
                      src={prod.imageUrl || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80'}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer"
                        title="Quick View"
                      >
                        👁️
                      </button>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`font-display font-bold text-lg mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {prod.name}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {prod.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ₹{prod.price?.toLocaleString('en-IN')}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="btn-primary py-2 px-4 text-sm font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          🔮 Try-On
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Product Detail & Try-On Modal ─── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div
            className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border ${
              isDark ? 'bg-[#0f0f1a] border-white/10' : 'bg-white border-slate-100'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer text-lg font-bold"
            >
              ✕
            </button>

            {/* Left - Image */}
            <div className="md:w-1/2 bg-slate-100 dark:bg-slate-900 h-72 md:h-auto min-h-[300px] flex items-center justify-center relative">
              <img
                src={selectedProduct.imageUrl || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'; }}
              />
              <span className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Category: {selectedProduct.category}
              </span>
            </div>

            {/* Right - Product Description */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <h2 className={`font-display font-black text-2xl md:text-3xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedProduct.name}
                </h2>
                <div className="text-2xl font-black gradient-text mb-4">
                  ₹{selectedProduct.price?.toLocaleString('en-IN')}
                </div>
                <div className={`leading-relaxed mb-6 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedProduct.description}
                </div>

                {/* Fit recommendations / info */}
                <div className={`p-4 rounded-2xl mb-8 border ${isDark ? 'bg-[#16213e]/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex gap-2 items-center mb-1">
                    <span className="text-emerald-500">🛡️</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>AI Try-On Ready</span>
                  </div>
                  <p className="text-xs text-muted">This item is pre-scanned and optimized for real-time 3D body overlay physics.</p>
                </div>
              </div>

              {/* AR Try-On Action button */}
              <div>
                <a
                  href={selectedProduct.tryOnLink || 'https://trialshopy-ar-demo.netlify.app'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  🔮 Open Virtual AR Try-On
                </a>
                <p className="text-center text-[10px] text-muted mt-2">
                  Opens TrialShopy AR environment in a new tab. Requires camera permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
