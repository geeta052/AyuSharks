import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
// import "./selection.scss"; // Include your existing styles if needed

const Selection = () => {
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSelection = async () => {
    if (selectedType && currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);

      try {
        // Check if the user document already exists
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Update the existing document with the selected details, including accType
          await updateDoc(userDocRef, {
            accType: selectedType,
          });
        } else {
          console.error("User document does not exist.");
          // Handle the case where the user document doesn't exist
        }

        // Navigate to the appropriate details route
        navigate(`/details/${selectedType}`);
      } catch (error) {
        console.error("Error updating user document:", error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-xl shadow-blue-500/50 p-8 rounded-lg text-white w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Select Your Account Type</h2>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="ml-5 flex-1">
          <div className="">
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 py-2 items-center">
            <input
              type="radio"
              value="startup"
              checked={selectedType === "startup"}
              onChange={() => setSelectedType("startup")}
            />
            <span className="ml-2">Startup</span>
          </label>
          </div>
          <div className="mt-10 ">
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 py-2 items-center">
            <input
              type="radio"
              value="investor"
              checked={selectedType === "investor"}
              onChange={() => setSelectedType("investor")}
            />
            <span className="ml-2 ">Investor</span>
          </label>
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 mt-4 py-2 items-center">
            <input
              type="radio"
              value="government agency"
              checked={selectedType === "governmentAgenciesA"}
              onChange={() => setSelectedType("governmentAgenciesA")}
            />
            <span className="ml-2">government agency</span>
          </label>
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 mt-4 py-2 items-center">
            <input
              type="radio"
              value="public user"
              checked={selectedType === "public user"}
              onChange={() => setSelectedType("public user")}
            />
            <span className="ml-2">public user</span>
          </label>
          </div>
          </div>
          <div className="flex-1">
          <div className="">
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 py-2 items-center">
            <input
              type="radio"
              value="incubator"
              checked={selectedType === "incubator"}
              onChange={() => setSelectedType("incubatora")}
            />
            <span className="ml-2">Incubator</span>
          </label>
          
          </div>
          <div className="mt-10 ">
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 py-2 items-center">
            <input
              type="radio"
              value="accelerator"
              checked={selectedType === "accelerator"}
              onChange={() => setSelectedType("acceleratora")}
            />
            <span className="ml-2">Accelerator</span>
          </label>
          </div>
          <div className="mt-10 ">
          
          <label className="flex box hover:bg-blue-600 border-solid border-2 border-blue-500 px-4 py-2 items-center">
            <input
              type="radio"
              value="mentor"
              checked={selectedType === "mentor"}
              onChange={() => setSelectedType("mentor")}
            />
            <span className="ml-2">mentor</span>
          </label>

          </div>
          </div>
        </div>
        <button
          onClick={handleSelection}
          className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Selection;