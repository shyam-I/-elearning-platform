import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

import courses from "../Data/CourseData";
import roadmapData from "../Data/roadmapData";
import "./Roadmap.css";

// Safe import resolver wrapper for YouTube component in Vite/React 19 ESM environments
const YouTubeComponent = typeof YouTube === "function" ? YouTube : (YouTube.default || YouTube);

function Roadmap() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === Number(id));

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [watchedSteps, setWatchedSteps] = useState([]);
  const [videoStarted, setVideoStarted] = useState(false);
  const [learningGoal, setLearningGoal] = useState("");
  const [videoError, setVideoError] = useState(false);

  if (!course) {
    return (
      <div className="roadmap-page">
        <div className="roadmap-container">
          <h2>Loading course...</h2>
        </div>
      </div>
    );
  }

  const allSteps = Array.isArray(roadmapData?.[course.id])
    ? roadmapData[course.id]
    : [];

  // Filter: If goal is "1 Hour Quick Learning", slice to only show the first 2 essential topics
  const roadmap = learningGoal === "1 Hour Quick Learning"
    ? allSteps.slice(0, 2)
    : allSteps;

  useEffect(() => {
    const enrolledCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const saved = enrolledCourses.find((c) => c.id == id);

    if (saved) {
      setLearningGoal(saved.learningGoal || "");
      setWatchedSteps(saved.watchedSteps || []);
      setCurrentStepIndex(saved.currentStepIndex || 0);
    }
  }, [id]);

  // When step changes, reset error state
  useEffect(() => {
    setVideoError(false);
  }, [currentStepIndex]);

  const progress =
    roadmap.length > 0
      ? Math.round((watchedSteps.filter(stepId => roadmap.some(s => s.id === stepId)).length / roadmap.length) * 100)
      : 0;

  const updateProgress = (newWatched, index) => {
    const enrolledCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const updated = enrolledCourses.map((c) => {
      if (c.id == id) {
        return {
          ...c,
          watchedSteps: newWatched,
          currentStepIndex: index,
          progress:
            roadmap.length > 0
              ? Math.round((newWatched.filter(stepId => roadmap.some(s => s.id === stepId)).length / roadmap.length) * 100)
              : 0,
        };
      }
      return c;
    });

    localStorage.setItem("enrolledCourses", JSON.stringify(updated));
  };

  const currentStep = roadmap?.[currentStepIndex] || null;

  const currentVideoId =
    currentStep?.video ||
    currentStep?.videoUrl ||
    course?.video ||
    null;

  const onPlayerStateChange = (event) => {
    // 0 is PlayerState.ENDED
    if (event.data === 0 && currentStep) {
      if (!watchedSteps.includes(currentStep.id)) {
        const newWatched = [...watchedSteps, currentStep.id];
        setWatchedSteps(newWatched);
        updateProgress(newWatched, currentStepIndex);
      }
    }
  };

  const onPlayerError = (event) => {
    console.error("YouTube Player Error Callback:", event);
    setVideoError(true);
  };

  const handleStepClick = (index) => {
    if (!roadmap[index]) return;

    setCurrentStepIndex(index);
    updateProgress(watchedSteps, index);
  };

  // Dynamically assign simple durations based on goal
  const getDuration = (index) => {
    if (learningGoal === "1 Hour Quick Learning") {
      return "30 mins";
    }
    const durations = ["1.5 hours", "2.0 hours", "1.0 hour", "2.5 hours", "1.5 hours"];
    return durations[index % durations.length];
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const completedCount = watchedSteps.filter(stepId => roadmap.some(s => s.id === stepId)).length;
  const isCourseCompleted = roadmap.length > 0 && completedCount === roadmap.length;

  const handlePrintCertificate = () => {
    const email = localStorage.getItem("email") || "student@elearn.com";
    const studentName = email.split("@")[0].toUpperCase();
    const completionDate = new Date().toLocaleDateString();
    const certId = `CERT-${course.id}-${Math.floor(100000 + Math.random() * 900000)}`;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${course.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #0f172a;
              color: #f1f5f9;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .certificate-box {
              border: 10px double #475569;
              padding: 50px;
              width: 700px;
              text-align: center;
              background-color: #1e293b;
              box-shadow: 0 4px 15px rgba(0,0,0,0.5);
              border-radius: 8px;
            }
            h1 {
              color: #6c63ff;
              font-size: 32px;
              margin-bottom: 10px;
              letter-spacing: 2px;
            }
            p {
              font-size: 16px;
              color: #94a3b8;
              margin: 12px 0;
            }
            .student-name {
              font-size: 28px;
              font-weight: bold;
              color: #38bdf8;
              margin: 25px 0;
              text-decoration: underline;
            }
            .course-title {
              font-size: 24px;
              font-weight: bold;
              color: #ffffff;
              margin: 15px 0;
            }
            .footer-info {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
              font-size: 13px;
              color: #64748b;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="certificate-box">
            <p>CERTIFICATE OF COMPLETION</p>
            <p>This is to certify that</p>
            <div class="student-name">${studentName}</div>
            <p>has successfully completed the learning roadmap for</p>
            <div class="course-title">${course.title}</div>
            <p>Focus Goal: ${learningGoal || "General Improvement"}</p>
            <div class="footer-info">
              <div>DATE: ${completionDate}</div>
              <div>CERTIFICATE ID: ${certId}</div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-container">

        {/* HEADER */}
        <div className="roadmap-header">
          <div className="header-top">
            <button
              className="back-btn"
              onClick={() => navigate(`/course/${id}`)}
            >
              ← Back to Course
            </button>
            <span className="course-badge">Learning Road</span>
          </div>

          <h2>{course.title}</h2>

          {learningGoal && (
            <div className="goal-info">
              Selected Goal Focus: <strong>{learningGoal}</strong>
            </div>
          )}
        </div>

        <div className="roadmap-main">

          {/* Left Column - Video Display Area */}
          <div className="roadmap-content-area">
            <div className="video-section-wrapper">
              <div className="video-container-box">
                {videoError ? (
                  <div className="video-error-fallback">
                    <h3>Video Playback Error</h3>
                    <p>This YouTube video cannot be embedded or played directly here due to restrictions.</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${currentVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fallback-link-btn"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                ) : !videoStarted ? (
                  <div className="start-box">
                    <h2>Start Topic Video</h2>
                    <p>Click below to open the lesson and launch the video player.</p>
                    <button
                      className="start-btn"
                      onClick={() => setVideoStarted(true)}
                    >
                      Start Lesson
                    </button>
                  </div>
                ) : (
                  currentVideoId && (
                    <YouTubeComponent
                      videoId={currentVideoId}
                      opts={opts}
                      onStateChange={onPlayerStateChange}
                      onError={onPlayerError}
                    />
                  )
                )}
              </div>
            </div>

            {currentStep && (
              <div className="active-step-details">
                <div className="step-meta-info">
                  <span className="meta-tag">Topic {currentStepIndex + 1} of {roadmap.length}</span>
                  <span className="meta-tag">Estimated Duration: {getDuration(currentStepIndex)}</span>
                </div>
                <h3>{currentStep.title}</h3>
                <p>{currentStep.description}</p>
                {currentStep.outcome && (
                  <div className="step-outcome">
                    <h5>Expected Outcome</h5>
                    <p>{currentStep.outcome}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Timeline Sidebar */}
          <div className="roadmap-sidebar">
            
            {/* Progress Card */}
            <div className="progress-box">
              <div className="progress-header-text">
                <h3>Overall Progress</h3>
                <span className="progress-pct">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Certificate Generation block */}
            {isCourseCompleted && (
              <div className="completed-text-box">
                <h3>🎓 Course Completed!</h3>
                <p>You have finished all topics in this roadmap. Unlock your certificate below.</p>
                <button
                  className="cert-download-btn"
                  onClick={handlePrintCertificate}
                >
                  Download Certificate (PDF)
                </button>
              </div>
            )}

            {/* Vertical timeline of steps */}
            <div className="steps-container">
              {roadmap.map((step, index) => {
                const isCompleted = watchedSteps.includes(step.id);
                const isActive = index === currentStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`step-card ${isCompleted ? "step-completed" : ""} ${
                      isActive ? "active-card" : ""
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className="card-num-circle">
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <div className="card-title-sec">
                      <h4>{step.title}</h4>
                    </div>
                    <div className="status-indicator-dot"></div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Roadmap;
