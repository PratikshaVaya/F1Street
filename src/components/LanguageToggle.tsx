import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    // In a real app, this would trigger a translation update
    console.log(`Language changed to: ${languageCode}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 min-w-[100px]">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 max-h-80 overflow-y-auto bg-background/95 backdrop-blur-sm border-border/50"
        sideOffset={5}
      >
        <div className="p-2">
          <div className="flex items-center gap-2 px-2 py-1 mb-2 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" />
            Select Language
          </div>
          
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="flex items-center justify-between gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{language.name}</span>
                  <span className="text-xs text-muted-foreground">{language.nativeName}</span>
                </div>
              </div>
              
              {currentLanguage === language.code && (
                <Badge variant="secondary" className="text-xs">
                  Current
                </Badge>
              )}
            </DropdownMenuItem>
          ))}
          
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="px-2 py-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>Translation powered by F1 Street AI</span>
              </div>
              <p className="mt-1 text-[10px]">
                Help us improve translations by providing feedback
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;