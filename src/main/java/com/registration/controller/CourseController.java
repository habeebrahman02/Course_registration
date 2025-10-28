package com.registration.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.registration.model.Course;
import com.registration.model.CourseRegistry;
import com.registration.service.CourseService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // GET all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // GET course by id
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseService.getCourseById(id);
        return course.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // CREATE new course
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course savedCourse = courseService.createCourse(course);
        return ResponseEntity.ok(savedCourse);
    }

    // UPDATE existing course
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        try {
            Course saved = courseService.updateCourse(id, updatedCourse);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    // DELETE course
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteCourse(id);
            return ResponseEntity.ok("Course deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ENROLL a student (Registration)
    @PostMapping("/register")
    public ResponseEntity<String> enrollCourse(@RequestBody CourseRegistry registry) {
        courseService.enrollCourse(registry.getName(), registry.getEmailId(), registry.getCourseName());
        return ResponseEntity.ok("Congratulations " + registry.getName() +
                "! Enrollment successful for " + registry.getCourseName() + ".");
    }

    // GET all enrolled students
    @GetMapping("/enrolled")
    public List<CourseRegistry> enrolledCourses() {
        return courseService.enrolledCourses();
    }
}
