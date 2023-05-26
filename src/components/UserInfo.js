import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserInfo = ({
  handleUserDataChange,
  userData,
  userInfo,
  setUserInfo,
  handleTdeeCalculation,
  showTDEE,
  setShowTDEE,
}) => {
  const { age, gender, height, weight, activityLevel } = userInfo;
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
  });

  const calculateTDEE = () => {
    if (
      age === "" ||
      gender === "" ||
      activityLevel === "" ||
      height === "" ||
      weight === ""
    ) {
      return 0;
    }

    let activityMultiplier;

    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "lightly-active":
        activityMultiplier = 1.375;
        break;
      case "moderately-active":
        activityMultiplier = 1.55;
        break;
      case "very-active":
        activityMultiplier = 1.725;
        break;
      case "super-active":
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
        break;
    }

    const tdee =
      (10 * weight +
        6.25 * height -
        5 * age +
        (gender === "female" ? -161 : 5)) *
      activityMultiplier;

    return Math.round(tdee);
  };

  // const handleShowTDEE = () => {
  //   setShowTDEE(true) // Set showTDEE state to true when the button is clicked
  //   handleTdeeCalculation(tdee)
  //   console.log(userData)
  // }

  const tdee = calculateTDEE(); // Calculate TDEE
  handleTdeeCalculation(tdee);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    handleUserDataChange({ ...userInfo, [name]: value });

    if (
      name === "age" ||
      name === "gender" ||
      name === "height" ||
      name === "weight" ||
      name === "activityLevel"
    ) {
      const isValid = validateFields();
      setShowTDEE(isValid); // Set showTDEE state based on the validation result
      if (isValid) {
        const calculatedTDEE = calculateTDEE();
        handleTdeeCalculation(calculatedTDEE);
      }
    }
  };

  const handleShowTDEE = () => {
    if (validateFields()) {
      const calculatedTDEE = calculateTDEE();
      setShowTDEE(true); // Set showTDEE state to true when all fields are valid
      handleTdeeCalculation(calculatedTDEE);
    } else {
      setShowTDEE(false); // Set showTDEE state to false if validation fails
    }
  };

  const validateFields = () => {
    let isValid = true;
    const errors = {};

    if (age.trim() === "" || isNaN(age)) {
      errors.age = "Please enter a valid age";
      isValid = false;
    }

    if (height.trim() === "" || isNaN(height)) {
      errors.height = "Please enter a valid height";
      isValid = false;
    }

    if (weight.trim() === "" || isNaN(weight)) {
      errors.weight = "Please enter a valid weight";
      isValid = false;
    }

    if (activityLevel === "") {
      errors.activityLevel = "Please select your activity level";
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  };


  return (
    <div>
      <div className="info-page flex justify-center items-center h-calc[(100vh-1rem)]">
        <div className="bg-gray-200 p-6 rounded-lg h-calc[(100vh-4rem)] w-11/12 md:w-4/12 mt-20">
          {/* Add 'mt-8' to create top margin */}
          <h3 className="text-lg font-semibold mb-4">
            Input your info below to calculate how many calories you burn a day:
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={handleUserInfoChange}
                className="border border-gray-400 rounded-md p-2"
              />
              {errorMessages.age && (
                <p className="text-red-500">{errorMessages.age}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={handleUserInfoChange}
                className="border border-gray-400 bg-white rounded-md p-2"
              >
                <option defaultValue="" disabled selected required>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errorMessages.gender && (
                <p className="text-red-500">{errorMessages.gender}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={height}
                onChange={handleUserInfoChange}
                className="border border-gray-400 rounded-md p-2"
              />
              {errorMessages.height && (
                <p className="text-red-500">{errorMessages.height}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={weight}
                onChange={handleUserInfoChange}
                className="border border-gray-400 rounded-md p-2"
              />
              {errorMessages.weight && (
                <p className="text-red-500">{errorMessages.weight}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="activity-level">Activity Level</label>
              <select
                name="activityLevel"
                value={activityLevel}
                onChange={handleUserInfoChange}
                className="border border-gray-400 bg-white rounded-md p-2"
                defaultValue={"sedentary"}
              >
                <option defaultValue="" selected required>
                  Choose an activity level
                </option>
                <option value="sedentary">
                  Sedentary (little or no exercise)
                </option>
                <option value="lightly-active">
                  Lightly Active (light exercise or sports 1-3 days a week)
                </option>
                <option value="moderately-active">
                  Moderately Active (moderate exercise or sports 3-5 days a
                  week)
                </option>
                <option value="very-active">
                  Very Active (hard exercise or sports 6-7 days a week)
                </option>
                <option value="super-active">
                  Super Active (very hard exercise or sports, physical job or
                  training twice a day)
                </option>
              </select>
              {errorMessages.activityLevel && (
                <p className="text-red-500">{errorMessages.activityLevel}</p>
              )}
            </div>
            {/* <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={handleShowTDEE}
            >
              Calculate your TDEE
            </button>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            {savedMessage && <p className='text-green-500'>{savedMessage}</p>} */}
          </div>
        </div>
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
          <Link to="/goals" className="inline-block">
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
      <div className="flex justify-center items-center">
        <div className="p-6 rounded-lg mx-auto max-w-screen-lg">
          <div className="flex justify-center"></div>
          {showTDEE && tdee != 0 ? (
            <div className="mt-6">
              <h2 className="text-gray-500">
                You are {userData.age} y/o {userData.gender} who is{" "}
                {userData.height} cm and {userData.weight} kg with{" "}
                {userData.activityLevel} lifestyle.
              </h2>
              <h2 className="text-gray-500">
                Based on your data, your best estimate for maintenance calories
                is {tdee} per day.
                <h2></h2>
              </h2>
            </div>
          ) : (
            showTDEE
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
