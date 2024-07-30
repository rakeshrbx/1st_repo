package com.ecrf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ecrf.entity.ProjectEntity;
@Transactional
public interface ProjectDetailsRepository extends JpaRepository<ProjectEntity, Long> {

	List<ProjectEntity> findByDefaultStudyDesign(String defaultStudyDesign);	

}