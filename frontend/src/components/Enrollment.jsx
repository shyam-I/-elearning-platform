import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../Data/CourseData";
import "./Enrollment.css";

function Enrollment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === Number(id));
  const [learningGoal, setLearningGoal] = useState("");

  const options = [
    "Job",
    "Internship",
    "College Exam",
    "Skill Improvement",
    "1 Hour Quick Learning",
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (loggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  if (!course) {
    return <div>Loading course...</div>;
  }

  const handleEnroll = () => {
    if (!learningGoal) {
      alert("Please select a learning goal");
      return;
    }

    let enrolled =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const index = enrolled.findIndex(
      (c) => c.id === course.id
    );

    const newCourseData = {
      ...course,
      learningGoal,
      progress: 0,
      watchedSteps: [],
      currentStepIndex: 0,
      enrolledAt: new Date().toISOString(),
    };

    if (index === -1) {
      enrolled.push(newCourseData);
    } else {
      enrolled[index] = newCourseData;
    }

    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify(enrolled)
    );

    navigate(`/roadmap/${course.id}`);
  };

  return (
    <div className="enroll-page">
      <div className="enroll-box">
        <h2>Enroll in {course.title}</h2>

        <p className="enroll-subtitle">
          Choose your learning goal before starting
          this course
        </p>

        <div className="goal-container">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setLearningGoal(opt)}
              className={`goal-btn ${
                learningGoal === opt ? "active" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          className="enroll-confirm"
          onClick={handleEnroll}
        >
          Confirm Enrollment
        </button>
      </div>
    </div>
  );
}

export default Enrollment;
