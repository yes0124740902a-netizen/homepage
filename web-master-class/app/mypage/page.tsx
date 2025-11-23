'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Settings, Bell, CreditCard, Award } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  provider: string;
  joinDate: string;
  grade: string;
}

export default function MypagePage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-3">{user.email}</p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-500">가입일:</span>
                <span className="font-medium">{formatDate(user.joinDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-gray-500">등급:</span>
                <span className="font-medium text-purple-600">{user.grade}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            최근 주문
          </h3>
          <div className="space-y-3">
            <div className="text-center py-8 text-gray-500">
              주문 내역이 없습니다
            </div>
          </div>
          <Link
            href="/mypage/orders"
            className="block text-center mt-4 text-purple-600 hover:text-purple-700 font-medium"
          >
            전체 주문 보기
          </Link>
        </div>

        {/* Points */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            포인트
          </h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-purple-600 mb-2">0</p>
            <p className="text-gray-600">사용 가능한 포인트</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">적립 예정</span>
              <span className="font-medium">0원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">소멸 예정</span>
              <span className="font-medium">0원</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">빠른 메뉴</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/mypage/profile"
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors"
          >
            <User className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium">내 정보 관리</span>
          </Link>
          <Link
            href="/mypage/orders"
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors"
          >
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium">주문/배송 조회</span>
          </Link>
          <Link
            href="/mypage/settings"
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors"
          >
            <Settings className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium">설정</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors"
          >
            <Bell className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium">상품 보기</span>
          </Link>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          공지사항
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700">웹마스터 클래스에 오신 것을 환영합니다!</span>
            <span className="text-sm text-gray-500">{formatDate(user.joinDate)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700">교육 과정 안내 및 수강 신청 방법</span>
            <span className="text-sm text-gray-500">2024-01-15</span>
          </div>
        </div>
      </div>
    </div>
  );
}
