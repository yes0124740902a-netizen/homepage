'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, FileText } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (!orderId || !paymentKey || !amount) {
      setError('결제 정보가 올바르지 않습니다.');
      return;
    }

    // 주문 정보를 localStorage에 저장
    const saveOrder = () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);

          // 기존 주문 내역 가져오기
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');

          // 새 주문 추가
          const newOrder = {
            id: Date.now().toString(),
            orderNumber: orderId,
            orderDate: new Date().toISOString(),
            status: 'paid',
            paymentKey: paymentKey,
            items: [{
              productId: orderId.split('_')[0] || 'unknown',
              productName: '상품', // checkout에서 전달받은 상품명
              quantity: 1,
              price: parseInt(amount),
            }],
            totalAmount: parseInt(amount),
            userId: userData.id || userData.email,
          };

          existingOrders.push(newOrder);
          localStorage.setItem('orders', JSON.stringify(existingOrders));
        }
      } catch (error) {
        console.error('주문 저장 실패:', error);
      }
    };

    saveOrder();
    setTimeout(() => setVerified(true), 1000);
  }, [orderId, paymentKey, amount]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">결제 오류</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/products" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            상품 목록으로
          </Link>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결제 승인 처리 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">결제가 완료되었습니다</h1>
          <p className="text-gray-600">주문이 성공적으로 처리되었습니다.</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">주문 정보</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">주문번호</span>
              <span className="font-mono text-sm">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">결제 금액</span>
              <span className="font-bold text-lg text-purple-600">{Number(amount).toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">결제 수단</span>
              <span>신용카드</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-bold mb-3">다음 단계</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600">1.</span>
              <span>등록하신 이메일로 주문 확인 메일이 발송됩니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">2.</span>
              <span>교육 일정 및 상세 안내는 영업일 기준 1-2일 내에 연락드립니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600">3.</span>
              <span>문의사항은 카카오톡 @웹마스터 또는 010-1234-5678로 연락주세요.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold">
            <Home className="w-5 h-5" />
            <span>홈으로</span>
          </Link>
          <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            <FileText className="w-5 h-5" />
            <span>영수증 출력</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
