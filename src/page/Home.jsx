import React, { useMemo , useEffect, useState } from 'react'
import homeImg from '../assets/home.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../component/Loading/Loader'
import DSA_Headers from '../component/DSA_Form'
import authService from '../Appwrite/Authenticatioon'


function Home() {
    const authStatus = useSelector(state => state.auth.status)
    const [loading, setLoading] = useState(true)
    const [userName, setUsername] = useState('')


    useEffect(() => {
      let isMounted = true; // Track if component is mounted
  
      authService.getCurrentUser().then((res) => {
        if (isMounted && res) {
          setUsername(res.name);
          setLoading(false);
        }
      });
  
      return () => {
        isMounted = false; // Clean up on unmount
      };
    }, []);
  
    const memoizedUserName = useMemo(() => userName, [userName]);
  


   

if( authStatus === false ) {
   return (
    <div className="max-h-screen flex items-center justify-center bg-white mb-10">
  <div className="container mx-auto px-7 py-12 flex flex-col md:flex-row items-center justify-between">
    
    <div className="text-center md:text-left md:pr-10 md:w-1/2">
      <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
        Welcome 
        to My DSA Journey
      </h1>
      
      <p className="text-lg text-gray-600 mb-6">
        Explore and master Data Structures and Algorithms with ease. Dive into various topics, practice problems, and track your progress as you enhance your skills.
      </p>

      <div className="flex justify-center md:justify-start">
        <Link to='/login'>
          <button className="text-lg bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>

    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
      <img 
        src={homeImg} 
        alt="DSA Illustration" 
        className="w-full h-auto max-h-3/4-screen rounded-lg shadow-lg shadow-slate-300"
        style={{ maxHeight: '80vh' }}
      />
    </div>
  </div>
</div>
   ) 
   }


  return !loading ? (
      <div>
          <h1 className='flex justify-center font-medium m-7 text-xl lg:text-3xl'>
            {memoizedUserName }'s DSA Sheet
          </h1>
      
          <DSA_Headers />
      </div>
    ) :
      <Loader />
  }

export default Home
