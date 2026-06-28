import { useEffect, useState } from "react";
import { validateUser } from "../utils/validators";
import { DEPARTMENTS } from "../utils/constants";

const emptyUser = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

// Form for adding and editing users
const UserForm = ({
  selectedUser,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] =
    useState(emptyUser);

  const [errors, setErrors] = useState({});

  // Populate form when editing a user
  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData(emptyUser);
    }
  }, [selectedUser]);

  // Update form field values
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate and submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors =
      validateUser(formData);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <div className="modal">

      <div className="form-container">

        {/* Form title */}
        <h2>
          {selectedUser
            ? "Edit User"
            : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <small>{errors.firstName}</small>

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <small>{errors.lastName}</small>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <small>{errors.email}</small>

          {/* Department */}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">
              Select Department
            </option>

            {DEPARTMENTS.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>

          <small>{errors.department}</small>

          {/* Form action buttons */}
          <div className="form-buttons">

            <button type="submit">
              {selectedUser
                ? "Update"
                : "Save"}
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UserForm;