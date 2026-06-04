import { useEffect, useState } from "react";
import "./Certificate.css";

function Certificate() {
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const completed = enrolled.filter(c => c.progress === 100);
    setCompletedCourses(completed);
  }, []);

  return (
    <div className="certificate-container">
      <h1>My Certificates</h1>
      {completedCourses.length > 0 ? (
        <div className="certificate-grid">
          {completedCourses.map((course, index) => (
            <div key={index} className="certificate-card">
              <div className="cert-info">
                <h3>{course.title}</h3>
                <p>Completed on: {new Date(course.enrolledAt).toLocaleDateString()}</p>
                <div className="cert-goal">Goal: {course.learningGoal}</div>
              </div>
              <button 
                className="download-btn" 
                onClick={() => {
                  const email = localStorage.getItem("email") || "student@elearn.com";
                  const studentName = email.split("@")[0].toUpperCase();
                  const completionDate = course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : new Date().toLocaleDateString();
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
                          <p>Focus Goal: ${course.learningGoal || "General Improvement"}</p>
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
                }}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-cert-msg">
          <p>No certificates earned yet.</p>
          <p className="sub-msg">Complete a course roadmap to unlock your certificate!</p>
        </div>
      )}
    </div>
  );
}

export default Certificate;