import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContextProvider, AuthContext, useAuth } from '../../context/AuthContext'
import { Button } from '@mui/material';
import { auth } from '../../firebase';
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const {currentUser} = useAuth();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleLogout = async () => {
    auth.signOut();
  };

  return (
    <div>
      {/* Navbar for larger screens */}
      <nav className="bg-black text-white p-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold">
            YourLogo
          </Link>

          {/* Navigation Links */}
          <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/explore" className="text-white">
            Explore
          </Link>
          <Link to="/resource" className="text-white">
            Resource
          </Link>
          <Link to="/meet" className="text-white">
            Meeting
          </Link>
          <Link to="/community" className="text-white">
            Community
          </Link>
          <Link to="/mentorship" className="text-white">
            Mentorship
          </Link>
          <Link to="/connections" className="text-white">
            Connections
          </Link>
          <Link to="/requests" className="text-white">
            Requests
          </Link>
          <Link to="/posts" className="text-white">
            posts
          </Link>
        </div>


          {/* Profile, Login, Signup */}
          <div className="space-x-4">
            <Link to = {"/login"} onClick={handleLogout}>
              logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar for smaller screens */}
      <div className="md:hidden">
        {/* Hamburger icon to toggle the sidebar */}
        <div className="bg-black text-white p-4">
          <button onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Render the new Sidebar content directly */}
        {showSidebar && (
          <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a href="#">
              <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
              <nav className="-mx-3 space-y-6">
                <div className="space-y-3">
                  <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Dashboard</span>
                  </a>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Performance</span>
                  </a>
                </div>

                <div className="space-y-3">
                  <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">content</label>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Guides</span>
                  </a>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Hotspots</span>
                  </a>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Checklists</span>
                  </a>
                </div>

                <div className="space-y-3">
                  <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3..75V4.125C10.875 3.504 11.379 3 12 3s1.125.504 1.125 1.125V10.5a.75.75 0 001.5 0V4.125C14.625 3.504 15.129 3 15.75 3h5.25c.621 0 1.125.504 1.125 1.125V17.25a3.75 3.75 0 01-3.75 3.75H9.075M21 21l-4.5-4.5" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Themes</span>
                  </a>

                  <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.019 19.019a9 9 0 1112.962-12.962 11.999 11.999 0 00-12.962 0M19.393 19.393l-2.83-2.829M17.364 14.536l-2.829-2.829M7.757 7.757l-2.828-2.829M4 4l3.536 3.536" />
                    </svg>
                    <span className="mx-2 text-sm font-medium">Dark Mode</span>
                  </a>
                </div>
              </nav>

              {/* Settings and Logout */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center space-x-3">
                  <button onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>
                    <SettingsSystemDaydreamOutlinedIcon className="w-5 h-5" />
                  </button>
                  <button>
                    <NotificationsNoneIcon className="w-5 h-5" />
                  </button>
                  <button>
                    <PsychologyOutlinedIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button>
                    <AccountCircleOutlinedIcon className="w-6 h-6" />
                  </button>
                  <button>
                    <ExitToAppIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Navbar;
