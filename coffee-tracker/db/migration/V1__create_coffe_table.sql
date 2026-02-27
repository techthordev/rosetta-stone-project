CREATE TABLE coffee (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO coffee (type, price) VALUES ('Espresso', 1.20);
INSERT INTO coffee (type, price) VALUES ('Macchiato', 1.50);