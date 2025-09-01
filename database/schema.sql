-- Cafe Fausse Database Schema
-- PostgreSQL Database Setup

-- Create database (run this command separately)
-- CREATE DATABASE cafe_fausse;

-- Connect to the database and run the following:

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email_address VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER CHECK (table_number >= 1 AND table_number <= 30),
    number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reservations_time_slot ON reservations(time_slot);
CREATE INDEX IF NOT EXISTS idx_reservations_table_number ON reservations(table_number);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email_address);

-- Insert sample data for testing
INSERT INTO customers (customer_name, email_address, phone_number, newsletter_signup) VALUES
('John Doe', 'john.doe@example.com', '(555) 123-4567', true),
('Jane Smith', 'jane.smith@example.com', '(555) 987-6543', false);

-- Sample reservations
INSERT INTO reservations (customer_id, time_slot, table_number, number_of_guests) VALUES
(1, '2024-01-15 19:00:00', 5, 2),
(2, '2024-01-15 20:00:00', 12, 4);
