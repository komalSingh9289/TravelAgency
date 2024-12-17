# Travel Agency Booking System

## Overview
A simple Travel Agency Booking System designed to manage tour packages, handle customer bookings, and generate invoices. This system includes both customer-facing features and an admin panel for managing tour packages and bookings.

## Features

### Core Features

1. **Tour Packages Page:**
   - Displays a list of available tour packages fetched from MongoDB.
   - Each package includes:
     - Title
     - Description
     - Price
     - Available Dates
     - Image

2. **Package Booking:**
   - Customers can book a package via a form.
   - Form collects:
     - Name
     - Email
     - Phone Number
     - Number of Travelers
     - Special Requests (optional).
   - Booking data is saved to MongoDB.
   - Generates an invoice with:
     - Customer details
     - Package details
     - Total price (price per person * number of travelers).

3. **Admin Panel:**
   - Manage tour packages:
     - Add, Update, Delete packages.
   - View customer bookings.

### Additional Features

- Frontend validation for booking forms (e.g., required fields, valid email format).
- Invoice generation:
  - Styled HTML page with booking details.
  - Option to download invoice as PDF.
- Basic authentication for the admin panel.

## Technologies Used

### Frontend
- **React.js**
- **TailwindCSS**

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**

### PDF Generation
- Library `jspdf` .

## API Endpoints





## Installation & Setup

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Ensure MongoDB is running locally or provide a connection string in `.env` file:
   ```
   MONGO_URI=your-mongodb-connection-string
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

### Customer
1. Navigate to the homepage to view available packages.
2. Click `Book Now` on a package to open the booking form.
3. Submit the form to complete the booking.
4. View or download the generated invoice.

### Admin
1. Navigate to `/admin`.
2. Log in using hardcoded credentials.
3. Manage packages:
   - Add, Update, or Delete packages.
4. View submitted bookings.

## Future Improvements
- Implement authentication for customers.
- Enhance invoice design.
- Allow package filtering and sorting on the frontend.
- Add notifications for booking confirmations.

## License
This project is open source and available under the [MIT License](LICENSE).
