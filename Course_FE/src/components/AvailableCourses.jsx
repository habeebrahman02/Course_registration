// // src/components/AvailableCourses.js
// import React, { useEffect, useState } from "react";
// import './styles.css';

// const AvailableCourses = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8081/courses")
//       .then(res => res.json())
//       .then(data => setCourses(data))
//       .catch(() => alert("Error loading courses"));
//   }, []);

//   return (
//     <div className="table-wrapper">
//       <h1>Available Courses</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Course ID</th>
//             <th>Course Name</th>
//             <th>Trainer</th>
//             <th>Duration (weeks)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.length === 0 ? (
//             <tr><td colSpan="4">No courses available.</td></tr>
//           ) : (
//             courses.map(course => (
//               <tr key={course.courseId}>
//                 <td>{course.courseId}</td>
//                 <td>{course.courseName}</td>
//                 <td>{course.trainer}</td>
//                 <td>{course.durationInWeeks}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AvailableCourses;




// import React, { useEffect, useState } from "react";
// import './styles.css';

// const AvailableCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const loadCourses = () => {
//     fetch("http://localhost:8081/courses")
//       .then(res => res.json())
//       .then(data => setCourses(data))
//       .catch(() => alert("Error loading courses"));
//   };

//   const totalPages = Math.ceil(courses.length / itemsPerPage);
//   const paginatedCourses = courses.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;

//     try {
//       const response = await fetch(`http://localhost:8081/courses/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         alert("Course deleted!");
//         loadCourses();
//       } else {
//         alert("Failed to delete course");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleEdit = (course) => {
//     setEditingCourse(course);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:8081/courses/${editingCourse.courseId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editingCourse)
//       });

//       if (response.ok) {
//         alert("Course updated successfully!");
//         setEditingCourse(null);
//         loadCourses();
//       } else {
//         alert("Failed to update course");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//     }
//   };

//   return (
//     <div className="table-wrapper">
//       <h1>Available Courses</h1>

//       <table>
//         <thead>
//           <tr>
//             <th>Course ID</th>
//             <th>Course Name</th>
//             <th>Trainer</th>
//             <th>Duration (weeks)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedCourses.length === 0 ? (
//             <tr><td colSpan="5">No courses available.</td></tr>
//           ) : (
//             paginatedCourses.map(course => (
//               <tr key={course.courseId}>
//                 <td>{course.courseId}</td>
//                 <td>{course.courseName}</td>
//                 <td>{course.trainer}</td>
//                 <td>{course.durationInWeeks}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => handleEdit(course)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(course.courseId)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
//       </div>

//       {/* Edit Modal */}
//       {editingCourse && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Edit Course</h3>
//             <form onSubmit={handleUpdate}>
//               <label>Course Name</label>
//               <input type="text" value={editingCourse.courseName}
//                 onChange={(e) => setEditingCourse({ ...editingCourse, courseName: e.target.value })} />

//               <label>Trainer</label>
//               <input type="text" value={editingCourse.trainer}
//                 onChange={(e) => setEditingCourse({ ...editingCourse, trainer: e.target.value })} />

//               <label>Duration (weeks)</label>
//               <input type="number" value={editingCourse.durationInWeeks}
//                 onChange={(e) => setEditingCourse({ ...editingCourse, durationInWeeks: e.target.value })} />

//               <div className="modal-actions">
//                 <button type="submit">Update</button>
//                 <button type="button" className="cancel-btn" onClick={() => setEditingCourse(null)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailableCourses;

// import React, { useEffect, useState } from "react";
// import "./styles.css";

// const AvailableCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingCourse, setEditingCourse] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [newCourse, setNewCourse] = useState({
//     courseName: "",
//     trainer: "",
//     durationInWeeks: "",
//   });

