import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-charcoal-950/80">
      <div className="max-w-7xl mx-auto section-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-charcoal-950 font-bold font-display">EQ</span>
              </div>
              <div>
                <span className="font-display text-lg font-semibold">Computer Solutions</span>
                <span className="block text-[10px] uppercase tracking-widest text-gold-400/70">
                  × EQ SENSE
                </span>
              </div>
            </div>
            <p className="text-sm text-ivory-300/60 leading-relaxed">
              Premium PC components and custom builds tailored to your needs. Building emotions
              since 2017.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-ivory-100 mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/catalogue', label: 'Catalogue' },
                { to: '/builder', label: 'PC Builder' },
                { to: '/compare', label: 'Compare Builds' },
                { to: '/store', label: 'Visit Store' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ivory-300/60 hover:text-gold-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-ivory-100 mb-4">Brands We Carry</h4>
            <p className="text-sm text-ivory-300/60 leading-relaxed">
              MSI · Gigabyte · ASUS · NZXT · HyperX · Logitech · Samsung · G.Skill · Corsair ·
              Lian Li · Intel · AMD · NVIDIA · LG
            </p>
          </div>

          <div>
            <h4 className="font-medium text-ivory-100 mb-4">Visit EQ SENSE</h4>
            <ul className="space-y-3 text-sm text-ivory-300/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>
                  4, Ground Floor, Naza Building
                  <br />
                  Naza Market, Lalbagh
                  <br />
                  Lucknow, UP 226001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold-400 shrink-0" />
                <a href="tel:+917570020500" className="hover:text-gold-300 transition-colors">
                  +91 75700 20500
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold-400 shrink-0" />
                <a
                  href="mailto:eqsense@outlook.com"
                  className="hover:text-gold-300 transition-colors"
                >
                  eqsense@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="text-gold-400 shrink-0" />
                <span>Mon–Sat · 11 AM – 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400/40">
          <p>© {new Date().getFullYear()} EQ SENSE · Computer Solutions. All rights reserved.</p>
          <p>GST Available · Genuine Parts · Expert Builds</p>
        </div>
      </div>
    </footer>
  );
}
