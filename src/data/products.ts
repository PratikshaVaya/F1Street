// Import all product images
import monacoGpTee from '@/assets/monaco-gp-tee.webp';
import silverstoneSpeedTee from '@/assets/silverstone-speed-tee.webp';
import championshipVictoryTee from '@/assets/championship-victory-tee.webp';
import pitCrewRacingTee from '@/assets/pit-crew-racing-tee.webp';
import formulaCarbonTee from '@/assets/formula-carbon-tee.webp';
import trackDayEssentialTee from '@/assets/track-day-essential-tee.webp';

import monacoRacingJacket from '@/assets/monaco-racing-jacket.webp';
import silverstoneBomberJacket from '@/assets/silverstone-bomber-jacket.webp';
import championshipWindbreaker from '@/assets/championship-windbreaker.webp';
import pitCrewJacket from '@/assets/pit-crew-jacket.webp';

import monacoRacingCap from '@/assets/monaco-racing-cap.webp';
import silverstoneTruckerCap from '@/assets/silverstone-trucker-cap.webp';
import championshipBeanie from '@/assets/championship-beanie.webp';

import racingBackpack from '@/assets/racing-backpack.webp';
import racingGloves from '@/assets/racing-gloves.webp';
import racingKeychain from '@/assets/racing-keychain.webp';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isSale: boolean;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export const productDatabase: Record<string, Product[]> = {
  tees: [
    {
      id: 1,
      name: 'Monaco GP Racing Tee',
      price: 89,
      originalPrice: 119,
      image: monacoGpTee,
      rating: 4.8,
      reviews: 124,
      isNew: true,
      isSale: true,
      category: 'tees',
      description: 'Inspired by the legendary Monaco Grand Prix, this premium racing tee combines style with performance.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Red', 'White']
    },
    {
      id: 2,
      name: 'Silverstone Speed Tee',
      price: 79,
      image: silverstoneSpeedTee,
      rating: 4.6,
      reviews: 89,
      isNew: false,
      isSale: false,
      category: 'tees',
      description: 'Aerodynamic design inspired by the high-speed Silverstone circuit.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Red', 'Black', 'Navy']
    },
    {
      id: 3,
      name: 'Championship Victory Tee',
      price: 99,
      image: championshipVictoryTee,
      rating: 4.9,
      reviews: 156,
      isNew: true,
      isSale: false,
      category: 'tees',
      description: 'Celebrate racing victories with this championship-inspired design.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Gold', 'Black']
    },
    {
      id: 4,
      name: 'Pit Crew Racing Tee',
      price: 69,
      originalPrice: 89,
      image: pitCrewRacingTee,
      rating: 4.5,
      reviews: 67,
      isNew: false,
      isSale: true,
      category: 'tees',
      description: 'Professional pit crew style with technical racing graphics.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Navy', 'Black', 'Grey']
    },
    {
      id: 5,
      name: 'Formula Carbon Tee',
      price: 109,
      image: formulaCarbonTee,
      rating: 4.7,
      reviews: 92,
      isNew: true,
      isSale: false,
      category: 'tees',
      description: 'Carbon fiber inspired design with electric blue racing accents.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Carbon Black', 'Electric Blue', 'Silver']
    },
    {
      id: 6,
      name: 'Track Day Essential Tee',
      price: 59,
      image: trackDayEssentialTee,
      rating: 4.4,
      reviews: 43,
      isNew: false,
      isSale: false,
      category: 'tees',
      description: 'Essential racing style for track day enthusiasts.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Grey', 'Black', 'White']
    }
  ],
  
  jackets: [
    {
      id: 101,
      name: 'Monaco Racing Jacket',
      price: 249,
      originalPrice: 299,
      image: monacoRacingJacket,
      rating: 4.9,
      reviews: 87,
      isNew: true,
      isSale: true,
      category: 'jackets',
      description: 'Premium F1-inspired racing jacket with aerodynamic design and Monaco GP branding.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Red', 'Carbon']
    },
    {
      id: 102,
      name: 'Silverstone Bomber Jacket',
      price: 199,
      image: silverstoneBomberJacket,
      rating: 4.7,
      reviews: 64,
      isNew: false,
      isSale: false,
      category: 'jackets',
      description: 'Sleek bomber jacket with carbon fiber details and speed-inspired graphics.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Red', 'Black', 'Navy']
    },
    {
      id: 103,
      name: 'Championship Windbreaker',
      price: 179,
      image: championshipWindbreaker,
      rating: 4.6,
      reviews: 52,
      isNew: true,
      isSale: false,
      category: 'jackets',
      description: 'Lightweight windbreaker with championship trophy graphics.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Gold', 'Silver']
    },
    {
      id: 104,
      name: 'Pit Crew Racing Jacket',
      price: 229,
      originalPrice: 279,
      image: pitCrewJacket,
      rating: 4.8,
      reviews: 71,
      isNew: false,
      isSale: true,
      category: 'jackets',
      description: 'Professional pit crew style jacket with technical circuit diagrams.',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Carbon Black', 'Navy', 'Grey']
    }
  ],
  
  caps: [
    {
      id: 201,
      name: 'Monaco Racing Cap',
      price: 45,
      originalPrice: 59,
      image: monacoRacingCap,
      rating: 4.7,
      reviews: 134,
      isNew: true,
      isSale: true,
      category: 'caps',
      description: 'Premium snapback cap with Monaco GP logo and checkered flag details.',
      sizes: ['One Size'],
      colors: ['Black', 'Red', 'White']
    },
    {
      id: 202,
      name: 'Silverstone Trucker Cap',
      price: 39,
      image: silverstoneTruckerCap,
      rating: 4.5,
      reviews: 98,
      isNew: false,
      isSale: false,
      category: 'caps',
      description: 'Classic trucker cap with Silverstone circuit graphics.',
      sizes: ['One Size'],
      colors: ['Red', 'Black', 'Navy']
    },
    {
      id: 203,
      name: 'Championship Beanie',
      price: 35,
      image: championshipBeanie,
      rating: 4.6,
      reviews: 76,
      isNew: true,
      isSale: false,
      category: 'caps',
      description: 'Premium knit beanie with golden F1 trophy embroidery.',
      sizes: ['One Size'],
      colors: ['White', 'Gold', 'Black']
    }
  ],
  
  accessories: [
    {
      id: 301,
      name: 'Racing Backpack',
      price: 129,
      originalPrice: 159,
      image: racingBackpack,
      rating: 4.8,
      reviews: 89,
      isNew: true,
      isSale: true,
      category: 'accessories',
      description: 'Carbon fiber F1 racing backpack with technical design and red accents.',
      sizes: ['One Size'],
      colors: ['Carbon Black', 'Red', 'Silver']
    },
    {
      id: 302,
      name: 'Racing Gloves',
      price: 79,
      image: racingGloves,
      rating: 4.7,
      reviews: 112,
      isNew: false,
      isSale: false,
      category: 'accessories',
      description: 'Premium leather racing gloves with grip details and Monaco GP branding.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Red', 'Carbon']
    },
    {
      id: 303,
      name: 'Racing Keychain',
      price: 25,
      image: racingKeychain,
      rating: 4.4,
      reviews: 156,
      isNew: true,
      isSale: false,
      category: 'accessories',
      description: 'Sleek F1 racing keychain with carbon fiber finish and championship trophy design.',
      sizes: ['One Size'],
      colors: ['Carbon Black', 'Red', 'Gold']
    }
  ]
};

export const getAllProducts = (): Product[] => {
  return Object.values(productDatabase).flat();
};

export const getProductsByCategory = (category: string): Product[] => {
  return productDatabase[category] || [];
};

export const getProductById = (id: number): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description?.toLowerCase().includes(query.toLowerCase())
  );
};

export const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    tees: 'Racing Tees',
    jackets: 'Speed Jackets',
    caps: 'Racing Caps',
    accessories: 'Pit Accessories',
    limited: 'Limited Edition'
  };
  return titles[category] || category.toUpperCase();
};

export const getCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    tees: 'Premium racing-inspired streetwear designed for champions on and off the track',
    jackets: 'Aerodynamic performance outerwear with championship-winning style',
    caps: 'Championship-style headwear for the ultimate racing enthusiast',
    accessories: 'Essential racing gear and accessories for true motorsport fans',
    limited: 'Exclusive championship pieces for the ultimate collectors'
  };
  return descriptions[category] || 'Premium F1-inspired streetwear collection';
};