//   const itemsPerPage = 5;

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   // ✅ Load courses
//   const loadCourses = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/courses");
//       if (res.ok) {
//         const data = await res.json();
//         setCourses(data);
//       } else {
//         showMessage("error", "Failed to load courses");
//       }
//     } catch (err) {
//       showMessage("error", "Error loading courses: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Toast message
//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   // ✅ Delete course
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;
//     try {
//       const res = await fetch(`http://localhost:8081/api/courses/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         showMessage("success", "Course deleted successfully!");
//         loadCourses();
//       } else {
//         const text = await res.text();
//         showMessage("error", "Failed to delete course: " + text);
//       }
//     } catch (err) {
//       showMessage("error", "Error deleting course: " + err.message);
//     }
//   };

//   // ✅ Add new course
//   const handleAddCourse = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8081/api/courses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newCourse),
//       });

//       if (res.ok) {
//         const savedCourse = await res.json();
//         showMessage("success", `Course "${savedCourse.courseName}" added!`);
//         setShowAddModal(false);
//         setNewCourse({ courseName: "", trainer: "", durationInWeeks: "" });
//         loadCourses();
//       } else {
//         const text = await res.text();
//         showMessage("error", "Failed to add course: " + text);
//       }
//     } catch (err) {
//       showMessage("error", "Error adding course: " + err.message);
//     }
//   };

//   // ✅ Update existing course
//   const handleUpdateCourse = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/courses/${editingCourse.courseId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editingCourse),
//         }
//       );

//       if (res.ok) {
//         showMessage("success", "Course updated successfully!");
//         setShowEditModal(false);
//         setEditingCourse(null);
//         loadCourses();
//       } else {
//         const text = await res.text();
//         showMessage("error", "Failed to update course: " + text);
//       }
//     } catch (err) {
//       showMessage("error", "Error updating course: " + err.message);
//     }
//   };

//   const totalPages = Math.ceil(courses.length / itemsPerPage);
//   const paginatedCourses = courses.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="table-wrapper">
//       <h1>Available Courses</h1>

//       {message.text && (
//         <div
//           className={`alert ${
//             message.type === "success" ? "alert-success" : "alert-error"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <div className="header-actions">
//         <button className="add-btn" onClick={() => setShowAddModal(true)}>
//           ➕ Add New Course
//         </button>
//         <button className="refresh-btn" onClick={loadCourses}>
//           🔄 Refresh
//         </button>
//       </div>

//       {loading ? (
//         <div className="loading">Loading courses...</div>
//       ) : (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th>Course ID</th>
//                 <th>Course Name</th>
//                 <th>Trainer</th>
//                 <th>Duration (weeks)</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedCourses.length === 0 ? (
//                 <tr>
//                   <td colSpan="5">No courses found.</td>
//                 </tr>
//               ) : (
//                 paginatedCourses.map((c) => (
//                   <tr key={c.courseId}>
//                     <td>{c.courseId}</td>
//                     <td>{c.courseName}</td>
//                     <td>{c.trainer}</td>
//                     <td>{c.durationInWeeks}</td>
//                     <td>
//                       <button
//                         className="edit-btn"
//                         onClick={() => {
//                           setEditingCourse({ ...c });
//                           setShowEditModal(true);
//                         }}
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         className="delete-btn"
//                         onClick={() => handleDelete(c.courseId)}
//                       >
//                         🗑️ Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="pagination">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               ← Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next →
//             </button>
//           </div>
//         </>
//       )}

//       {/* 🟢 Add Course Modal */}
//       {showAddModal && (
//         <div className="modal-overlay">
//           <div className="modal-content animate-modal">
//             <h2 className="modal-title">➕ Add New Course</h2>

