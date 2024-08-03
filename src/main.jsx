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
import Array from './component/Free-Sheet/Array.jsx'
import Stack from './component/Free-Sheet/Stack.jsx'
import BinaryTree from './component/Free-Sheet/BinaryTree.jsx'
import String from './component/Free-Sheet/String.jsx'
import Recursion from './component/Free-Sheet/Recursion.jsx'
import LinkedList from './component/Free-Sheet/LinkedList.jsx'


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

        { path: "/FreeSheet/array", element: <Array /> }, 
        { path: "/FreeSheet/string", element: <String /> }, 
        { path: "/FreeSheet/linked list", element: <LinkedList /> }, 
        { path: "/FreeSheet/stack", element: <Stack /> }, 
        { path: "/FreeSheet/recursion", element: <Recursion /> }, 
        { path: "/FreeSheet/binary tree", element: <BinaryTree /> }, 
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
                         