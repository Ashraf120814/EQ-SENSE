import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Check, Share2 } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 text-center section-padding">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Link to="/catalogue" className="btn-primary">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 text-sm text-ivory-400/70 hover:text-gold-300 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Catalogue
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-charcoal-800 border border-white/8"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-sm uppercase tracking-wider text-gold-400/80 font-medium">
              {product.brand} · {product.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-gold-400 text-gold-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-ivory-400/50 text-sm">({product.reviews} reviews)</span>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  product.inStock
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-red-500/15 text-red-400'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold text-gold-300">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-ivory-400/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-ivory-300/70 leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {Object.entries(product.specs).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <Check size={14} className="text-gold-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-ivory-400/50">{k}</p>
                    <p className="text-sm font-medium">{v}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => dispatch({ type: 'ADD', product })}
                disabled={!product.inStock}
                className="btn-primary flex-1 sm:flex-none disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>
              <button className="btn-secondary" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
