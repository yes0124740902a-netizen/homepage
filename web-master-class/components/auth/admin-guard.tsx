'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const checkAdmin = () => {
      try {
        // Only check on client-side
        if (typeof window === 'undefined') {
          return;
        }

        const user = localStorage.getItem('user');

        if (!user) {
          if (isMounted && !pathname.includes('/admin/login')) {
            setIsLoading(false);
            setIsAdmin(false);
            router.replace('/admin/login');
          } else if (pathname.includes('/admin/login')) {
            // On login page, don't show error message
            setIsLoading(false);
            setIsAdmin(false);
          }
          return;
        }

        const userData = JSON.parse(user);

        if (userData.role !== 'admin') {
          if (isMounted) {
            setIsLoading(false);
            setIsAdmin(false);
            if (!pathname.includes('/admin/login')) {
              router.replace('/');
            }
          }
          return;
        }

        if (isMounted) {
          setIsAdmin(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Admin check error:', error);
        if (isMounted) {
          setIsLoading(false);
          setIsAdmin(false);
          if (!pathname.includes('/admin/login')) {
            router.replace('/admin/login');
          }
        }
      }
    };

    // Small delay to ensure proper hydration
    const timer = setTimeout(checkAdmin, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-800 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">관리자 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">접근 권한이 없습니다.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
