import "./../styles/Header.css";

const Header = ({ onAddUser }) => {
  return (
    <header className="header">
      <div>
        <h1>User Management Dashboard</h1>
        <p>Manage users efficiently</p>
      </div>

      <button className="add-btn" onClick={onAddUser}>
        + Add User
      </button>
    </header>
  );
};

export default Header;