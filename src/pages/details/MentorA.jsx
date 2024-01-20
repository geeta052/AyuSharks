import React from 'react'
import { Link } from 'react-router-dom'

function MentorA() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form className="bg-gray-800 shadow-xl shadow-blue-500/50 p-8 rounded-lg w-full md:max-w-4xl">
                <h1 className='text-center text-white text-2xl mb-4 font-bold'>Mentor</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                    
                    <label className="block mb-1 text-sm font-medium text-white">Mobile</label>
                        <input
                            type="number"
                            name="mobile"
                            className="w-full p-2 bg-gray-600 rounded-md mb-4 outline-none text-white placeholder:text-gray-200"
                            placeholder="Mobile Number"
                            required />
                        <label className="block mb-1 text-sm font-medium text-white">State</label>
                        <select
                            name="state" id="state"
                            className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200">
                            <option value="" disabled selected>Select your state</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="gujarat">Gujarat</option>
                            <option value="uttar pradesh">Uttar Pradesh</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="west bengal">West Bengal</option>
                        </select>
                        

                    </div>
                    <div className='flex-1'>
                    <label className="block mb-1 text-sm font-medium text-white">Sector</label>
                <select
                  name="sector" id="sector"
                  className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200">
                  <option value="" disabled selected>Select your sector</option>
                  <option value="medTech">MedTech</option>
                  <option value="bioTech">BioTech</option>
                
                </select>
                        
                        <label className="block mb-1 mt-4 text-sm font-medium text-white">City</label>
                        <select
                            name="city" id="city"
                            className="w-full p-2 bg-gray-600 rounded-md outline-none text-white placeholder:text-gray-200">
                            <option value="" disabled selected>Select your city</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="lucknow">Lucknow</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="kolkata">Kolkata</option>
                        </select>
                        
                     <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-6 bg-blue-300 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                                <Link to={'/details/mentorB'}>Next</Link>
                            </button>
                        </div>
                        </div>
                    </div>                
            </form>
        </div>

  )
}

export default MentorA
