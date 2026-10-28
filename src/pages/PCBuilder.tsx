import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Fan, Zap, Box, Plus, Trash2 } from 'lucide-react';
import { products, formatPrice, Product } from '../data/products';
import { useCart } from '../context/CartContext';

const slots = [
  { key: 'cpu', label: 'Processor', icon: Cpu, category: 'cpu' },
  { key: 'gpu', label: 'Graphics Card', icon: Monitor, category: 'gpu' },
  { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard, category: 'motherboard' },
  { key: 'memory', label: 'Memory', icon: MemoryStick, category: 'memory' },
  { key: 'storage', label: 'Storage', icon: HardDrive, category: 'storage' },
  { key: 'cooling', label: 'Cooling', icon: Fan, category: 'cooling' },
  { key: 'psu', label: 'Power Supply', icon: Zap, category: 'psu' },
  { key: 'case', label: 'Case', icon: Box, category: 'case' },
] as const;

type SlotKey = (typeof slots)[number]['key'];

export default function PCBuilder() {
  const [selected, setSelected] = useState<Partial<Record<SlotKey, Product>>>({});
  const [activeSlot, setActiveSlot] = useState<SlotKey | null>(null);
  const { dispatch } = useCart();

  const total = useMemo(
    () => Object.values(selected).reduce((sum, p) => sum + (p?.price || 0), 0),
    [selected]
  );

  const options = activeSlot
    ? products.filter((p) => p.category === slots.find((s) => s.key === activeSlot)?.category)
    : [];

  const addAllToCart = () => {
    Object.values(selected).forEach((p) => {
      if (p) dispatch({ type: 'ADD', product: p });
    });
  };

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">PC Builder</h1>
          <p className="text-ivory-300/60">
            Select compatible components and watch your build come together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {slots.map((slot, i) => {
              const Icon = slot.icon;
              const chosen = selected[slot.key];
              return (
                <motion.div
                  key={slot.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    activeSlot === slot.key
                      ? 'border-gold-500/40 bg-gold-500/10'
                      : chosen
                      ? 'border-white/10 bg-white/5'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/5'
                  }`}
                  onClick={() => setActiveSlot(slot.key)}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      chosen ? 'bg-gold-500/20 text-gold-300' : 'bg-white/5 text-ivory-400/50'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-ivory-400/50">
                      {slot.label}
                    </p>
                    {chosen ? (
                      <p className="font-medium truncate">{chosen.name}</p>
                    ) : (
                      <p className="text-sm text-ivory-400/40">Select a component</p>
                    )}
                  </div>
                  {chosen ? (
                    <div className="flex items-center gap-3">
                      <span className="text-gold-300 font-medium text-sm">
                        {formatPrice(chosen.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected((s) => {
                            const next = { ...s };
                            delete next[slot.key];
                            return next;
                          });
                        }}
                        className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <Plus size={18} className="text-ivory-400/40" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Summary + selector */}
          <div className="space-y-6">
            <motion.div
              layout
              className="glass p-6 rounded-2xl sticky top-24"
            >
              <h3 className="font-display text-xl font-semibold mb-4">Build Summary</h3>
              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                {Object.entries(selected).length === 0 ? (
                  <p className="text-sm text-ivory-400/50">No components selected yet</p>
                ) : (
                  Object.entries(selected).map(([k, p]) =>
                    p ? (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-ivory-300/70 truncate mr-2">{p.name}</span>
                        <span className="text-gold-300 shrink-0">{formatPrice(p.price)}</span>
                      </div>
                    ) : null
                  )
                )}
              </div>
              <div className="flex justify-between items-baseline border-t border-white/10 pt-4 mb-5">
                <span className="text-ivory-300/70">Estimated Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1, color: '#c9a15a' }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-semibold text-gold-300"
                >
                  {formatPrice(total)}
                </motion.span>
              </div>
              <button
                onClick={addAllToCart}
                disabled={Object.keys(selected).length === 0}
                className="btn-primary w-full disabled:opacity-40"
              >
                Add Build to Cart
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeSlot && (
                <motion.div
                  key={activeSlot}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass p-4 rounded-2xl max-h-80 overflow-y-auto"
                >
                  <h4 className="text-sm font-medium mb-3 capitalize">
                    Choose {slots.find((s) => s.key === activeSlot)?.label}
                  </h4>
                  <div className="space-y-2">
                    {options.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelected((s) => ({ ...s, [activeSlot]: p }));
                          setActiveSlot(null);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all text-left"
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{p.name}</p>
                          <p className="text-xs text-gold-300">{formatPrice(p.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
