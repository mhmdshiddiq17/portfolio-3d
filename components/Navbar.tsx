'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work Experience', href: '#experience' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Me', href: '#contact' },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className={`w-3/4 max-w-[75rem] transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg shadow-cyan-500/10'
          : 'glass shadow-lg shadow-cyan-500/10'
      } rounded-2xl`}>
        <div className="flex items-center justify-between h-16 px-6 sm:px-8 lg:px-10">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="text-primary">mhmd</span>
            <span className="text-white">shiddiq</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                whileHover={{ scale: 1.1 }}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </motion.a>
            ))}

            {/* Login Button or User Menu */}
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-primary hover:text-white hover:glow-border transition-all duration-300"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/admin-login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-darker font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <LogIn size={18} />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-300 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Login Button */}
            {session ? (
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-400/5 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/admin-login"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-primary to-secondary text-darker"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
