import { useState, useCallback } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const navigationItems: NavItem[] = [
  {
    label: "Solutions",
    href: "#",
    children: [
      {
        label: "Analytics Platform",
        href: "/solutions/analytics",
        description: "Powerful insights for your business"
      },
      {
        label: "Integration Tools",
        href: "/solutions/integration",
        description: "Seamlessly connect your systems"
      },
      {
        label: "Security Suite",
        href: "/solutions/security",
        description: "Enterprise-grade protection"
      }
    ]
  },
  {
    label: "Services",
    href: "#",
    children: [
      {
        label: "Consulting",
        href: "/services/consulting",
        description: "Expert guidance and support"
      },
      {
        label: "Implementation",
        href: "/services/implementation",
        description: "Seamless deployment solutions"
      },
      {
        label: "Training",
        href: "/services/training",
        description: "Comprehensive learning programs"
      }
    ]
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  }, []);

  const isDropdownOpen = useCallback((label: string) => {
    return openDropdowns.has(label);
  }, [openDropdowns]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/40 bg-background/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41.28"
                height="41.281"
                viewBox="0 0 41.28 41.281"
                className="fill-current text-yellow-500 dark:text-green-500 transition-colors duration-200"
              >
                {/* Your existing SVG paths */}
              </svg>
            </div>
            <span 
              className="text-2xl font-semibold tracking-wider hidden sm:inline-block"
              style={{
                background: 'linear-gradient(to right, var(--megaman), var(--frozen-turquoise))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.15em'
              }}
            >
              Prana <em>Local</em>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    onClick={() => item.children && toggleDropdown(item.label)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[var(--megaman)] dark:hover:text-[var(--frozen-turquoise)] transition-colors duration-200"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen(item.label) ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.children && isDropdownOpen(item.label) && (
                    <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {child.label}
                            </p>
                            {child.description && (
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {child.description}
                              </p>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--megaman)] hover:bg-[var(--frozen-turquoise)] rounded-full transition-colors duration-200">
                Get Started
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-[var(--megaman)] dark:hover:text-[var(--frozen-turquoise)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--megaman)]"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
            {navigationItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <button
                  onClick={() => item.children && toggleDropdown(item.label)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[var(--megaman)] dark:hover:text-[var(--frozen-turquoise)]"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                
                {/* Mobile Dropdown */}
                {item.children && isDropdownOpen(item.label) && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-[var(--megaman)] dark:hover:text-[var(--frozen-turquoise)]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <button className="w-full px-4 py-2 text-base font-medium text-white bg-[var(--megaman)] hover:bg-[var(--frozen-turquoise)] rounded-full transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}