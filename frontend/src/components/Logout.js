import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform any necessary logout actions here
    // For example, you can clear user authentication tokens, cookies, or state.

    // Call the onLogout function to inform the parent component about the logout.
    onLogout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
