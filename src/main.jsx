import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';

import { Login, Options, Patient, Doctor, DoctorChat, PatientChat } from './components';

import './css/bundle.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/options',
    element: <Options />
  },
  {
    path: '/patient',
    element: <Patient />
  },
  {
    path: '/doctor',
    element: <Doctor />
  },
  {
    path: '/patientchat/:currentUserId',
    element: <PatientChatWrapper />
  },
  {
    path: '/doctorchat/:currentUserId',
    element: <DoctorChatWrapper />
  }
]);

function PatientChatWrapper() {
  const { currentUserId } = useParams();
  return <PatientChat currentUserId={currentUserId} />;
}

function DoctorChatWrapper() {
  const { currentUserId } = useParams();
  return <DoctorChat currentUserId={currentUserId} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);