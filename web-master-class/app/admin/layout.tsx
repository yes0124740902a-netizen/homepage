import AdminGuard from '@/components/auth/admin-guard';
import AdminSidebar from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
