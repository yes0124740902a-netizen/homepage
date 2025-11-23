'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import AuthButtons from './AuthButtons';

const publicNavigationItems = [
  { name: '홈', href: '/' },
  { name: '회사소개', href: '/about' },
  { name: '상품', href: '/products' },
];

const loggedInNavigationItems = [
  { name: '홈', href: '/' },
  { name: '회사소개', href: '/about' },
  { name: '상품', href: '/products' },
  { name: '마이페이지', href: '/mypage' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        console.log('Header checkAuth - user:', user ? 'found' : 'not found');
        setIsLoggedIn(!!user);
      }
    };

    // Check immediately on mount
    checkAuth();

    // Set up polling to check every 500ms (in case storage event doesn't fire)
    const pollInterval = setInterval(checkAuth, 500);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkAuth);
    window.addEventListener('userLogin', checkAuth);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('userLogin', checkAuth);
    };
  }, []);

  const navigationItems = isLoggedIn ? loggedInNavigationItems : publicNavigationItems;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg'
          : 'bg-white/85 backdrop-blur-md shadow-md'
      } border-b border-white/30`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
              웹마스터 클래스
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <AuthButtons />
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4">
                <AuthButtons mobile />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