//             <form onSubmit={handleAddCourse} className="form-grid">
//               <div className="form-group">
//                 <label>📘 Course Name</label>
//                 <input
//                   type="text"
//                   value={newCourse.courseName}
//                   placeholder="Enter course name"
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, courseName: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>👨‍🏫 Trainer</label>
//                 <input
//                   type="text"
//                   value={newCourse.trainer}
//                   placeholder="Enter trainer name"
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, trainer: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>⏱ Duration (weeks)</label>
//                 <input
//                   type="number"
//                   value={newCourse.durationInWeeks}
//                   placeholder="e.g. 6"
//                   onChange={(e) =>
//                     setNewCourse({
//                       ...newCourse,
//                       durationInWeeks: parseInt(e.target.value) || 1,
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button type="submit" className="submit-btn pulse-btn">
//                   ✅ Add Course
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowAddModal(false)}
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* 🟡 Edit Course Modal */}
//       {showEditModal && editingCourse && (
//         <div className="modal-overlay">
//           <div className="modal-content animate-modal">
//             <h2 className="modal-title">✏️ Edit Course</h2>

//             <form onSubmit={handleUpdateCourse} className="form-grid">
//               <div className="form-group">
//                 <label>📘 Course Name</label>
//                 <input
//                   type="text"
//                   value={editingCourse.courseName}
//                   onChange={(e) =>
//                     setEditingCourse({
//                       ...editingCourse,
//                       courseName: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>👨‍🏫 Trainer</label>
//                 <input
//                   type="text"
//                   value={editingCourse.trainer}
//                   onChange={(e) =>
//                     setEditingCourse({
//                       ...editingCourse,
//                       trainer: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>⏱ Duration (weeks)</label>
//                 <input
//                   type="number"
//                   value={editingCourse.durationInWeeks}
//                   onChange={(e) =>
//                     setEditingCourse({
//                       ...editingCourse,
//                       durationInWeeks: parseInt(e.target.value) || 1,
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button type="submit" className="submit-btn">
//                   💾 Update Course
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailableCourses;







