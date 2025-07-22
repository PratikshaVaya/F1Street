import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Flag, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Star
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    shop: [
      { name: 'Racing Tees', href: '/category/tees' },
      { name: 'Speed Jackets', href: '/category/jackets' },
      { name: 'Racing Caps', href: '/category/caps' },
      { name: 'Pit Accessories', href: '/category/accessories' },
      { name: 'Limited Edition', href: '/category/limited' },
      { name: 'New Arrivals', href: '/category/tees?filter=new' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Track Your Order', href: '/track-order' },
      { name: 'FAQ', href: '/faq' }
    ],
    company: [
      { name: 'About F1 Street', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Partner with Us', href: '/partners' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Site Map', href: '/sitemap' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/f1street', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/f1street', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/f1street', color: 'hover:text-pink-400' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/f1street', color: 'hover:text-red-400' }
  ];

  const features = [
    { icon: Truck, text: 'Free Shipping Over $100' },
    { icon: RotateCcw, text: '30-Day Easy Returns' },
    { icon: Shield, text: '2-Year Warranty' },
    { icon: Star, text: 'Premium Quality' }
  ];

  return (
    <footer className="bg-racing-carbon text-white mt-20">
      {/* Top Features Bar */}
      <div className="border-b border-racing-gray">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-racing-gray">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-bold font-racing-heading mb-4">
              Join the Racing Community
            </h3>
            <p className="text-racing-coolGray mb-6 font-racing-body">
              Get exclusive access to new drops, racing news, and championship deals
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-racing-gray border-racing-gray text-white placeholder:text-racing-coolGray"
              />
              <Button variant="racing" className="px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-racing-coolGray mt-3">
              By subscribing, you agree to our Privacy Policy and Terms of Service
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Flag className="h-8 w-8 text-primary animate-racing-pulse" />
              <span className="font-racing-logo text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                F1 STREET
              </span>
            </Link>
            <p className="text-racing-coolGray mb-6 font-racing-body max-w-sm">
              Where Formula 1 precision meets street style. Premium racing-inspired 
              streetwear designed for champions on and off the track.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+1 (555) F1-STREET</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">support@f1street.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Monaco Racing District, MC 98000</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-racing-gray rounded-full flex items-center justify-center transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold font-racing-subheading mb-4 text-white">Shop</h4>
            <ul className="space-y-3">
              {footerSections.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-racing-coolGray hover:text-white transition-colors text-sm font-racing-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold font-racing-subheading mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {footerSections.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-racing-coolGray hover:text-white transition-colors text-sm font-racing-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold font-racing-subheading mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {footerSections.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-racing-coolGray hover:text-white transition-colors text-sm font-racing-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold font-racing-subheading mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              {footerSections.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-racing-coolGray hover:text-white transition-colors text-sm font-racing-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-racing-gray">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-racing-coolGray font-racing-body">
                © {currentYear} F1 Street. All rights reserved. Licensed motorsport merchandise.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-racing-coolGray mr-2">We Accept:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                  <CreditCard className="h-3 w-3 text-racing-carbon" />
                </div>
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  V
                </div>
                <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  AE
                </div>
                <div className="w-8 h-5 bg-yellow-400 rounded flex items-center justify-center text-racing-carbon text-xs font-bold">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Lines Animation at Bottom */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary animate-speed-lines" />
    </footer>
  );
};

export default Footer;