import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function InvestorB() {
  const [newDetails, setNewDetails] = useState({
    fname: "",
    
    state: "",
    role: "",
    
    mobile: "",
    city: "",
    website: "",
  });

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
      
        useEffect(() => {
          const uploadFile = async () => {
            if (file && !isImageUploaded) {
              const name = `${currentUser.uid}`;
              const storageRef = ref(storage, `startupLogos/${name}`);
      
              const uploadTask = uploadBytesResumable(storageRef, file);
      
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setUploadProgress(progress);
                },
                (error) => {
                  console.error("Error uploading file:", error);
                },
                async () => {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  setNewDetails((prevDetails) => ({
                    ...prevDetails,
                    logo: downloadURL,
                  }));
                  setIsImageUploaded(true);
                }
              );
            }
          };
          uploadFile();
        }, [file, currentUser, isImageUploaded]);
      
        const handleFormSubmit = async (e) => {
            e.preventDefault();
        
            const userDocRef = doc(db, "users", currentUser.uid);
        
            try {
              // Fetch existing data
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const existingData = userDoc.data().startupDetails || {}; // Existing data
                const updatedData = { ...existingData, ...newDetails }; // Merge old and new data
        
                // Update the document with merged data
                await updateDoc(userDocRef, {
                  startupDetails: updatedData,
                });
              } else {
                console.error("User document does not exist.");
              }
        
              navigate("/details/investorc"); // Redirect after form submission
            } catch (error) {
              console.error("Error updating user document:", error);
            }
          };
        const handleChange = (e) => {
            if (e.target.name === "stage") {
              setNewDetails({ ...newDetails, stage: e.target.value });
            } else {
              setNewDetails({ ...newDetails, [e.target.name]: e.target.value });
            }
          };
        
        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
          };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form className="bg-gray-800 shadow-xl shadow-blue-500/50 p-8 rounded-lg shadow-md w-full md:max-w-4xl"
            onSubmit={handleFormSubmit}>
                <h1 className='text-center text-white text-2xl mb-4 font-bold'>Investor</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-white">User Name</label>
                        <input
                            type="text"
                            name="fname"
                            className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                            value={newDetails.fname}
                            placeholder="Your first name"
                            onChange={handleChange}
                            required />
                        <label className="block mb-1 text-sm font-medium text-white">State</label>
                        <select
                            name="state" id="state"
                            className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                            value={newDetails.state}
                          onChange={handleChange} required>
                            <option value="" disabled selected>Select your state</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="gujarat">Gujarat</option>
                            <option value="uttar pradesh">Uttar Pradesh</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="west bengal">West Bengal</option>
                        </select>
                        <label className="block mb-1 mt-3 text-sm font-medium text-white">Role</label>
                        <input
                            type="text"
                            name="role"
                            className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                            value={newDetails.role}
                            placeholder="Role"
                            onChange={handleChange}
                            required />
                        <button
                            type="button"
                            className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                            Previous
                        </button>
                    </div>
                    <div className='flex-1'>
                    
                        <label className="block mb-1 text-sm font-medium text-white">Mobile</label>
                        <input
                            type="number"
                            name="mobile"
                            className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                            value={newDetails.mobile}
                            placeholder="Mobile Number" maxLength={10}
                            onChange={handleChange}
                            required />
                        <label className="block mb-1 text-sm font-medium text-white">City</label>
                        <select
                            name="city" id="city"
                            className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                            value={newDetails.city}
                          onChange={handleChange}  required >
                            <option value="" disabled selected>Select your city</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="lucknow">Lucknow</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="kolkata">Kolkata</option>
                        </select>
                        <label className="block mb-1 mt-3 text-sm font-medium text-white">Website</label>
                        <input
                            type="url"
                            name="website"
                            className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                            onChange={handleChange}
                            value={newDetails.website}
                            required />
                     <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                Next
                            </button>
                        </div>
                        </div>
                    </div>                
            </form>
        </div>
  )
}

export default InvestorB