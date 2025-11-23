'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthSuccess() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    console.log('AuthSuccess - Status:', status, 'Session:', session);

    if (status === 'authenticated' && session?.user && !redirecting) {
      setRedirecting(true);

      // Save user to localStorage
      const userData = {
        id: session.user.id || session.user.email?.replace('@', '_').replace(/\./g, '_') || Date.now().toString(),
        name: session.user.name || '',
        email: session.user.email || '',
        provider: 'google' as const,
        joinDate: new Date().toISOString(),
        grade: 'Silver',
        image: session.user.image || '',
      };

      console.log('Saving user to localStorage:', userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Verify it was saved
      const saved = localStorage.getItem('user');
      console.log('Verified saved user:', saved);

      // Trigger storage event for other components
      window.dispatchEvent(new Event('storage'));

      // Also dispatch a custom event
      window.dispatchEvent(new CustomEvent('userLogin', { detail: userData }));

      // Redirect to home after a short delay
      setTimeout(() => {
        console.log('Redirecting to home...');
        window.location.href = '/';
      }, 1000);
    } else if (status === 'unauthenticated' && !redirecting) {
      console.log('Unauthenticated, redirecting to login');
      router.push('/login');
    }
  }, [session, status, router, redirecting]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
        <p className="text-xl font-semibold">로그인 처리 중...</p>
        <p className="text-sm mt-2 opacity-80">잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
