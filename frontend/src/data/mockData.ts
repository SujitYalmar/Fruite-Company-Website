import { Fruit, Service } from '../types';

export const mockFruits: Fruit[] = [
  {
    id: '1',
    name: 'Organic Apples',
    type: 'Apple',
    quantity: 500,
    price: 3.50,
    location: 'Washington, USA',
    farmerId: '2',
    farmerName: 'Green Valley Farm',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh, crisp organic apples perfect for retail and wholesale.',
    harvestDate: '2024-01-15',
    status: 'available',
    createdAt: '2024-01-16'
  },
  {
    id: '2',
    name: 'Premium Oranges',
    type: 'Orange',
    quantity: 800,
    price: 2.80,
    location: 'Florida, USA',
    farmerId: '2',
    farmerName: 'Sunshine Citrus Co.',
    image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Sweet, juicy oranges with high vitamin C content.',
    harvestDate: '2024-01-10',
    status: 'available',
    createdAt: '2024-01-11'
  },
  {
    id: '3',
    name: 'Tropical Bananas',
    type: 'Banana',
    quantity: 1200,
    price: 1.20,
    location: 'Ecuador',
    farmerId: '2',
    farmerName: 'Tropical Harvest Ltd.',
    image: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium quality bananas, perfect ripeness for distribution.',
    harvestDate: '2024-01-18',
    status: 'available',
    createdAt: '2024-01-19'
  },
  {
    id: '4',
    name: 'Fresh Strawberries',
    type: 'Berry',
    quantity: 300,
    price: 5.50,
    location: 'California, USA',
    farmerId: '2',
    farmerName: 'Berry Fields Farm',
    image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hand-picked strawberries with exceptional sweetness.',
    harvestDate: '2024-01-20',
    status: 'available',
    createdAt: '2024-01-21'
  },
  {
    id: '5',
    name: 'Exotic Mangoes',
    type: 'Mango',
    quantity: 600,
    price: 4.20,
    location: 'India',
    farmerId: '2',
    farmerName: 'Mango Paradise',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Alphonso mangoes known for their rich flavor and aroma.',
    harvestDate: '2024-01-12',
    status: 'available',
    createdAt: '2024-01-13'
  },
  {
    id: '6',
    name: 'Fresh Grapes',
    type: 'Grape',
    quantity: 400,
    price: 3.80,
    location: 'Chile',
    farmerId: '2',
    farmerName: 'Vineyard Fresh',
    image: 'https://images.pexels.com/photos/23042/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    description: 'Seedless grapes with perfect sweetness and texture.',
    harvestDate: '2024-01-14',
    status: 'available',
    createdAt: '2024-01-15'
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Bulk Fruit Supply',
    description: 'Premium quality fruits sourced directly from trusted farms for retailers and distributors.',
    icon: 'Package',
    features: [
      'Direct farm sourcing',
      'Quality assurance',
      'Flexible quantities',
      'Competitive pricing',
      'Regular supply schedules'
    ]
  },
  {
    id: '2',
    title: 'Farm-to-Market Distribution',
    description: 'Efficient logistics solutions connecting farmers directly to markets worldwide.',
    icon: 'Truck',
    features: [
      'Global distribution network',
      'Real-time tracking',
      'Temperature-controlled transport',
      'Fast delivery times',
      'Insurance coverage'
    ]
  },
  {
    id: '3',
    title: 'Cold Storage Solutions',
    description: 'State-of-the-art cold storage facilities to maintain fruit freshness and extend shelf life.',
    icon: 'Snowflake',
    features: [
      'Temperature-controlled environments',
      'Extended shelf life',
      'Inventory management',
      '24/7 monitoring',
      'Flexible storage terms'
    ]
  },
  {
    id: '4',
    title: 'Packaging & Processing',
    description: 'Professional packaging and processing services to meet retail and export standards.',
    icon: 'Gift',
    features: [
      'Custom packaging solutions',
      'Food safety compliance',
      'Branding options',
      'Portion control',
      'Export documentation'
    ]
  }
];