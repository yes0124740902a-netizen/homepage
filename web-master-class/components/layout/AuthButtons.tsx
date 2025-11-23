'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, LogOut, Settings, ShoppingBag } from 'lucide-react';
import type { User } from '@/types';

interface AuthButtonsProps {
  mobile?: boolean;
}

export default function AuthButtons({ mobile = false }: AuthButtonsProps) {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
    window.dispatchEvent(new Event('storage')); // Trigger navigation update
  };

  if (user) {
    // Logged in state
    return (
      <div className={`relative ${mobile ? 'w-full' : ''}`} ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 font-medium px-4 py-2 rounded-lg transition-all shadow-sm ${
            mobile ? 'w-full justify-center' : ''
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>{user.name}</span>
        </button>

        {dropdownOpen && (
          <div
            className={`absolute ${
              mobile ? 'left-0 right-0' : 'right-0'
            } mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl min-w-[200px] overflow-hidden`}
          >
            <Link
              href="/mypage/profile"
              className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <UserIcon className="w-4 h-4" />
              <span>내 정보</span>
            </Link>
            <Link
              href="/mypage/orders"
              className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>주문내역</span>
            </Link>
            <Link
              href="/mypage/settings"
              className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors border-t border-gray-100"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Not logged in state
  return (
    <div className={`flex items-center gap-4 ${mobile ? 'flex-col w-full' : ''}`}>
      <Link href="/login">
        <button
          className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
            mobile ? 'w-full text-center py-2' : ''
          }`}
        >
          로그인
        </button>
      </Link>
      <Link href="/signup">
        <button
          className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 font-medium px-4 py-2 rounded-lg transition-all shadow-sm ${
            mobile ? 'w-full' : ''
          }`}
        >
          회원가입
        </button>
      </Link>
    </div>
  );
}
