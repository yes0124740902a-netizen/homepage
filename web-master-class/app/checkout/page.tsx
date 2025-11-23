'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const CLIENT_KEY = 'test_ck_Z61JOxRQVEbNy2ebxddmrW0X9bAq'; // 토스페이먼츠 테스트 클라이언트 키

interface ProductInfo {
  id: string;
  name: string;
  price: number;
}

const products: Record<string, ProductInfo> = {
  test: { id: 'test', name: '테스트 과정 (100원)', price: 100 },
  basic: { id: 'basic', name: '기본 과정', price: 297000 },
  premium: { id: 'premium', name: '프리미엄 과정', price: 497000 },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const productId = searchParams.get('product') || 'test';
  const quantity = Number(searchParams.get('quantity') || 1);
  const product = products[productId];

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    // Load user info from storage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      setCustomerName(user.name || '');
      setCustomerEmail(user.email || '');
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
          <button
            onClick={() => router.push('/products')}
            className="text-purple-600 hover:text-purple-700"
          >
            상품 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = product.price * quantity;
  const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const handlePayment = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      setError('모든 필수 정보를 입력해주세요.');
      return;
    }

    // 전화번호에서 하이픈 제거 (숫자만)
    const phoneNumber = customerPhone.replace(/[^0-9]/g, '');

    // 전화번호 유효성 검사 (10~11자리)
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      setError('전화번호는 10~11자리 숫자로 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);

      await tossPayments.requestPayment('카드', {
        amount: totalAmount,
        orderId: orderId,
        orderName: `${product.name} x ${quantity}`,
        customerName: customerName,
        customerEmail: customerEmail,
        customerMobilePhone: phoneNumber, // 하이픈 제거된 전화번호 전송
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('Payment error:', error);
      setError('결제 요청 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">주문자 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름 *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="홍길동"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      // 숫자만 입력 가능하도록
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setCustomerPhone(value);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="01012345678 (숫자만 입력)"
                    maxLength={11}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">결제 수단</h2>
              <div className="flex items-center gap-3 p-4 border-2 border-purple-600 rounded-lg bg-purple-50">
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  checked
                  readOnly
                  className="w-5 h-5"
                />
                <label htmlFor="card" className="text-lg font-medium">
                  신용카드 / 체크카드
                </label>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                토스페이먼츠를 통해 안전하게 결제됩니다.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">주문 상품</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">수량: {quantity}명</p>
                  </div>
                  <p className="font-semibold">
                    {(product.price * quantity).toLocaleString()}원
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">상품 금액</span>
                  <span>{(product.price * quantity).toLocaleString()}원</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">할인 금액</span>
                  <span className="text-red-600">-0원</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                  <span>총 결제 금액</span>
                  <span className="text-purple-600">
                    {totalAmount.toLocaleString()}원
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-900 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '결제 진행 중...' : `${totalAmount.toLocaleString()}원 결제하기`}
              </button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                결제 진행 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
