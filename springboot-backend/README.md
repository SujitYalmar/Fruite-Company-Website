# BK Fruits Spring Boot Backend

A comprehensive Spring Boot REST API for the BK Fruits marketplace application.

## 🚀 Features

- **Spring Boot 3.2.1** with Java 17
- **Spring Security** with JWT authentication
- **Spring Data JPA** with MySQL database
- **Role-based Access Control** (Admin, Farmer, Buyer)
- **RESTful API** with comprehensive endpoints
- **Input Validation** with Bean Validation
- **Global Exception Handling**
- **CORS Configuration** for frontend integration
- **File Upload Support** for fruit images
- **Pagination and Sorting** for large datasets

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Security 6**
- **Spring Data JPA**
- **MySQL 8.0+**
- **JWT (JSON Web Tokens)**
- **Maven** for dependency management
- **BCrypt** for password hashing

## 📦 Project Structure

```
src/main/java/com/freshharvest/
├── config/              # Configuration classes
├── controller/          # REST controllers
├── dto/                # Data Transfer Objects
├── exception/          # Custom exceptions and handlers
├── model/              # JPA entities
├── repository/         # JPA repositories
├── security/           # Security configuration and JWT
└── service/            # Business logic services
```

## 🔧 Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE bkfruits_db;
```

### 2. Configuration

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/bkfruits_db
    username: your_username
    password: your_password

jwt:
  secret: your_jwt_secret_key
  expiration: 86400000

cors:
  allowed-origins: http://localhost:3000,http://localhost:5173
```

### 3. Build and Run

```bash
# Build the project
mvn clean compile

# Run the application
mvn spring-boot:run

# Or build JAR and run
mvn clean package
java -jar target/freshharvest-backend-0.0.1-SNAPSHOT.jar
```

The API will be available at `http://localhost:8080/api`

## 🔐 Authentication

### Default Users

The application comes with pre-configured demo users:

| Role   | Email                    | Password  |
|--------|--------------------------|-----------|
| Admin  | admin@bkfruits.com       | password  |
| Farmer | farmer@example.com       | password  |
| Buyer  | buyer@example.com        | password  |

### JWT Token Usage

1. **Login** to get JWT token:
```bash
POST /api/auth/login
{
  "email": "farmer@example.com",
  "password": "password",
  "role": "FARMER"
}
```

2. **Use token** in subsequent requests:
```bash
Authorization: Bearer <your-jwt-token>
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Fruits
- `GET /api/fruits` - Get all fruits (with filters)
- `GET /api/fruits/{id}` - Get fruit by ID
- `POST /api/fruits` - Create fruit listing (Farmers only)
- `PUT /api/fruits/{id}` - Update fruit listing (Farmers only)
- `DELETE /api/fruits/{id}` - Delete fruit listing (Farmers only)
- `GET /api/fruits/farmer/my-listings` - Get farmer's listings
- `PUT /api/fruits/{id}/status` - Update fruit status
- `GET /api/fruits/stats/overview` - Get farmer statistics
- `GET /api/fruits/types` - Get distinct fruit types
- `GET /api/fruits/locations` - Get distinct locations

### Inquiries
- `POST /api/inquiries` - Create inquiry (Buyers only)
- `GET /api/inquiries/all` - Get all inquiries (Admin only)
- `GET /api/inquiries/farmer` - Get farmer's inquiries
- `GET /api/inquiries/buyer` - Get buyer's inquiries
- `PUT /api/inquiries/{id}/status` - Update inquiry status
- `GET /api/inquiries/{id}` - Get inquiry by ID
- `GET /api/inquiries/status/{status}` - Get inquiries by status

### Services
- `GET /api/services` - Get all services
- `GET /api/services/{id}` - Get service by ID
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/{id}` - Update service (Admin only)
- `DELETE /api/services/{id}` - Delete service (Admin only)
- `GET /api/services/search` - Search services

### Health Check
- `GET /api/health` - API health status

## 🔒 Security Features

- **JWT Authentication** with configurable expiration
- **Role-based Authorization** using Spring Security
- **Password Encryption** with BCrypt
- **CORS Configuration** for cross-origin requests
- **Input Validation** with Bean Validation
- **SQL Injection Prevention** with JPA parameterized queries

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `name`, `email`, `password`
- `role` (ADMIN, FARMER, BUYER)
- `phone`, `location`
- `created_at`, `updated_at`

### Fruits Table
- `id` (Primary Key)
- `name`, `type`, `quantity`, `price`
- `location`, `description`, `image`
- `farmer_id` (Foreign Key)
- `harvest_date`, `status`
- `created_at`, `updated_at`

### Inquiries Table
- `id` (Primary Key)
- `buyer_id`, `fruit_id` (Foreign Keys)
- `message`, `quantity`, `status`
- `created_at`

### Services Table
- `id` (Primary Key)
- `title`, `description`, `icon`
- `features` (One-to-Many relationship)

## 🧪 Testing

Run tests with:
```bash
mvn test
```

## 📝 API Documentation

The API follows RESTful conventions with:
- **Consistent Response Format** using `ApiResponse<T>`
- **Proper HTTP Status Codes**
- **Comprehensive Error Handling**
- **Input Validation Messages**

### Sample Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-01-17T10:30:00"
}
```

## 🚀 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package
java -jar target/freshharvest-backend-0.0.1-SNAPSHOT.jar
```

### Docker (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/freshharvest-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.