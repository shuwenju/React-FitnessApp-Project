import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const UserGoals = ({
  handleUserDataChange,
  userInfo,
  selectedGoal,
  setSelectedGoal,
  workoutFreq,
  setWorkoutFreq,
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState(null)

  const handleGoalChange = (event) => {
    const goal = event.currentTarget.value
    setSelectedGoal(goal)
    handleUserDataChange(userInfo, goal, workoutFreq)
  }

  const handleFreqChange = (event) => {
    const frequency = parseInt(event.target.value, 10)
    setWorkoutFreq(frequency)
    setSelectedFrequency(frequency)
    handleUserDataChange(userInfo, selectedGoal, frequency)
  }

  useEffect(() => {
    setSelectedFrequency(workoutFreq);
  }, [workoutFreq]);

  return (
    <div>
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        <Link to="/" className="inline-block">
          <button className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
            {/* Alternative left arrow */}
            <svg
              className="h-6 w-6 text-white transform rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="mt-20">
        <div className="info-page flex justify-center items-center h-calc[(100vh-1rem)]">
          <div className="bg-gray-200 p-6 rounded-lg w-11/12 md:w-4/12">
            <h3 className="text-lg font-semibold mb-4">
              Select your fitness goal:
            </h3>
            <div className="flex flex-row flex-wrap justify-center space-x-4">
              <label
                className={`flex items-center radio-button-label ${
                  selectedGoal === "weight-loss"
                    ? "bg-blue-500 text-white animate-bounce"
                    : "bg-blue-200 text-blue-500"
                } px-4 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="goal"
                  value="weight-loss"
                  checked={selectedGoal === "weight-loss"}
                  className="hidden"
                  onClick={handleGoalChange}
                  readOnly
                />
                Weight Loss
              </label>
              <label
                className={`flex items-center radio-button-label ${
                  selectedGoal === "muscle-gain"
                    ? "bg-green-500 text-white animate-bounce"
                    : "bg-green-200 text-green-500"
                } px-4 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="goal"
                  value="muscle-gain"
                  checked={selectedGoal === "muscle-gain"}
                  className="hidden"
                  onClick={handleGoalChange}
                  readOnly
                />
                Muscle Gain
              </label>
              <label
                className={`flex items-center radio-button-label ${
                  selectedGoal === "flexibility"
                    ? "bg-yellow-500 text-white animate-bounce"
                    : "bg-yellow-200 text-yellow-500"
                } px-4 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="goal"
                  value="flexibility"
                  checked={selectedGoal === "flexibility"}
                  className="hidden"
                  onClick={handleGoalChange}
                  readOnly
                />
                Flexibility
              </label>
              <label
                className={`flex items-center  radio-button-label ${
                  selectedGoal === "cardiovascular"
                    ? "bg-red-500 text-white animate-bounce"
                    : "bg-red-200 text-red-500"
                } px-4 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="goal"
                  value="cardiovascular"
                  checked={selectedGoal === "cardiovascular"}
                  className="hidden"
                  onClick={handleGoalChange}
                  readOnly
                />
                Cardiovascular
              </label>
            </div>

            <h3 className="text-lg font-semibold py-4">
              How many times are you willing to work out per week:
            </h3>
            <div className="flex flex-row flex-wrap justify-center space-x-4">
              <label
                className={`flex items-center ${
                  selectedFrequency === 1
                    ? "bg-blue-500 text-white animate-bounce"
                    : "bg-blue-200 text-blue-500"
                } px-7 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={1}
                  checked={workoutFreq === 1}
                  className="hidden"
                  onChange={handleFreqChange}
                />
                0-1 times
              </label>
              <label
                className={`flex items-center ${
                  selectedFrequency === 3
                    ? "bg-blue-500 text-white animate-bounce"
                    : "bg-blue-200 text-blue-500"
                } px-7 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={3}
                  checked={workoutFreq === 3}
                  className="hidden"
                  onChange={handleFreqChange}
                />
                2-3 times
              </label>
              <label
                className={`flex items-center ${
                  selectedFrequency === 5
                    ? "bg-blue-500 text-white animate-bounce"
                    : "bg-blue-200 text-blue-500"
                } px-7 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={5}
                  checked={workoutFreq === 5}
                  className="hidden"
                  onChange={handleFreqChange}
                />
                4-5 times
              </label>

              <label
                className={`flex items-center ${
                  selectedFrequency === 7
                    ? "bg-blue-500 text-white animate-bounce"
                    : "bg-blue-200 text-blue-500"
                } px-7 py-2 rounded cursor-pointer transition-colors mb-2`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={7}
                  checked={workoutFreq === 7}
                  className="hidden"
                  onChange={handleFreqChange}
                />
                6-7 times
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <Link to="/calculator" className="inline-block">
          <button className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
            {/* Alternative right arrow */}
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserGoals
