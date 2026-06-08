import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://elearning-platform-laqf.vercel.app",
  credentials: true
}));

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to DB");

    // Create users table
    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;

    // Create courses table
    const coursesTable = `
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT
      )
    `;

    // Create enrollments table
    const enrollmentsTable = `
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        course_id INT,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(usersTable);
    db.query(coursesTable);
    db.query(enrollmentsTable);

    console.log("Tables created successfully");

    // Insert sample courses only once
    const insertCourses = `
      INSERT INTO courses (title, description)
      SELECT * FROM (
        SELECT 'React Basics', 'Learn React fundamentals'
        UNION ALL
        SELECT 'Node.js API', 'Build backend APIs with Express'
        UNION ALL
        SELECT 'MySQL Database', 'Learn MySQL database management'
      ) AS temp
      WHERE NOT EXISTS (SELECT * FROM courses)
    `;

    db.query(insertCourses);

    console.log("Sample courses inserted");
  }
});

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Register Route
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(query, [email, hashedPassword], (err) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Error registering user"
      });
    }

    res.status(200).json({
      message: "User registered successfully"
    });
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error during login"
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      email: user.email
    });
  });
});

// Get Courses
app.get("/courses", (req, res) => {
  const query = "SELECT * FROM courses";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching courses"
      });
    }

    res.json(results);
  });
});

// Get Enrolled Courses
app.get("/enrolled/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
      courses.id AS course_id,
      courses.title,
      enrollments.enrolled_at
    FROM enrollments
    JOIN courses ON enrollments.course_id = courses.id
    WHERE enrollments.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching enrolled courses"
      });
    }

    res.json(results);
  });
});

// Enroll Route
app.post("/enroll", (req, res) => {
  const { userId, courseId } = req.body;

  const query =
    "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";

  db.query(query, [userId, courseId], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error enrolling course"
      });
    }

    res.status(200).json({
      message: "Enrolled successfully"
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});