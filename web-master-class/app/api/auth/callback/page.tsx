'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Save user to localStorage for consistency with existing app flow
      const userData = {
        id: session.user.id || session.user.email?.replace('@', '_').replace(/\./g, '_') || '',
        name: session.user.name || '',
        email: session.user.email || '',
        provider: 'google' as const,
        joinDate: new Date().toISOString(),
        grade: 'Silver',
        image: session.user.image || '',
      };

      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to home
      setTimeout(() => {
        router.push('/');
        window.location.reload();
      }, 500);
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
