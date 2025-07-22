import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, Share2, Minus, Plus, Search, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';

// Import product data service
import { getProductById, getAllProducts } from '@/data/products';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Get product data from the database
  const product = getProductById(parseInt(id || '1'));
  
  // If product not found, show error state
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="racing">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock related products for search with real images
  const allProducts = getAllProducts().map(p => ({
    ...p,
    image: p.image
  }));

  // Filter products based on search
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) && p.id !== product.id
  );

  const remainingProducts = allProducts.filter(p => 
    !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && p.id !== product.id
  );

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-primary">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-muted/20 to-muted/40">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Show other product images from the same category */}
              {allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map((otherProduct, index) => (
                <div key={index} className="aspect-square overflow-hidden bg-muted rounded-lg">
                  <img 
                    src={otherProduct.image} 
                    alt={`Related ${product.category} ${index + 1}`}
                    className="w-full h-full object-cover object-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-accent text-accent-foreground">NEW ARRIVAL</Badge>
              <Badge className="bg-primary text-primary-foreground">ON SALE</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-racing mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-racing-yellow text-racing-yellow' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium ml-2">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  Save ${product.originalPrice - product.price}
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>

            {/* Size Selection - only show if sizes exist */}
            {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[3rem]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Link to="/cart" className="flex-1">
                <Button variant="racing" size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Search Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold font-racing mb-6">Find More Products</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for racing gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {searchQuery && (
            <div className="mb-6">
              <h3 className="font-semibold mb-4">
                Search Results for "{searchQuery}" ({filteredProducts.length} found)
              </h3>
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="racing-card">
                      <CardContent className="p-4">
                        <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-gradient-to-br from-muted/20 to-muted/40">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <p className="text-primary font-bold">${product.price}</p>
                        <Link to={`/product/${product.id}`}>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            View Product
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No products found matching "{searchQuery}"</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </div>
              )}

              {remainingProducts.length > 0 && (
                <>
                  <h3 className="font-semibold mb-4">Other Products You Might Like</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {remainingProducts.slice(0, 4).map((product) => (
                      <Card key={product.id} className="racing-card">
                        <CardContent className="p-4">
                          <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-gradient-to-br from-muted/20 to-muted/40">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <h4 className="font-semibold mb-2">{product.name}</h4>
                          <p className="text-primary font-bold">${product.price}</p>
                          <Link to={`/product/${product.id}`}>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              View Product
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Back to Category */}
        <div className="text-center">
          <Link to={`/category/${product.category}`}>
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;