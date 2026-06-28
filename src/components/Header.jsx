import "./../styles/Header.css";

// Header component with dashboard title and Add User button
const Header = ({ onAddUser }) => {
  return (
    <header className="header">
      {/* Dashboard title */}
      <div>
        <h1>User Management Dashboard</h1>
        <p>Manage users efficiently</p>
      </div>

      {/* Opens the Add User form */}
      <button className="add-btn" onClick={onAddUser}>
        + Add User
      </button>
    </header>
  );
};

export default Header;