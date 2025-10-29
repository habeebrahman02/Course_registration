package com.registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.registration.model.CourseRegistry;

@Repository
public interface CourseRegistryRepo extends JpaRepository<CourseRegistry, Long> {
}
