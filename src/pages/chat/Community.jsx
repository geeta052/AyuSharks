// Community.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, doc, setDoc, getDocs, query, where, getDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import GroupChat from './Groupchat';
import Navbar from '../home/Navbar';
const Community = () => {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const fetchGroups = async () => {
    try {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsData = groupsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGroups(groupsData);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const createGroup = async () => {
    try {
      if (!newGroupName.trim()) {
        throw new Error('Group name cannot be empty.');
      }

      const groupDocRef = doc(db, 'groups', newGroupName);
      const groupDoc = await getDoc(groupDocRef);

      if (groupDoc.exists()) {
        throw new Error('Group with this name already exists.');
      }

      await setDoc(groupDocRef, {});

      const messagesCollection = collection(groupDocRef, 'messages');
      await setDoc(messagesCollection, {});

      setNewGroupName('');
      setIsJoiningGroup(false);
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error.message);
    }
  };

  const joinGroup = async (groupId) => {
    try {
      if (!currentUser) {
        throw new Error('No authenticated user.');
      }

      const groupDocRef = doc(db, 'groups', groupId);
      const membersCollection = collection(groupDocRef, 'members');
      const userMembershipQuery = query(membersCollection, where('userId', '==', currentUser.uid));
      const userMembershipSnapshot = await getDocs(userMembershipQuery);

      if (userMembershipSnapshot.empty) {
        const memberDocRef = doc(membersCollection, currentUser.uid);
        await setDoc(memberDocRef, {});

        const messagesCollection = collection(memberDocRef, 'messages');
        await setDoc(messagesCollection, {});
      } else {
        throw new Error('You are already a member of this group.');
      }

      fetchGroups();
    } catch (error) {
      console.error('Error joining group:', error.message);
    }
  };

  const openChatFullscreen = (groupId) => {
    setSelectedGroup(groupId);
    setIsJoiningGroup(false);
  };

  const closeChatFullscreen = () => {
    setSelectedGroup(null);
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Community</h1>

      {/* Search bar (you can add functionality later) */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search groups..."
          className="p-3 border rounded w-full"
        />
      </div>

      {/* Groups list */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Groups</h2>
        <ul>
          {groups.map((group) => (
            <li key={group.id} className="flex items-center justify-between p-4 bg-gray-100 mb-4 rounded-md">
              <span className="text-lg font-semibold">{group.id}</span>
              {currentUser && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => joinGroup(group.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Join
                  </button>
                  <button
                    onClick={() => openChatFullscreen(group.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Open Chat
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Create a new group */}
      {isJoiningGroup ? (
        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter group name..."
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="p-3 border rounded"
          />
          <button
            onClick={createGroup}
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
          >
            Create Group
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsJoiningGroup(true)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Group
        </button>
      )}

      {/* Group Chat */}
      {selectedGroup && (
        <GroupChat groupId={selectedGroup} onClose={closeChatFullscreen} />
      )}
    </div>
    </>
  );
};

export default Community;
