'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Shield, Mail, Lock, Trash2, AlertTriangle } from 'lucide-react';

interface NotificationSettings {
  emailOrder: boolean;
  emailShipping: boolean;
  emailMarketing: boolean;
  smsNotification: boolean;
  pushNotification: boolean;
}

interface PrivacySettings {
  personalInfo: boolean;
  marketingConsent: boolean;
  thirdPartyConsent: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailOrder: true,
    emailShipping: true,
    emailMarketing: false,
    smsNotification: false,
    pushNotification: false,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    personalInfo: true,
    marketingConsent: false,
    thirdPartyConsent: false,
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.notifications) setNotifications(settings.notifications);
      if (settings.privacy) setPrivacy(settings.privacy);
    }
  }, []);

  const handleSaveSettings = () => {
    const settings = { notifications, privacy };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setSuccess('설정이 저장되었습니다.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handlePasswordChange = () => {
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (newPassword.length < 8) {
      setError('새 비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setSuccess('비밀번호가 변경되었습니다.');
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 이 작업은 취소할 수 없습니다.')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userSettings');
      router.push('/');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">설정</h1>
        <p className="text-gray-600">알림, 개인정보 및 계정 설정을 관리할 수 있습니다.</p>
      </div>

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg border border-green-200">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          알림 설정
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">주문 알림</p>
              <p className="text-sm text-gray-600">주문 확인 이메일 수신</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailOrder}
                onChange={(e) => setNotifications({ ...notifications, emailOrder: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">배송 알림</p>
              <p className="text-sm text-gray-600">배송 상태 업데이트 이메일 수신</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailShipping}
                onChange={(e) => setNotifications({ ...notifications, emailShipping: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">마케팅 이메일</p>
              <p className="text-sm text-gray-600">프로모션 및 이벤트 정보 수신</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailMarketing}
                onChange={(e) => setNotifications({ ...notifications, emailMarketing: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">SMS 알림</p>
              <p className="text-sm text-gray-600">문자 메시지로 알림 받기</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.smsNotification}
                onChange={(e) => setNotifications({ ...notifications, smsNotification: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">푸시 알림</p>
              <p className="text-sm text-gray-600">브라우저 푸시 알림 받기</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNotification}
                onChange={(e) => setNotifications({ ...notifications, pushNotification: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-600" />
          개인정보 설정
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">개인정보 처리방침 동의</p>
              <p className="text-sm text-gray-600">필수 동의 항목입니다</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.personalInfo}
                disabled
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">마케팅 정보 수신 동의</p>
              <p className="text-sm text-gray-600">이벤트 및 프로모션 정보 제공</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.marketingConsent}
                onChange={(e) => setPrivacy({ ...privacy, marketingConsent: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">제3자 정보제공 동의</p>
              <p className="text-sm text-gray-600">제휴사에 정보 제공</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.thirdPartyConsent}
                onChange={(e) => setPrivacy({ ...privacy, thirdPartyConsent: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-purple-600" />
          계정 관리
        </h2>

        <div className="space-y-4">
          {/* Password Change */}
          <div className="py-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium">비밀번호 변경</p>
                <p className="text-sm text-gray-600">보안을 위해 주기적으로 비밀번호를 변경하세요</p>
              </div>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {showPasswordChange ? '취소' : '변경'}
              </button>
            </div>

            {showPasswordChange && (
              <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="password"
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="password"
                  placeholder="새 비밀번호 (8자 이상)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium"
                >
                  비밀번호 변경
                </button>
              </div>
            )}
          </div>

          {/* Email Change */}
          <div className="py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">이메일 변경</p>
                <p className="text-sm text-gray-600">계정 이메일 주소를 변경합니다</p>
              </div>
              <button className="text-gray-400 cursor-not-allowed">
                준비중
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-red-600">회원 탈퇴</p>
                <p className="text-sm text-gray-600">계정을 삭제하면 모든 정보가 영구적으로 삭제됩니다</p>
              </div>
              <button
                onClick={() => setShowDeleteAccount(!showDeleteAccount)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {showDeleteAccount ? '취소' : '탈퇴'}
              </button>
            </div>

            {showDeleteAccount && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-2">탈퇴 시 다음 정보가 삭제됩니다:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>계정 정보 및 프로필</li>
                      <li>주문 내역</li>
                      <li>적립 포인트</li>
                      <li>작성한 리뷰 및 문의</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium"
                >
                  탈퇴하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          설정 저장
        </button>
      </div>
    </div>
  );
}
