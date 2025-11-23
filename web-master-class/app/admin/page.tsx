'use client';

import { Users, ShoppingCart, Package, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: '1월', sales: 4200000, orders: 12 },
  { month: '2월', sales: 3800000, orders: 10 },
  { month: '3월', sales: 5100000, orders: 15 },
  { month: '4월', sales: 6200000, orders: 18 },
  { month: '5월', sales: 7500000, orders: 22 },
  { month: '6월', sales: 8100000, orders: 24 },
];

const productData = [
  { name: '기본 과정', value: 45, color: '#6366f1' },
  { name: '프리미엄 과정', value: 35, color: '#8b5cf6' },
  { name: '기업 교육', value: 15, color: '#a855f7' },
  { name: '테스트', value: 5, color: '#c084fc' },
];

const recentOrders = [
  { id: 1, customer: '김철수', product: '프리미엄 과정', amount: 497000, status: 'paid', date: '2024-01-20' },
  { id: 2, customer: '이영희', product: '기본 과정', amount: 297000, status: 'shipping', date: '2024-01-20' },
  { id: 3, customer: '박민수', product: '기업 교육', amount: 2500000, status: 'delivered', date: '2024-01-19' },
  { id: 4, customer: '정수진', product: '프리미엄 과정', amount: 497000, status: 'paid', date: '2024-01-19' },
  { id: 5, customer: '최동욱', product: '기본 과정', amount: 297000, status: 'cancelled', date: '2024-01-18' },
];

const statusColors: Record<string, string> = {
  paid: 'bg-blue-100 text-blue-700',
  shipping: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  paid: '결제완료',
  shipping: '배송중',
  delivered: '배송완료',
  cancelled: '취소됨',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">웹마스터 클래스 관리 현황</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <ArrowUp className="w-4 h-4" />
              12.5%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
          <p className="text-gray-600 text-sm">총 회원 수</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <ArrowUp className="w-4 h-4" />
              8.3%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">101</h3>
          <p className="text-gray-600 text-sm">이번 달 주문</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <ArrowUp className="w-4 h-4" />
              15.2%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">8,100,000원</h3>
          <p className="text-gray-600 text-sm">이번 달 매출</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-red-600">
              <ArrowDown className="w-4 h-4" />
              2.1%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4</h3>
          <p className="text-gray-600 text-sm">활성 상품</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">월별 매출 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()}원`} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} name="매출" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">월별 주문 건수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#8b5cf6" name="주문 건수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Distribution & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">상품별 판매 비율</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">최근 주문</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.product}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount.toLocaleString()}원</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
