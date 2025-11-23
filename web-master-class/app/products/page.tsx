'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import Link from 'next/link';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 'test',
    name: '테스트 과정 (100원)',
    description: '결제 시스템 테스트용 상품',
    price: 100,
    features: [
      '결제 테스트용 상품',
      '실제 교육은 제공되지 않습니다',
    ],
  },
  {
    id: 'basic',
    name: '기본 과정',
    description: '웹제작 입문자를 위한 실전 중심 기초 교육',
    price: 297000,
    features: [
      '8시간 현장 교육',
      '교육 자료 PDF',
      '템플릿 100종 제공',
      '1개월 온라인 Q&A',
      '수료증 발급',
    ],
  },
  {
    id: 'premium',
    name: '프리미엄 과정',
    description: '심화 학습과 1:1 맞춤 지도를 포함한 전문가 과정',
    price: 497000,
    popular: true,
    features: [
      '기본 과정 전체 포함',
      '1:1 맞춤 피드백 3회',
      '3개월 무제한 상담',
      '프리미엄 템플릿 500종',
      '평생 커뮤니티 액세스',
      '프로젝트 포트폴리오 제작 지원',
    ],
  },
  {
    id: 'enterprise',
    name: '기업 단체 교육',
    description: '기업 맞춤형 대규모 교육 프로그램',
    price: 0,
    features: [
      '5인 이상 단체 교육',
      '맞춤형 커리큘럼 설계',
      '출강 교육 가능',
      '장기 지원 프로그램',
      '기업 전용 템플릿 제공',
      '사후 관리 서비스',
    ],
  },
];

const featureComparison = [
  { feature: '현장 교육 시간', basic: '8시간', premium: '8시간', enterprise: '협의' },
  { feature: '교육 자료', basic: 'PDF', premium: 'PDF + 동영상', enterprise: '맞춤 제작' },
  { feature: '템플릿 제공', basic: '100종', premium: '500종', enterprise: '무제한' },
  { feature: 'Q&A 기간', basic: '1개월', premium: '3개월', enterprise: '6개월' },
  { feature: '1:1 피드백', basic: false, premium: '3회', enterprise: '무제한' },
  { feature: '커뮤니티 액세스', basic: false, premium: '평생', enterprise: '평생' },
  { feature: '포트폴리오 지원', basic: false, premium: true, enterprise: true },
  { feature: '출강 교육', basic: false, premium: false, enterprise: true },
];

const faqs = [
  {
    question: '비전공자도 수강 가능한가요?',
    answer: '네, 저희 과정은 비전공자를 위해 설계되었습니다. 코딩 지식이 전혀 없어도 수강 가능하며, 노코드 툴을 활용한 실습 위주 교육으로 진행됩니다.',
  },
  {
    question: '기본 과정과 프리미엄 과정의 차이는 무엇인가요?',
    answer: '기본 과정은 8시간의 현장 교육과 기본 자료를 제공하며, 프리미엄 과정은 1:1 맞춤 피드백, 더 많은 템플릿, 장기 상담 지원 등이 추가됩니다.',
  },
  {
    question: '수강료 환불이 가능한가요?',
    answer: '교육 시작 7일 전까지는 전액 환불 가능하며, 3일 전까지는 50% 환불이 가능합니다. 교육 시작 이후에는 환불이 불가능합니다.',
  },
  {
    question: '기업 단체 교육은 어떻게 신청하나요?',
    answer: '카카오톡 또는 전화로 문의 주시면 담당자가 기업의 요구사항을 파악한 후 맞춤형 프로그램을 제안해드립니다.',
  },
  {
    question: '수료 후 취업 지원이 있나요?',
    answer: '프리미엄 과정 수강생에게는 포트폴리오 제작 지원과 함께 관련 기업 채용 정보를 공유해드립니다.',
  },
];

export default function ProductsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen">
      <PageHeader
        title="상품 소개"
        subtitle="목적과 수준에 맞는 최적의 교육 과정을 선택하세요"
        breadcrumb={[
          { name: '홈', href: '/' },
          { name: '상품', href: '/products' },
        ]}
      />

      {/* Product Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">교육 과정</h2>
            <p className="text-xl text-gray-600">
              단계별 학습 목표에 맞춘 체계적인 교육 프로그램
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative ${
                  product.popular ? 'border-purple-600 border-2' : 'border-gray-200'
                }`}
              >
                {product.popular && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white text-sm font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
                    인기
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="mb-6">
                  {product.price > 0 ? (
                    <div>
                      <span className="text-4xl font-bold text-purple-600">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xl text-gray-600">원</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-purple-600">별도 협의</div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/products/${product.id}`}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    product.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  상세보기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            상품 비교
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">
                    기능
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700">
                    기본 과정
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-purple-600 bg-purple-50">
                    프리미엄 과정
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700">
                    기업 교육
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="py-4 px-6 font-medium text-gray-700">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.basic}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-purple-50">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-purple-600">{row.premium}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-700">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            상담 신청
          </h2>
          <p className="text-xl mb-8 opacity-90">
            교육 과정에 대해 더 자세히 알고 싶으신가요?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:010-1234-5678"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              전화 상담: 010-1234-5678
            </a>
            <a
              href="https://pf.kakao.com/_웹마스터"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
