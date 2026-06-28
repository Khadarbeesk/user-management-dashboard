const ConfirmDelete = ({
  user,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal">

      <div className="confirm-delete">

        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete
          <strong>
            {" "}
            {user.firstName} {user.lastName}
          </strong>
          ?
        </p>

        <div className="delete-buttons">

          <button
            className="delete-btn"
            onClick={() => onConfirm(user.id)}
          >
            Delete
          </button>

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmDelete;