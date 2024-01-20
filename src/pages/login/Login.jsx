import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const accType = userDoc.data().accType;

        
        dispatch({ type: "LOGIN", payload: user });

        // Redirect 
        navigate(`/dashboard/${accType}/${user.uid}`);
      } else {
        setError("User document not found");
        
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-gray-900 flex justify-center items-center h-screen'>
      <div className=' bg-gray-800 shadow-xl shadow-blue-500/50 px-10 py-10 rounded-xl '>
        <h2 className="text-center text-white text-xl mb-4 font-bold">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email Id'
            required
          />

          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
            required
          />

          <button
            type="submit"
            className=' bg-blue-300 w-full text-black font-bold hover:bg-blue-600 px-2 py-2 rounded-lg'
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p className="text-white mt-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
