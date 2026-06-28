# User Management Dashboard

A responsive User Management Dashboard built with **React** that allows users to view, search, filter, sort, paginate, add, edit, and delete user records. User data is fetched from the JSONPlaceholder API and managed on the client side.

---

# Project Overview

This project is a responsive CRUD dashboard developed using React. It retrieves user information from the JSONPlaceholder API, converts the API response into a custom dashboard format, and provides several user management features.

## Features

* Fetch users from REST API
* Search users globally
* Filter users using multiple fields
* Sort users by different columns
* Client-side pagination
* Add new user
* Edit existing user
* Delete user
* Client-side form validation
* Error handling
* Responsive design for Desktop, Tablet, and Mobile

---

# Installation Instructions

## Clone the repository

```bash
git clone <repository-url>
```

## Navigate to the project

```bash
cd user-management-dashboard
```

## Install dependencies

```bash
npm install
```

---

# Running the Project

## Start Development Server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# Folder Structure

## Folder Structure


```text
user-management-dashboard/
│
├── public/                         # Static assets served directly by Vite
│
├── src/
│   ├── api/
│   │   └── userService.js          # Handles all API requests using Axios
│   │
│   ├── components/
│   │   ├── ConfirmDelete.jsx       # Confirmation dialog before deleting a user
│   │   ├── FilterPopup.jsx         # Popup for applying and resetting filters
│   │   ├── Header.jsx              # Dashboard header and Add User button
│   │   ├── Pagination.jsx          # Pagination controls and page size selection
│   │   ├── SearchBar.jsx           # Global search bar and filter controls
│   │   ├── UserForm.jsx            # Form modal for adding and editing users
│   │   ├── UserRow.jsx             # Displays a single user record with actions
│   │   └── UserTable.jsx           # User table with sorting and empty-state handling
│   │
│   ├── hooks/
│   │   └── useUsers.js             # Custom hook managing data fetching, CRUD, search,
│   │                               # filtering, sorting, and pagination logic
│   │
│   ├── styles/
│   │   ├── App.css                 # Global application styles
│   │   ├── Filter.css              # Search bar and filter popup styles
│   │   ├── Form.css                # Add/Edit form and delete modal styles
│   │   ├── Header.css              # Dashboard header styling
│   │   ├── Pagination.css          # Pagination component styling
│   │   └── Table.css               # User table and action button styles
│   │
│   ├── utils/
│   │   ├── constants.js            # Shared constants (API URL, departments, etc.)
│   │   ├── helpers.js              # Helper functions for data mapping, search,
│   │   │                           # filtering, sorting, and pagination
│   │   └── validators.js           # Client-side validation for user input
│   │
│   ├── App.jsx                     # Root component managing shared UI state
│   └── main.jsx                    # React application entry point
│
├── package.json                    # Project dependencies and scripts
├── vite.config.js                  # Vite configuration
├── .gitignore                      # Files ignored by Git
└── README.md                       # Project documentation
```




---

# Libraries Used

* React
* Axios
* Vite

---

# Engineering Assumptions

### Name Extraction

The JSONPlaceholder API provides a single `name` field.

Example:

```
Leanne Graham
```

The application separates this into:

```
First Name : Leanne
Last Name  : Graham
```

If a title such as **Mr., Mrs., Ms., Miss, or Dr.** exists, it is removed before splitting.

---

### Department Mapping

The API does not provide department information.

Therefore, a default department value is assigned to every fetched user.

```
Department = IT
```

Newly added users can choose their department manually.

---
## Challenges Faced

### 1. JSONPlaceholder Read-Only API

The JSONPlaceholder API is a mock API and does not permanently store data. Although it accepts POST, PUT, and DELETE requests, the changes are not persisted.

**Solution:**
The application performs CRUD operations by updating the local React state after successful API responses, allowing users to experience full CRUD functionality during the session.

---

### 2. Name Mapping

The API returns a single `name` field, while the dashboard requires separate **First Name** and **Last Name** columns.

**Solution:**
A helper function was implemented to split the full name into first and last names before displaying the data.

---

### 3. Missing Department Field

The API does not provide a department for users.

**Solution:**
A default department was assigned to fetched users, while newly created users can select a department from the available options.

---

### 4. Responsive Table Layout

Displaying multiple columns on smaller devices caused layout issues.

**Solution:**
Horizontal scrolling (`overflow-x: auto`) and responsive layouts were implemented to ensure the table remains usable across desktop, tablet, and mobile devices.

---

### 5. Search and Filter Interaction

When filters returned no matching users, it was not immediately obvious how to return to the complete user list.

**Solution:**
A **Clear Filters** option was added to allow users to quickly remove all applied filters and restore the full dataset.

---

# Future Improvements

Possible future enhancements include:

* Database integration
* User authentication
* Role-based access control
* Server-side pagination
* Server-side searching and filtering
* Advanced multi-column sorting
* Export users to CSV or Excel
* Dark mode
* Profile images
* Toast notifications
* Unit and integration testing
* Persistent storage using MongoDB or PostgreSQL

---

# Author
khadarbee shaik

Developed as a React User Management Dashboard assignment demonstrating modern React development practices, responsive UI design, client-side state management, validation, and CRUD functionality.
