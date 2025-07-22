import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SmartSearch from '@/components/SmartSearch';
import LanguageToggle from '@/components/LanguageToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection for blur glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/category/tees', label: 'Tees' },
    { href: '/category/jackets', label: 'Jackets' },
    { href: '/category/caps', label: 'Caps' },
    { href: '/category/accessories', label: 'Accessories' },
    { href: '/category/limited', label: 'Limited' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={cn("navbar-glass sticky top-0 z-50", isScrolled && "scrolled")}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Flag className="h-6 w-6 text-primary animate-racing-pulse" />
            <span className="font-racing-logo text-2xl text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              F1 STREET
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary relative",
                  isActive(link.href) 
                    ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <SmartSearch />
            <LanguageToggle />
            
            <Link to="/auth/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  2
                </span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg",
                    isActive(link.href) 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border">
                <SmartSearch 
                  trigger={
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Smart Search
                    </Button>
                  }
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Language:</span>
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;