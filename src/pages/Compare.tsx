import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Star } from 'lucide-react';
import { products, formatPrice, Product } from '../data/products';

export default function Compare() {
  const [selected, setSelected] = useState<Product[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const add = (p: Product) => {
    if (selected.length >= 3 || selected.find((x) => x.id === p.id)) return;
    setSelected((s) => [...s, p]);
    setPickerOpen(false);
  };

  const remove = (id: string) => setSelected((s) => s.filter((p) => p.id !== id));

  const allKeys = Array.from(
    new Set(selected.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Compare</h1>
          <p className="text-ivory-300/60">Side-by-side comparison of up to 3 products</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[0, 1, 2].map((i) => {
            const p = selected[i];
            return (
              <motion.div
                key={i}
                layout
                className="min-h-[200px] rounded-2xl border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center p-6 relative"
              >
                <AnimatePresence mode="wait">
                  {p ? (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full text-center"
                    >
                      <button
                        onClick={() => remove(p.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 text-ivory-400/50"
                      >
                        <X size={16} />
                      </button>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-24 h-24 object-cover rounded-xl mx-auto mb-3"
                      />
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{p.name}</h3>
                      <p className="text-gold-300 font-semibold">{formatPrice(p.price)}</p>
                      <div className="flex items-center justify-center gap-1 mt-1 text-xs text-ivory-400/60">
                        <Star size={12} className="fill-gold-400 text-gold-400" />
                        {p.rating}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setPickerOpen(true)}
                      className="flex flex-col items-center gap-2 text-ivory-400/50 hover:text-gold-300 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full border border-dashed border-current flex items-center justify-center">
                        <Plus size={20} />
                      </div>
                      <span className="text-sm">Add product</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {selected.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto rounded-2xl border border-white/10"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left p-4 font-medium text-ivory-300/70">Spec</th>
                  {selected.map((p) => (
                    <th key={p.id} className="p-4 font-medium text-center min-w-[160px]">
                      {p.brand}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-ivory-400/60">Price</td>
                  {selected.map((p) => (
                    <td key={p.id} className="p-4 text-center text-gold-300 font-semibold">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-ivory-400/60">Rating</td>
                  {selected.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      {p.rating} ★
                    </td>
                  ))}
                </tr>
                {allKeys.map((key) => (
                  <tr key={key} className="border-b border-white/5">
                    <td className="p-4 text-ivory-400/60">{key}</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-4 text-center">
                        {p.specs[key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Picker modal */}
        <AnimatePresence>
          {pickerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPickerOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[70vh] overflow-y-auto bg-charcoal-900 border border-white/10 rounded-2xl z-50 p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Select a product</h3>
                  <button onClick={() => setPickerOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  {products
                    .filter((p) => !selected.find((s) => s.id === p.id))
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => add(p)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-left transition-colors"
                      >
                        <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-gold-300">{formatPrice(p.price)}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
