-- "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p 
CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO user (id, username, email, password) VALUES
("1", "john_doe", "john@example.com", "password123");