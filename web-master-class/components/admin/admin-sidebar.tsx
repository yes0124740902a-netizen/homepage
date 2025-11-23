'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';

const sidebarItems = [
  {
    title: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: '사용자 관리',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: '상품 관리',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: '주문 관리',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: '시스템 설정',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/admin/login');
    window.location.reload();
  };

  return (
    <div className="bg-gray-800 text-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">관리자 페이지</h2>
        <p className="text-sm text-gray-400 mt-1">웹마스터 클래스</p>
      </div>

      <nav className="flex-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">로그아웃</span>
        </button>
      </div>
    </div>
  );
}
