-- Create database
CREATE DATABASE IF NOT EXISTS freshharvest_db;
USE freshharvest_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'farmer', 'buyer') NOT NULL DEFAULT 'buyer',
    phone VARCHAR(20),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Fruits table
CREATE TABLE IF NOT EXISTS fruits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    farmer_id INT NOT NULL,
    farmer_name VARCHAR(255) NOT NULL,
    image TEXT,
    description TEXT,
    harvest_date DATE NOT NULL,
    status ENUM('available', 'sold', 'pending') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    fruit_id INT NOT NULL,
    message TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'responded', 'closed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (fruit_id) REFERENCES fruits(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT INTO users (name, email, password, role, phone, location) VALUES 
('Admin User', 'admin@freshharvest.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+1-555-0100', 'Head Office');

-- Insert sample services
INSERT INTO services (title, description, icon, features) VALUES 
('Bulk Fruit Supply', 'Premium quality fruits sourced directly from trusted farms for retailers and distributors.', 'Package', '["Direct farm sourcing", "Quality assurance", "Flexible quantities", "Competitive pricing", "Regular supply schedules"]'),
('Farm-to-Market Distribution', 'Efficient logistics solutions connecting farmers directly to markets worldwide.', 'Truck', '["Global distribution network", "Real-time tracking", "Temperature-controlled transport", "Fast delivery times", "Insurance coverage"]'),
('Cold Storage Solutions', 'State-of-the-art cold storage facilities to maintain fruit freshness and extend shelf life.', 'Snowflake', '["Temperature-controlled environments", "Extended shelf life", "Inventory management", "24/7 monitoring", "Flexible storage terms"]'),
('Packaging & Processing', 'Professional packaging and processing services to meet retail and export standards.', 'Gift', '["Custom packaging solutions", "Food safety compliance", "Branding options", "Portion control", "Export documentation"]');