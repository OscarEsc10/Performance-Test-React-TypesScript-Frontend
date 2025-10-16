# TechNova - Full-Stack Application

A modern full-stack application built with Next.js (React/TypeScript) for the frontend and NestJS (Node.js/TypeScript) for the backend. This project demonstrates CRUD operations, user authentication, role-based access control, and reusable UI components.

## Features

### Backend (NestJS)
- **User Management**: Registration, login, role-based access (admin/user).
- **Product Management**: Full CRUD with soft delete, filtering by brand/category.
- **Authentication**: JWT-based auth with guards and roles.
- **API Endpoints**: RESTful APIs for users and products.

### Frontend (Next.js)
- **Authentication**: Login/register with JWT persistence.
- **Dashboard**: Overview with role-based navigation.
- **Products CRUD**: List, create, update, delete products (modal-based UI).
- **Search**: Client-side search by name/SKU.
- **Role-Based UI**: Admin sees users section; non-admin sees products only.
- **Responsive Design**: Tailwind CSS with dark/light themes.
- **Modals & Forms**: Reusable components with validation.

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS, Zod (validation).
- **Backend**: NestJS, TypeORM, PostgreSQL, JWT, class-validator.
- **Tools**: Axios, SweetAlert2, Zustand (state management).

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database
- Git

### 1. Clone Repositories
- Frontend: `git clone https://github.com/OscarEsc10/Performance-Test-React-TypesScript-Frontend.git`
- Backend: `git clone https://github.com/OscarEsc10/Performance-Test-React-TypesScript-Backend.git`

### 2. Setup Backend
- Navigate to backend folder: `cd Performance-Test-React-TypesScript-Backend`
- Install dependencies: `npm install`
- Setup environment: Copy `.env.examples` to `.env` and configure DB connection (e.g., PostgreSQL).
- Run migrations: `npm run migration:run`
- Start server: `npm run start:dev` (runs on http://localhost:3000)

### 3. Setup Frontend
- Navigate to frontend folder: `cd Performance-Test-React-TypesScript-Frontend`
- Install dependencies: `npm install`
- Setup environment: Ensure `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3000`
- Start development server: `npm run dev` (runs on http://localhost:3001)

### 4. Usage
- Open browser to http://localhost:3001
- Register a new account or login (default admin: username="admin", password="password").
- Navigate to Dashboard → Products for CRUD operations.
- Admins can access Users section for user management.

## Project Structure

### Frontend
- `src/app/` - Next.js app routes (dashboard, login, products).
- `src/components/` - Reusable UI (Modal, Header).
- `src/services/` - API clients (auth, products).
- `src/types/` - TypeScript interfaces and schemas.
- `src/context/` - Global state (AuthContext).

### Backend
- `src/modules/` - Feature modules (auth, users, products).
- `src/common/` - Shared guards, decorators, services.
- `src/entities/` - Database entities.

## API Endpoints

### Auth
- `POST /auth/register` - Register user
- `POST /auth/login` - Login (returns JWT)

### Products
- `GET /products` - List products (with filters)
- `POST /products` - Create product
- `GET /products/:id` - Get product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product (admin only)

### Users
- `GET /users` - List users (admin only)
- `POST /users` - Create user (admin only)
- `PATCH /users/:id` - Update user (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## Security & Roles
- **Roles**: User (basic) and Admin (full access).
- **Guards**: Backend enforces roles for sensitive operations.
- **Frontend**: UI hides admin features for non-admins.

## Development Notes
- **Database**: Uses PostgreSQL with TypeORM for migrations.
- **Validation**: Zod on frontend; class-validator on backend.
- **Styling**: Tailwind CSS for responsive, accessible design.
- **State Management**: React Context for auth; local state for components.

## Contributing
1. Fork the repositories.
2. Create a feature branch.
3. Make changes and test.
4. Submit a pull request.

## License
This project is licensed under the MIT License.
