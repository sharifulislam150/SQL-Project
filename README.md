# User Management App

A simple CRUD application built with Node.js, Express, MySQL, and EJS for managing user data.

## Features

- **View Users**: Display all users with count
- **Add User**: Create new users with username, email, and password
- **Edit User**: Update username (password verification required)
- **Delete User**: Remove users (password verification required)
- **Fake Data Generation**: Uses Faker.js for generating test data

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Template Engine**: EJS
- **Additional Libraries**: 
  - Faker.js (fake data generation)
  - UUID (unique ID generation)
  - Method Override (HTTP method support)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create MySQL database named `practice_app`
4. Create user table:
   ```sql
   CREATE TABLE user (
     id VARCHAR(255) PRIMARY KEY,
     username VARCHAR(255),
     email VARCHAR(255),
     password VARCHAR(255)
   );
   ```
5. Update database credentials in `index.js`
6. Start the server:
   ```bash
   node index.js
   ```

## Routes

- `GET /` - Home page with user count
- `GET /user` - Show all users
- `GET /user/adduser` - Add user form
- `POST /user/adduser` - Create new user
- `GET /user/:id/edit` - Edit user form
- `PATCH /user/:id` - Update user
- `GET /user/:id/delete` - Delete confirmation
- `DELETE /user/:id` - Delete user

Server runs on port 8080.