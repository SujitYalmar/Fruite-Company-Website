# BK Fruits - Fruit Company Full Stack Website

A comprehensive fruit marketplace connecting farmers with buyers worldwide.

## 🚀 Features

- **Modern React Frontend** with TypeScript and Tailwind CSS
- **Node.js/Express Backend** with MySQL database
- **Role-based Authentication** (Admin, Farmer, Buyer)
- **Fruit Marketplace** with advanced filtering and search
- **Farmer Portal** for listing fruits with image upload
- **Buyer Portal** for browsing and inquiring about fruits
- **Admin Dashboard** for platform management
- **Responsive Design** optimized for all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling


## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Database Setup

1. **Install MySQL** and create a database:
```sql
CREATE DATABASE bkfruits_db;
```

2. **Import the schema**:
```bash
mysql -u root -p bkfruits_db < server/config/schema.sql
```

3. **Configure environment variables**:
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bkfruits_db
JWT_SECRET=your_jwt_secret_key_here
PORT=3001
```

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Start the development servers**:
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
npm run server  # Backend on port 3001
npm run dev     # Frontend on port 5173
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Fruits
- `GET /api/fruits` - Get all fruits (with filters)
- `GET /api/fruits/:id` - Get fruit by ID
- `POST /api/fruits` - Create fruit listing (farmers only)
- `PUT /api/fruits/:id` - Update fruit listing
- `DELETE /api/fruits/:id` - Delete fruit listing
- `GET /api/fruits/farmer/my-listings` - Get farmer's listings
- `GET /api/fruits/stats/overview` - Get statistics

### Inquiries
- `POST /api/inquiries` - Create inquiry (buyers only)
- `GET /api/inquiries/farmer` - Get farmer's inquiries
- `GET /api/inquiries/buyer` - Get buyer's inquiries
- `PUT /api/inquiries/:id/status` - Update inquiry status

## 👥 User Roles

### Admin
- Platform oversight and management
- View all users and listings
- Access to analytics and reports

### Farmer
- Create and manage fruit listings
- Upload fruit images and descriptions
- Receive and respond to buyer inquiries
- View sales statistics

### Buyer
- Browse available fruits with filters
- Send inquiries to farmers
- Track inquiry status
- Save favorite listings

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require valid tokens
- Role-based access control for different user types

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Optimized layouts for tablets and desktops
- Touch-friendly interface elements
- Fast loading and smooth animations

## 🚀 Deployment

### Frontend (Netlify)
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request


