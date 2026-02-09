CREATE TABLE IF NOT EXISTS clients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    id_number VARCHAR(50),
    passport_number VARCHAR(50),
    bank_statement BLOB,
    file_name VARCHAR(255)
);
