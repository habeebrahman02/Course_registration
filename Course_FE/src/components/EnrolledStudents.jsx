// // src/components/EnrolledStudents.js
// import React, { useEffect, useState } from "react";
// import './styles.css';

// const EnrolledStudents = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8081/courses/enrolled")
//       .then(res => res.json())
//       .then(data => setStudents(data))
//       .catch(() => alert("Error loading students"));
//   }, []);

//   return (
//     <div className="table-wrapper">
//       <h1>Enrolled Students</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Course Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.length === 0 ? (
//             <tr><td colSpan="4">No students enrolled.</td></tr>
//           ) : (
//             students.map(student => (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.name}</td>
//                 <td>{student.emailId}</td>
//                 <td>{student.courseName}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EnrolledStudents;



// import React, { useEffect, useState } from "react";
// import "./styles.css";

// const EnrolledStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // ✅ Fetch enrolled students from backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await fetch("http://localhost:8081/api/courses/enrolled");

//         if (res.ok) {
//           const data = await res.json();
//           setStudents(data);
//         } else {
//           const msg = await res.text();
//           setError("Failed to fetch students: " + msg);
//         }
//       } catch (err) {
//         setError("Error fetching students: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const totalPages = Math.ceil(students.length / itemsPerPage);
//   const paginatedStudents = students.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="table-wrapper">
//       <h1>Enrolled Students</h1>

//       {loading && <p>Loading enrolled students...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading && !error && (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Course Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedStudents.length === 0 ? (
//                 <tr>
//                   <td colSpan="4">No students enrolled yet.</td>
//                 </tr>
//               ) : (
//                 paginatedStudents.map((student) => (
//                   <tr key={student.id}>
//                     <td>{student.id}</td>
//                     <td>{student.name}</td>
//                     <td>{student.emailId}</td>
//                     <td>{student.courseName}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           {/* Pagination controls */}
//           <div className="pagination">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages || 1}
//             </span>
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages || totalPages === 0}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default EnrolledStudents;






import React, { useEffect, useState, useMemo } from "react";
import "./styles.css";

const EnrolledStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const itemsPerPage = 5;

  // ✅ Fetch enrolled students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:8081/api/courses/enrolled");

        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          const msg = await res.text();
          setError("Failed to fetch students: " + msg);
        }
      } catch (err) {
        setError("Error fetching students: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Get unique courses for filter
  const uniqueCourses = useMemo(() => {
    const courses = [...new Set(students.map(student => student.courseName))];
    return courses.filter(course => course && course.trim() !== "");
  }, [students]);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const matchesSearch = 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.emailId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.courseName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = selectedCourse === "all" || student.courseName === selectedCourse;
      
      return matchesSearch && matchesCourse;
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
  }, [students, searchTerm, selectedCourse, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);
  const paginatedStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle select/deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(paginatedStudents.map(student => student.id));
      setSelectedStudents(allIds);
    } else {
      setSelectedStudents(new Set());
    }
  };

  // Handle individual student selection
  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(studentId)) {
        newSelection.delete(studentId);
      } else {
        newSelection.add(studentId);
      }
      return newSelection;
    });
  };

  // Export data
  const handleExport = () => {
    const dataToExport = selectedStudents.size > 0 
      ? students.filter(student => selectedStudents.has(student.id))
      : filteredAndSortedStudents;

    if (exportFormat === "csv") {
      exportToCSV(dataToExport);
    } else if (exportFormat === "json") {
      exportToJSON(dataToExport);
    }
    setShowExportModal(false);
  };

  const exportToCSV = (data) => {
    const headers = ["ID", "Name", "Email", "Course Name"];
    const csvContent = [
      headers.join(","),
      ...data.map(student => 
        [student.id, `"${student.name}"`, student.emailId, `"${student.courseName}"`].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    downloadBlob(blob, "enrolled_students.csv");
  };

  const exportToJSON = (data) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    downloadBlob(blob, "enrolled_students.json");
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCourse]);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === 'asc' ? "↑" : "↓";
  };

  return (
    <div className="table-wrapper">
      <div className="header-section">
        <h1>Enrolled Students</h1>
        <div className="controls">
          <button 
            className="export-btn"
            onClick={() => setShowExportModal(true)}
            disabled={filteredAndSortedStudents.length === 0}
          >
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          🔍
        </div>
        
        <select 
          value={selectedCourse} 
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-filter"
        >
          <option value="all">All Courses</option>
          {uniqueCourses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <div className="stats">
          Showing {filteredAndSortedStudents.length} of {students.length} students
          {selectedStudents.size > 0 && ` (${selectedStudents.size} selected)`}
        </div>
      </div>

      {loading && <div className="loading">Loading enrolled students...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          <table className="students-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginatedStudents.length > 0 && 
                      paginatedStudents.every(student => selectedStudents.has(student.id))}
                  />
                </th>
                <th onClick={() => handleSort("id")} className="sortable">
                  ID {getSortIndicator("id")}
                </th>
                <th onClick={() => handleSort("name")} className="sortable">
                  Name {getSortIndicator("name")}
                </th>
                <th onClick={() => handleSort("emailId")} className="sortable">
                  Email {getSortIndicator("emailId")}
                </th>
                <th onClick={() => handleSort("courseName")} className="sortable">
                  Course Name {getSortIndicator("courseName")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    {students.length === 0 ? "No students enrolled yet." : "No students match your filters."}
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className={selectedStudents.has(student.id) ? "selected" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => handleStudentSelect(student.id)}
                      />
                    </td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.emailId}</td>
                    <td>
                      <span className="course-badge">{student.courseName}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
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

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Export Data</h3>
            <div className="export-options">
              <label>
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                CSV Format
              </label>
              <label>
                <input
                  type="radio"
                  value="json"
                  checked={exportFormat === "json"}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                JSON Format
              </label>
            </div>
            <div className="export-scope">
              <label>
                <input
                  type="checkbox"
                  checked={selectedStudents.size > 0}
                  onChange={(e) => {
                    if (!e.target.checked) setSelectedStudents(new Set());
                  }}
                />
                Export only selected students ({selectedStudents.size})
              </label>
            </div>
            <div className="modal-actions">
              <button onClick={handleExport} className="primary">
                Export
              </button>
              <button onClick={() => setShowExportModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledStudents;

