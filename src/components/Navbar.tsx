import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Cpu,
  Store as StoreIcon,
  GitCompare,
  Wrench,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: '/catalogue', label: 'Catalogue', icon: Cpu },
  { to: '/builder', label: 'PC Builder', icon: Wrench },
  { to: '/compare', label: 'Compare', icon: GitCompare },
  { to: '/store', label: 'EQ SENSE Store', icon: StoreIcon },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, dispatch } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-glow-gold"
              >
                <span className="text-charcoal-950 font-bold text-lg font-display">EQ</span>
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-semibold tracking-tight text-ivory-100 group-hover:text-gold-300 transition-colors">
                  Computer Solutions
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-400/80 -mt-0.5">
                  × EQ SENSE
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                const Icon = link.icon;
                return (
                  <Link key={link.to} to={link.to}>
                    <motion.span
                      whileHover={{ y: -1 }}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'text-gold-300'
                          : 'text-ivory-200/70 hover:text-ivory-100'
                      }`}
                    >
                      <Icon size={16} />
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-gold-500/10 border border-gold-500/20 rounded-lg -z-10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/catalogue"
                className="p-2.5 rounded-xl text-ivory-200/70 hover:text-ivory-100 hover:bg-white/5 transition-colors hidden sm:flex"
                aria-label="Search products"
              >
                <Search size={20} />
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-ivory-200/70 hover:text-ivory-100 hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'TOGGLE' })}
                className="relative p-2.5 rounded-xl text-ivory-200/70 hover:text-ivory-100 hover:bg-white/5 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-gold-500 text-charcoal-950 rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-ivory-200/70 hover:text-ivory-100 hover:bg-white/5"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-charcoal-900 border-l border-white/10 z-[70] lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const active = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          active
                            ? 'bg-gold-500/15 text-gold-300 border border-gold-500/20'
                            : 'text-ivory-200 hover:bg-white/5'
                        }`}
                      >
                        <Icon size={20} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/10 text-xs text-ivory-300/50">
                Naza Market, Lalbagh · Lucknow
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
