# Study Resource Manager

Study Resource Manager is a web application designed to help users efficiently manage and share learning resources. It offers features such as user authentication, resource uploads, and profile management.

## Features

- **User Authentication**: Secure registration, login, and session management.
- **Resource Management**: Upload, view, and download learning materials.
- **User Profiles**: Manage and view profile details.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Project Structure

The project consists of two main components:

### Backend
- **Framework**: Express.js
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer

### Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Icons**: Heroicons

---

## Prerequisites

Ensure the following are installed before setting up the project:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (for database management)

---

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/dannie203/study_resource_manager.git
cd study-resource-manager
```

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    - Create a `.env` file in the backend directory based on the `env.example` file.
4. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
5. Start the backend server:
    ```bash
    npm start
    ```
    The backend server will run at `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    npm run dev
    ```
    The frontend server will run at `http://localhost:3000`.

---

## Usage

### Authentication
- **Register**: Visit `/auth/register` to create an account.
- **Login**: Visit `/auth/login` to log in.

### Dashboard
- Access the dashboard at `/dashboard` to view uploaded resources.

### Profile
- Manage your profile at `/profile`.

### Upload Resources
- Upload new learning resources at `/upload`.

---

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in with email/username and password.

### User Profile
- `GET /api/users/me`: Retrieve the logged-in user's profile.

### Resources
- `GET /api/resources`: Fetch all resources for the logged-in user.
- `POST /api/resources`: Create a new resource.

### Uploads
- `POST /api/uploads`: Upload a file.

---

## Technologies Used

### Backend
- **Express.js**: Web framework
- **Prisma**: ORM for database management
- **PostgreSQL**: Database
- **JWT**: Authentication
- **Multer**: File uploads

### Frontend
- **Next.js**: React-based framework
- **Tailwind CSS**: Styling
- **Heroicons**: Icons

---

## Testing

### Postman API Tests
- A Postman collection is included (`backend/postman-test.json`). Import it into Postman to test API endpoints.

### Manual Testing
1. Start the backend and frontend servers.
2. Open `http://localhost:3000` in your browser.
3. Test features such as registration, login, uploading resources, and viewing the dashboard.

---

## Future Enhancements

- Add support for resource categories and tags.
- Implement search and filter functionality for resources.
- Add email verification during registration.
- Improve error handling and logging.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, reach out via:
- **Email**: mayduahayhoc@gmail.com
- **GitHub**: https://github.com/dannie203/
