package com.ecrf.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.ecrf.entity.ProjectEntity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Component
public class CustomEntityManager {

	@PersistenceContext
	private EntityManager entityManager;

	@PersistenceContext
	EntityManager em;

	public int createSequence(String seqName) {

		return em.createNativeQuery("create sequence " + seqName + " increment 1 start 1").executeUpdate();
	}

	public Long getCurrentVal(String seqName) {
		return (Long) em.createNativeQuery("select last_value from " + seqName).getSingleResult();
	}
	
	public int updateProjectDefaultValue(String defaultValue) {
		int updatedRows = em.createNativeQuery("update project_details set default_study_design  = null").executeUpdate();
		em.close();
		return updatedRows;
	}
	
}
