import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Users, Package, TrendingUp, Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import { Fruit } from '../types';
import Button from '../components/common/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [userFruits, setUserFruits] = useState<Fruit[]>([]);

  useEffect(() => {
    if (user?.role === 'farmer') {
      const savedFruits = JSON.parse(localStorage.getItem('userFruits') || '[]');
      const myFruits = savedFruits.filter((fruit: Fruit) => fruit.farmerId === user.id);
      setUserFruits(myFruits);
    }
  }, [user]);

  const stats = {
    totalListings: userFruits.length,
    activeListings: userFruits.filter(f => f.status === 'available').length,
    totalRevenue: userFruits.reduce((sum, f) => sum + (f.price * f.quantity), 0),
    avgPrice: userFruits.length > 0 ? userFruits.reduce((sum, f) => sum + f.price, 0) / userFruits.length : 0
  };

  const handleDelete = (fruitId: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      const allFruits = JSON.parse(localStorage.getItem('userFruits') || '[]');
      const updated = allFruits.filter((fruit: Fruit) => fruit.id !== fruitId);
      localStorage.setItem('userFruits', JSON.stringify(updated));
      setUserFruits(prev => prev.filter(f => f.id !== fruitId));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please login to access dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'farmer' && 'Manage your fruit listings and track your sales'}
            {user.role === 'buyer' && 'Browse available fruits and manage your orders'}
            {user.role === 'admin' && 'Oversee platform operations and user management'}
          </p>
        </div>

        {/* Stats Cards - Farmer View */}
        {user.role === 'farmer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Price/kg</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.avgPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Farmer Listings */}
        {user.role === 'farmer' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Fruit Listings</h2>
              <Button>
                <a href="/sell-fruits">Add New Listing</a>
              </Button>
            </div>

            {userFruits.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-500 mb-4">Start selling by creating your first fruit listing</p>
                <Button>
                  <a href="/sell-fruits">Create First Listing</a>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fruit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type & Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity & Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userFruits.map((fruit) => (
                      <tr key={fruit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={fruit.image}
                              alt={fruit.name}
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {fruit.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {fruit.description.slice(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{fruit.type}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {fruit.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{fruit.quantity} kg</div>
                          <div className="text-sm font-medium text-green-600">
                            ${fruit.price}/kg
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            fruit.status === 'available' 
                              ? 'bg-green-100 text-green-800'
                              : fruit.status === 'sold'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {fruit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(fruit.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(fruit.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Buyer Dashboard */}
        {user.role === 'buyer' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Button className="w-full justify-start">
                  <a href="/products">Browse Fresh Fruits</a>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View My Orders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Saved Favorites
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {user.role === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Overview</h3>
              <p className="text-gray-600">Manage users, listings, and platform settings</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600">View and manage farmer and buyer accounts</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">View platform statistics and performance</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;