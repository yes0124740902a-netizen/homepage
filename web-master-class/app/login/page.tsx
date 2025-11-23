'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // Demo: Accept any credentials
    const user = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email: email,
      provider: 'email' as const,
      joinDate: new Date().toISOString(),
      grade: 'Silver',
    };

    // Always use localStorage for demo
    localStorage.setItem('user', JSON.stringify(user));

    setSuccess('로그인 성공! 메인 페이지로 이동합니다...');

    setTimeout(() => {
      router.push('/');
      window.location.reload(); // Force reload to update auth state
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Google login clicked');
      const result = await signIn('google', {
        redirect: true,
        callbackUrl: '/auth/success',
      });
    } catch (error) {
      console.error('Google login error:', error);
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleLogin();
    } else {
      setError(`${provider} 로그인 기능은 준비 중입니다.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent mb-2">
            웹마스터 클래스
          </h1>
          <p className="text-gray-600">다시 만나서 반가워요!</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google로 로그인</span>
          </button>

          <button
            onClick={() => handleSocialLogin('Kakao')}
            className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD835] py-3 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#000000" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.8-.7 3.2-.8 3.6 0 .1-.1.3 0 .4.1.1.2.1.4 0 .5-.2 3.7-2.4 4.3-2.8.4.1.9.1 1.3.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
            </svg>
            <span>카카오로 로그인</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">또는 이메일로 로그인</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
              />
              <span className="text-sm text-gray-600">로그인 상태 유지</span>
            </label>
            <Link href="#" className="text-sm text-purple-600 hover:text-purple-700">
              비밀번호 찾기
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-900 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="text-purple-600 font-semibold hover:text-purple-700">
            회원가입
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← 메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
