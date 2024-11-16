# Contact Management App

## Description

The **Contact Management App** helps users track and manage important contact information for customers or clients. This application enables users to add, view, update, and delete contact details all in one place. It is especially useful in business settings where maintaining relationships and having quick access to contact information is essential.

![image](https://github.com/user-attachments/assets/26e87a78-cff9-45e3-a9ff-3e47e5f3b03e)


Here is the Demo - [LINK](https://www.loom.com/share/8580890742494204b4e7e113f18f6583?sid=e61c7c3c-c9fd-4420-b41f-f070e9ff6713)

---

## Technologies Used

- **Frontend**:
  - React.js
  - React Hook Form
  - React-Toastify (for notifications)
  - Axios (for HTTP requests)
  - Material UI (for UI components)

- **Backend**:
  - Node.js
  - Express
  - CORS
  - Zod (for validation)

- **Database**:
  - PostgreSQL
  - Prisma ORM (for database management)

---

## Database Choice

The application uses **PostgreSQL** for the database, which is a relational database management system that provides reliable and scalable performance. PostgreSQL is suitable for this application as it allows for easy handling of structured data and supports ACID compliance, ensuring the integrity of the data.

Here’s the **Prisma schema** used for the `Contact` model:

```prisma
model Contact {
  id          String @id @default(uuid())
  firstName   String
  lastName    String
  email       String @unique
  phoneNumber String @unique
  company     String
  jobTitle    String
}
```
## Setup Instructions

### Prerequisites
- **Node.js** (for both backend and frontend)

### Installation

1. Clone the repository.
2. Navigate to the **backend** folder and install dependencies:

```bash
cd backend
npm install
```
3. Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```
4. Running the Project
 - backend
```bash
cd backend
node index.js
```
 - frontend
```bash
cd frontend
npm run dev
```

## Database Setup

Since **Prisma ORM** is used, no manual database setup is required. Prisma will automatically generate the necessary schema.

---

## CRUD Operations

The following routes are available to interact with contacts:

- **GET /api/v1/contacts**: Retrieves the full list of contacts.
- **POST /api/v1/contacts**: Adds a new contact to the list using the contact schema.
- **PUT /api/v1/contacts/:id**: Updates an existing contact by ID.
- **DELETE /api/v1/contacts/:id**: Deletes a contact by ID.

---

## Key Features

- **Add Contacts**: Allows users to input contact details such as name, email, phone number, company, and job title.
- **View Contacts**: Displays contacts in a paginated table with sorting options.
- **Edit Contacts**: Users can update contact information to ensure data accuracy.
- **Delete Contacts**: Allows users to remove contacts from the list to keep the database clean and relevant.

---

## Challenges and Solutions

- **Frontend Challenges**: Setting up the frontend was challenging, especially because I was unfamiliar with Material UI. I spent some time learning how to use Material UI components effectively by referring to the official documentation. Once I understood the framework, I was able to implement the contact form, table view, and action buttons smoothly.

- **Backend Challenges**: The backend setup was quick, and the API routes were functional without major issues. However, I made sure to implement proper validation using **Zod** to handle errors like duplicate entries or missing data when a user adds a new contact.



