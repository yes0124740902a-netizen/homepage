'use client';

import { useState } from 'react';
import { Search, Filter, Download, Eye } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';
  date: string;
}

const mockOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-20240120-001', customer: '김철수', product: '프리미엄 과정', amount: 497000, status: 'paid', date: '2024-01-20' },
  { id: '2', orderNumber: 'ORD-20240120-002', customer: '이영희', product: '기본 과정', amount: 297000, status: 'shipping', date: '2024-01-20' },
  { id: '3', orderNumber: 'ORD-20240119-001', customer: '박민수', product: '기업 교육', amount: 2500000, status: 'delivered', date: '2024-01-19' },
  { id: '4', orderNumber: 'ORD-20240119-002', customer: '정수진', product: '프리미엄 과정', amount: 497000, status: 'paid', date: '2024-01-19' },
  { id: '5', orderNumber: 'ORD-20240118-001', customer: '최동욱', product: '기본 과정', amount: 297000, status: 'cancelled', date: '2024-01-18' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  paid: 'bg-blue-100 text-blue-700',
  shipping: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: '결제대기',
  paid: '결제완료',
  shipping: '배송중',
  delivered: '배송완료',
  cancelled: '취소됨',
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = orders.filter(order =>
    selectedStatus === 'all' || order.status === selectedStatus
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">주문 관리</h1>
          <p className="text-gray-600 mt-1">총 {orders.length}건의 주문</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5" />
          내보내기
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="주문번호 또는 고객명으로 검색..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="all">전체 상태</option>
              <option value="pending">결제대기</option>
              <option value="paid">결제완료</option>
              <option value="shipping">배송중</option>
              <option value="delivered">배송완료</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">주문번호</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">고객명</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">상품</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">금액</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">상태</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">주문일</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm text-gray-900">{order.orderNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{order.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{order.product}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{order.amount.toLocaleString()}원</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{order.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">총 주문</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">결제완료</p>
          <p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'paid').length}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">배송중</p>
          <p className="text-2xl font-bold text-purple-600">{orders.filter(o => o.status === 'shipping').length}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">배송완료</p>
          <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}건</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">취소됨</p>
          <p className="text-2xl font-bold text-red-600">{orders.filter(o => o.status === 'cancelled').length}건</p>
        </div>
      </div>
    </div>
  );
}
