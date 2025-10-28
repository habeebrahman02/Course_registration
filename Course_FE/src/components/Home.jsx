// // src/components/Home.js
// import React from "react";
// import { Link } from "react-router-dom";
// import './styles.css';

// const Home = () => (
//   <div className="home-container">
//     <h1>Course Registration</h1>
//     <Link to="/register"><button>Register a Course</button></Link>
//     <Link to="/courses"><button>Available Courses</button></Link>
//     <Link to="/students"><button>Enrolled Students</button></Link>
//   </div>
// );

// export default Home;




import React from "react";
import { Link } from "react-router-dom";
import './styles.css';

const Home = () => (
  <div className="home-container">
    <h1>Course Registration Portal</h1>
    <Link to="/register"><button>Register a Course</button></Link>
    <Link to="/courses"><button>Available Courses</button></Link>
    <Link to="/students"><button>Enrolled Students</button></Link>
  </div>
);

export default Home;
