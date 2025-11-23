'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  // Trigger auth check on page load (helps with Google OAuth redirect)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      console.log('Home page - user found in localStorage, triggering events');
      // Trigger events to update header/auth buttons
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('userLogin', { detail: JSON.parse(user) }));
    }
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="about" className="bg-gradient-to-br from-purple-600 to-purple-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            비전공자도 하루만에 완성하는
            <br />
            나만의 전문가급 웹사이트
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95">
            코딩 몰라도 OK! 디자인 몰라도 OK!
            <br />
            홈페이지·상세페이지 제작 노하우를 단 하루에 마스터하세요
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 inline-block mb-10">
            <p className="text-base md:text-lg lg:text-xl">
              💰 외주 제작비 500만원 → 자체 제작으로 전환하여 <strong>평생 비용 절감</strong>
            </p>
          </div>
          <br />
          <Link
            href="#pricing"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all hover:scale-105 hover:shadow-2xl"
          >
            지금 바로 시작하기 →
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            이런 고민, 하고 계시지 않나요?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">😰</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-600">
                외주 비용이 부담스럽다
              </h3>
              <p className="text-gray-600">
                홈페이지 하나 만드는데 300~500만원? 수정할 때마다 또 비용이 발생하는 현실...
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">😰</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-600">
                코딩을 배우기엔 시간이 없다
              </h3>
              <p className="text-gray-600">
                몇 달씩 공부할 여유도 없고, 어디서부터 시작해야 할지 막막하기만 합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">😰</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-red-600">
                직접 수정하고 싶은데 방법을 모른다
              </h3>
              <p className="text-gray-600">
                작은 텍스트 하나 바꾸려고 개발자 연락하기가 너무 불편해요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            해답은 바로 여기에 있습니다
          </h2>
          <p className="text-xl md:text-2xl text-center text-purple-600 font-semibold mb-12">
            ✨ 웹제작 마스터 클래스 ✨
          </p>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 md:p-12 border-l-4 border-purple-600 shadow-lg">
            <p className="text-lg md:text-xl mb-6">
              <strong>단 하루 집중 교육</strong>으로 전문가 수준의 홈페이지와 상세페이지를 직접 만들 수 있습니다.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              코딩 한 줄 몰라도 괜찮습니다. 최신 노코드/로우코드 툴과 실전 템플릿을 활용하여,{' '}
              <strong className="text-purple-600">당일 바로 적용 가능한 실무 스킬</strong>을 전수해드립니다.
              이제 외주 의존에서 벗어나 진정한 자립을 경험하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
            이 강의를 수강하면 얻게 되는 것
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">연간 500만원 이상 절감</h3>
              <p className="text-white/90">
                외주 비용 + 유지보수 비용을 모두 절감하고, 수정이 필요할 때마다 즉시 직접 대응 가능
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">24시간 내 웹사이트 완성</h3>
              <p className="text-white/90">
                교육 당일, 실습을 통해 본인의 웹사이트 초안을 완성하고 퇴근합니다
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 hover:bg-white/20 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">평생 활용 가능한 스킬</h3>
              <p className="text-white/90">
                한 번 배우면 언제든 새로운 프로젝트에 적용 가능. 사업 확장 시에도 걱정 없습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">수강료 안내</h2>
          <p className="text-center text-red-600 font-semibold text-lg mb-12">
            🎉 이번 달 조기 등록 시 30% 할인!
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">기본 과정</h3>
              <p className="text-4xl font-bold text-purple-600 mb-6">
                ₩297,000
              </p>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>8시간 현장 교육</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>교육 자료 PDF</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>템플릿 100종</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>1개월 온라인 Q&A</span>
                </li>
              </ul>
              <Link
                href="#apply"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
              >
                신청하기
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-900 text-white rounded-xl p-6 md:p-8 shadow-2xl transform md:scale-105 border-4 border-yellow-400">
              <div className="bg-yellow-400 text-purple-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                인기
              </div>
              <h3 className="text-2xl font-bold mb-2">프리미엄 과정</h3>
              <p className="text-4xl font-bold mb-6">₩497,000</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>기본 과정 전체 포함</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>1:1 맞춤 피드백 3회</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>3개월 무제한 상담</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>프리미엄 템플릿 500종</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>평생 커뮤니티 액세스</span>
                </li>
              </ul>
              <Link
                href="#apply"
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 text-center py-3 rounded-lg font-bold transition-colors"
              >
                신청하기
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">기업 단체 교육</h3>
              <p className="text-4xl font-bold text-purple-600 mb-6">별도 협의</p>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>5인 이상 단체</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>맞춤형 커리큘럼</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>출강 가능</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>장기 지원 프로그램</span>
                </li>
              </ul>
              <Link
                href="#apply"
                className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-3 rounded-lg font-semibold transition-colors"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="bg-gradient-to-r from-purple-600 to-purple-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 시작하세요!
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            매월 선착순 20명만 모집합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:010-1234-5678"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              📞 전화 상담: 010-1234-5678
            </a>
            <a
              href="https://pf.kakao.com/_웹마스터"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              💬 카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
