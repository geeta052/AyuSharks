// Requests.jsx
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  setDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';

function Requests() {
  const { currentUser } = useContext(AuthContext);
  const [connectionRequests, setConnectionRequests] = useState([]);
  

  useEffect(() => {
    const fetchConnectionRequests = async () => {
      try {
        if (!currentUser) {
          console.error('User not authenticated');
          return;
        }

        const receiverId = currentUser.uid;

        // Query for connection requests where the receiverId matches
        const q = query(collection(db, 'connectionRequests', receiverId, 'senders'));

        const querySnapshot = await getDocs(q);
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          senderId: doc.id, // Assuming senderId is the sender's ID
          data: doc.data(),
        }));

        setConnectionRequests(requests);
      } catch (error) {
        console.error('Error fetching connection requests:', error);
      }
    };

    fetchConnectionRequests();
  }, [currentUser]);

  const handleAccept = async (senderId, senderEmail) => {
    try {
      const receiverId = currentUser.uid;

      // Remove the connection request from the sender's subcollection
      await updateDoc(doc(db, 'connectionRequests', receiverId, 'senders', senderId), {
        status: 'accepted',
      });

      // Create or update the "connections" collection with accepted connections
      const connectionsCollectionRef = doc(db, 'connections', receiverId);
      await setDoc(connectionsCollectionRef, {}); // Ensure the document exists

      // Add the sender to the receiver's "myconnections" subcollection
      await setDoc(doc(db, 'connections', receiverId, 'myconnections', senderId), {
        email: senderEmail || '',
      });

      // Add the receiver to the sender's "myconnections" subcollection
      await setDoc(doc(db, 'connections', senderId, 'myconnections', receiverId), {
        email: currentUser.email || '',
      });

      // Delete the connection request from the collection
      await deleteDoc(doc(db, 'connectionRequests', receiverId, 'senders', senderId));

      // setConnections((prevConnections) =>
      //   prevConnections.filter((user) => user.id !== userId)
      // );

      console.log('Connection request accepted successfully');
    } catch (error) {
      console.error('Error accepting connection request:', error);
    }
  };

  const handleDeny = async (senderId) => {
    try {
      const receiverId = currentUser.uid;

      // Remove the connection request from the sender's subcollection
      await updateDoc(doc(db, 'connectionRequests', receiverId, 'senders', senderId), {
        status: 'denied',
      });

      // Delete the connection request from the collection
      await deleteDoc(doc(db, 'connectionRequests', receiverId, 'senders', senderId));

      

      console.log('Connection request denied successfully');
    } catch (error) {
      console.error('Error denying connection request:', error);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-900 text-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Connection Requests</h1>
      <ul>
        {connectionRequests.map((request) => (
          <li key={request.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Sender Email: {request.data.email}</p>
                <p className="text-sm">Status: {request.data.status}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAccept(request.senderId, request.data.email)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDeny(request.senderId)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Deny
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Requests;
