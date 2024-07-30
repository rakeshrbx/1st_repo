package com.ecrf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ecrf.entity.SponsorEntity;
@Transactional
public interface SponsorDetailsRepository extends JpaRepository<SponsorEntity, Long> {

	

}