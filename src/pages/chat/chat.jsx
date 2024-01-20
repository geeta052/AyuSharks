import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // Adjust the path based on your file structure
import Navbar from '../home/Navbar';
const Chat = ({ otherUserId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const sendMessage = async () => {
    try {
      if (!currentUser) {
        throw new Error('No authenticated user.');
      }

      if (!otherUserId) {
        throw new Error('No recipient specified.');
      }

      if (messageInput.trim() === '') {
        throw new Error('Empty message.');
      }

      const timestamp = new Date();

      const newMessage = {
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        receiverId: otherUserId,
        message: messageInput,
        timestamp: timestamp,
      };

      const ids = [currentUser.uid, otherUserId].sort();
      const chatRoomId = ids.join('_');

      await addDoc(collection(db, `chat_rooms/${chatRoomId}/messages`), newMessage);

      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  useEffect(() => {
    const getMessages = () => {
      if (currentUser && otherUserId) {
        const ids = [currentUser.uid, otherUserId].sort();
        const chatRoomId = ids.join('_');
        const messagesCollection = collection(db, `chat_rooms/${chatRoomId}/messages`);

        const unsubscribe = onSnapshot(query(messagesCollection, orderBy('timestamp', 'asc')), (snapshot) => {
          const messagesArray = snapshot.docs.map((doc) => doc.data());
          setMessages(messagesArray);
        });

        return () => unsubscribe();
      }
    };

    return getMessages();
  }, [currentUser, otherUserId]);

  return (
    <>
    <Navbar />
    <div className="flex flex-col h-screen">
      <div className="bg-blue-900 text-white p-4">
        <p className="text-lg font-semibold">Chat</p>
      </div>

      <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.senderId === currentUser?.uid ? 'text-right' : 'text-left'}`}>
            <p className="text-gray-500 text-sm mb-1">{msg.senderEmail}</p>
            <div className={`bg-white rounded-md p-2 shadow-md inline-block ${msg.senderId === currentUser?.uid ? 'self-end' : ''}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center bg-gray-300 p-4">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-900 text-white p-2 rounded-r-md ml-2"
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default Chat;
