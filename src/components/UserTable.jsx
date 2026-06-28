import UserRow from "./UserRow";

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
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <h3>No Users Found</h3>

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
                    Click <strong>Filter</strong> and then{" "}
                    <strong>Clear Filter</strong> to view all users.
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