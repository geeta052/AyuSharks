import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // Adjust the path based on your file structure
import Navbar from '../home/Navbar';
const GroupChat = ({ groupId, onClose }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const sendMessage = async () => {
    try {
      if (!currentUser) {
        throw new Error('No authenticated user.');
      }

      if (messageInput.trim() === '') {
        throw new Error('Empty message.');
      }

      const newMessage = {
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        message: messageInput,
        timestamp: new Date(),
      };

      const messagesCollection = collection(db, `groups/${groupId}/messages`);
      await addDoc(messagesCollection, newMessage);

      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  useEffect(() => {
    const getMessages = () => {
      if (currentUser && groupId) {
        const messagesCollection = collection(db, `groups/${groupId}/messages`);

        const unsubscribe = onSnapshot(query(messagesCollection, orderBy('timestamp', 'asc')), (snapshot) => {
          const messagesArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMessages(messagesArray);
        });

        return () => unsubscribe();
      }
    };

    return getMessages();
  }, [currentUser, groupId]);

  return (
    <>
    <Navbar />
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white w-full h-full p-4 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Group Chat</h2>
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
          {/* Render your messages here */}
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-2 ${msg.senderId === currentUser?.uid ? 'text-right' : 'text-left'}`}>
              <p className={`text-gray-500 text-sm mb-1 ${msg.senderId === currentUser?.uid ? 'text-right' : 'text-left'}`}>
                {msg.senderEmail}
              </p>
              <div className={`bg-white rounded-md p-2 shadow-md inline-block ${msg.senderId === currentUser?.uid ? 'self-end' : ''}`}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Input for sending new messages */}
        <div className="flex items-center">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-md ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default GroupChat;
