import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Trophy, Zap, Shield, Star } from 'lucide-react';

// Import category images
import teesCategory from '@/assets/tees-category.webp';
import jacketsCategory from '@/assets/jackets-category.webp';
import capsCategory from '@/assets/caps-category.webp';
import racingBackpack from '@/assets/racing-backpack.webp';

const Home = () => {
  const categories = [
    {
      id: 'tees',
      name: 'Racing Tees',
      description: 'Premium racing-inspired t-shirts',
      image: teesCategory,
      href: '/category/tees',
      functional: true
    },
    {
      id: 'jackets',
      name: 'Speed Jackets',
      description: 'Aerodynamic performance jackets',
      image: jacketsCategory,
      href: '/category/jackets',
      functional: true // Now functional!
    },
    {
      id: 'caps',
      name: 'Racing Caps',
      description: 'Championship-style headwear',
      image: capsCategory,
      href: '/category/caps',
      functional: true // Now functional!
    },
    {
      id: 'accessories',
      name: 'Pit Accessories',
      description: 'Essential racing gear',
      image: racingBackpack,
      href: '/category/accessories',
      functional: true
    }
  ];

  const features = [
    {
      icon: Trophy,
      title: 'Championship Quality',
      description: 'Premium materials tested on the track'
    },
    {
      icon: Zap,
      title: 'Speed-Inspired Design',
      description: 'Aerodynamic cuts and racing aesthetics'
    },
    {
      icon: Shield,
      title: 'Durable Performance',
      description: 'Built to withstand the intensity of racing'
    }
  ];

  return (
    <div className="min-h-screen">{/* Removed bottom margin since footer handles spacing */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-racing-carbon via-racing-gray to-primary min-h-[90vh] flex items-center">
        <div className="absolute inset-0 racing-grid opacity-10" />
        <div className="absolute inset-0 speed-lines opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold">Championship Collection 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-racing-heading">
              <div className="overflow-hidden">
                {"RACE THE".split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`hero-text-letter delay-${index * 75}`}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden">
                {"STREETS".split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`hero-text-letter text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text`}
                    style={{ animationDelay: `${(index + 9) * 75}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </h1>
            
            <div className="mb-6 overflow-hidden">
              <p className="hero-text-letter text-xl md:text-2xl text-racing-yellow font-racing-subheading" style={{ animationDelay: '1200ms' }}>
                Track-Born. Street-Ready.
              </p>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 text-racing-coolGray max-w-2xl mx-auto font-racing-body">
              Where Formula 1 precision meets street style. Gear up with racing-inspired streetwear 
              designed for champions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/category/tees">
                <Button variant="racing" size="xl" className="min-w-[200px]">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button variant="outline" size="xl" className="min-w-[200px] border-white text-white hover:bg-white hover:text-racing-carbon">
                Watch Story
              </Button>
            </div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-racing-pulse" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-accent rounded-full animate-racing-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-racing-yellow rounded-full animate-racing-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-card to-muted/50 racing-card">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-racing-heading">
              GEAR UP
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-racing-body">
              Explore our championship-winning collection designed for the streets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <Card key={category.id} className="border-0 category-card overflow-hidden group bg-card">
                <div className="relative image-fade-scroll">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-muted/20 to-muted/40">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-2 font-racing-subheading">{category.name}</h3>
                    <p className="text-white/80 text-sm font-racing-body">{category.description}</p>
                  </div>
                  {category.functional && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                        NEW
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  {category.functional ? (
                    <Link to={category.href}>
                      <Button variant="racing" className="w-full">
                        Explore {category.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/category/tees">
              <Button variant="carbon" size="xl">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;