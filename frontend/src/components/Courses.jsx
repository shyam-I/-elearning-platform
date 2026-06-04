import "./Courses.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import courses from "../Data/CourseData";

function Courses() {
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledIds(enrolledCourses.map(c => c.id));
  }, []);

  return (
    <section className="courses">
      <div className="cards-container">
        {courses.map((course) => {
          const isEnrolled = enrolledIds.includes(course.id);
          return (
            <Link
              to={`/course/${course.id}`}
              className="course-link"
              key={course.id}
            >
              <div className="course-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-img"
                />
                <div className="course-content">
                  <h2 className="course-title">
                    {course.title}
                  </h2>
                  <p className="rating">
                    ⭐ {course.rating}
                  </p>
                  <button className="enroll-btn">
                    {isEnrolled ? "View Course" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Courses;