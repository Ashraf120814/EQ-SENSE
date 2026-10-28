import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import PCBuilder from './pages/PCBuilder';
import Compare from './pages/Compare';
import Store from './pages/Store';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Ambient background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-charcoal-600/20 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/builder" element={<PCBuilder />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
