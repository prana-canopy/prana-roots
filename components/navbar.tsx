'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '@/lib/navigation';
import { NavLogo } from './nav/nav-logo';
import { NavItem } from './nav/nav-item';
import { ContactButton } from './nav/contact-button';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (openDropdowns.has(label)) {
        closeDropdown(label);
      } else {
        openDropdown(label);
      }
    } else if (e.key === 'Escape') {
      closeDropdown(label);
    }
  };

  const openDropdown = useCallback((label: string) => {
    if (closeTimeoutRef.current[label]) {
      clearTimeout(closeTimeoutRef.current[label]);
    }
    setOpenDropdowns((prev) => new Set([...prev, label]));
  }, []);

  const closeDropdown = useCallback((label: string) => {
    closeTimeoutRef.current[label] = setTimeout(() => {
      setOpenDropdowns((prev) => {
        const newSet = new Set(prev);
        newSet.delete(label);
        return newSet;
      });
    }, 150);
  }, []);

  const isDropdownOpen = useCallback(
    (label: string) => {
      return openDropdowns.has(label);
    },
    [openDropdowns]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/60 backdrop-blur-md shadow-sm'
          : 'bg-background/5 backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLogo onLogoClick={scrollToTop} />

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex lg:items-center lg:gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isOpen={isDropdownOpen(item.label)}
                  onOpen={openDropdown}
                  onClose={closeDropdown}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <ContactButton />
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
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
        <div
          className="lg:hidden"
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card backdrop-blur-md border-border-t border-border/10 shadow-lg">
            {navigationItems.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                isOpen={isDropdownOpen(item.label)}
                onOpen={openDropdown}
                onClose={closeDropdown}
                onKeyDown={handleKeyDown}
                isMobile
              />
            ))}
            <div className="pt-4">
              <ContactButton isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
