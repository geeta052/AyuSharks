import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Profile = ({accType}) => {
  const { currentUser } = useContext(AuthContext);

  // If currentUser is null, undefined, or an empty object, you might want to handle that case

  return (
    <div>
      <h2>User Profile</h2>
      <Link to={`/dashboard/${currentUser.uid}`}>
        <button>Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default Profile;
