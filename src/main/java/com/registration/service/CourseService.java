package com.registration.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.registration.model.Course;
import com.registration.model.CourseRegistry;
import com.registration.repository.CourseRegistryRepo;
import com.registration.repository.CourseRepo;


@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepository;

    @Autowired
    private CourseRegistryRepo courseRegistryRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        return courseRepository.findById(id)
                .map(course -> {
                    course.setCourseName(updatedCourse.getCourseName());
                    course.setTrainer(updatedCourse.getTrainer());
                    course.setDurationInWeeks(updatedCourse.getDurationInWeeks());
                    return courseRepository.save(course);
                })
                .orElseThrow(() -> new RuntimeException("Course not found with ID " + id));
    }

    public void deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Course not found with ID " + id);
        }
    }

    // Enrollment logic
    public void enrollCourse(String name, String email, String courseName) {
        CourseRegistry registry = new CourseRegistry();
        registry.setName(name);
        registry.setEmailId(email);
        registry.setCourseName(courseName);
        courseRegistryRepository.save(registry);
    }

    public List<CourseRegistry> enrolledCourses() {
        return courseRegistryRepository.findAll();
    }
}
