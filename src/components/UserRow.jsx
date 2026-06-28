// Displays a single user row in the table
const UserRow = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td>{user.id}</td>

      <td>{user.firstName}</td>

      <td>{user.lastName}</td>

      <td>{user.email}</td>

      <td>{user.department}</td>

      {/* Edit and Delete actions */}
      <td>
        <button
          className="edit-btn"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(user)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;