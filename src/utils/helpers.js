// src/utils/helpers.js

import { DEFAULT_DEPARTMENT } from "./constants";

/*
--------------------------------------------------
Convert API user data to dashboard user format
--------------------------------------------------
*/
const departments = [
  "IT",
  "Engineering",
  "Sales",
  "HR",
  "Marketing",
  "Finance",
];
export const mapUsers = (users) => {
  const titles = ["Mr.", "Mrs.", "Ms.", "Miss", "Dr."];

  return users.map((user, index) => {
    let nameParts = user.name.split(" ");

    if (titles.includes(nameParts[0])) {
      nameParts.shift();
    }

    return {
      id: user.id,
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: user.email,
      department: departments[index % departments.length],
    };
  });
};

/*
--------------------------------------------------
Search Users
--------------------------------------------------
*/

export const searchUsers = (users, searchText) => {
  if (!searchText.trim()) return users;

  const keyword = searchText.toLowerCase();

  return users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(keyword) ||
      user.lastName.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.department.toLowerCase().includes(keyword)
    );
  });
};

/*
--------------------------------------------------
Filter Users
--------------------------------------------------
*/

export const filterUsers = (users, filters) => {
  return users.filter((user) => {
    return (
      (!filters.firstName ||
        user.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase())) &&

      (!filters.lastName ||
        user.lastName
          .toLowerCase()
          .includes(filters.lastName.toLowerCase())) &&

      (!filters.email ||
        user.email
          .toLowerCase()
          .includes(filters.email.toLowerCase())) &&

      (!filters.department ||
        user.department
          .toLowerCase()
          .includes(filters.department.toLowerCase()))
    );
  });
};

/*
--------------------------------------------------
Sort Users
--------------------------------------------------
*/

export const sortUsers = (users, sortField, sortOrder) => {
  if (!sortField) return users;

  return [...users].sort((a, b) => {
    if (sortField === "id") {
      return sortOrder === "asc"
        ? a.id - b.id
        : b.id - a.id;
    }

    const valueA = String(a[sortField]).toLowerCase();
    const valueB = String(b[sortField]).toLowerCase();

    return sortOrder === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
};
/*
--------------------------------------------------
Pagination
--------------------------------------------------
*/

export const paginateUsers = (users, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;

  return users.slice(startIndex, startIndex + pageSize);
};