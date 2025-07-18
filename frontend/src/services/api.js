const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return user.token || null;
};

// Helper function to make authenticated requests
const makeRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email, password, role) => {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },

  register: async (userData) => {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getCurrentUser: async () => {
    return makeRequest('/auth/me');
  },
};

// Fruits API
export const fruitsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const queryString = queryParams.toString();
    return makeRequest(`/fruits${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return makeRequest(`/fruits/${id}`);
  },

  create: async (fruitData) => {
    return makeRequest('/fruits', {
      method: 'POST',
      body: JSON.stringify(fruitData),
    });
  },

  update: async (id, fruitData) => {
    return makeRequest(`/fruits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fruitData),
    });
  },

  delete: async (id) => {
    return makeRequest(`/fruits/${id}`, {
      method: 'DELETE',
    });
  },

  getMyListings: async () => {
    return makeRequest('/fruits/farmer/my-listings');
  },

  getStats: async () => {
    return makeRequest('/fruits/stats/overview');
  },
};

// Inquiries API
export const inquiriesAPI = {
  create: async (inquiryData) => {
    return makeRequest('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  getAll: async () => {
    return makeRequest('/inquiries/all');
  },

  getFarmerInquiries: async () => {
    return makeRequest('/inquiries/farmer');
  },

  getBuyerInquiries: async () => {
    return makeRequest('/inquiries/buyer');
  },

  updateStatus: async (id, status) => {
    return makeRequest(`/inquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};