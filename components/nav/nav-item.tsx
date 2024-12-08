'use client';

import { ChevronDown } from 'lucide-react';
import { NavItem } from '@/lib/navigation';

interface NavItemProps {
  item: NavItem;
  isOpen: boolean;
  onOpen: (label: string) => void;
  onClose: (label: string) => void;
  onKeyDown: (e: React.KeyboardEvent, label: string) => void;
  isMobile?: boolean;
}

export function NavItem({ 
  item, 
  isOpen, 
  onOpen, 
  onClose, 
  onKeyDown,
  isMobile = false 
}: NavItemProps) {
  const handleMouseEnter = () => item.children && onOpen(item.label);
  const handleMouseLeave = () => item.children && onClose(item.label);

  const dropdownId = `${isMobile ? 'mobile-' : ''}${item.label}-dropdown`;
  
  return (
    <div 
      className={`${isMobile ? 'space-y-1' : 'relative group'}`}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <button
        onClick={() => item.children && (isOpen ? onClose(item.label) : onOpen(item.label))}
        onKeyDown={(e) => onKeyDown(e, item.label)}
        aria-expanded={item.children ? isOpen : undefined}
        aria-haspopup={item.children ? "true" : undefined}
        aria-controls={item.children ? dropdownId : undefined}
        className={`
          group relative flex items-center gap-1 
          ${isMobile ? 'w-full justify-between' : ''} 
          px-3 py-2 text-sm font-medium text-foreground/80 
          transition-all duration-200 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e] 
          overflow-hidden border border-transparent 
          active:border-primary active:bg-transparent
        `}
      >
        <div className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-active:w-0" />
        <span className="relative z-10 group-hover:text-black group-active:text-primary">
          {item.label}
          {item.children && (
            <ChevronDown
              className={`
                relative inline-block w-4 h-4 ml-1 
                transition-transform duration-200 
                ${isOpen ? 'rotate-180' : ''} 
                ${!isMobile ? 'group-hover:rotate-180' : ''}
              `}
              aria-hidden="true"
            />
          )}
        </span>
      </button>
      
      {item.children && isOpen && (
        <div 
          id={dropdownId}
          role="menu"
          aria-orientation="vertical"
          className={`
            ${isMobile ? 'pl-4 space-y-1' : 'absolute left-0 mt-2 w-72 rounded-xl bg-card shadow-lg border border-[#2ee89e] overflow-hidden backdrop-blur-sm'}
          `}
        >
          <div className={isMobile ? '' : 'p-2'}>
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                role="menuitem"
                className="block px-4 py-3 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ee89e]"
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
  );
}
