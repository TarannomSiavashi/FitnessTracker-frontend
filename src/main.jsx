import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import User from './pages/User.jsx'
import PersonalRecord from './pages/PersonalRecord.jsx'
import Daily from './pages/Daily.jsx'
import Monthly from './pages/MonthlyGoals.jsx'
import MonthlyGoal from './components/monthlyGoal-components/MonthlyGoal.jsx'
import NewMonthly from './pages/AddMonthly.jsx'
import NewDaily from './components/home-components/addDailyGoal.jsx'
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
  {
    path: "/MonthlyGoal/:userId",
    element: <Monthly/>,
  },
  {
    path: "/MonthlyGoal/:userId/:monthId",
    element: <MonthlyGoal/>,
  },
  {
    path: "/newMonthly/:userId",
    element: <NewMonthly/>,
  },
  {
    path: "/newDaily/:userId",
    element: <NewDaily/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)