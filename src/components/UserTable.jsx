import UserRow from "./UserRow";

// Displays the user list in a sortable table
const UserTable = ({
  users,
  isFilterApplied,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  onEdit,
  onDelete,
}) => {
  // Handle sorting when a column header is clicked
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="table-container">
      <table>

        {/* Table headers */}
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID
              {sortField === "id" &&
                (sortOrder === "asc" ? " ▲" : " ▼")}
            </th>

            <th onClick={() => handleSort("firstName")}>
              First Name
              {sortField === "firstName" &&
                (sortOrder === "asc" ? " ▲" : " ▼")}
            </th>

            <th onClick={() => handleSort("lastName")}>
              Last Name
              {sortField === "lastName" &&
                (sortOrder === "asc" ? " ▲" : " ▼")}
            </th>

            <th onClick={() => handleSort("email")}>
              Email
              {sortField === "email" &&
                (sortOrder === "asc" ? " ▲" : " ▼")}
            </th>

            <th onClick={() => handleSort("department")}>
              Department
              {sortField === "department" &&
                (sortOrder === "asc" ? " ▲" : " ▼")}
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Display users if available */}
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            // Show message when no users are found
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <h3>No Users Found</h3>

                {/* Show extra message if filters are applied */}
                {isFilterApplied && (
                  <p
                    style={{
                      marginTop: "8px",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    No users match the applied filters.
                    <br />
                  
                    <strong> Click Clear Filter</strong> to view all users.
                  </p>
                )}
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default UserTable;