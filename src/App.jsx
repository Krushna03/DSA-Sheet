import { useEffect, useState } from "react"
import { Footer , Header } from './component/index'
import { Outlet, useLocation } from "react-router-dom"
import {useDispatch} from 'react-redux'
import authService from "./Appwrite/Authenticatioon"
import { logout,login } from "./store/authSlice"
import Loader from "./component/Loading/Loader"



function App() {
  const [loading, setLoading] = useState(true)
  const [showFooter, setShowFooter] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
     authService.getCurrentUser()
      .then((userData) => {
        if (userData) {          
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
      })
     .finally(() => setLoading(false))
  }, [])


   useEffect(() => {
      if (location.pathname === '/') {
        const timer = setTimeout(() => {
           setShowFooter(true)
        }, 5000)
        return () => clearTimeout(timer)
      }
      else {
        setShowFooter(false)
      }
   }, [location.pathname])

   

 return !loading ? (
   <div className="min-h-screen flex flex-wrap content-between bg-white">
       <div className='w-full block'>
          <Header />
            <main>
              <Outlet /> 
            </main>
          { showFooter && <Footer /> }
      </div>
   </div>
 ) :  <Loader />
}

export default App
