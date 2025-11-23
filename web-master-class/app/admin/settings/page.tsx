'use client';

import { useState } from 'react';
import { Save, Globe, Mail, CreditCard, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('웹마스터 클래스');
  const [siteDescription, setSiteDescription] = useState('비전공자를 위한 하루 완성 웹사이트 제작');
  const [contactEmail, setContactEmail] = useState('contact@webmaster.com');
  const [contactPhone, setContactPhone] = useState('010-1234-5678');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    setSuccess('설정이 저장되었습니다.');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">시스템 설정</h1>
        <p className="text-gray-600 mt-1">사이트 및 시스템 환경 설정</p>
      </div>

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg border border-green-200">
          {success}
        </div>
      )}

      {/* Site Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          사이트 정보
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사이트 이름
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사이트 설명
            </label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          연락처 정보
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
            </label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          결제 설정
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              토스페이먼츠 클라이언트 키
            </label>
            <input
              type="text"
              value="test_ck_Z1aOwX7K8mQYPdYXPNP3yQxzvNPG"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-sm text-gray-500 mt-1">테스트 환경에서 사용 중입니다.</p>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          보안 설정
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">2단계 인증</p>
              <p className="text-sm text-gray-600">관리자 로그인 시 2단계 인증 요구</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">자동 로그아웃</p>
              <p className="text-sm text-gray-600">30분 동안 활동이 없으면 자동 로그아웃</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          알림 설정
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">신규 주문 알림</p>
              <p className="text-sm text-gray-600">새로운 주문이 들어오면 이메일 알림</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">신규 회원 알림</p>
              <p className="text-sm text-gray-600">신규 회원 가입 시 이메일 알림</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save className="w-5 h-5" />
          설정 저장
        </button>
      </div>
    </div>
  );
}
