import { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterProps {
  onFiltersChange?: (filters: any) => void;
  productCount?: number;
}

const ProductFilters = ({ onFiltersChange, productCount = 0 }: FilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', value: 'black', color: '#000000' },
    { name: 'White', value: 'white', color: '#FFFFFF' },
    { name: 'Red', value: 'red', color: '#EF4444' },
    { name: 'Blue', value: 'blue', color: '#3B82F6' },
    { name: 'Green', value: 'green', color: '#10B981' },
    { name: 'Yellow', value: 'yellow', color: '#F59E0B' },
  ];
  const brands = ['Monaco Racing', 'Silverstone', 'Championship', 'Pit Crew', 'Track Day'];

  const activeFiltersCount = selectedSizes.length + selectedColors.length + selectedBrands.length + 
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);

  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const FilterSection = ({ title, children, defaultOpen = true }: { 
    title: string; 
    children: React.ReactNode; 
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <h3 className="font-semibold text-left">{title}</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Active Filters:</h4>
              <div className="flex flex-wrap gap-1">
                {selectedSizes.map(size => (
                  <Badge key={size} variant="secondary" className="gap-1">
                    {size}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleSize(size)} />
                  </Badge>
                ))}
                {selectedColors.map(color => (
                  <Badge key={color} variant="secondary" className="gap-1">
                    {colors.find(c => c.value === color)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleColor(color)} />
                  </Badge>
                ))}
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="gap-1">
                    {brand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Badge variant="secondary" className="gap-1">
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 200])} />
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </FilterSection>

          {/* Sizes */}
          <FilterSection title="Sizes">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() => toggleSize(size)}
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Colors */}
          <FilterSection title="Colors">
            <div className="grid grid-cols-2 gap-2">
              {colors.map(color => (
                <div key={color.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.value}`}
                    checked={selectedColors.includes(color.value)}
                    onCheckedChange={() => toggleColor(color.value)}
                  />
                  <Label
                    htmlFor={`color-${color.value}`}
                    className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.color }}
                    />
                    {color.name}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Brands">
            <div className="space-y-2">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>
        </div>

        <div className="mt-6 pt-4 border-t space-y-2">
          <div className="text-sm text-muted-foreground">
            Showing {productCount} products
          </div>
          <SheetClose asChild>
            <Button className="w-full">
              Apply Filters
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFilters;