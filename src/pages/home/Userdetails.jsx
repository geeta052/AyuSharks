// UserDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import UserPosts from '../posts/UserPosts';
import Navbar from './Navbar';
function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('idle'); // 'idle', 'pending', 'accepted'
  const [expandedPosts, setExpandedPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const checkConnectionStatus = async () => {
    try {
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }
  
      const senderId = currentUser.uid;
      const receiverId = userId;
  
      const connectionsDoc = await getDoc(doc(db, 'connections', senderId, 'myconnections', receiverId));
  
      // Check if the receiver ID is present in the myconnections subcollection
      if (connectionsDoc.exists()) {
        setConnectionStatus('accepted');
      } else {
        setConnectionStatus('idle');
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        setUser(userDoc.data());
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    checkConnectionStatus();
  }, [userId, currentUser]);

  const handleConnect = async () => {
    try {
      if (!currentUser) {
        console.error('User not authenticated');
        return;
      }

      console.log(`Sending connection request to ${user.email}`);

      const senderId = currentUser.uid;
      const senderEmail = currentUser.email;
      const receiverId = userId;

      const senderRef = doc(db, 'connectionRequests', receiverId, 'senders', senderId);

      const connectionRequest = {
        status: 'pending',
        email: senderEmail,
        id: senderId,
        timestamp: new Date(),
      };

      await setDoc(senderRef, connectionRequest);
      setConnectionStatus('pending');

      console.log('Connection request sent successfully');
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('Disconnecting...');
      // Implement the logic for disconnecting
  
      // Assuming you have the logic to remove the connection, replace the following lines accordingly:
      const currentUserId = currentUser.uid;
      const otherUserId = userId;
  
      // Remove the connection from the current user's connections
      await deleteDoc(doc(db, 'connections', currentUserId, 'myconnections', otherUserId));
  
      // Remove the connection from the other user's connections
      await deleteDoc(doc(db, 'connections', otherUserId, 'myconnections', currentUserId));
  
      // After disconnecting, update the connection status
      await checkConnectionStatus();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const handleChat = () => {
    navigate(`/chat/${userId}`);
  };

  const handleExpand = (postId) => {
    setExpandedPosts((prevExpandedPosts) =>
      prevExpandedPosts.includes(postId)
        ? prevExpandedPosts.filter((id) => id !== postId)
        : [...prevExpandedPosts, postId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-900 text-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Details</h1>
      {user ? (
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-20 h-20 mb-4 md:mr-4">
            <img
              src={user.startupDetails.logo}
              className="w-full h-full object-cover rounded-full"
              alt="User Logo"
            />
          </div>
          <div className="flex flex-col mb-4 md:flex-grow">
            <div className="flex items-center mb-2">
              <p className="text-xl font-semibold mr-4">Type: {user.accType}</p>
              <p className="text-xl font-semibold">Name: {user.displayName}</p>
            </div>
            <div className="flex items-center mb-2">
              <p className="text-xl font-semibold mr-4">Email: {user.email}</p>
              <p className="text-xl font-semibold">Phone: {user.startupDetails.mobile}</p>
            </div>
            <p className="mb-4 text-xl font-semibold md:w-3/4">
              Description: {user.startupDetails.companyDescription}
            </p>
          </div>
          {connectionStatus === 'idle' && (
            <button
              onClick={handleConnect}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
            >
              Connect
            </button>
          )}
          {connectionStatus === 'pending' && (
            <p className="text-gray-500 mt-2 md:mt-0">Request pending...</p>
          )}
          {connectionStatus === 'accepted' && (
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                onClick={handleDisconnect}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Disconnect
              </button>
              <button
                onClick={handleChat}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Chat
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <UserPosts />
      </div>
    </div>

  );
}

export default UserDetails;
