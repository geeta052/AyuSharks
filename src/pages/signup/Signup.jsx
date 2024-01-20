import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        
      });

      dispatch({ type: "LOGIN", payload: user });
      navigate("/selection"); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-900 flex justify-center items-center h-screen'>
      <form onSubmit={handleSignup}>
      <div className=' bg-gray-800 shadow-xl shadow-blue-500/50  px-10 py-10 rounded-xl '>
        <div className="">
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
        </div>
        <div>
          <input type="text"
            name='name'
            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
            placeholder='Name' />
        </div>
        <div>
          <input type="email"
            name='email'
            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            value={email}
            placeholder='Email Id' 
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <input
              type="password"
              name='password'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name='conpassword'
              className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none '
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className=' flex justify-center mb-3'>
            <button
              className=' bg-blue-300 w-full text-black font-bold hover:bg-blue-600 px-2 py-2 rounded-lg '
              type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          
        </div>
        {error && <span className='text-white'>{error}</span>}
        <div>
          <h2 className='text-white'>Have an account <Link className=' text-blue-300 hover:text-blue-600 font-bold' to={'/login'}>Login</Link></h2>
        </div>
      </div>
      </form>
    </div>
  )
};

export default Signup;
