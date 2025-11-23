'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShoppingBag, Settings } from 'lucide-react';

const sidebarItems = [
  {
    title: '마이페이지',
    href: '/mypage',
    icon: Home,
  },
  {
    title: '내 정보',
    href: '/mypage/profile',
    icon: User,
  },
  {
    title: '주문내역',
    href: '/mypage/orders',
    icon: ShoppingBag,
  },
  {
    title: '설정',
    href: '/mypage/settings',
    icon: Settings,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 transition-colors border-l-2 ${
              isActive
                ? 'bg-purple-50 text-purple-600 border-purple-600 font-medium'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-transparent'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
