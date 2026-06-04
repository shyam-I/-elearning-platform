import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  const [courses, setCourses] = useState([]);
  const [lastWatched, setLastWatched] = useState(null);

  useEffect(() => {

  const enrolledCourses =
    JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  setCourses(enrolledCourses);

  const last = JSON.parse(localStorage.getItem("lastWatched"));
  if (last) {
    setLastWatched(last);
  }

}, []);

  return (
 <div className="dashboard-container">

  <h2>Welcome to Dashboard</h2>

  {lastWatched && (
    <div className="continue-learning">
      <h3>Continue Learning</h3>
      <div className="continue-card">
        <div className="continue-card-content">
          <h4>{lastWatched.courseTitle}</h4>
          <p>Resume where you left off</p>
        </div>
        <Link to={`/course/${lastWatched.courseId}`} className="resume-btn">
          Resume Lesson
        </Link>
      </div>
    </div>
  )}

  <h3>My Enrolled Courses</h3>

  <div className="course-grid">

   {
  courses.length > 0 ? (
    courses.map((course, index) => (
      <div className="course-box" key={index}>

  <div className="course-card-header">
    <h3>{course.title}</h3>
    {course.learningGoal && (
      <span className="goal-badge">{course.learningGoal}</span>
    )}
  </div>

  <p className="course-id">
    Course ID: {course.id}
  </p>

  <div className="progress-section">

    <span>Progress</span>
<span>{course.progress || 0}%</span>

  </div>

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{ width: `${course.progress || 0}%`
}}
    ></div>

  </div>

  <Link to={`/course/${course.id}`} className="view-course-btn">
    {course.progress === 100 ? "Review Course" : "Continue"}
  </Link>

</div>
    ))
  ) : (
    <p className="no-course">
  No courses enrolled yet
</p>
  )
}

  </div>

</div>
  );
}

export default Dashboard;