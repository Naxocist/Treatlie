import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

// jsx components
import { Login, Options, Patient, Doctor, Input, NotFound, Profile} from './components'

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
    <RouterProvider router={router} />
  </React.StrictMode>
)
