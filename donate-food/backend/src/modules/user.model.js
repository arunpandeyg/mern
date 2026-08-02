



CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password TEXT,
  role VARCHAR(20) CHECK (role IN ('DONOR','NEEDY','DELIVERY','ADMIN')) NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
