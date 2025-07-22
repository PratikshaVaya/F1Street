import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchProducts } from '@/data/products';
import { Link } from 'react-router-dom';

interface SmartSearchProps {
  trigger?: React.ReactNode;
  placeholder?: string;
}

const SmartSearch = ({ trigger, placeholder = "Search products..." }: SmartSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate loading delay for better UX
      const timer = setTimeout(() => {
        const searchResults = searchProducts(query);
        setResults(searchResults.slice(0, 6)); // Limit to 6 results
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const defaultTrigger = (
    <Button variant="ghost" size="icon">
      <Search className="h-5 w-5" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Smart Search
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {query.length > 0 && query.length <= 2 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Type at least 3 characters to search...
            </p>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {results.length > 0 && !isLoading && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <p className="text-sm text-muted-foreground">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{product.name}</h4>
                            {product.isNew && (
                              <Badge className="bg-accent text-accent-foreground text-xs">NEW</Badge>
                            )}
                            {product.isSale && (
                              <Badge className="bg-primary text-primary-foreground text-xs">SALE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground capitalize mb-1">{product.category}</p>
                          <p className="font-bold text-primary">${product.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {query.length > 2 && results.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-muted-foreground">No products found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try different keywords or browse our categories
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartSearch;