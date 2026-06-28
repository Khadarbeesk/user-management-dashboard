import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";

import useUsers from "./hooks/useUsers";

function App() {
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

  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleSave = (user) => {
    if (selectedUser) {
      editUser(user);
    } else {
      addUser(user);
    }

    setShowForm(false);
    setSelectedUser(null);
  };

  const handleDelete = (user) => {
    setDeleteUser(user);
  };

  const confirmDelete = (id) => {
    removeUser(id);
    setDeleteUser(null);
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

  const isFilterApplied =
    !!filters.firstName ||
    !!filters.lastName ||
    !!filters.email ||
    !!filters.department;

  return (
    <div className="app">

      <Header onAddUser={handleAdd} />

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onOpenFilter={() => setShowFilter(true)}
        onClearFilters={clearFilters}
        isFilterApplied={isFilterApplied}
      />

      {showFilter && (
        <FilterPopup
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      {loading && (
        <h3 className="loading">
          Loading Users...
        </h3>
      )}

      {error && (
        <h3 className="error">
          {error}
        </h3>
      )}

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />

      {showForm && (
        <UserForm
          selectedUser={selectedUser}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

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