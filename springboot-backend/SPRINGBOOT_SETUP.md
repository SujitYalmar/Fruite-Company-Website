# 🍃 BK Fruits Spring Boot Backend Setup Guide

This guide will help you set up and run the complete Spring Boot backend for your BK Fruits application.

## 📁 Project Structure

I've created a complete Spring Boot backend with the following structure:

```
springboot-backend/
├── src/main/java/com/freshharvest/
│   ├── FreshharvestApplication.java          # Main application class
│   ├── config/
│   │   ├── SecurityConfig.java               # Security configuration
│   │   └── WebConfig.java                    # CORS and web configuration
│   ├── controller/
│   │   ├── AuthController.java               # Authentication endpoints
│   │   ├── FruitController.java              # Fruit CRUD operations
│   │   ├── InquiryController.java            # Buyer-Farmer inquiries
│   │   ├── ServiceController.java            # Services management
│   │   └── HealthController.java             # Health check endpoint
│   ├── dto/
│   │   ├── AuthRequest.java                  # Login request DTO
│   │   ├── RegisterRequest.java              # Registration request DTO
│   │   ├── AuthResponse.java                 # Authentication response DTO
│   │   ├── FruitRequest.java                 # Fruit creation/update DTO
│   │   ├── InquiryRequest.java               # Inquiry creation DTO
│   │   └── ApiResponse.java                  # Standard API response wrapper
│   ├── exception/
│   │   ├── ResourceNotFoundException.java     # Custom exceptions
│   │   ├── BadRequestException.java
│   │   ├── UnauthorizedException.java
│   │   └── GlobalExceptionHandler.java       # Global exception handling
│   ├── model/
│   │   ├── User.java                         # User entity (Admin/Farmer/Buyer)
│   │   ├── Fruit.java                        # Fruit listing entity
│   │   ├── Inquiry.java                      # Buyer inquiry entity
│   │   └── Service.java                      # Service entity
│   ├── repository/
│   │   ├── UserRepository.java               # User data access
│   │   ├── FruitRepository.java              # Fruit data access with filters
│   │   ├── InquiryRepository.java            # Inquiry data access
│   │   └── ServiceRepository.java            # Service data access
│   ├── security/
│   │   ├── JwtTokenProvider.java             # JWT token generation/validation
│   │   ├── JwtAuthenticationFilter.java      # JWT filter for requests
│   │   ├── JwtAuthenticationEntryPoint.java  # JWT error handling
│   │   └── UserPrincipal.java                # User details implementation
│   └── service/
│       ├── UserService.java                  # User business logic
│       ├── FruitService.java                 # Fruit business logic
│       ├── InquiryService.java               # Inquiry business logic
│       └── ServiceService.java               # Service business logic
├── src/main/resources/
│   ├── application.yml                       # Application configuration
│   └── data.sql                             # Sample data initialization
├── pom.xml                                  # Maven dependencies
└── README.md                               # Detailed documentation
```

## 🚀 Quick Start

### 1. **Prerequisites**
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### 2. **Database Setup**
```sql
-- Create database
CREATE DATABASE bkfruits_db;

-- Create user (optional)
CREATE USER 'bkfruits'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON bkfruits_db.* TO 'bkfruits'@'localhost';
FLUSH PRIVILEGES;
```

### 3. **Configuration**
Update `springboot-backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/bkfruits_db
    username: root  # or your MySQL username
    password: your_mysql_password

jwt:
  secret: mySecretKey123456789  # Change this in production
  expiration: 86400000  # 24 hours

cors:
  allowed-origins: http://localhost:3000,http://localhost:5173
```

### 4. **Build and Run**
```bash
# Navigate to the Spring Boot project
cd springboot-backend

# Build the project
mvn clean compile

# Run the application
mvn spring-boot:run
```

The API will be available at: `http://localhost:8080/api`

## 🔐 Authentication

### Demo Users (Pre-configured)
| Role   | Email                    | Password  |
|--------|--------------------------|-----------|
| Admin  | admin@bkfruits.com       | password  |
| Farmer | farmer@example.com       | password  |
| Buyer  | buyer@example.com        | password  |

### Login Example
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password",
    "role": "FARMER"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "user": {
    "id": 2,
    "name": "John Farmer",
    "email": "farmer@example.com",
    "role": "FARMER"
  },
  "message": "Login successful"
}
```

## 📚 Key API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Fruits (Marketplace)
- `GET /api/fruits` - Get all fruits with filters
- `POST /api/fruits` - Create fruit listing (Farmers only)
- `PUT /api/fruits/{id}` - Update fruit listing
- `DELETE /api/fruits/{id}` - Delete fruit listing
- `GET /api/fruits/farmer/my-listings` - Get farmer's listings

### Inquiries (Buyer-Farmer Communication)
- `POST /api/inquiries` - Send inquiry (Buyers only)
- `GET ` - Get farmer's inquiries
- `GET /api/inquiries/buyer` - Get buyer's inquiries
- `PUT /api/inquiries/{id}/status` - Update inquiry status

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Admin only)

## 🔧 Frontend Integration

### Update React API Service
Replace your current API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';

// Example API call
const response = await fetch(`${API_BASE_URL}/fruits`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)

## 🛡️ Security Features

- **JWT Authentication** with 24-hour expiration
- **Role-based Authorization** (Admin, Farmer, Buyer)
- **Password Encryption** with BCrypt
- **Input Validation** with Bean Validation
- **SQL Injection Prevention** with JPA
- **CORS Protection** with configurable origins

## 📊 Database Features

- **Automatic Schema Creation** with JPA/Hibernate
- **Sample Data Loading** on startup
- **Pagination and Sorting** for large datasets
- **Advanced Filtering** for fruit searches
- **Relationship Management** between entities

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:8080/api/health
```

### Get All Fruits
```bash
curl http://localhost:8080/api/fruits
```

### Create Fruit (with JWT)
```bash
curl -X POST http://localhost:8080/api/fruits \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fresh Strawberries",
    "type": "Berry",
    "quantity": 100,
    "price": 5.50,
    "location": "California, USA",
    "description": "Sweet, juicy strawberries",
    "harvestDate": "2024-01-20"
  }'
```

## 🚀 Production Deployment

### Build JAR
```bash
mvn clean package
java -jar target/freshharvest-backend-0.0.1-SNAPSHOT.jar
```

### Environment Variables
Set these for production:
```bash
export DB_USERNAME=your_db_user
export DB_PASSWORD=your_db_password
export JWT_SECRET=your_secure_jwt_secret
export CORS_ORIGINS=https://your-frontend-domain.com
```

## 📝 Next Steps

1. **Download the Spring Boot project** from the generated files
2. **Set up your MySQL database** with the provided credentials
3. **Update the configuration** with your database details
4. **Run the application** using Maven
5. **Test the endpoints** using the provided examples
6. **Integrate with your React frontend** by updating the API base URL

The Spring Boot backend provides a complete, production-ready API that perfectly matches your React frontend requirements!

## 🤝 Support

If you encounter any issues:
1. Check the application logs for detailed error messages
2. Verify your MySQL connection and credentials
3. Ensure Java 17+ and Maven are properly installed
4. Confirm the database schema is created correctly

The backend includes comprehensive error handling and logging to help with troubleshooting.