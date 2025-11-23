'use client';

import { useState } from 'react';
import { Package, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  status: 'active' | 'inactive';
}

const mockProducts: Product[] = [
  { id: '1', name: '테스트 과정 (100원)', price: 100, category: '테스트', stock: 999, sold: 50, status: 'active' },
  { id: '2', name: '기본 과정', price: 297000, category: '교육', stock: 100, sold: 234, status: 'active' },
  { id: '3', name: '프리미엄 과정', price: 497000, category: '교육', stock: 50, sold: 156, status: 'active' },
  { id: '4', name: '기업 단체 교육', price: 0, category: '기업', stock: 0, sold: 45, status: 'active' },
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">상품 관리</h1>
          <p className="text-gray-600 mt-1">총 {products.length}개의 상품</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          상품 추가
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    {product.price > 0 ? `${product.price.toLocaleString()}원` : '별도 협의'}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                {product.status === 'active' ? (
                  <ToggleRight className="w-6 h-6 text-green-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">재고</p>
                <p className="text-lg font-semibold text-gray-900">{product.stock === 0 ? '무제한' : `${product.stock}개`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">판매량</p>
                <p className="text-lg font-semibold text-gray-900">{product.sold}개</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
                보기
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                수정
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">활성 상품</p>
          <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">총 판매량</p>
          <p className="text-2xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.sold, 0)}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">총 재고</p>
          <p className="text-2xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.stock, 0)}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">평균 판매가</p>
          <p className="text-2xl font-bold text-gray-900">397,025원</p>
        </div>
      </div>
    </div>
  );
}
