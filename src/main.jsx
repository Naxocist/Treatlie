import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

// jsx components
import { Login, Options, Patient, Doctor, Input, NotFound, Profile, Exercises} from './components'

// css
import './css/bundle.css'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path: 'options',
    element: <Options />
  },
  {
    path: 'patient',
    element: <Patient />
  },
  {
    path: 'doctor',
    element: <Doctor />,
    children: [
      {
        path: 'profile/:uid',
        element: <Profile />,
        children: [
          {
            path: 'packet/:hash',
            element: <Exercises />
          }
        ]
      },
    ]
  },
  {
    path: 'input',
    element: <Input />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimatePresence>
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>
)
