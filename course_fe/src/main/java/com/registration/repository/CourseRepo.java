package com.registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.registration.model.Course;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {
}
