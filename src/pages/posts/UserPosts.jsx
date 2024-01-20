// UserPosts.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('userId', '==', userId),
          orderBy('timestamp', 'desc')
        );

        onSnapshot(q, (snapshot) => {
          const userPosts = [];
          snapshot.forEach((doc) => {
            userPosts.push({ id: doc.id, ...doc.data() });
          });
          setPosts(userPosts);
        });
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-md shadow-md">
            <p className="text-blue-500 font-semibold mb-2">{post.email}</p>
            <img
              src={post.imageURL}
              alt={`Post by ${post.userId}`}
              className="mb-2 w-full h-32 object-cover rounded"
            />
            <p className="text-gray-400 overflow-hidden">
              {post.caption.length > 50 ? (
                <>
                  {post.caption.substring(0, 50)}...
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    Read more
                  </span>
                </>
              ) : (
                post.caption
              )}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-500">{post.likes} likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
