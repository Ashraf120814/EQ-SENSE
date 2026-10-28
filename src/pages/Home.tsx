import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Cpu, Shield, Truck, Wrench, Star, MapPin } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const featured = products.filter((p) => p.featured).slice(0, 4);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 3D hero pointer tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 20 });
  const springY = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleHeroMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="relative min-h-[92vh] flex items-center overflow-hidden pt-20"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-gold-300 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Premium PC Hardware · Lucknow
            </motion.span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
              Build the PC
              <br />
              <span className="text-gradient">of your dreams</span>
            </h1>

            <p className="text-lg text-ivory-300/70 max-w-lg mb-8 leading-relaxed">
              Computer Solutions × EQ SENSE delivers genuine components, expert custom builds, and
              local support from the heart of Naza Market.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/catalogue">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                >
                  Explore Catalogue
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/builder">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary"
                >
                  <Wrench size={18} />
                  Start Building
                </motion.button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm">
              {[
                { icon: Shield, label: 'Genuine Parts' },
                { icon: Truck, label: 'Local Pickup' },
                { icon: Star, label: 'Expert Advice' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-ivory-300/60">
                  <item.icon size={16} className="text-gold-400" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Hero Visual */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
            className="relative hidden lg:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 80 }}
              className="relative"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Layered cards */}
                <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-charcoal-700/80 to-charcoal-900 border border-white/10 shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=800&fit=crop"
                    alt="Premium GPU"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-2 glass px-4 py-2.5 rounded-xl"
                  style={{ transform: 'translateZ(80px)' }}
                >
                  <p className="text-xs text-ivory-300/70">RTX 4070 Super</p>
                  <p className="text-sm font-semibold text-gold-300">₹58,999</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-2 -left-4 glass px-4 py-2.5 rounded-xl"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-gold-400" />
                    <span className="text-xs font-medium">Ryzen 7 7800X3D</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute top-1/3 -left-8 glass px-3 py-2 rounded-lg"
                  style={{ transform: 'translateZ(100px)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <Star size={12} className="fill-gold-400 text-gold-400" />
                    <span className="text-xs font-semibold">4.9</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
                Featured Hardware
              </h2>
              <p className="text-ivory-300/60">Hand-picked components for elite builds</p>
            </div>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200 transition-colors"
            >
              View all products <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3">
              Why builders choose us
            </h2>
            <p className="text-ivory-300/60 max-w-xl mx-auto">
              Local expertise, authentic parts, and builds that last.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: '100% Genuine',
                desc: 'Sealed boxes, GST invoices, and authorized brand channels only.',
              },
              {
                icon: Wrench,
                title: 'Expert Assembly',
                desc: 'Stress-tested custom builds tailored to gaming, creation, or productivity.',
              },
              {
                icon: MapPin,
                title: 'Lucknow Store',
                desc: 'Visit EQ SENSE at Naza Market for hands-on advice and instant pickup.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -4 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-ivory-300/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Store */}
      <section className="section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-charcoal-800/80 to-charcoal-900 p-10 md:p-14"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3">
                Visit EQ SENSE
              </h2>
              <p className="text-ivory-300/70 max-w-md">
                Walk into our Naza Market store for personalized recommendations, live demos, and
                same-day pickup.
              </p>
            </div>
            <Link to="/store">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary whitespace-nowrap"
              >
                Store Details
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
