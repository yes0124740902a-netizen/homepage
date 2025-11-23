'use client';

import { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  grade: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
}

const mockUsers: User[] = [
  { id: '1', name: '김철수', email: 'kim@example.com', provider: 'email', grade: 'Gold', joinDate: '2023-05-15', orders: 5, totalSpent: 1485000 },
  { id: '2', name: '이영희', email: 'lee@example.com', provider: 'google', grade: 'Silver', joinDate: '2023-07-22', orders: 3, totalSpent: 891000 },
  { id: '3', name: '박민수', email: 'park@example.com', provider: 'kakao', grade: 'Bronze', joinDate: '2023-09-10', orders: 1, totalSpent: 297000 },
  { id: '4', name: '정수진', email: 'jung@example.com', provider: 'email', grade: 'Platinum', joinDate: '2023-03-05', orders: 12, totalSpent: 3564000 },
  { id: '5', name: '최동욱', email: 'choi@example.com', provider: 'google', grade: 'Silver', joinDate: '2023-11-18', orders: 2, totalSpent: 594000 },
];

const gradeColors: Record<string, string> = {
  Bronze: 'bg-orange-100 text-orange-700',
  Silver: 'bg-gray-100 text-gray-700',
  Gold: 'bg-yellow-100 text-yellow-700',
  Platinum: 'bg-purple-100 text-purple-700',
};

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || user.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">사용자 관리</h1>
          <p className="text-gray-600 mt-1">총 {users.length}명의 회원</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <UserPlus className="w-5 h-5" />
          사용자 추가
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="all">전체 등급</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>

          {/* Export */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            내보내기
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">이름</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">이메일</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">가입 방법</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">등급</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">가입일</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">주문 수</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">총 구매액</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {user.provider}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${gradeColors[user.grade]}`}>
                      {user.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{user.joinDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">{user.orders}건</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium">{user.totalSpent.toLocaleString()}원</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">총 회원 수</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}명</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">이번 달 신규</p>
          <p className="text-2xl font-bold text-gray-900">+42명</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">평균 구매액</p>
          <p className="text-2xl font-bold text-gray-900">523,200원</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">활성 사용자</p>
          <p className="text-2xl font-bold text-gray-900">892명</p>
        </div>
      </div>
    </div>
  );
}
