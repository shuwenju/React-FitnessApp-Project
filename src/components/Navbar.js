import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 h-16 flex justify-end items-center pr-8">
      <ul className="text-white flex justify-around min-w-full invisible md:visible">
        <li
          className={`ring-2 rounded-xl px-4 py-1 hover:ring-blue-300 ${
            location.pathname === "/" ? "bg-blue-400" : ""
          }`}
        >
          <Link to="/">Your Information</Link>
        </li>
        <li
          className={`ring-2 rounded-xl px-4 py-1 hover:ring-blue-300 ${
            location.pathname === "/goals" ? "bg-blue-400" : ""
          }`}
        >
          <Link to="/goals">Your Goals</Link>
        </li>
        <li
          className={`ring-2 rounded-xl px-4 py-1 hover:ring-blue-300 ${
            location.pathname === "/calculator" ? "bg-blue-400" : ""
          }`}
        >
          <Link to="/calculator">Your Personal Calories</Link>
        </li>
        <li
          className={`ring-2 rounded-xl px-4 py-1 hover:ring-blue-300 ${
            location.pathname === "/workouts" ? "bg-blue-400" : ""
          }`}
        >
          <Link to="/workouts">Your Workouts</Link>
        </li>
      </ul>

      <div
        className="space-y-2 relative md:hidden"
        role="button"
        tabIndex={0}
        onClick={handleIsOpen}
      >
        <span className="block w-8 h-1 bg-white opacity-90 rounded-sm"></span>
        <span className="block w-8 h-1 bg-white opacity-90 rounded-sm"></span>
        <span className="block w-8 h-1 bg-white opacity-90 rounded-sm"></span>
      </div>

      {isOpen && (
        <div className="modal-overlay md:hidden z-10" ref={dropdownRef}>
          <div className="modal-content absolute w-full top-16 right-0 bg-blue-900 border-gray-200 dark:bg-gray-900 px-4 py-2">
            <ul className="text-white mt-2 mb-2">
              <li className="h-8 py-3">
                <Link
                  to="/"
                  className={`flex justify-center items-center rounded-md w-12/12 hover:bg-blue-400 ${
                    location.pathname === "/" ? "bg-blue-400" : ""
                  }`}
                >
                  Your Information
                </Link>
              </li>
              <li className="h-8 py-3">
                <Link
                  to="/goals"
                  className={`flex justify-center items-center rounded-md w-12/12 hover:bg-blue-400 ${
                    location.pathname === "/goals" ? "bg-blue-400" : ""
                  }`}
                >
                  Your Goals
                </Link>
              </li>
              <li className="h-8 py-3">
                <Link
                  to="/calculator"
                  className={`flex justify-center items-center rounded-md w-12/12 hover:bg-blue-400 ${
                    location.pathname === "/calculator" ? "bg-blue-400" : ""
                  }`}
                >
                  Your Personal Calculator
                </Link>
              </li>
              <li className="h-8 py-3">
                <Link
                  to="/workouts"
                  className={`flex justify-center items-center rounded-md w-12/12 hover:bg-blue-400 ${
                    location.pathname === "/workouts" ? "bg-blue-400" : ""
                  }`}
                >
                  Your Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
