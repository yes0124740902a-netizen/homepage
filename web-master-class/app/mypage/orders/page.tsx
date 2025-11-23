'use client';

import { useState, useEffect } from 'react';
import { Package, ChevronLeft, ChevronRight, Eye, X, Star } from 'lucide-react';
import { getOrdersByUser } from '@/lib/firestore';

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
}

interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

const mockOrders: Order[] = [
  // Empty for now - will be populated with real orders
];

const statusMap = {
  pending: { label: '결제 대기', color: 'text-gray-600 bg-gray-100' },
  paid: { label: '결제 완료', color: 'text-blue-600 bg-blue-100' },
  shipping: { label: '배송 중', color: 'text-purple-600 bg-purple-100' },
  delivered: { label: '배송 완료', color: 'text-green-600 bg-green-100' },
  cancelled: { label: '취소됨', color: 'text-red-600 bg-red-100' },
};

const periods = [
  { label: '1개월', months: 1 },
  { label: '3개월', months: 3 },
  { label: '6개월', months: 6 },
  { label: '1년', months: 12 },
];

const statuses = [
  { value: 'all', label: '전체' },
  { value: 'paid', label: '결제완료' },
  { value: 'shipping', label: '배송중' },
  { value: 'delivered', label: '배송완료' },
  { value: 'cancelled', label: '취소' },
];

export default function OrdersPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Firestore에서 실제 주문 내역 로드
    const loadOrders = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          console.log('로그인되지 않은 사용자');
          return;
        }

        const userData = JSON.parse(user);
        const userId = userData.id || userData.email;

        // Firestore에서 사용자 주문 가져오기
        const result = await getOrdersByUser(userId);

        if (result.success && result.data) {
          console.log('Firestore에서 주문 로드:', result.data);
          setOrders(result.data as Order[]);
        } else {
          console.log('Firestore 로드 실패, localStorage 사용');
          // Firestore 실패 시 localStorage에서 가져오기
          const storedOrders = localStorage.getItem('orders');
          if (storedOrders) {
            const parsedOrders = JSON.parse(storedOrders);
            setOrders(parsedOrders);
          }
        }
      } catch (error) {
        console.error('주문 내역 로드 실패:', error);
        // 에러 발생 시 localStorage 폴백
        try {
          const storedOrders = localStorage.getItem('orders');
          if (storedOrders) {
            const parsedOrders = JSON.parse(storedOrders);
            setOrders(parsedOrders);
          }
        } catch (e) {
          console.error('localStorage 로드도 실패:', e);
        }
      }
    };

    loadOrders();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const filteredOrders = orders.filter(order => {
    if (selectedStatus !== 'all' && order.status !== selectedStatus) {
      return false;
    }
    const orderDate = new Date(order.orderDate);
    const periodDate = new Date();
    periodDate.setMonth(periodDate.getMonth() - selectedPeriod);
    return orderDate >= periodDate;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">주문 내역</h1>
        <p className="text-gray-600">주문 및 배송 정보를 확인할 수 있습니다.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="space-y-4">
          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              조회 기간
            </label>
            <div className="flex gap-2">
              {periods.map((period) => (
                <button
                  key={period.months}
                  onClick={() => setSelectedPeriod(period.months)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period.months
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주문 상태
            </label>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedStatus === status.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {paginatedOrders.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">주문 내역이 없습니다</h3>
            <p className="text-gray-600 mb-6">
              선택한 기간 동안의 주문 내역이 없습니다.
            </p>
            <a
              href="/products"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              상품 보러 가기
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold">주문번호: {order.orderNumber}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusMap[order.status].color
                        }`}
                      >
                        {statusMap[order.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">
                      {order.totalAmount.toLocaleString()}원
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.productName}</h4>
                        <p className="text-sm text-gray-600">
                          수량: {item.quantity}명 | {item.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    상세보기
                  </button>
                  {order.status === 'pending' && (
                    <button className="flex items-center gap-1 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 text-sm font-medium">
                      <X className="w-4 h-4" />
                      주문취소
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <button className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium">
                      <Star className="w-4 h-4" />
                      리뷰 작성
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
