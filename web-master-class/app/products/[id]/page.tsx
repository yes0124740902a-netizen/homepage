'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowLeft, Clock, Users, Award, BookOpen } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  curriculum: {
    title: string;
    duration: string;
    topics: string[];
  }[];
  benefits: string[];
  target: string[];
  includes: string[];
}

const productsData: Record<string, ProductDetail> = {
  test: {
    id: 'test',
    name: '테스트 과정 (100원)',
    price: 100,
    description: '결제 시스템 테스트를 위한 100원 테스트 상품입니다. 실제 교육 서비스는 제공되지 않으며, 결제 흐름을 확인하는 용도로만 사용됩니다.',
    features: [
      '결제 시스템 테스트',
      '100원 테스트 결제',
    ],
    curriculum: [
      {
        title: '테스트 상품',
        duration: '테스트',
        topics: [
          '이 상품은 결제 테스트용입니다',
          '실제 교육은 제공되지 않습니다',
        ],
      },
    ],
    benefits: [
      '결제 프로세스 확인',
    ],
    target: [
      '결제 시스템 테스트가 필요한 경우',
    ],
    includes: [
      '결제 테스트만 제공',
    ],
  },
  basic: {
    id: 'basic',
    name: '기본 과정',
    price: 297000,
    originalPrice: 424000,
    description: '웹제작 입문자를 위한 실전 중심 기초 교육 프로그램입니다. 하루 8시간의 집중 교육으로 웹사이트 제작의 기본부터 배포까지 모든 과정을 학습합니다.',
    features: [
      '8시간 현장 교육',
      '교육 자료 PDF 제공',
      '템플릿 100종 제공',
      '1개월 온라인 Q&A',
      '수료증 발급',
    ],
    curriculum: [
      {
        title: '1부: 웹사이트 기초 이해',
        duration: '2시간',
        topics: [
          '웹사이트의 구조와 원리',
          'HTML/CSS 기본 개념',
          '반응형 디자인 이해',
          '노코드 툴 소개',
        ],
      },
      {
        title: '2부: 노코드 툴 마스터하기',
        duration: '2시간',
        topics: [
          'Webflow 기본 사용법',
          'Notion 웹사이트 만들기',
          'WordPress 설정',
          '템플릿 활용 방법',
        ],
      },
      {
        title: '3부: 실전 페이지 제작',
        duration: '3시간',
        topics: [
          '랜딩 페이지 제작 실습',
          '상세 페이지 구성',
          '이미지 최적화',
          'SEO 기본 설정',
        ],
      },
      {
        title: '4부: 배포 & 유지보수',
        duration: '1시간',
        topics: [
          '도메인 연결',
          'Vercel/Netlify 배포',
          '성능 최적화',
          '유지보수 방법',
        ],
      },
    ],
    benefits: [
      '외주 비용 300~500만원 절감',
      '24시간 내 웹사이트 완성 가능',
      '언제든 수정 및 업데이트 가능',
      '실무에서 바로 활용 가능한 스킬',
    ],
    target: [
      '웹사이트가 필요한 소상공인',
      '창업을 준비하는 예비 사업자',
      '마케팅 담당자',
      '웹제작에 관심 있는 비전공자',
    ],
    includes: [
      '8시간 현장 교육',
      '교육 자료 PDF (100페이지 이상)',
      '웹사이트 템플릿 100종',
      '1개월 온라인 Q&A 지원',
      '수료증 발급',
      '평생 자료 업데이트',
    ],
  },
  premium: {
    id: 'premium',
    name: '프리미엄 과정',
    price: 497000,
    originalPrice: 710000,
    description: '기본 과정의 모든 내용에 더해 1:1 맞춤 피드백과 장기 지원을 제공하는 심화 교육 프로그램입니다. 실제 프로젝트를 진행하며 전문가 수준의 웹사이트를 제작합니다.',
    features: [
      '기본 과정 전체 포함',
      '1:1 맞춤 피드백 3회',
      '3개월 무제한 상담',
      '프리미엄 템플릿 500종',
      '평생 커뮤니티 액세스',
      '프로젝트 포트폴리오 제작 지원',
    ],
    curriculum: [
      {
        title: '기본 과정 전체 커리큘럼',
        duration: '8시간',
        topics: [
          '웹사이트 기초부터 배포까지',
          '노코드 툴 실전 활용',
          '반응형 웹 제작',
        ],
      },
      {
        title: '심화 과정: 고급 기능 구현',
        duration: '추가 4시간',
        topics: [
          '결제 시스템 연동',
          '회원 관리 시스템',
          '데이터베이스 활용',
          '고급 애니메이션',
        ],
      },
      {
        title: '1:1 맞춤 피드백',
        duration: '3회 (각 1시간)',
        topics: [
          '개인 프로젝트 리뷰',
          '맞춤형 개선 방안 제시',
          '실전 문제 해결',
          '포트폴리오 완성도 향상',
        ],
      },
    ],
    benefits: [
      '기본 과정의 모든 혜택',
      '전문가 수준의 웹사이트 제작',
      '실전 프로젝트 경험',
      '포트폴리오 구축',
      '장기 지원으로 안정적 성장',
    ],
    target: [
      '프리랜서로 활동하려는 분',
      '본격적으로 웹 개발을 시작하려는 분',
      '고급 기능이 필요한 사업자',
      '전문가 수준의 결과물이 필요한 분',
    ],
    includes: [
      '기본 과정 전체 포함',
      '심화 교육 4시간 추가',
      '1:1 맞춤 피드백 3회',
      '프리미엄 템플릿 500종',
      '3개월 무제한 상담',
      '평생 커뮤니티 액세스',
      '프로젝트 포트폴리오 제작 지원',
      '취업/창업 컨설팅',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: '기업 단체 교육',
    price: 0,
    description: '5인 이상의 기업 및 단체를 위한 맞춤형 교육 프로그램입니다. 기업의 요구사항에 맞춘 커리큘럼 설계부터 장기 지원까지 제공합니다.',
    features: [
      '5인 이상 단체 교육',
      '맞춤형 커리큘럼 설계',
      '출강 교육 가능',
      '장기 지원 프로그램',
      '기업 전용 템플릿 제공',
      '사후 관리 서비스',
    ],
    curriculum: [
      {
        title: '맞춤형 커리큘럼',
        duration: '협의',
        topics: [
          '기업 요구사항 분석',
          '맞춤 교육 프로그램 설계',
          '실무 중심 교육 진행',
          '기업 프로젝트 적용',
        ],
      },
    ],
    benefits: [
      '기업 맞춤 교육',
      '팀 전체 역량 향상',
      '비용 효율적인 인력 양성',
      '장기 파트너십',
    ],
    target: [
      '직원 교육이 필요한 기업',
      '스타트업 팀',
      '마케팅 팀 전체',
      '웹 개발 역량이 필요한 조직',
    ],
    includes: [
      '맞춤형 커리큘럼',
      '출강 교육',
      '기업 전용 템플릿',
      '6개월 장기 지원',
      '사후 관리 서비스',
      '정기 업데이트 교육',
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = productsData[productId];

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
          <Link href="/products" className="text-purple-600 hover:text-purple-700">
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    router.push(`/checkout?product=${productId}&quantity=${quantity}`);
  };

  const handleConsultation = () => {
    window.location.href = 'https://pf.kakao.com/_웹마스터';
  };

  return (
    <main className="min-h-screen">
      <PageHeader
        title={product.name}
        subtitle={product.description}
        breadcrumb={[
          { name: '홈', href: '/' },
          { name: '상품', href: '/products' },
          { name: product.name, href: `/products/${productId}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6">주요 특징</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-2xl font-bold mb-6">커리큘럼</h2>
              <div className="space-y-6">
                {product.curriculum.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{section.title}</h3>
                      <span className="flex items-center gap-2 text-purple-600 font-semibold">
                        <Clock className="w-4 h-4" />
                        {section.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {section.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-gray-700">
                          <span className="text-purple-600">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold mb-6">이런 것을 얻을 수 있어요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Target */}
            <section>
              <h2 className="text-2xl font-bold mb-6">이런 분들께 추천합니다</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.target.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Includes */}
            <section>
              <h2 className="text-2xl font-bold mb-6">포함 내역</h2>
              <div className="space-y-3">
                {product.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Order Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                {product.originalPrice && (
                  <div className="text-gray-400 line-through text-lg mb-1">
                    {product.originalPrice.toLocaleString()}원
                  </div>
                )}
                {product.price > 0 ? (
                  <div className="text-4xl font-bold text-purple-600">
                    {product.price.toLocaleString()}
                    <span className="text-xl text-gray-600">원</span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-purple-600">별도 협의</div>
                )}
                {product.originalPrice && (
                  <div className="mt-2 inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% 할인
                  </div>
                )}
              </div>

              {product.price > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수량
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}명
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {product.price > 0 ? (
                  <>
                    <button
                      onClick={handlePayment}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-900 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
                    >
                      결제하기
                    </button>
                    <button
                      onClick={handleConsultation}
                      className="w-full bg-white border-2 border-purple-600 text-purple-600 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors"
                    >
                      상담 신청
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleConsultation}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-900 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
                  >
                    상담 문의
                  </button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>7일 전까지 전액 환불</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>평생 자료 업데이트</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>수료증 발급</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
