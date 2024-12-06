import { useState, useCallback, useRef } from 'react';
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
        label: "Data & Analytics",
        href: "/solutions/data",
        description: "BI, ML, data pipelines, visualization & insights"
      },
      {
        label: "Development",
        href: "/solutions/development",
        description: "Web, mobile, desktop & full-stack solutions"
      },
      {
        label: "Design & UX",
        href: "/solutions/design",
        description: "UI/UX, branding & digital experience design"
      }
    ]
  },
  {
    label: "Services",
    href: "#",
    children: [
      {
        label: "Tech Strategy",
        href: "/services/strategy",
        description: "From concept to scalable architecture"
      },
      {
        label: "Custom Solutions",
        href: "/services/custom",
        description: "Tailored tech for your unique challenges"
      },
      {
        label: "Digital Growth",
        href: "/services/growth",
        description: "Modernize & scale your local business"
      }
    ]
  },
  {
    label: "Success Stories",
    href: "/stories"
  },
  {
    label: "Connect",
    href: "/connect"
  }
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const closeTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDropdown = useCallback((label: string) => {
    // Clear any existing close timeout for this dropdown
    if (closeTimeoutRef.current[label]) {
      clearTimeout(closeTimeoutRef.current[label]);
    }
    setOpenDropdowns(prev => new Set([...prev, label]));
  }, []);

  const closeDropdown = useCallback((label: string) => {
    // Set a timeout to close the dropdown after a small delay
    closeTimeoutRef.current[label] = setTimeout(() => {
      setOpenDropdowns(prev => {
        const newSet = new Set(prev);
        newSet.delete(label);
        return newSet;
      });
    }, 150); // Small delay before closing
  }, []);

  const isDropdownOpen = useCallback((label: string) => {
    return openDropdowns.has(label);
  }, [openDropdowns]);

  const toggleMobileDropdown = useCallback((label: string) => {
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4">
            <div 
              onClick={scrollToTop}
              className="w-16 sm:w-24 h-8 sm:h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="180 120 220 80"
                className="w-full h-full"
              >
                {/* Upper Beak */}
                <path d="M320,140 L380,120 L350,145 Z" fill="#2ee89e"/>
                <path d="M350,145 L380,120 L390,135 Z" fill="#1eebc3"/>
                <path d="M350,145 L390,135 L360,160 Z" fill="#00b4e4"/>
                
                {/* Yellow Face */}
                <path d="M300,140 L320,140 L310,160 Z" fill="#fff06e"/>
                <path d="M310,160 L320,140 L335,165 Z" fill="#ffe566"/>
                <path d="M280,140 L300,140 L290,160 Z" fill="#ffd700"/>
                <path d="M290,160 L300,140 L310,160 Z" fill="#ffcd00"/>
                
                {/* Main Body */}
                <path d="M260,140 L280,140 L270,160 Z" fill="#151515"/>
                <path d="M270,160 L280,140 L290,160 Z" fill="#1a1a1a"/>
                <path d="M240,140 L260,140 L250,160 Z" fill="#202020"/>
                <path d="M250,160 L260,140 L270,160 Z" fill="#252525"/>
                <path d="M250,160 L270,160 L260,180 Z" fill="#151515"/>
                <path d="M260,180 L270,160 L280,180 Z" fill="#1a1a1a"/>
                <path d="M230,160 L250,160 L240,180 Z" fill="#202020"/>
                <path d="M240,180 L250,160 L260,180 Z" fill="#252525"/>
                
                {/* Wings */}
                <path d="M220,160 L240,160 L230,180 Z" fill="#151515"/>
                <path d="M230,180 L240,160 L250,180 Z" fill="#1a1a1a"/>
                <path d="M200,160 L220,160 L210,180 Z" fill="#202020"/>
                <path d="M210,180 L220,160 L230,180 Z" fill="#252525"/>
                <path d="M180,160 L200,160 L190,180 Z" fill="#151515"/>
                <path d="M190,180 L200,160 L210,180 Z" fill="#1a1a1a"/>
                <path d="M270,160 L290,160 L280,180 Z" fill="#151515"/>
                <path d="M280,180 L290,160 L300,180 Z" fill="#1a1a1a"/>
                <path d="M300,180 L290,160 L310,160 Z" fill="#202020"/>
                
                {/* Tail and Feet */}
                <path d="M230,180 L250,180 L240,200 Z" fill="#151515"/>
                <path d="M240,200 L250,180 L260,200 Z" fill="#1a1a1a"/>
                <path d="M210,180 L230,180 L220,200 Z" fill="#202020"/>
                <path d="M220,200 L230,180 L240,200 Z" fill="#252525"/>
                <path d="M220,180 L230,180 L225,190 Z" fill="#00b4e4"/>
                <path d="M225,190 L230,180 L235,190 Z" fill="#1eebc3"/>
                
                {/* Lower Beak */}
                <path d="M320,140 L350,145 L335,165 Z" fill="#00d5c3"/>
                <path d="M335,165 L350,145 L360,160 Z" fill="#00b4e4"/>
                <path d="M335,165 L360,160 L345,180 Z" fill="#1eebc3"/>
                
                {/* Eye */}
                <path d="M295,145 L305,143 L300,153 Z" fill="#ffffff"/>
                <path d="M297,147 L302,146 L300,151 Z" fill="#6366f1"/>
                <path d="M295,145 L300,153 L293,150 Z" fill="#000000"/>
              </svg>
            </div>
            <span 
              onClick={scrollToTop} 
              className="text-lg sm:text-2xl font-semibold tracking-wider text-foreground hover:text-primary transition-colors duration-200 cursor-pointer relative group"
            >
              Prana <em>Local</em>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <div 
                  key={item.label} 
                  className="relative group"
                  onMouseEnter={() => item.children && openDropdown(item.label)}
                  onMouseLeave={() => item.children && closeDropdown(item.label)}
                >
                  <button
                    className="group relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] overflow-hidden border border-transparent active:border-primary active:bg-transparent"
                  >
                    <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-active:w-0" />
                    <span className="relative z-10 group-hover:text-black group-active:text-primary">
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className="relative inline-block w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.children && isDropdownOpen(item.label) && (
                    <div 
                      className="absolute left-0 mt-2 w-72 rounded-xl bg-card shadow-lg border border-[#2ee89e] overflow-hidden backdrop-blur-sm"
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-3 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group"
                          >
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                              {child.label}
                            </p>
                            {child.description && (
                              <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-200">
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
              <button className="group relative px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 dark:bg-primary-light dark:hover:bg-primary text-black dark:text-black rounded-full transition-all duration-200 hover:shadow-md hover:scale-110 hover:rotate-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] overflow-hidden"
              >
                <div className="absolute inset-0 w-0 bg-black transition-all duration-300 ease-out group-hover:w-full opacity-10" />
                <span className="relative">I'm Interested!</span>
              </button>
              <div className="hover:scale-110 transition-transform duration-200">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-2 sm:gap-4">
            <div className="hover:scale-110 transition-transform duration-200">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] hover:scale-110 transition-all duration-200"
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-md shadow-lg border-t border-border/50">
            {navigationItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <button
                  onClick={() => item.children && toggleMobileDropdown(item.label)}
                  className="group relative w-full flex items-center justify-between px-3 py-2 text-base font-medium text-foreground/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] overflow-hidden border border-transparent active:border-primary active:bg-transparent"
                >
                  <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-active:w-0" />
                  <span className="relative z-10 group-hover:text-black group-active:text-primary">
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`relative inline-block w-5 h-5 ml-1 transition-transform duration-200 ${
                          isDropdownOpen(item.label) ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </button>
                
                {/* Mobile Dropdown */}
                {item.children && isDropdownOpen(item.label) && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-primary hover:bg-muted/50 transition-all duration-200 group"
                      >
                        <p className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {child.label}
                        </p>
                        {child.description && (
                          <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground/70 group-hover:translate-x-1 transition-all duration-200">
                            {child.description}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <button className="group relative w-full px-4 py-2 text-base font-medium bg-primary text-black dark:text-black rounded-full transition-all duration-200 hover:shadow-md hover:scale-105 hover:rotate-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] overflow-hidden"
              >
                <div className="absolute inset-0 w-0 bg-black transition-all duration-300 ease-out group-hover:w-full opacity-10" />
                <span className="relative">Get Free Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}