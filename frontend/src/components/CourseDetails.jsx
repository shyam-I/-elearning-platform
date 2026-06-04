import "./CourseDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import courses from "../Data/CourseData";
import roadmapData from "../Data/roadmapData";
import YouTube from "react-youtube";


function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const course = courses.find((item) => item.id == Number(id));

  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const savedCourse = enrolledCourses.find(c => c.id == id);
    if (savedCourse && savedCourse.learningGoal) {
      setIsEnrolled(true);
    }
  }, [id]);

  if (!course) return <div>Course not found</div>;

  const handleEnroll = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      navigate("/login");
      return;
    }
    navigate(`/enroll/${id}`);
  };

  const handleViewRoadmap = () => {
    navigate(`/roadmap/${id}`);
  };

  return (
    <div className="course-details">
      <div className="course-left">
        <div className="enroll-placeholder" style={{ background: '#f4f4f9', height: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
          {isEnrolled ? (
            <button 
              className="view-course-btn" 
              onClick={handleViewRoadmap} 
              style={{ padding: '15px 30px', fontSize: '18px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              View My Roadmap
            </button>
          ) : (
            <button 
              className="enroll-btn" 
              onClick={handleEnroll} 
              style={{ padding: '15px 30px', fontSize: '18px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Enroll Now to Start
            </button>
          )}
          <p style={{marginTop: '15px', color: '#666', fontWeight: 500}}>
            {isEnrolled ? "You are enrolled! Click to continue your journey." : "Unlock your personalized roadmap and start learning today!"}
          </p>
        </div>
      </div>

      <div className="course-right">
        <h1>{course.title}</h1>
        <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
            <span style={{ background: '#ffe8a3', padding: '4px 10px', borderRadius: '5px', fontSize: '14px', fontWeight: 600 }}>★ {course.rating}</span>
        </div>
        <p>{course.description}</p>

        <div className="curriculum-preview">
          <h3>What you'll learn</h3>
          <ul style={{ paddingLeft: '20px', color: '#4b5563' }}>
            {course.contents.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;