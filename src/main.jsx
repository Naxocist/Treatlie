import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

// jsx components
import { Login, Options, Patient, Doctor, Input, NotFound, Profile, Exercises, DoctorChat, PatientChat} from './components'

// css
import './css/bundle.css';



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
  },
  {
    path: '/patientchat/:currentUserId',
    element: <PatientChatWrapper />
  },
  {
    path: '/doctorchat/:currentUserId/:patientUserId',
    element: <DoctorChatWrapper />
  }
]);

function PatientChatWrapper() {
  const { currentUserId } = useParams();
  return <PatientChat currentUserId={currentUserId} />;
}

function DoctorChatWrapper() {
  const { currentUserId, patientUserId } = useParams();
  return <DoctorChat currentUserId={currentUserId} patientUserId={patientUserId} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AnimatePresence>
    <RouterProvider router={router} />
  </AnimatePresence>
);