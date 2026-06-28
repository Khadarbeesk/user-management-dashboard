import { useState } from "react";

const FilterPopup = ({ filters, setFilters, onClose }) => {
  // Store filter values locally until applied
  const [localFilters, setLocalFilters] = useState(filters);

  // Update filter field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply selected filters
  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  // Reset all filter fields
  const handleReset = () => {
    const emptyFilters = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setLocalFilters(emptyFilters);
  };

  return (
    <div className="modal-overlay">
      <div className="filter-popup">
        <div className="popup-header">
          <h2>Filter Users</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="popup-body">
          {/* First Name filter */}
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={localFilters.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name filter */}
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={localFilters.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email filter */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={localFilters.email}
              onChange={handleChange}
            />
          </div>

          {/* Department filter */}
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter department"
              value={localFilters.department}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Filter action buttons */}
        <div className="popup-footer">
          <button
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="apply-btn"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;