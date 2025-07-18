import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Star, ShoppingCart } from 'lucide-react';
import { Fruit } from '../types';
import { mockFruits } from '../data/mockData';
import Button from '../components/common/Button';

const Products: React.FC = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [filteredFruits, setFilteredFruits] = useState<Fruit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Load fruits from localStorage and mock data
    const userFruits = JSON.parse(localStorage.getItem('userFruits') || '[]');
    const allFruits = [...mockFruits, ...userFruits];
    setFruits(allFruits);
    setFilteredFruits(allFruits);
  }, []);

  useEffect(() => {
    let filtered = fruits.filter(fruit => {
      const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fruit.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || fruit.type === selectedType;
      const matchesLocation = !selectedLocation || fruit.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesPrice = fruit.price >= priceRange.min && fruit.price <= priceRange.max;
      
      return matchesSearch && matchesType && matchesLocation && matchesPrice;
    });

    // Sort fruits
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredFruits(filtered);
  }, [fruits, searchTerm, selectedType, selectedLocation, priceRange, sortBy]);

  const uniqueTypes = Array.from(new Set(fruits.map(fruit => fruit.type)));
  const uniqueLocations = Array.from(new Set(fruits.map(fruit => fruit.location)));

  const handleInquiry = (fruit: Fruit) => {
    alert(`Inquiry sent for ${fruit.name}! The farmer will contact you soon.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            BK Fruits Marketplace
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover premium quality fruits directly from trusted farmers worldwide
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search fruits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min $"
                value={priceRange.min || ''}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max $"
                value={priceRange.max || ''}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseFloat(e.target.value) || 100 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Found {filteredFruits.length} fruits
          </p>
        </div>

        {/* Products Grid */}
        {filteredFruits.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fruits found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFruits.map((fruit) => (
              <div
                key={fruit.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {fruit.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {fruit.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {fruit.location}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    Harvested: {new Date(fruit.harvestDate).toLocaleDateString()}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {fruit.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ${fruit.price}
                      </span>
                      <span className="text-gray-500 text-sm">/kg</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Available</p>
                      <p className="font-semibold">{fruit.quantity} kg</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    By {fruit.farmerName}
                  </div>
                  
                  <Button
                    onClick={() => handleInquiry(fruit)}
                    className="w-full"
                    icon={ShoppingCart}
                  >
                    Send Inquiry
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;