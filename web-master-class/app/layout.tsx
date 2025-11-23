import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import NextAuthProvider from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "비전공자도 하루만에 완성하는 나만의 웹사이트 | 웹제작 마스터 클래스",
  description: "코딩 몰라도 OK! 전문가급 홈페이지·상세페이지 제작 노하우를 단 하루에 배우세요. 외주비 500만원 → 자체 제작으로 전환. 선착순 20명 한정 모집!",
  keywords: "웹사이트 제작, 홈페이지 만들기, 노코드, 웹제작 교육, 랜딩페이지 제작, 온라인 강의, 웹디자인 교육, 비전공자 코딩, 상세페이지 제작, 쇼핑몰 제작",
  authors: [{ name: "웹제작 마스터 클래스" }],
  openGraph: {
    type: "website",
    url: "https://web-master-class.vercel.app",
    title: "비전공자도 하루만에 완성하는 나만의 웹사이트 | 웹제작 마스터 클래스",
    description: "코딩 몰라도 OK! 전문가급 홈페이지·상세페이지 제작 노하우를 단 하루에 배우세요.",
    siteName: "웹제작 마스터 클래스",
  },
  twitter: {
    card: "summary_large_image",
    title: "비전공자도 하루만에 완성하는 나만의 웹사이트",
    description: "코딩 몰라도 OK! 전문가급 홈페이지·상세페이지 제작 노하우를 단 하루에 배우세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>
        <NextAuthProvider>
          <Header />
          <div className="pt-16 md:pt-20">
            {children}
          </div>
          <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2025 웹제작 마스터 클래스. All rights reserved.</p>
              <p className="mt-2 text-sm opacity-70">
                사업자등록번호: 123-45-67890 | 대표: 김웹마스터 | 이메일: web-master@example.com
              </p>
            </div>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
