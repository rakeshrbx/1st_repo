package com.ecrf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ecrf.entity.SiteEntity;
@Transactional
public interface SiteDetailsRepository extends JpaRepository<SiteEntity, Long> {

	Boolean existsBySiteIdContainingIgnoreCase(String siteId);
}