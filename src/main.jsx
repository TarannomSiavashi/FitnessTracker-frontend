import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import User from './pages/User.jsx'
import PersonalRecord from './pages/PersonalRecord.jsx'
import Daily from './pages/Daily.jsx'
// import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home/:userId",
    element: <Home />,
  },
  {
    path: "/User/:userId",
    element: <User />,
  },
  {
    path: "/Records/:title/:userId/:prId",
    element: <PersonalRecord/>,
  },
  {
    path: "/DailyGoal/:userId/:dailyId",
    element: <Daily/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)