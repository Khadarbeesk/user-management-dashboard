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

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters, sortField, sortOrder]);

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

      // Add at the end. Sorting will decide the position.
      setUsers((prev) => [...prev, user]);
    } catch {
      setError("Unable to add user.");
    } finally {
      setLoading(false);
    }
  };

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

  const processedUsers = useMemo(() => {
    let data = [...users];

    data = searchUsers(data, searchText);
    data = filterUsers(data, filters);
    data = sortUsers(data, sortField, sortOrder);

    return data;
  }, [users, searchText, filters, sortField, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(processedUsers.length / pageSize)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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