import React, { useEffect, useState, useMemo } from "react";
import "./styles.css";

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [bulkAction, setBulkAction] = useState("");
  const [filterTrainer, setFilterTrainer] = useState("all");

  const itemsPerPage = 5;

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    trainer: "",
    durationInWeeks: "",
    description: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    loadCourses();
  }, []);

  // ✅ Load courses
  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      } else {
        showMessage("error", "Failed to load courses");
      }
    } catch (err) {
      showMessage("error", "Error loading courses: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toast message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  // ✅ Delete course with confirmation modal
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/api/courses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showMessage("success", "Course deleted successfully!");
        loadCourses();
        setShowDeleteModal(false);
        setCourseToDelete(null);
      } else {
        const text = await res.text();
        showMessage("error", "Failed to delete course: " + text);
      }
    } catch (err) {
      showMessage("error", "Error deleting course: " + err.message);
    }
  };

  // ✅ Confirm delete
  const confirmDelete = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  // ✅ Add new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (res.ok) {
        const savedCourse = await res.json();
        showMessage("success", `Course "${savedCourse.courseName}" added!`);
        setShowAddModal(false);
        setNewCourse({ 
          courseName: "", 
          trainer: "", 
          durationInWeeks: "", 
          description: "", 
          price: "", 
          category: "" 
        });
        loadCourses();
      } else {
        const text = await res.text();
        showMessage("error", "Failed to add course: " + text);
      }
    } catch (err) {
      showMessage("error", "Error adding course: " + err.message);
    }
  };

  // ✅ Update existing course
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8081/api/courses/${editingCourse.courseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingCourse),
        }
      );

      if (res.ok) {
        showMessage("success", "Course updated successfully!");
        setShowEditModal(false);
        setEditingCourse(null);
        loadCourses();
      } else {
        const text = await res.text();
        showMessage("error", "Failed to update course: " + text);
      }
    } catch (err) {
      showMessage("error", "Error updating course: " + err.message);
    }
  };

  // ✅ Get unique trainers for filter
  const uniqueTrainers = useMemo(() => {
    const trainers = [...new Set(courses.map(course => course.trainer))];
    return trainers.filter(trainer => trainer && trainer.trim() !== "");
  }, [courses]);

  // ✅ Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = 
        course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.trainer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTrainer = filterTrainer === "all" || course.trainer === filterTrainer;
      
      return matchesSearch && matchesTrainer;
    });

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [courses, searchTerm, filterTrainer, sortConfig]);

  // ✅ Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // ✅ Handle select/deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(paginatedCourses.map(course => course.courseId));
      setSelectedCourses(allIds);
    } else {
      setSelectedCourses(new Set());
    }
  };

  // ✅ Handle individual course selection
  const handleCourseSelect = (courseId) => {
    setSelectedCourses(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(courseId)) {
        newSelection.delete(courseId);
      } else {
        newSelection.add(courseId);
      }
      return newSelection;
    });
  };

  // ✅ Bulk delete
  const handleBulkDelete = async () => {
    if (selectedCourses.size === 0) {
      showMessage("error", "Please select courses to delete");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedCourses.size} course(s)?`)) return;

    try {
      const deletePromises = Array.from(selectedCourses).map(id =>
        fetch(`http://localhost:8081/api/courses/${id}`, { method: "DELETE" })
      );

      const results = await Promise.allSettled(deletePromises);
      
      const successfulDeletes = results.filter(result => result.status === 'fulfilled' && result.value.ok).length;
      
      if (successfulDeletes > 0) {
        showMessage("success", `Successfully deleted ${successfulDeletes} course(s)!`);
        setSelectedCourses(new Set());
        loadCourses();
      }
      
      if (successfulDeletes < selectedCourses.size) {
        showMessage("warning", `${selectedCourses.size - successfulDeletes} course(s) failed to delete`);
      }
    } catch (err) {
      showMessage("error", "Error during bulk deletion: " + err.message);
    }
  };

  // ✅ Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterTrainer]);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === 'asc' ? "↑" : "↓";
  };

  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-wrapper">
      <div className="header-section">
        <h1>Available Courses</h1>
        <div className="controls">
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            ➕ Add New Course
          </button>
          <button className="refresh-btn" onClick={loadCourses}>
        🔄 Refresh
         </button>
          {selectedCourses.size > 0 && (
            <button className="delete-btn" onClick={handleBulkDelete}>
              🗑️ Delete Selected ({selectedCourses.size})
            </button>
          )}
        </div>
      </div>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : 
            message.type === "warning" ? "alert-warning" : "alert-error"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by course name, trainer, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          🔍
        </div>
        
        <select 
          value={filterTrainer} 
          onChange={(e) => setFilterTrainer(e.target.value)}
          className="trainer-filter"
        >
          <option value="all">All Trainers</option>
          {uniqueTrainers.map(trainer => (
            <option key={trainer} value={trainer}>{trainer}</option>
          ))}
        </select>

        <div className="stats">
          Showing {filteredAndSortedCourses.length} of {courses.length} courses
          {selectedCourses.size > 0 && ` (${selectedCourses.size} selected)`}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading courses...</div>
      ) : (
        <>
          <table className="courses-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginatedCourses.length > 0 && 
                      paginatedCourses.every(course => selectedCourses.has(course.courseId))}
                  />
                </th>
                <th onClick={() => handleSort("courseId")} className="sortable">
                  ID {getSortIndicator("courseId")}
                </th>
                <th onClick={() => handleSort("courseName")} className="sortable">
                  Course Name {getSortIndicator("courseName")}
                </th>
                <th onClick={() => handleSort("trainer")} className="sortable">
                  Trainer {getSortIndicator("trainer")}
                </th>
                <th onClick={() => handleSort("durationInWeeks")} className="sortable">
                  Duration {getSortIndicator("durationInWeeks")}
                </th>
                {/* <th>Description</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    {courses.length === 0 ? "No courses found." : "No courses match your filters."}
                  </td>
                </tr>
              ) : (
                paginatedCourses.map((course) => (
                  <tr 
                    key={course.courseId} 
                    className={selectedCourses.has(course.courseId) ? "selected" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCourses.has(course.courseId)}
                        onChange={() => handleCourseSelect(course.courseId)}
                      />
                    </td>
                    <td>{course.courseId}</td>
                    <td>
                      <strong>{course.courseName}</strong>
                      {course.category && (
                        <span className="category-badge">{course.category}</span>
                      )}
                    </td>
                    <td>
                      <span className="trainer-badge">{course.trainer}</span>
                    </td>
                    <td>
                      <span className="duration-badge">{course.durationInWeeks} weeks</span>
                    </td>
                    {/* <td>
                      {course.description ? (
                        <span title={course.description}>
                          {course.description.length > 50 
                            ? `${course.description.substring(0, 50)}...` 
                            : course.description}
                        </span>
                      ) : (
                        <span className="no-description">No description</span>
                      )}
                    </td> */}
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingCourse({ ...course });
                          setShowEditModal(true);
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => confirmDelete(course)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Enhanced Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page === 1 || 
                  page === totalPages || 
                  Math.abs(page - currentPage) <= 1
                )
                .map((page, index, array) => {
                  const showEllipsis = index < array.length - 1 && array[index + 1] - page > 1;
                  return (
                    <React.Fragment key={page}>
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "active" : ""}
                      >
                        {page}
                      </button>
                      {showEllipsis && <span className="ellipsis">...</span>}
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* 🟢 Add Course Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-modal">
            <h2 className="modal-title">➕ Add New Course</h2>

            <form onSubmit={handleAddCourse} className="form-grid">
              <div className="form-group">
                <label>📘 Course Name</label>
                <input
                  type="text"
                  value={newCourse.courseName}
                  placeholder="Enter course name"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, courseName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>👨‍🏫 Trainer</label>
                <input
                  type="text"
                  value={newCourse.trainer}
                  placeholder="Enter trainer name"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, trainer: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>⏱ Duration (weeks)</label>
                <input
                  type="number"
                  value={newCourse.durationInWeeks}
                  placeholder="e.g. 6"
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      durationInWeeks: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>💰 Price</label>
                <input
                  type="number"
                  value={newCourse.price}
                  placeholder="e.g. 99.99"
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>📁 Category</label>
                <input
                  type="text"
                  value={newCourse.category}
                  placeholder="e.g. Programming, Design, Business"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, category: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>📝 Description</label>
                <textarea
                  value={newCourse.description}
                  placeholder="Enter course description"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn pulse-btn">
                  ✅ Add Course
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🟡 Edit Course Modal */}
      {showEditModal && editingCourse && (
        <div className="modal-overlay">
          <div className="modal-content animate-modal">
            <h2 className="modal-title">✏️ Edit Course</h2>

            <form onSubmit={handleUpdateCourse} className="form-grid">
              <div className="form-group">
                <label>📘 Course Name</label>
                <input
                  type="text"
                  value={editingCourse.courseName}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      courseName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>👨‍🏫 Trainer</label>
                <input
                  type="text"
                  value={editingCourse.trainer}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      trainer: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>⏱ Duration (weeks)</label>
                <input
                  type="number"
                  value={editingCourse.durationInWeeks}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      durationInWeeks: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>💰 Price</label>
                <input
                  type="number"
                  value={editingCourse.price || ''}
                  placeholder="e.g. 99.99"
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>📁 Category</label>
                <input
                  type="text"
                  value={editingCourse.category || ''}
                  placeholder="e.g. Programming, Design, Business"
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, category: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>📝 Description</label>
                <textarea
                  value={editingCourse.description || ''}
                  placeholder="Enter course description"
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, description: e.target.value })
                  }
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  💾 Update Course
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔴 Delete Confirmation Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="modal-overlay">
          <div className="modal-content animate-modal">
            <h2 className="modal-title">🗑️ Delete Course</h2>
            <div className="delete-confirmation">
              <p>Are you sure you want to delete the course:</p>
              <h3>"{courseToDelete.courseName}"?</h3>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="delete-btn"
                onClick={() => handleDelete(courseToDelete.courseId)}
              >
                ✅ Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCourseToDelete(null);
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCourses;