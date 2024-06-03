import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';


// import all jsx components
import { Login, Options, Patient, Doctor, Tasks, Webcam } from './components'

// import all css
import './css/bundle.css'

const router = createBrowserRouter([
  {
    path: '',
    element: <Login />,
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
    element: <Doctor />
  },
  {
    path: 'patient/tasks/:packet_id',
    element: <Tasks />
  },
  {
    path: 'patient/tasks/:packet_id/webcam/:webcam_id',
    element: <Webcam />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
