import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Star, Navigation, MessageCircle } from 'lucide-react';

export default function Store() {
  return (
    <div className="pt-24 section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gold-500/10 border border-gold-500/20 text-gold-300 mb-5">
            Local Store · Since 2017
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Visit <span className="text-gradient">EQ SENSE</span>
          </h1>
          <p className="text-ivory-300/70 max-w-xl mx-auto">
            Experience components in person, get expert advice, and walk out with a fully built system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="glass p-8 rounded-2xl space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gold-500/15 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-gold-400" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Address</h3>
                <p className="text-sm text-ivory-300/70 leading-relaxed">
                  4, Ground Floor, Naza Building
                  <br />
                  Naza Market, Lalbagh
                  <br />
                  Lucknow, Uttar Pradesh 226001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gold-500/15 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-gold-400" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Hours</h3>
                <p className="text-sm text-ivory-300/70">Monday – Saturday · 11:00 AM – 8:00 PM</p>
                <p className="text-xs text-ivory-400/50 mt-0.5">Closed on Sundays & major holidays</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gold-500/15 flex items-center justify-center shrink-0">
                <Star size={20} className="text-gold-400" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i <= 4 ? 'fill-gold-400 text-gold-400' : 'text-ivory-400/30'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-ivory-300/70">4.2 · IndiaMART verified</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="glass p-8 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold mb-2">Get in touch</h3>
              <p className="text-sm text-ivory-300/60 mb-6">
                Call or message for availability, custom quotes, or build consultations.
              </p>
            </div>

            <div className="space-y-3">
              <motion.a
                href="tel:+917570020500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center"
              >
                <Phone size={18} />
                +91 75700 20500
              </motion.a>
              <motion.a
                href="mailto:eqsense@outlook.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary w-full justify-center"
              >
                <Mail size={18} />
                eqsense@outlook.com
              </motion.a>
              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=Naza+Market+Lalbagh+Lucknow"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary w-full justify-center"
              >
                <Navigation size={18} />
                Open in Maps
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-white/10 aspect-[21/9] bg-charcoal-800 relative"
        >
          <iframe
            title="EQ SENSE location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d80.93!3d26.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzI0LjAiTiA4MMKwNTUnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
            className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-xl text-sm">
            Naza Market, Lalbagh · Lucknow
          </div>
        </motion.div>
      </div>
    </div>
  );
}
