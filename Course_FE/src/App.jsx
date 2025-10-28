// // src/App.jsimport React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./component/Home";
// import Register from "./component/Register";
// import AvailableCourses from "./component/AvailableCourses";
// import EnrolledStudents from "./component/EnrolledStudents";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/courses" element={<AvailableCourses />} />
//         <Route path="/students" element={<EnrolledStudents />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./component/Home";
// import Register from "./component/Register";
// import AvailableCourses from "./component/AvailableCourses";
// import EnrolledStudents from "./component/EnrolledStudents";

// function App() {
//   return (
//     <Router>
//       <div className="nav-bar">
//         <nav>
//           <a href="/">Home</a>
//           <a href="/register">Register</a>
//           <a href="/courses">Courses</a>
//           <a href="/students">Students</a>
//         </nav>
//       </div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/courses" element={<AvailableCourses />} />
//         <Route path="/students" element={<EnrolledStudents />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login";
import AvailableCourses from "./component/AvailableCourses";
import EnrolledStudents from "./component/EnrolledStudents";
import Navigation from "./component/Navigation";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Navigation onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/courses" replace />} />
            <Route path="/courses" element={<AvailableCourses />} />
            <Route path="/students" element={<EnrolledStudents />} />
            <Route path="*" element={<Navigate to="/courses" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;