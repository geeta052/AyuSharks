import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AccountProfile = () => {
  const { currentUser, dispatch } = useContext(AuthContext);

  const handleSignOut = () => {
    // Dispatch the 'LOGOUT' action to update the state
    dispatch({ type: 'LOGOUT' });
    // Optionally, clear local storage or perform additional cleanup
    localStorage.removeItem('user');
  };

  return (
    <div>
      <h2>Account Profile</h2>
      {currentUser && (
        <div>
          <p>Email: {currentUser.email}</p>
          {/* Add other account details here */}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default AccountProfile;
