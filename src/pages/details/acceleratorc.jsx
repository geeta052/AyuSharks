import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AcceleratorC() {
    const [newDetails, setNewDetails] = useState({
        success_story_details: "",
        profileImage: "",
        start_name: "",
        compaBrief: "",
        website_mobile_ink: "",
        hub_profile_link: "",
        
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
            
                  navigate("/dashboard/accelerator"); // Redirect after form submission
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

    const [showSuccessStoryFields, setShowSuccessStoryFields] = useState(false);

    const handleCheckboxChange = () => {
        setShowSuccessStoryFields(!showSuccessStoryFields);
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form className="bg-gray-800 shadow-xl shadow-blue-500/50 p-8 mt-10 mb-10 rounded-lg shadow-md w-full md:max-w-4xl"
            onSubmit={handleFormSubmit}>
                <h1 className='text-center text-white text-2xl mb-4 font-bold'>Accelerator</h1>
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="flex-1">
                        <p className='text-white text-xl mb-4 font-bold'>Startup Story</p>

                        <input type="checkbox" name="sucess_story" id="success_story" onChange={handleCheckboxChange} />
                        <label className="mb-1 ml-2 text-sm font-medium text-white">Any Success Story?</label><br />
                        {showSuccessStoryFields && (
                            <>
                                {/* Additional input fields related to success story */}
                                <label className="block mb-1 mt-5 text-sm font-medium text-white">Success Story Details</label>
                                <input
                                    type="text"
                                    name="success_story_details"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.success_story_details}
                                    placeholder="Details of success story"
                                    onChange={handleChange}
                                    required />
                                <img
                                    src="#"
                                    alt="Profile"
                                    className="w-32 h-32 object-cover border text-white rounded-full mb-4" />
                                <label className="block mb-1 text-sm font-medium text-white">Add Logo</label>
                                <input
                                    type="file"
                                    
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 bg-gray-600 outline-none text-white rounded-md mb-4" />

                                <label className="block mb-1 text-sm font-medium text-white">Startup Name</label>
                                <input
                                    type="text"
                                    name="start_name"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.start_name}
                                    placeholder="Startup Name"
                                    onChange={handleChange}
                                    required />
                            </>
                        )}

                        <button
                            type="button"
                            className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                            
                        </button>
                    </div>

                    <div className='flex-1'>

                        {showSuccessStoryFields && (
                            <>
                                {/* Additional input fields related to success story */}
                                <label className="block mb-1 mt-11 text-sm font-medium text-white">Add Brief</label>
                                <textarea rows="4" placeholder="About Business"
                                    className="w-full p-2  bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.compaBrief}
                                    name="compaBrief"
                                    onChange={handleChange}></textarea>
                                <label className="block mb-1 text-sm font-medium text-white">Website/Mobile Link</label>
                                <input
                                    type="url"
                                    name="website_mobile_ink"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.website_mobile_ink}
                                    placeholder="Startup link"
                                    onChange={handleChange}
                                    required />
                                <label className="block mb-1 text-sm font-medium text-white">Hub Profile Link</label>
                                <input
                                    type="url"
                                    name="hub_profile_link"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.hub_profile_link}
                                    placeholder="Startup India hub profile link"
                                    onChange={handleChange}
                                    required />
                            </>
                        )}
                        <br /><br /><br />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-5 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AcceleratorC