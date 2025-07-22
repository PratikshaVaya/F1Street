import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Grid, List, Star, Search } from 'lucide-react';
import { getProductsByCategory, getCategoryTitle, getCategoryDescription } from '@/data/products';
import ProductFilters from '@/components/ProductFilters';
import SizeGuideModal from '@/components/SizeGuideModal';
import SmartSearch from '@/components/SmartSearch';
import OrderTracker from '@/components/OrderTracker';

const CategoryPage = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get products for the current category
  const products = getProductsByCategory(category || '');
  const categoryTitle = getCategoryTitle(category || '');
  const categoryDescription = getCategoryDescription(category || '');

  // If no products found for this category, show empty state
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-racing-carbon to-racing-gray text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-racing-heading mb-4">
                {categoryTitle}
              </h1>
              <p className="text-xl text-racing-coolGray max-w-2xl mx-auto font-racing-body">
                {categoryDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🏁</div>
            <h2 className="text-2xl font-bold mb-4 font-racing-subheading">Coming Soon</h2>
            <p className="text-racing-coolGray mb-8 font-racing-body">
              This category is currently being developed. Check back soon for amazing racing gear!
            </p>
            <Link to="/">
              <Button variant="racing" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-racing-carbon to-racing-gray text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-racing-heading mb-4">
              {categoryTitle}
            </h1>
            <p className="text-xl text-racing-coolGray max-w-2xl mx-auto font-racing-body">
              {categoryDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Smart Features Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <ProductFilters productCount={products.length} />
            <SizeGuideModal category={category} />
            <OrderTracker />
            <span className="text-sm text-muted-foreground">
              {products.length} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            <SmartSearch 
              trigger={
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Smart Search
                </Button>
              } 
            />
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <Card key={product.id} className="border-0 product-card overflow-hidden group bg-card">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground">
                      NEW
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-primary text-primary-foreground">
                      SALE
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-racing-yellow text-racing-yellow" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors font-racing-subheading">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <Link to={`/product/${product.id}`}>
                  <Button variant="racing" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="ghost" size="lg">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;