import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import Stat from './stat';
//import InvestorLineChart from './investorLineChart';

import InvestorStat from './investorstat';
import InvestorLineChart from './investorLineChart';

function InvestorDashboard() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('idle');
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
      const currentUserId = currentUser.uid;
      const otherUserId = userId;

      await deleteDoc(doc(db, 'connections', currentUserId, 'myconnections', otherUserId));
      await deleteDoc(doc(db, 'connections', otherUserId, 'myconnections', currentUserId));
      
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
    <div className='bg-gray-900 p-6'>
      <div className='flex'>
        <div className="mt-8 p-6 bg-blue-900 flex-1 text-white rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
          {user ? (
        <div className='flex'>
          <div className='flex-1'>
          <div className="w-20 h-20 mb-4">
              <img
              
                src={user.startupDetails.logo}
                className="w-full h-full object-cover rounded-full"
              />
          </div>
          <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
        
            <p className="text-xl font-semibold mr-4">Type: {user.accType}</p><br />
          </div>
          <div className="flex items-center mb-2">
          
            <p className="text-xl font-semibold">Name: {user.displayName}</p>
          </div>
          <div className="flex items-center mb-2">
        
            <p className="text-xl font-semibold mr-4">Email: {user.email}</p>           
          </div>
          <div className="flex items-center mb-2">
         
          <p className="text-xl font-semibold">Phone: {user.startupDetails.mobile}</p>
          </div>         
        </div>
        </div>

        <div className='flex-1'>         
          <div className="flex mt-20 flex-col mb-4">
          <div className="flex items-center mb-2">
          

            <p className="text-xl font-semibold">Description: {user.startupDetails.companyDescription}</p>
          </div>
          <div className="flex items-center mb-2">
         
            <p className="text-xl font-semibold mr-4">Stage: {user.email}</p>
          </div>
          <div className="flex items-center mb-2">
        
            <p className="text-xl font-semibold mr-4">Budget: {user.email}</p>            
          </div>
        </div>
        </div>

        <div className='flex-1 '>
          <div className="flex mt-20 flex-col mb-4">
          <div className="flex items-center mb-2">    
      
            <p className="text-xl font-semibold">Industry: {user.displayName}</p>
          </div>
          <div className="flex items-center mb-2">   
            
            <p className="text-xl font-semibold">Interests: {user.startupDetails.mobile}</p>
          </div>
          <div className="flex items-center mb-2">
          
            <p className="text-xl font-semibold">Sector: {user.startupDetails.mobile}</p>
            
          </div>
          <div className="flex items-center mb-2">
       
           
            <p className="text-xl font-semibold">Success Story: {user.startupDetails.mobile}</p>
          </div>
        </div>
        </div> 
        </div>
       
       ) : (
        <p>Loading...</p>
      )}
        {connectionStatus === 'idle' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConnect}>
              Connect
            </button>
          )}
          {connectionStatus === 'pending' && (
            <p className="text-gray-500">Request pending...</p>
          )}
          {connectionStatus === 'accepted' && (
            <div className="flex space-x-2 mt-2">
              <button onClick={handleDisconnect} className="bg-red-500 text-white px-4 py-2 rounded">
                Disconnect
              </button>
              <button onClick={handleChat} className="bg-green-500 text-white px-4 py-2 rounded">
                Chat
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='flex mt-5'>
        <div className='flex-1'><InvestorLineChart currentUser={currentUser} /></div>
        <div className='flex-2'><InvestorStat/></div>
      </div>
    </div>
  );
}
export default InvestorDashboard;