import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const InvestorDetails = () => {
  const [newDetails, setNewDetails] = useState({
    investor_name: "",
    stage: "",
    companyDescription: "",
    budget: "",
    industry: "",
    services: "",
    sector: "",
    
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
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
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

      navigate(`/details/investorb`);
    } catch (error) {
      console.error("Error updating user document:", error);
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
      <form
        className="bg-gray-800 p-8 shadow-xl shadow-blue-500/50  rounded-lg shadow-md"
        onSubmit={handleFormSubmit}
      >
        <h1 className='text-center text-white text-2xl mb-4 font-bold'>Investor</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <img
              src={newDetails.logo || "#"} // Display logo or placeholder
              alt="Profile"
              className="w-32 h-32 object-cover border text-white rounded-full mb-4"
            />
            <label className="block mb-1 text-sm font-medium text-white">Add Logo</label>
            <input
              type="file"
              onChange={handleFileChange}
              name="profileImage"
              accept="image/*"
              className="w-full p-2 bg-gray-600 outline-none text-white rounded-md mb-4"
              required
            />

            <label className="block mb-1 text-sm font-medium text-white">Investor Name</label>
            <input
              type="text"
              name="investor_name"
              className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
              value={newDetails.investor_name}
              placeholder="Investor Name"
              onChange={handleChange}
              required />

            <label className="block mb-1 text-sm font-medium text-white">Stage</label>
            <select
                          name="stage" id="stage"
                          className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                          value={newDetails.stage}
                          onChange={handleChange} required>
                          <option value="" disabled selected>Select stage</option>
                          <option value="indeation">Ideation</option>
                          <option value="validation">Validation</option>
                          <option value="earlytraction">Early Traction</option>
                          <option value="scaling">Scaling</option>                        
                      </select>
          </div>
          <div className='flex-1'>
            <label className="block mb-1 text-sm font-medium text-white">Add Brief</label>
            <textarea rows="4" placeholder="About Business"
              className="w-full p-2  bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
              name="companyDescription"
              value={newDetails.companyDescription}
              onChange={handleChange} maxLength={10} required></textarea>

            <label className="block mb-1 text-sm font-medium text-white">Budget</label>
            <select
              name="budget" id="budget"
              className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
              value={newDetails.budget}
                          onChange={handleChange}
                          required>
              <option value="" disabled selected>Select</option>
              <option value="0-50,000">Rs 0-50,000</option>
              <option value="1,00,000-5,00,000">Rs 1,00,000-5,00,000</option>
              <option value="5,00,000-10,00,000">Rs 5,00,000-10,00,000</option>
              <option value="10,00,000+">Rs 10,00,000+</option>
            </select>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className="flex-1">
                <label className="block mb-1 mt-4 text-sm font-medium text-white">Industry</label>
                <select
                  name="industry" id="industry"
                  className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                  value={newDetails.industry}
                          onChange={handleChange} required>
                  <option value="" disabled selected>Select industry</option>
                  <option value="medtech">MedTech</option>
                  <option value="biotech">BioTech</option>
                </select>

                <label className="block mb-1 mt-4 text-sm font-medium text-white">Interests</label>
                <select
                  name="services" id="services"
                  className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                  value={newDetails.services}
                          onChange={handleChange} required>

                  <option value="" disabled selected>Select interests</option>
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                  <option value="otheres">Others</option>
                </select>

              </div>
              <div className="flex-1">
                <label className="block mb-1 mt-4 text-sm font-medium text-white">Sector</label>
                <select
                  name="sector" id="sector"
                  className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200"
                  value={newDetails.sector}
                          onChange={handleChange}
                          required>
                  <option value="" disabled selected>Select your sector</option>
                  <option value="ayurveda">Ayurveda</option>
                  <option value="yoga">Yoga</option>
                  <option value="unani">Unani</option>
                  <option value="siddha">Siddha</option>
                  <option value="homeopathy">Homeopathy</option>
                </select>
              
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
}

export default InvestorDetails;