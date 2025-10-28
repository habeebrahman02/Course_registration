// import React, { useState } from "react";
// import './styles.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     emailId: "",
//     courseName: ""
//   });

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8081/courses/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)  // already fine
//       });

//       if (response.ok) {
//         alert("Registration successful!");
//         setFormData({ name: "", emailId: "", courseName: "" });
//       } else {
//         const errMsg = await response.text();
//         alert("Failed to register: " + errMsg);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong. See console.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Course Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//         <label>Email</label>
//         <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />

//         <label>Select Course</label>
//         <select name="courseName" value={formData.courseName} onChange={handleChange} required>
//           <option value="">-- Choose a course --</option>
//           <option value="Java Programming">Java Programming</option>
//           <option value="Python Programming">Python Programming</option>
//           <option value="Web Development">Web Development</option>
//         </select>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;



import React, { useState, useEffect } from "react";
import './styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    courseName: ""
  });

  const [courses, setCourses] = useState([]); // ✅ store courses
  const [loading, setLoading] = useState(false);

  // ✅ Fetch course list from backend when component loads
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8081/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/courses/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("✅ Registration successful!");
        setFormData({ name: "", emailId: "", courseName: "" });
      } else {
        const errMsg = await response.text();
        alert("❌ Failed to register: " + errMsg);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <h2>Course Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
          required
        />

        <label>Select Course</label>
        <select
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        >
          <option value="">-- Choose a course --</option>
          {loading ? (
            <option disabled>Loading courses...</option>
          ) : (
            courses.map((course) => (
              <option key={course.courseId} value={course.courseName}>
                {course.courseName} ({course.trainer})
              </option>
            ))
          )}
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

