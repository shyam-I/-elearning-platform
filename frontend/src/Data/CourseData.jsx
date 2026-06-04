
import python from "../assets/pyfords.jpg"
import web from "../assets/webdev.jpg"
import ml from "../assets/machinelearn.png"
import pandas from "../assets/dataanalysis.png"
import cyber from "../assets/cybersec.png"
import devops from "../assets/devop.png"
import java from "../assets/javaprgm.png"
import react from "../assets/react.png"
import uiux from "../assets/uiux.png"
import ai from "../assets/ai.png"
import sql from "../assets/sql.png"
import cpp from "../assets/c++.png"
import appdev from "../assets/appdev.png"
import ios from "../assets/ios.png"
import node from "../assets/node.png"
import mongodb from "../assets/mongodb.png"
import ds from "../assets/ds.png"
import springboot from "../assets/springboot.png"
import ethicalhacking from "../assets/ethicalhacking.png"
import os from "../assets/os.png"
import network from "../assets/cn.png"

const courses = [

  {
    id:0,
    image:python,
    video: "LHBE6Q9XlzI",
    title: "Python for Data Science",
    rating: 4.5,

  description:
    "Learn Python programming for data science and analytics.",

  contents: [
    "Introduction to Python",
    "Variables and Data Types",
    "NumPy Basics",
    "Pandas Library",
    "Data Visualization"
  ]
},

  {
    id:1,
    image:web,
    title: "Web Development with React",
    video:"Q33KBiDriJY",
    rating: 4.5,
    description:
       "Master React.js for building dynamic web applications",
       contents: [
          "React Components",
          "State and Props",
          "React Router",
          "Hooks in React",
          "Building a React Project"
       ]
  },

  {
    id:2,
    image:ml,
    title: "Machine Learning with Tensorflow",
    video: "i_LwzRVP7bg",
    rating: 4.5,
    description:
      "Learn machine learning concepts and implementation using TensorFlow.",
      contents: [
        "Introduction to Machine Learning",
        "Supervised Learning",
        "Unsupervised Learning",
        "Neural Networks",
        "TensorFlow Basics"
      ]
  },

  {
    id:3,
    image: pandas,
    title: "Data Analysis with Pandas",
    video: "r-uOLxNrNk8",
    rating: 4.5,
    description:
    "Learn Data Analysis and manipulation using the powerful Pandas library in Python.",
      contents: [
        "Introduction to Pandas",
        "Series and DataFrames",
        "Data cleaning with Pandas",
        "Filtering and Sorting",
        "Data Visualization with Pandas"
      ]
  },

  

  

  {
    id:6,
    image:cyber,
     title: "Cybersecurity Fundamentals",
    video: "U_P23SqJaDc",
   
    rating: 4.5,
    description:
      "Learn the fundamentals of cybersecurity and protect your systems.",
      contents: [
        "Introduction to Cybersecurity",
        "Threats and Vulnerabilities",
        "Security Policies",
        "Incident Response",
        "Security Best Practices"
      ]
  },

  {
    id:7,
    image:devops,
    title: "Devops with Docker and Kubernetes",
    video: "YFl2mCHdv24",
    rating: 4.7,
    description:
      "Learn DevOps practices with Docker and Kubernetes.",
      contents: [
        "Introduction to DevOps",
        "Docker Fundamentals",
        "Kubernetes Basics",
        "CI/CD Pipelines",
        "Container Orchestration"
      ]
  },

  {
    id:8,
    image:java,
     title: "Java Programming",
    video: "grEKMHGYyns",
   
    rating: 4.5,
    description:
    "Learn Java programming language and its applications in software development.",
    contents: [
        "Introduction to Java",
        "Object Oriented Programming",
        "Java Collections Framework",
        "Exception Handling",
        "Threads"
    ]

  },

  {
    id:9,
     image:react,
     title: "React Development",
    video: "Ke90Tje7VS0",
   
    rating:4.9,
    description:
    "Master React.js for building dynamic web applications",
    contents:[
      "JSX Introduction",
      "Components and Props",
      "State and Lifecycle",
      "Handling Events",
      "Building a React Project"
    ]
  },

  {
    id:10,
    image:uiux,
     title: "UI/UX Design",
    video: "9g5m9qQLeY8",
   
    rating: 4.6,
  
    description:
    "Learn the principles of UI/UX design and create using popular design tools",
    contents:[
      "Introduction to UI/UX Design",
      "Design Principles",
      "Wireframing and Prototyping",
      "Figma Design Basics",
      "Responsive Design"
    ]
  },

  {
    id:11,
    image:ai,
     title: "Artificial Intelligence",
    video: "JMUxmLyrhSk",
   
    rating: 4.5,
    description:
         "Learn the fundametals of Artificial Intelligence and its applications in various fields",
         contents: [
             "Introduction to Artificial Intelligence",
             "History of AI",
              "Machine Learning Basics",
              "Neural Networks",
              "AI Applications"
         ]
  },



  {
    id:13,
     image:sql,
     title: "SQL Database Management",
    video: "HXV3zeQKqGY",
   
    rating: 4.8,
    description:
    "Learn SQL database management and querying for efficient data handling",
    contents:[
      "Introduction to SQL",
      "Database Design",
      "SQL Queries",
      "Joins and Subqueries",
      "Database Optimization"
    ]
  },

  {
    id:14,
    image:cpp,
     title: "C++ Programming",
    video: "vLnPwxZdW4Y",
   
    rating: 4.5,
    description:
    "Learn C++ programming language and its applications in software development",
    contents:[
      "Introduction to c++",
      "Object oriented programming",
      "C++ standard library",
      "Memory Management",
      "C++11 and beyond"
    ]
  },

  {
    id:15,
      image:appdev,
    video: "0-S5a0eXPoc",
    title: "App Development",
    rating: 4.5,
    description:
     "Learn app development for android and ios platforms using popular frameworks and tools",
     contents:[
          "Introduction to App Development",
          "Android Development with Java/Kotlin",
          "ios Development with Swift",
          "Cross-platform Development with Flutter",
          "App Development Best Practices"
     ]
  },

  {
    id:16,
      image:ios,
    video: "0-S5a0eXPoc",
    title: "iOS Development",
    rating: 4.5,
    description:
     "Learn iOS app development using Swift and Xcode",
     contents:[
          "Introduction to iOS Development",
          "Swift Programming Basics",
          "UIKit Fundamentals",
          "iOS App Architecture",
          "App Store Deployment"
     ]
  },

  {
    id:17,
      image:node,
    video: "Oe421EPjeBE",
    title: "Node.js Development",
    rating: 4.5,
    description:
     "Learn Node.js development for building scalable server-side applications",
     contents:[
          "Introduction to Node.js",
          "Express.js Fundamentals",
          "Database Integration",
          "API Development",
          "Deployment Strategies"
     ]
  },

  {
    id:18,
      image:mongodb,
    video: "9g5m9qQLeY8",
    title: "MongoDB Database Management",
    rating:4.3,
   
    description:
     "Learn MongoDB database management and querying for efficient data handling",
     contents:[
          "Introduction to MongoDB",
          "Database Design",
          "MongoDB Queries",
          "Aggregation Framework",
          "Database Optimization"
     ]
  },

  {
    id:19,
    image:ds,
    video: "9g5m9qQLeY8",
        title: "Data Science",
    rating:4.2,
    description:
     "Learn the fundamentals of data science and its applications in various fields",
     contents:[
          "Introduction to Data Science",
          "Python for Data Science",
          "Data Analysis with Pandas",
          "Machine Learning Basics",
          "Data Visualization"
     ]
  },

  {
    id:20,
    image:springboot,
    video: "9g5m9qQLeY8",
    title: "Spring Boot Development",
    rating: 4.5,
    description:
     "Learn Spring Boot development for building scalable web applications",
     contents:[
          "Introduction to Spring Boot",
          "Spring MVC Fundamentals",
          "Database Integration",
          "RESTful API Development",
          "Deployment Strategies"
     ]
  },

  
  {
    id:22,
    image:ethicalhacking,
    video: "9g5m9qQLeY8",
    title: "Ethical Hacking",
    rating:4.8,
    description:
     "Learn ethical hacking techniques for identifying and mitigating security vulnerabilities",
     contents:[
          "Introduction to Ethical Hacking",
          "Network Scanning and Enumeration",
          "Vulnerability Assessment",
          "Exploitation Techniques",
          "Reporting and Remediation"
     ]
  },

  {
    id:23,
    image:os,
    video: "9g5m9qQLeY8",
    title: "Operating Systems",
    rating: 4.5,
    description:
     "Learn the fundamentals of operating systems and their design principles",
     contents:[
          "Introduction to Operating Systems",
          "Process Management",
          "Memory Management",
          "File Systems",
          "Security in Operating Systems"
     ]
  },

  {
    id:24,
    image:network,
    video: "9g5m9qQLeY8",
    title: "Computer Networks",
    rating: 4.5,
    description:
     "Learn the fundamentals of computer networks and their protocols",
     contents:[
          "Introduction to Computer Networks",
          "Network Topologies",
          "Protocols and Standards",
          "Network Security",
          "Wireless Networks"
     ]
  }

]
export default courses