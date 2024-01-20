import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import Navbar from '../home/Navbar';
const Explore = () => {
  const navigate = useNavigate();
  const [currentFilterGroup, setCurrentFilterGroup] = useState('sectors');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    sectors: [],
    stages: [],
    industries: [],
  });
  const [sortOrder, setSortOrder] = useState('asc');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = await Promise.all(usersSnapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() };
          const imageRef = ref(storage, `startupLogos/${userData.id}`);
          try {
            const imageUrl = await getDownloadURL(imageRef);
            userData.image = imageUrl;
          } catch (error) {
            console.error('Error fetching image URL:', error);
          }
          return userData;
        }));
        // Filter only startup accounts
        const startupUsers = usersData.filter(user => user.accType === "startup" );
        setUsers(startupUsers);

         // Sort by revenue
         const sortedUsers = [...startupUsers].sort((a, b) => {
          const revenueA = a.revenue || 0;
          const revenueB = b.revenue || 0;

          if (sortOrder === 'asc') {
            return revenueA - revenueB;
          } else {
            return revenueB - revenueA;
          }
        });

        setUsers(sortedUsers);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [sortOrder]); // Fetch users on component mount

  const applyFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: [...prevFilters[filterType], value.toLowerCase()],
    }));
  };

  const clearFilter = () => {
    setFilters({
      sectors: [],
      stages: [],
      industries: [],
    });
    renderFilterButtons();
  };

  const removeFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((item) => item !== value),
    }));
  };

  const sortFirstName = () => {
    setUsers([...users].sort((a, b) => a.email.localeCompare(b.email)));
  };

  const navigateToUserDetails = (userId) => {
    navigate(`/user-details/${userId}`);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortEmail = () => {
    setSortOrder('asc');
  };

  const sortUserType = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortRevenue = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };
  
  const renderFilterButtons = () => {
    switch (currentFilterGroup) {
      case 'sectors':
        return (
          <>
            <button onClick={() => applyFilter('sectors', 'ayurveda')} className={filters.sectors.includes('ayurveda') ? "bg-blue-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
              Ayurveda
            </button>
            <button onClick={() => applyFilter('sectors', 'yoga')} className={filters.sectors.includes('yoga') ? "bg-green-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
              Yoga
            </button>
            <button onClick={() => applyFilter('sectors', 'unani')} className={filters.sectors.includes('unani') ? "bg-yellow-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
              Unani
            </button>
            <button onClick={() => applyFilter('sectors', 'siddha')} className={filters.sectors.includes('siddha') ? "bg-purple-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
              Siddha
            </button>
          </>
        );
      case 'stages':
        return (
          <>
            <button onClick={() => applyFilter('stages', 'ideation')} className={filters.stages.includes('ideation') ? "bg-indigo-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
              Ideation
            </button>
            <button onClick={() => applyFilter('stages', 'validation')} className={filters.stages.includes('validation') ? "bg-red-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
              Validation
            </button>
            <button onClick={() => applyFilter('stages', 'early traction')} className={filters.stages.includes('early traction') ? "bg-yellow-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
              Early Traction
            </button>
            <button onClick={() => applyFilter('stages', 'scaling')} className={filters.stages.includes('scaling') ? "bg-green-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
              Scaling
            </button>
          </>
        );
      case 'industries':
        return (
          <>
            <button onClick={() => applyFilter('industries', 'medtech')} className={filters.industries.includes('medtech') ? "bg-pink-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
              Medtech
            </button>
            <button onClick={() => applyFilter('industries', 'biotech')} className={filters.industries.includes('biotech') ? "bg-blue-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
              Biotech
            </button>
          </>
        );
      default:
        return null;
    }
  };
    
  return (
      <>
      <Navbar />
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-3/4 mx-auto mt-8">
        <div className="flex items-center mb-8">
          <div className="ml-auto space-x-4">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users"
              className="border p-3 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white"
            />
            {renderFilterButtons()}
            <button onClick={() => setCurrentFilterGroup('stages')} className="bg-gray-500 text-white p-3 rounded-md">
              Next Stage
            </button>
          
         {/* <button onClick={() => applyFilter('sectors', 'ayurveda')} className={filters.sectors.includes('ayurveda') ? "bg-blue-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
            Ayurveda
          </button> 
            <button onClick={() => applyFilter('sectors', 'yoga')} className={filters.sectors.includes('yoga') ? "bg-green-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
            Yoga
          </button>
          <button onClick={() => applyFilter('sectors', 'unani')} className={filters.sectors.includes('unani') ? "bg-yellow-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
            Unani
          </button>
          <button onClick={() => applyFilter('sectors', 'siddha')} className={filters.sectors.includes('siddha') ? "bg-purple-500 text-white p-3 rounded-r-md" : "bg-gray-500 text-white p-3 rounded-r-md"}>
            Siddha
          </button>
          <button onClick={() => applyFilter('stages', 'ideation')} className={filters.stages.includes('ideation') ? "bg-indigo-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
            Ideation
          </button>
          <button onClick={() => applyFilter('stages', 'validation')} className={filters.stages.includes('validation') ? "bg-red-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
            Validation
          </button>
          <button onClick={() => applyFilter('stages', 'early traction')} className={filters.stages.includes('early traction') ? "bg-yellow-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
            Early Traction
          </button>
          <button onClick={() => applyFilter('stages', 'scaling')} className={filters.stages.includes('scaling') ? "bg-green-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
            Scaling
          </button>
          <button onClick={() => applyFilter('industries', 'medtech')} className={filters.industries.includes('medtech') ? "bg-pink-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
            Medtech
          </button>
          <button onClick={() => applyFilter('industries', 'biotech')} className={filters.industries.includes('biotech') ? "bg-blue-500 text-white p-3 rounded-md" : "bg-gray-500 text-white p-3 rounded-md"}>
            Biotech
          </button> */}
          <button onClick={sortFirstName} className="bg-gray-500 text-white p-3 rounded-md">
            Sort by First Name
          </button>
           <button onClick={toggleSortOrder} className="bg-gray-500 text-white p-3 rounded-md">
          {sortOrder === 'asc' ? 'Sort by Email (Asc)' : 'Sort by Email (Desc)'}
        </button> 
          <button onClick={clearFilter} className="bg-gray-500 text-white p-3 rounded-md">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-600">
        <div className="flex items-center py-4 font-semibold">
          <div className="flex-shrink-0 w-16 h-16"></div>
          <div className="ml-4 flex-grow">
            <button onClick={sortFirstName} className="text-white">
              Email
            </button>
            {/* <button onClick={sortUserType} className="text-white ml-10">Usertype</button> */}
          </div>
          <button onClick={toggleSortOrder} className="text-white">Revenue</button>
        </div>
        {users
          .filter((user) => {
            const lowerCaseSearch = search.toLowerCase();
            const sectorMatch = filters.sectors.length === 0 || filters.sectors.includes(user.startupDetails?.sector?.toLowerCase());
            const stageMatch = filters.stages.length === 0 || filters.stages.includes(user.startupDetails?.stage?.toLowerCase());
            const industryMatch = filters.industries.length === 0 || filters.industries.includes(user.startupDetails?.industry?.toLowerCase());

            return (
              (lowerCaseSearch === '' || (user.email && user.email.toLowerCase().includes(lowerCaseSearch))) &&
              sectorMatch && stageMatch && industryMatch
            );
          })
          .map((user) => (
            <div key={user.id} className="flex items-center py-4">
              {user.image && (
                <div className="flex-shrink-0 w-16 h-16">
                  <div
                    className="h-full w-full bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url(${user.image})` }}
                  ></div>
                </div>
              )}
              <div className="ml-4 flex-grow">
                <p className="text-xl text-white font-bold">{user.email}</p>
                <p className="text-gray-400">{user.accType}</p>
              </div>
              <p className="text-green-500 font-semibold mr-4">${user.total_revenue || 0}</p>
              <button
                onClick={() => navigateToUserDetails(user.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Explore;