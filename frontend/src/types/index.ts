export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'farmer' | 'buyer';
  phone?: string;
  location?: string;
}

export interface Fruit {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  location: string;
  farmerId: string;
  farmerName: string;
  image: string;
  description: string;
  harvestDate: string;
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Inquiry {
  id: string;
  buyerId: string;
  fruitId: string;
  message: string;
  quantity: number;
  createdAt: string;
  status: 'pending' | 'responded' | 'closed';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}