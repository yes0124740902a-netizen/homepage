'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = () => {
      const user = localStorage.getItem('user');

      if (!user) {
        router.push('/admin/login');
        return;
      }

      const userData = JSON.parse(user);

      if (userData.role !== 'admin') {
        router.push('/');
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    };

    checkAdmin();
  }, [router]);

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
    return null;
  }

  return <>{children}</>;
}
