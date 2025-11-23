import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import { Building2, Users, TrendingUp, Target, Eye, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: '회사소개 | 웹제작 마스터 클래스',
  description: '2019년 설립 이후 3,000명 이상의 수강생과 함께한 웹제작 마스터 클래스의 회사 소개입니다.',
};

const stats = [
  { label: '설립연도', value: '2019년', icon: Building2 },
  { label: '수강생 수', value: '3,000+', icon: Users },
  { label: '기업 프로젝트', value: '200+', icon: TrendingUp },
];

const coreValues = [
  {
    icon: Target,
    title: '실용성',
    description: '현장에서 바로 사용 가능한 실무 중심 교육을 제공합니다.',
  },
  {
    icon: Users,
    title: '접근성',
    description: '비전공자도 쉽게 배울 수 있는 체계적인 커리큘럼을 운영합니다.',
  },
  {
    icon: Award,
    title: '전문성',
    description: '10년 이상 경력의 전문 강사진이 직접 지도합니다.',
  },
  {
    icon: Eye,
    title: '투명성',
    description: '명확한 교육 목표와 성과 지표를 제시합니다.',
  },
];

const timeline = [
  {
    year: '2019',
    events: [
      '웹제작 마스터 클래스 설립',
      '첫 기본 과정 런칭',
    ],
  },
  {
    year: '2020',
    events: [
      '프리미엄 과정 출시',
      '누적 수강생 500명 달성',
    ],
  },
  {
    year: '2021',
    events: [
      '기업 단체 교육 프로그램 시작',
      '주요 기업 50+ 파트너십 체결',
    ],
  },
  {
    year: '2022',
    events: [
      '누적 수강생 2,000명 돌파',
      '온라인 교육 플랫폼 오픈',
    ],
  },
  {
    year: '2023',
    events: [
      '수강생 만족도 95% 달성',
      '기업 프로젝트 200건 완료',
    ],
  },
  {
    year: '2024',
    events: [
      '누적 수강생 3,000명 달성',
      '평생 커뮤니티 프로그램 런칭',
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="회사소개"
        subtitle="신뢰할 수 있는 웹제작 교육 전문 기관"
        breadcrumb={[
          { name: '홈', href: '/' },
          { name: '회사소개', href: '/about' },
        ]}
      />

      {/* Company Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                웹제작 교육의 새로운 기준
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                웹제작 마스터 클래스는 2019년 설립 이후 비전공자를 대상으로 한 실무 중심 웹제작 교육을 제공해왔습니다.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                누적 3,000명 이상의 수강생과 200개 이상의 기업 프로젝트를 통해 검증된 교육 프로그램을 운영하고 있으며,
                수강생 만족도 95%를 유지하고 있습니다.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-12 aspect-square flex items-center justify-center">
              <div className="text-center">
                <Building2 className="w-32 h-32 mx-auto text-purple-600 mb-4" />
                <p className="text-xl font-semibold text-gray-800">
                  신뢰할 수 있는 교육 파트너
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            미션 & 비전
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">미션</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                비전공자도 전문가 수준의 웹사이트를 제작할 수 있도록 실용적이고 체계적인 교육을 제공하여,
                개인과 기업의 디지털 역량을 강화합니다.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">비전</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                대한민국 최고의 웹제작 교육 기관으로 성장하여, 더 많은 사람들이 웹 기술을 활용하여
                자신의 비즈니스를 성장시킬 수 있도록 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            핵심 가치
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            연혁
          </h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-purple-200" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">
                    {item.year}
                  </h3>
                  <ul className="space-y-2">
                    {item.events.map((event) => (
                      <li key={event} className="text-gray-700 flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
