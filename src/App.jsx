import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";
import useUsers from "./hooks/useUsers";


// Main application component
function App() {
  // User management state and functions

  const {
    users,
    loading,
    error,

    currentPage,
    pageSize,
    totalPages,

    searchText,
    filters,

    sortField,
    sortOrder,

    setSearchText,
    setFilters,

    setSortField,
    setSortOrder,

    setCurrentPage,
    setPageSize,

    addUser,
    editUser,
    removeUser,
  } = useUsers();

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  
const [successMessage, setSuccessMessage] = useState("");


  // Open Add User form
  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  // Open Edit User form
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  // Save new or updated user

const handleSave = async (user) => {
  if (selectedUser) {
    await editUser(user);
    setSuccessMessage("User updated successfully!");
  } else {
    await addUser(user);
    setSuccessMessage("User added successfully!");
  }

  setShowForm(false);
  setSelectedUser(null);

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};
  // Open delete confirmation
  const handleDelete = (user) => {
    setDeleteUser(user);
  };

  // Delete selected user
  // Delete selected user
const confirmDelete = async (id) => {
  await removeUser(id);

  setDeleteUser(null);
  setSuccessMessage("User deleted successfully!");

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};

  // Clear all applied filters
  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  // Check whether any filter is applied
  const isFilterApplied =
    !!filters.firstName ||
    !!filters.lastName ||
    !!filters.email ||
    !!filters.department;

  return (
    <div className="app">

      {/* Dashboard header */}
      <Header onAddUser={handleAdd} />
       {/* Success Message */}
     {successMessage && (
  <div className="success-alert">
    <span className="success-icon">✔</span>

    <span className="success-text">
      {successMessage}
    </span>

    <button
      className="success-close"
      onClick={() => setSuccessMessage("")}
    >
      ×
    </button>
  </div>

)}

      {/* Search and filter controls */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onOpenFilter={() => setShowFilter(true)}
        onClearFilters={clearFilters}
        isFilterApplied={isFilterApplied}
      />

      {/* Filter popup */}
      {showFilter && (
        <FilterPopup
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* Loading message */}
      {loading && (
        <h3 className="loading">
          Loading Users...
        </h3>
      )}

      {/* Error message */}
      {error && (
        <h3 className="error">
          {error}
        </h3>
      )}

      {/* User table */}
      {!loading && (
        <UserTable
          users={users}
          isFilterApplied={isFilterApplied}
          sortField={sortField}
          sortOrder={sortOrder}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />

      {/* Add/Edit user form */}
      {showForm && (
        <UserForm
          selectedUser={selectedUser}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Delete confirmation popup */}
      {deleteUser && (
        <ConfirmDelete
          user={deleteUser}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteUser(null)}
        />
      )}

    </div>
  );
}

export default App;