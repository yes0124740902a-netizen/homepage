'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    checkPasswordStrength(pwd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!terms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    const user = {
      id: Date.now().toString(),
      name: name,
      email: email,
      provider: 'email' as const,
      joinDate: new Date().toISOString(),
      grade: 'Bronze',
    };

    localStorage.setItem('user', JSON.stringify(user));
    setSuccess('회원가입이 완료되었습니다! 메인 페이지로 이동합니다...');

    setTimeout(() => {
      router.push('/');
      window.location.reload(); // Force reload to update auth state
    }, 1000);
  };

  const handleGoogleSignup = async () => {
    try {
      console.log('Google signup clicked');
      const result = await signIn('google', {
        redirect: true,
        callbackUrl: '/auth/success',
      });
    } catch (error) {
      console.error('Google signup error:', error);
      setError('가입 중 오류가 발생했습니다.');
    }
  };

  const handleSocialSignup = (provider: string) => {
    if (provider === 'Google') {
      handleGoogleSignup();
    } else {
      setError(`${provider} 가입 기능은 준비 중입니다.`);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthWidth = () => {
    if (passwordStrength === 0) return 'w-0';
    if (passwordStrength === 1) return 'w-1/4';
    if (passwordStrength === 2) return 'w-2/4';
    if (passwordStrength === 3) return 'w-3/4';
    return 'w-full';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent mb-2">
            웹마스터 클래스
          </h1>
          <p className="text-gray-600">비전공자를 위한 하루 완성 웹사이트 제작</p>
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

        {/* Social Signup */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialSignup('Google')}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google로 회원가입</span>
          </button>

          <button
            onClick={() => handleSocialSignup('Kakao')}
            className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD835] py-3 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#000000" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.8-.7 3.2-.8 3.6 0 .1-.1.3 0 .4.1.1.2.1.4 0 .5-.2 3.7-2.4 4.3-2.8.4.1.9.1 1.3.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
            </svg>
            <span>카카오로 회원가입</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">또는 이메일로 가입</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="홍길동"
              required
            />
          </div>

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
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="8자 이상 입력해주세요"
              required
            />
            {password && (
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full transition-all ${getStrengthColor()} ${getStrengthWidth()}`} />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="비밀번호를 다시 입력해주세요"
              required
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600 mt-1"
              required
            />
            <span className="text-sm text-gray-600">
              <Link href="#" className="text-purple-600 hover:text-purple-700">이용약관</Link> 및{' '}
              <Link href="#" className="text-purple-600 hover:text-purple-700">개인정보처리방침</Link>에 동의합니다
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-900 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            회원가입
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-purple-600 font-semibold hover:text-purple-700">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
