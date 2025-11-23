import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-900 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm mb-4 text-white/80">
            {breadcrumb.map((item, index) => (
              <div key={item.href} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
        )}

        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-white/90 max-w-3xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
