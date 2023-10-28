import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './context/UserContext.jsx'
const router = createBrowserRouter([{ path: '*', Component: App }])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />;
    </UserContextProvider>
  </React.StrictMode>
)
