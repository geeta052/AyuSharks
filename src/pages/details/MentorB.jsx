
import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MentorA from "./MentorA";

function MentorB() {
    const [newDetails, setNewDetails] = useState({
        
        website_mobile_ink: "",
        
        startup_name: "",
        profileImage: "",
        
        investment:"",
        profit:"",
        logo: "", // Added the logo property to newDetails
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
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const existingData = userDoc.data().startupDetails || {};
                const updatedData = { ...existingData, ...newDetails };

                await updateDoc(userDocRef, {
                    startupDetails: updatedData,
                });
            } else {
                console.error("User document does not exist.");
            }

            navigate("/");
        } catch (error) {
            console.error("Error updating user document:", error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "profileImage") {
            // Handle profile image change separately
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setNewDetails({ ...newDetails, profileImage: selectedFile.name });
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
                <h1 className='text-center text-white text-2xl mb-4 font-bold'>Mentor</h1>
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="flex-1">
                    <p className='text-white text-xl mb-4 font-bold'>Startup Story</p>

                        <input type="checkbox" name="sucess_story" id="success_story" onChange={handleCheckboxChange} />
                        <label className="mb-1 ml-2 text-sm font-medium text-white">Any Success Story?</label><br />
                        {showSuccessStoryFields && (
                            <>
                                {/* Additional input fields related to success story */}
                                <label className="block mb-1 mt-5 text-sm font-medium text-white">Success Story Details</label>
                                
                              
                                <img
                                src={newDetails.logo || "#"} // Display logo or placeholder
                                alt="Profile"
                                className="w-32 h-32 object-cover border text-white rounded-full mb-4" />
                            <label className="block mb-1 text-sm font-medium text-white">Add Logo</label>
                            <input
                type="file"
                onChange={handleChange}
                name="profileImage"
                accept="image/*"
                className="w-full p-2 bg-gray-600 outline-none text-white rounded-md mb-4"
                required
            />
                           

<label className="block mb-1text-sm font-medium text-white">Startup Name</label>
                                <input
                                    type="text"
                                    name="startup_name"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.startup_name}
                                    placeholder="Startup Name"
                                    onChange={handleChange}
                                    required />
                            </>
                        )}

                        <button
                            type="button"
                            className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                            <Link to={'/details/mentor'}>Previous</Link>
                        </button>
                    </div>

                    <div className='flex-1'>
                       
                        {showSuccessStoryFields && (
                            <>
                                {/* Additional input fields related to success story */}
                               
                                <label className="block mb-1 mt-20 text-sm font-medium text-white">Website/Mobile Link</label>
                                <input
                                    type="url"
                                    name="website_mobile_ink"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.website_mobile_ink}
                                    placeholder="Startup link"
                                    onChange={handleChange}
                                    required />
                               <label className="block mb-1 text-sm font-medium text-white">Investment</label>
                                <input
                                    type="numberl"
                                    name="investment"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.investment}
                                    
                                    onChange={handleChange}
                                    required />
                                    <label className="block mb-1 text-sm font-medium text-white">Profit</label>
                                <input
                                    type="number"
                                    name="profit"
                                    className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                    value={newDetails.profit}
                                   
                                    onChange={handleChange}
                                    required />
                            </>
                        )}
                       <br /><br /><br />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-5 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                <Link to = {"/"}>Submit</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default MentorB