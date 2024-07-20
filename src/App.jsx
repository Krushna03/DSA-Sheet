import { useEffect, useState } from "react"
import { Footer , Header } from './component/index'
import { Outlet, useLocation } from "react-router-dom"
import {useDispatch} from 'react-redux'
import authService from "./Appwrite/Authenticatioon"
import { logout,login } from "./store/authSlice"
import Loader from "./component/Loading/Loader"



function App() {
  const [loading, setLoading] = useState(true)
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


 return !loading ? (
   <div className="min-h-screen flex flex-wrap content-between bg-white">
       <div className='w-full block'>
          <Header />
            <main>
              <Outlet /> 
            </main>
          {location.pathname === '/' && <Footer />}
      </div>
   </div>
 ) :  <Loader />
   
}

export default App
