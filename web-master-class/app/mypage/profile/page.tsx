'use client';

import { useEffect, useState } from 'react';
import { Camera, Save, Plus, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setBirthDate(user.birthDate || '');
      setAddresses(user.addresses || []);
    }
  }, []);

  const handleSaveProfile = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedUser = {
        ...user,
        name,
        phone,
        birthDate,
        addresses,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccess('프로필이 저장되었습니다.');
      setTimeout(() => setSuccess(''), 3000);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      name: '새 주소',
      address: '',
      detailAddress: '',
      zipCode: '',
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">내 정보 관리</h1>
        <p className="text-gray-600">개인 정보를 수정하고 관리할 수 있습니다.</p>
      </div>

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg border border-green-200">
          {success}
        </div>
      )}

      {/* Profile Image */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">프로필 이미지</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-300 rounded-full p-2 hover:bg-gray-50">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">JPG, PNG 파일 (최대 2MB)</p>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              이미지 업로드
            </button>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">기본 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-1234-5678"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              생년월일
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">계정 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
            />
            <p className="text-sm text-gray-500 mt-1">이메일은 변경할 수 없습니다.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>

      {/* Address Management */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">배송지 관리</h2>
          <button
            onClick={handleAddAddress}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            새 주소 추가
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 배송지가 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs font-medium rounded">
                        기본 배송지
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  [{address.zipCode}] {address.address} {address.detailAddress}
                </p>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefaultAddress(address.id)}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    기본 배송지로 설정
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save className="w-5 h-5" />
          저장하기
        </button>
      </div>
    </div>
  );
}
