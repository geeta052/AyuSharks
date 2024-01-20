// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { collection, getFirestore, getDocs, deleteDoc, doc } from 'firebase/firestore';

const UserList = ({ app }) => {
  const db = getFirestore(app);

  const [users, setUsers] = useState([]);
  const [connectionsLength, setConnectionsLength] = useState(0);
  const [connectionRequestsLength, setConnectionRequestsLength] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);

        const usersList = [];
        usersSnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });

        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users data:', error.message);
      }
    };

    const fetchConnections = async () => {
      try {
        const connectionsRef = collection(db, 'connections');
        const connectionsSnapshot = await getDocs(connectionsRef);

        setConnectionsLength(connectionsSnapshot.size);
      } catch (error) {
        console.error('Error fetching connections data:', error.message);
      }
    };

    const fetchConnectionRequests = async () => {
      try {
        const connectionRequestsRef = collection(db, 'connectionRequests');
        const connectionRequestsSnapshot = await getDocs(connectionRequestsRef);

        setConnectionRequestsLength(connectionRequestsSnapshot.size);
      } catch (error) {
        console.error('Error fetching connection requests data:', error.message);
      }
    };

    fetchUsers();
    fetchConnections();
    fetchConnectionRequests();
  }, [db]);

  const handleDeleteUser = async (userId) => {
    try {
      // Delete the user document from the "users" collection
      await deleteDoc(doc(db, 'users', userId));
      console.log('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Total Users</h2>
        <p>{users.length}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Total Connections</h2>
        <p>{connectionsLength}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Total Connection Requests</h2>
        <p>{connectionRequestsLength}</p>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between border-b py-2">
            <span>{user.displayName || user.email}</span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
