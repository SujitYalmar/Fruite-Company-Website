-- Insert default admin user
INSERT IGNORE INTO users (id, name, email, password, role, phone, location, created_at, updated_at) VALUES 
(1, 'Admin User', 'admin@freshharvest.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', '+1-555-0100', 'Head Office', NOW(), NOW());

-- Insert sample farmer
INSERT IGNORE INTO users (id, name, email, password, role, phone, location, created_at, updated_at) VALUES 
(2, 'John Farmer', 'farmer@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'FARMER', '+1-555-0101', 'California, USA', NOW(), NOW());

-- Insert sample buyer
INSERT IGNORE INTO users (id, name, email, password, role, phone, location, created_at, updated_at) VALUES 
(3, 'Sarah Buyer', 'buyer@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'BUYER', '+1-555-0102', 'New York, USA', NOW(), NOW());

-- Insert sample services
INSERT IGNORE INTO services (id, title, description, icon) VALUES 
(1, 'Bulk Fruit Supply', 'Premium quality fruits sourced directly from trusted farms for retailers and distributors.', 'Package'),
(2, 'Farm-to-Market Distribution', 'Efficient logistics solutions connecting farmers directly to markets worldwide.', 'Truck'),
(3, 'Cold Storage Solutions', 'State-of-the-art cold storage facilities to maintain fruit freshness and extend shelf life.', 'Snowflake'),
(4, 'Packaging & Processing', 'Professional packaging and processing services to meet retail and export standards.', 'Gift');

-- Insert service features
INSERT IGNORE INTO service_features (service_id, feature) VALUES 
(1, 'Direct farm sourcing'),
(1, 'Quality assurance'),
(1, 'Flexible quantities'),
(1, 'Competitive pricing'),
(1, 'Regular supply schedules'),
(2, 'Global distribution network'),
(2, 'Real-time tracking'),
(2, 'Temperature-controlled transport'),
(2, 'Fast delivery times'),
(2, 'Insurance coverage'),
(3, 'Temperature-controlled environments'),
(3, 'Extended shelf life'),
(3, 'Inventory management'),
(3, '24/7 monitoring'),
(3, 'Flexible storage terms'),
(4, 'Custom packaging solutions'),
(4, 'Food safety compliance'),
(4, 'Branding options'),
(4, 'Portion control'),
(4, 'Export documentation');

-- Insert sample fruits
INSERT IGNORE INTO fruits (id, name, type, quantity, price, location, farmer_id, farmer_name, image, description, harvest_date, status, created_at, updated_at) VALUES 
(1, 'Organic Apples', 'Apple', 500.00, 3.50, 'Washington, USA', 2, 'John Farmer', 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400', 'Fresh, crisp organic apples perfect for retail and wholesale.', '2024-01-15', 'AVAILABLE', NOW(), NOW()),
(2, 'Premium Oranges', 'Orange', 800.00, 2.80, 'Florida, USA', 2, 'John Farmer', 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400', 'Sweet, juicy oranges with high vitamin C content.', '2024-01-10', 'AVAILABLE', NOW(), NOW()),
(3, 'Tropical Bananas', 'Banana', 1200.00, 1.20, 'Ecuador', 2, 'John Farmer', 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400', 'Premium quality bananas, perfect ripeness for distribution.', '2024-01-18', 'AVAILABLE', NOW(), NOW());