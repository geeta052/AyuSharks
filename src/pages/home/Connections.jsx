// Connections.jsx
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext'; // Assuming you have an AuthContext
import Navbar from './Navbar';

function Connections() {
  const { currentUser } = useContext(AuthContext); 
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        if (!currentUser) {
          console.error('User not authenticated');
          return;
        }

        const userId = currentUser.uid;

        // Query for connected users in the "myconnections" subcollection
        const q = query(collection(db, 'connections', userId, 'myconnections'));

        const querySnapshot = await getDocs(q);
        const connectedUsers = [];

        querySnapshot.forEach((doc) => {
          const userId = doc.id;
          const userEmail = doc.data().email;
          connectedUsers.push({ id: userId, email: userEmail });
        });

        setConnections(connectedUsers);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, [currentUser]);

  const handleRemoveConnection = async (userId) => {
    try {
      const currentUserId = currentUser.uid;

      // Remove the connection from the current user's connections
      await deleteDoc(doc(db, 'connections', currentUserId, 'myconnections', userId));

      // Remove the connection from the other user's connections
      await deleteDoc(doc(db, 'connections', userId, 'myconnections', currentUserId));

      // Update the state to reflect the changes
      setConnections((prevConnections) =>
        prevConnections.filter((user) => user.id !== userId)
      );

      console.log('Connection removed successfully');
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  return (
    <>
  <Navbar></Navbar>
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-900 text-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Your Connections</h1>
      <ul>
        {connections.map((user) => (
          <li key={user.id} className="mb-2 flex items-center justify-between">
            <span className="text-lg">{user.email}</span>
            <button
              onClick={() => handleRemoveConnection(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
  
}

export default Connections;
