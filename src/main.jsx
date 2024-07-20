import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './page/Home.jsx'
import AuthLayout from './component/AuthLayout.jsx'
import Signup from './component/security/Signup.jsx'
import { Login } from './component/index.js'
import FreeSheet from './page/FreeSheet.jsx'
import AddQuestion from './page/AddQuestion.jsx'
import Question from './page/Question.jsx'
import EditQuestion from './page/EditQuestion.jsx'
import User from './component/User.jsx'

const router = createBrowserRouter([
    {
      path: '/', element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <AuthLayout authentication={false}> <Login /> </AuthLayout> },
        { path: '/signup', element: <AuthLayout authentication={false}> <Signup /> </AuthLayout> },
        { path: '/FreeSheet',element: <AuthLayout authentication>{" "} <FreeSheet /> </AuthLayout> },
        { path: '/AddQuestion', element:<AuthLayout authentication>{" "} <AddQuestion /> </AuthLayout> },
        { path: "/question/:serialNo" , element:<Question /> },
        { path: "/edit-question/:serialNo", element: <AuthLayout authentication> <EditQuestion /> </AuthLayout> }, 
        { path: "/profile/:userId", element: <AuthLayout authentication> <User /> </AuthLayout> }, 
      ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
                         