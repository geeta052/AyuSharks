import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const IncubatorDetails = () => {
  const [newDetails, setNewDetails] = useState({
    profileImage: "",
    incub_name: "",
    stage: "",
    date: "",
    current_incubatees: "",
    companyDescription: "",
    program_duration: "",
    graduated_incubatees: "",
    industry  : "",
    interests: "",
    sector: "",
    dipp_empanelment: "", // Add logo field to newDetails
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
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Update the logo field in newDetails
            setNewDetails((prevDetails) => ({
              ...prevDetails,
              logo: downloadURL,
            }));
            setIsImageUploaded(true); // Set the flag to true after the upload
          }
        );
      }
    };

    uploadFile();
  }, [file, currentUser, isImageUploaded]); // Include isImageUploaded in the dependency array

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userDocRef = doc(db, "users", currentUser.uid);

    try {
      // Check if the user document already exists
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Update the existing document with the selected details
        await updateDoc(userDocRef, {
          startupDetails: newDetails,
        });
      } else {
        console.error("User document does not exist.");
        // Handle the case where the user document doesn't exist
      }

      // Navigate to the appropriate dashboard route
      navigate("/details/incubatorb");
    } catch (error) {
      console.error("Error updating user document:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const handleChange = (e) => {
    setNewDetails({ ...newDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <form className="bg-gray-800 shadow-xl shadow-blue-500/50 p-8 mt-10 mb-10 rounded-lg shadow-md "
        onSubmit={handleFormSubmit}>
            <h1 className='text-center text-white text-2xl mb-4 font-bold'>Incubator</h1>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1">
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

                    <label className="block mb-1 text-sm font-medium text-white">Incubator Name</label>
                    <input
                        type="text"
                        name="incub_name"
                        className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                        value={newDetails.incub_name}
                        placeholder="Incubator Name"
                        onChange={handleChange}
                        required />

<label className="block mb-1 text-sm font-medium text-white">Stage</label>
<select
                          name="stage" id="stage"
                          className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                          value={newDetails.stage}
                          onChange={handleChange}>
                          <option value="" disabled selected>Select stage</option>
                          <option value="indeation">Ideation</option>
                          <option value="validation">Validation</option>
                          <option value="early traction">Early Traction</option>
                          <option value="scaling">Scaling</option>
                          
                      </select>
                    <label className="block mb-1 mt-4 text-sm font-medium text-white">Date of Establishment</label>
                    <input
                        type="date"
                        name="date"
                        className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                        value={newDetails.date}
                        placeholder="Incubator Name"
                        onChange={handleChange}
                        required />
                    <label className="block mb-1 text-sm font-medium text-white">Current Incubatees</label>
                    <input
                        type="number"
                        name="current_incubatees"
                        className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                        value={newDetails.current_incubatees}
                        placeholder="Current number of incubatees"
                        onChange={handleChange}
                        required />
                </div>
                <div className='flex-1'>
                    <label className="block mb-1 text-sm font-medium text-white">Add Brief</label>
                    <textarea rows="7"
                        className="w-full p-2  bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                        name="companyDescription"
                            value={newDetails.companyDescription}
                          onChange={handleChange}></textarea>
                    <label className="block mb-1 text-sm font-medium text-white">Program Duration</label>
                    <select
                        name="program_duration" id="program_upto6months"
                        className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                        value={newDetails.program_duration}
                          onChange={handleChange}>
                        <option value="" disabled selected>Select industry</option>
                        <option value="upto6months">Upto 6 Months</option>
                        <option value="6to12months">6 to 12 Months</option>
                        <option value="12monthsandabove">12 Months and Above</option>
                    </select>
                    <label className="block mb-1 mt-4 text-sm font-medium text-white">Graduated Incubatees</label>
                    <input
                        type="number"
                        name="graduated_incubatees"
                        className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                        value={newDetails.graduated_incubatees}
                        placeholder="Number of graduated incubatees"
                        onChange={handleChange}
                        required />
                    <div className='flex flex-col md:flex-row gap-8 '>
                        <div className="flex-1">
                            <label className="block mb-1 text-sm font-medium text-white">Industry</label>
                            <select
                                name="industry" id="industry"
                                className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                                value={newDetails.industry}
                          onChange={handleChange}>
                                <option value="" disabled selected>Select industry</option>
                                <option value="chemical">Chemical</option>
                                <option value="internet of things">Internet of Things</option>
                                <option value="nanotechnology">Nanotechnology</option>
                                <option value="biotechnology">Biotechnology</option>
                                <option value="ai">AI</option>
                            </select>

                            <label className="block mb-1 mt-4 text-sm font-medium text-white">Interests</label>
                            <select
                                name="interests" id="interests"
                                className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200">
                                  value={newDetails.interests}
                          onChange={handleChange} 
                                <option value="" disabled selected>Select interests</option>
                                <option value="government">Government</option>
                                <option value="location based services<">Location Based Services</option>
                                <option value="offline">Offline</option>
                                <option value="online">Online</option>
                                <option value="e-commerce">E-commerce</option>
                                <option value="otheres">Others</option>
                            </select>

                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 text-sm font-medium text-white">Sector</label>
                            <select
                                name="sector" id="sector"
                                className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                                value={newDetails.sector}
                          onChange={handleChange}>
                                <option value="" disabled selected>Select your sector</option>
                                <option value="medTech">MedTech</option>
                                <option value="bioTech">BioTech</option>
                                <option value="healthTech">HealthTech</option>
                            </select>
                            <label className="block mb-1 mt-4 text-sm font-medium text-white">Dipp Empanelment</label>
                            <input
                                type="number"
                                name="dipp_empanelment"
                                className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                                value={newDetails.dipp_empanelment}   
                                placeholder="Dipp number"
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                  Next
            </button>
        </form>
    </div>
)
};

export default IncubatorDetails;