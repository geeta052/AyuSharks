import React, { useState, useEffect, useContext } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import Navbar from './Navbar';
import Posts from "../posts/UserPosts"
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const usersCollection = collection(db, 'users');

        // If searchTerm is empty, don't perform the query
        if (searchTerm.trim() === '') {
          setSearchResults([]);
          return;
        }

        // Use startAt and endAt for a prefix search
        const q = query(
          usersCollection,
          where('email', '>=', searchTerm),
          where('email', '<=', searchTerm + '\uf8ff')
        );

        const usersSnapshot = await getDocs(q);
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSearchResults(usersData);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };

    // Execute the search when searchTerm changes
    handleSearch();
  }, [searchTerm]);
 
  return (
    <>
    <Navbar />
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {currentUser.email}!</h2>
      <div className="mb-4">
        <label htmlFor="search" className="text-lg mb-2 block">
          Search Users:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter user email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Search Results:</h3>
      <ul>
        {searchResults.map((user) => (
          <li key={user.id} className="mb-2">
            <Link
              to={`/user-details/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              {user.email}
            </Link>
          </li>
        ))}
      </ul>

      
        <Posts />

    </div>
    </>
  );
};



export default Home;
