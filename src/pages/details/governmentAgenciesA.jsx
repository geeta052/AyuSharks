import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



function GovernmentAgenciesA() {
  const [newDetails, setNewDetails] = useState({
    name_of_minitry: "",
    minitry: "",
    adbrif: "",
    department: "",
    industry: "",
    services: "",
    sector: "",
    
    
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
        await updateDoc(userDocRef, {
          startupDetails: newDetails,
        });
      } else {
        console.error("User document does not exist.");
      }

      navigate("/details/governmentAgenciesB");
    } catch (error) {
      console.error("Error updating user document:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails({ ...newDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form className="bg-gray-800 p-8 shadow-xl shadow-blue-500/50  rounded-lg shadow-md"
      onSubmit={handleFormSubmit}>
        <h1 className='text-center text-white text-2xl mb-4 font-bold'>Government Agencies</h1>
        <div className="flex flex-col md:flex-row gap-8">
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

            <label className="block mb-1 text-sm font-medium text-white">Name of Minitry/Department</label>
            <input
              type="text"
              name="name_of_minitry"
              className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
              value={newDetails.name_of_minitry}
              placeholder="Name of Minitry/Department"
              onChange={handleChange}
              required />

<label className="block mb-1 text-sm font-medium text-white">Minitry</label>
            <select
              name="minitry" id="minitry"
              className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
              value={newDetails.minitry}
                          onChange={handleChange}>
              <option value="" disabled selected>Select</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
            </select>
          </div>
          <div className='flex-1'>
            <label className="block mb-1 text-sm font-medium text-white">Add Brief</label>
            <textarea rows="4" placeholder="About Business"
              className="w-full p-2  bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
              value={newDetails.adbrif}
              name="adbrif"
              onChange={handleChange}
              ></textarea>
            <label className="block mb-1 text-sm font-medium text-white">Department</label>
            <select
              name="department" id="department"
              className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
              value={newDetails.department}
              onChange={handleChange}>
              <option value="" disabled selected>Select</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
            </select>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className="flex-1">
                <label className="block mb-1 mt-4 text-sm font-medium text-white">Industry</label>
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
                  name="services" id="services"
                  className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                  value={newDetails.services}
              onChange={handleChange}>
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
                <label className="block mb-1 mt-4 text-sm font-medium text-white">Sector</label>
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
                
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          next
        </button>
      </form>
    </div>
  )
}

export default GovernmentAgenciesA;