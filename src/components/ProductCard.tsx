import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      className="group relative"
    >
      <div
        className={`card-3d h-full flex flex-col transition-all duration-500 ${
          hovered ? 'shadow-glow-gold border-gold-500/20' : ''
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />

          {discount > 0 && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold bg-gold-500 text-charcoal-950 rounded-lg">
              -{discount}%
            </span>
          )}

          {product.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
              Featured
            </span>
          )}

          {/* Quick actions */}
          <div
            className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${
              hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Link
              to={`/product/${product.id}`}
              className="p-2.5 rounded-xl bg-charcoal-900/80 backdrop-blur-md border border-white/10 text-ivory-100 hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
              aria-label="View details"
            >
              <Eye size={16} />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'ADD', product });
              }}
              className="p-2.5 rounded-xl bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-medium">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs text-ivory-300/70">
              <Star size={12} className="fill-gold-400 text-gold-400" />
              <span>{product.rating}</span>
              <span className="text-ivory-400/40">({product.reviews})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-ivory-100 leading-snug line-clamp-2 hover:text-gold-300 transition-colors mb-2">
              {product.name}
            </h3>
          </Link>

          <div className="mt-auto flex items-end justify-between gap-2">
            <div>
              <p className="text-lg font-semibold text-gold-300">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-xs text-ivory-400/50 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
            <span
              className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded ${
                product.inStock
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-red-500/15 text-red-400'
              }`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
