import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import courses from "../Data/CourseData";

function Home() {
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledIds(enrolledCourses.map(c => c.id));
  }, []);

  const homeCourses = courses.filter(
    (course) => course.id <= 3
  );

  return (
    <section className="home">
      <div className="cards-container">
        {homeCourses.map((course) => {
          const isEnrolled = enrolledIds.includes(course.id);
          return (
            <div
              className="course-card"
              key={course.id}
            >
              <img
                src={course.image}
                alt={course.title}
              />
              <div className="course-content">
                <h2>{course.title}</h2>
                <p className="rating">
                  ⭐ {course.rating}
                </p>
                <p className="price">
                  {course.price}
                </p>
                <Link to={`/course/${course.id}`}>
                  <button className="explore-btn">
                    {isEnrolled ? "View Course" : "Explore Course"}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Home;