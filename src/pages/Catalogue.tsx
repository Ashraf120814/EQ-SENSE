import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { products, categories, brands, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Catalogue() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState(70000);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (brandFilter.length) list = list.filter((p) => brandFilter.includes(p.brand));
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [search, category, brandFilter, sort, priceMax]);

  const toggleBrand = (b: string) => {
    setBrandFilter((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Catalogue</h1>
          <p className="text-ivory-300/60">Browse premium components for your next build</p>
        </motion.div>

        {/* Search & controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-400/50"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands, tags..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-ivory-100 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-500/40 focus:ring-1 focus:ring-gold-500/20 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-gold-500/40"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary px-4"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={`${
              showFilters ? 'fixed inset-0 z-50 bg-charcoal-950 p-6 overflow-y-auto' : 'hidden'
            } lg:block lg:relative lg:w-64 shrink-0 space-y-8`}
          >
            {showFilters && (
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={22} />
                </button>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-ivory-200 mb-3">Category</h3>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === c.id
                        ? 'bg-gold-500/15 text-gold-300 border border-gold-500/20'
                        : 'text-ivory-300/70 hover:bg-white/5'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-ivory-200 mb-3">
                Max Price: {formatPrice(priceMax)}
              </h3>
              <input
                type="range"
                min={5000}
                max={70000}
                step={1000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-ivory-200 mb-3">Brand</h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {brands.map((b) => (
                  <label
                    key={b}
                    className="flex items-center gap-2 text-sm text-ivory-300/70 cursor-pointer hover:text-ivory-200"
                  >
                    <input
                      type="checkbox"
                      checked={brandFilter.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="rounded border-white/20 bg-white/5 text-gold-500 focus:ring-gold-500/30"
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            {(brandFilter.length > 0 || category !== 'all' || priceMax < 70000) && (
              <button
                onClick={() => {
                  setBrandFilter([]);
                  setCategory('all');
                  setPriceMax(70000);
                }}
                className="text-sm text-gold-400 hover:text-gold-300"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-sm text-ivory-400/50 mb-6">
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-ivory-400/50">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
