import { useEffect, useMemo, useState } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userService";

import {
  mapUsers,
  searchUsers,
  filterUsers,
  sortUsers,
  paginateUsers,
} from "../utils/helpers";

import { PAGE_SIZES } from "../utils/constants";

const initialFilters = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

// Custom hook to manage user data and operations
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(initialFilters);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  // Load users when the component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  // Reset to the first page when search, filter, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters, sortField, sortOrder]);

  // Fetch users from the API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchUsers();
      setUsers(mapUsers(response));
    } catch {
      setError("Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async (newUser) => {
    try {
      setLoading(true);

      const createdUser = await createUser(newUser);

      const user = {
        id:
          createdUser.id ||
          Math.max(...users.map((u) => u.id), 0) + 1,
        ...newUser,
      };

      // Add user to the list
      setUsers((prev) => [...prev, user]);
    } catch {
      setError("Unable to add user.");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing user
  const editUser = async (updatedUser) => {
    try {
      setLoading(true);

      await updateUser(updatedUser.id, updatedUser);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } catch {
      setError("Unable to update user.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const removeUser = async (id) => {
    try {
      setLoading(true);

      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );
    } catch {
      setError("Unable to delete user.");
    } finally {
      setLoading(false);
    }
  };

  // Apply search, filter, and sorting
  const processedUsers = useMemo(() => {
    let data = [...users];

    data = searchUsers(data, searchText);
    data = filterUsers(data, filters);
    data = sortUsers(data, sortField, sortOrder);

    return data;
  }, [users, searchText, filters, sortField, sortOrder]);

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(processedUsers.length / pageSize)
  );

  // Keep current page within valid range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Get users for the current page
  const paginatedUsers = useMemo(() => {
    return paginateUsers(
      processedUsers,
      currentPage,
      pageSize
    );
  }, [processedUsers, currentPage, pageSize]);

  return {
    loading,
    error,

    users: paginatedUsers,
    totalUsers: processedUsers.length,

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
    loadUsers,
  };
};

export default useUsers;