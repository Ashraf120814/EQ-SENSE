import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: 'CLOSE' })}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-charcoal-900 border-l border-white/10 z-[90] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold-400" />
                <h2 className="font-display text-xl font-semibold">Your Cart</h2>
                <span className="text-sm text-ivory-400/60">({totalItems})</span>
              </div>
              <button
                onClick={() => dispatch({ type: 'CLOSE' })}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag size={48} className="text-ivory-400/30 mb-4" />
                  <p className="text-ivory-300/70 mb-6">Your cart is empty</p>
                  <Link
                    to="/catalogue"
                    onClick={() => dispatch({ type: 'CLOSE' })}
                    className="btn-primary"
                  >
                    Browse Catalogue
                  </Link>
                </div>
              ) : (
                state.items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                      <p className="text-gold-300 text-sm font-semibold mt-0.5">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QTY',
                              id: item.product.id,
                              quantity: item.quantity - 1,
                            })
                          }
                          className="p-1 rounded-md bg-white/5 hover:bg-white/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QTY',
                              id: item.product.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="p-1 rounded-md bg-white/5 hover:bg-white/10"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE', id: item.product.id })}
                          className="ml-auto p-1.5 rounded-md text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {state.items.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-ivory-300/70">Subtotal</span>
                  <span className="font-semibold text-gold-300">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-ivory-400/50">
                  Taxes & shipping calculated at checkout. Visit EQ SENSE store for pickup.
                </p>
                <button className="btn-primary w-full py-3.5">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => dispatch({ type: 'CLEAR' })}
                  className="w-full text-sm text-ivory-400/60 hover:text-ivory-300 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
