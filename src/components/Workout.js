import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as StrengthIcon } from "../svgs/strength.svg";
import { ReactComponent as CardioIcon } from "../svgs/cardio.svg";
import { ReactComponent as StretchingIcon } from "../svgs/stretching.svg";

import { Link } from "react-router-dom";

const Workout = ({ userData }) => {
  const [userWorkout, setUserWorkout] = useState([]);
  const [isOpen, setIsOpen] = useState({});

  const workoutType = userData.userGoalData;

  const handleWorkoutType = (workoutType) => {
    switch (workoutType) {
      case "weight-loss":
        getApiRequestWeightLoss();
        break;
      case "muscle-gain":
        getApiRequest("strength");
        break;
      case "flexibility":
        getApiRequest("stretching");
        break;
      case "cardiovascular":
        getApiRequest("cardio");
        break;
      default:
        console.error("Error, no choice made");
        break;
    }
  };

  const getApiRequest = async (workoutType) => {
    try {
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/exercises?type=" + workoutType,
        {
          headers: {
            "X-Api-Key": "rEii+32dIABnTr1CeWS3Zw==xUpGZQVV9GzWIEj3",
          },
        }
      );
      setUserWorkout(response.data);
      console.log(userWorkout);
    } catch (error) {
      console.error(error);
    }
  };

  const getApiRequestWeightLoss = async (workoutType) => {
    try {
      const responseStrength = await axios.get(
        "https://api.api-ninjas.com/v1/exercises?type=strength",
        {
          headers: {
            "X-Api-Key": "rEii+32dIABnTr1CeWS3Zw==xUpGZQVV9GzWIEj3",
          },
        }
      );
      const strengthData = responseStrength.data;
      console.log(strengthData);

      const responseCardio = await axios.get(
        "https://api.api-ninjas.com/v1/exercises?type=cardio",
        {
          headers: {
            "X-Api-Key": "rEii+32dIABnTr1CeWS3Zw==xUpGZQVV9GzWIEj3",
          },
        }
      );

      const cardioData = responseCardio.data;
      console.log(cardioData);

      const newStrengthArray = responseStrength.data.slice(0, 7);
      const newCardioArray = responseCardio.data.slice(0, 3);

      const returnArray = [...newStrengthArray, ...newCardioArray];

      setUserWorkout(returnArray);
    } catch (error) {
      console.error(error);
    }
  };

  const showInstructions = (e, key) => {
    setIsOpen((prevOpen) => ({
      ...prevOpen,
      [key]: !prevOpen[key],
    }));
  };

  useEffect(() => {
    handleWorkoutType(workoutType);
  }, []);

  return (
    <div>
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        <Link to="/calculator" className="inline-block">
          <button className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
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
      {userWorkout.length === 0 ? (
        <h1 className="flex mt-8 justify-center items-center h-[calc(100vh-4rem)]">
          There are no workouts yet, please pick a goal first
        </h1>
      ) : (
        <section className="workoutSection flex mt-8 flex-wrap justify-center items-center h-[calc(100vh-4rem)]">
          <div className="workoutCards flex  flex-col flex-wrap justify-center items-center gap-6 p-5 md:flex-row">
            {userWorkout.map((workout, key) => {
              let cardColor = "";
              let workoutIcon = null;

              switch (workout.type) {
                case "stretching":
                  cardColor = "bg-yellow-300";
                  workoutIcon = (
                    <StretchingIcon
                      style={{ fill: cardColor, width: "8rem", height: "8rem" }}
                    />
                  );
                  break;
                case "cardio":
                  cardColor = "bg-red-300";
                  workoutIcon = (
                    <CardioIcon
                      style={{ fill: cardColor, width: "8rem", height: "8rem" }}
                    />
                  );
                  break;
                case "strength":
                  cardColor = "bg-green-300";
                  workoutIcon = (
                    <StrengthIcon
                      style={{ fill: cardColor, width: "8rem", height: "8rem" }}
                    />
                  );
                  break;
                case "weight-loss":
                  cardColor = "bg-blue-200";
                  break;
                default:
                  cardColor = "bg-gray-300";
                  break;
              }
              return (
                <div
                  className={`card flex flex-col justify-center items-center pb-6 px-7 rounded-md h-full pt-6 w-96 max-w-full shadow-lg ${cardColor} hover:ring-2`}
                  key={key}
                  onClick={(e) => showInstructions(e, key)}
                >
                  {workoutIcon}
                  <h1 className="pt-4">Workout Name: {workout.name}</h1>
                  <h1>Difficulty: {workout.difficulty}</h1>
                  <h1>Muscle Group: {workout.muscle}</h1>
                  {isOpen[key] ? (
                    <h1 className="pt-8">{workout.instructions}</h1>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Workout;
