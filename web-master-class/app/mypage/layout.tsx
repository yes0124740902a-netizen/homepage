import AuthGuard from '@/components/auth/auth-guard';
import SidebarNav from '@/components/mypage/sidebar-nav';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <SidebarNav />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Navigation */}
              <div className="lg:hidden mb-6">
                <SidebarNav />
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
