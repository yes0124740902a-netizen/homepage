'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';

function FailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  const getErrorMessage = () => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '사용자가 결제를 취소하였습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제 진행 중 오류가 발생하여 결제가 중단되었습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 승인을 거부하였습니다. 다른 카드로 시도해주세요.';
      default:
        return message || '결제 처리 중 오류가 발생했습니다.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">결제에 실패했습니다</h1>
          <p className="text-gray-600">아래 내용을 확인해주세요.</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="font-bold text-red-900 mb-2">오류 내용</h2>
          <p className="text-red-700">{getErrorMessage()}</p>
          {code && <p className="text-sm text-red-600 mt-2">오류 코드: {code}</p>}
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-2">문제 해결 방법</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 카드 한도 및 잔액을 확인해주세요</li>
                <li>• 다른 카드로 다시 시도해주세요</li>
                <li>• 카드 정보를 정확히 입력했는지 확인해주세요</li>
                <li>• 해외 결제가 차단되어 있지 않은지 확인해주세요</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-3">도움이 필요하신가요?</h3>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <span className="font-semibold">카카오톡:</span>
              <span>@웹마스터</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">전화:</span>
              <span>010-1234-5678</span>
            </p>
            <p className="text-sm text-gray-600 mt-3">평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/products" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold">
            <ArrowLeft className="w-5 h-5" />
            <span>상품 목록으로</span>
          </Link>
          <button onClick={() => window.history.back()} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    }>
      <FailContent />
    </Suspense>
  );
}
