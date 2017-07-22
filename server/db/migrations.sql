
CREATE DATABASE rental_app;

\c rental_app;

CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255), password_digest VARCHAR(255), zip_code VARCHAR (5), token VARCHAR(255));