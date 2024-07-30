package com.ecrf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ecrf.entity.CROEntity;
@Transactional
public interface CRODetailsRepository extends JpaRepository<CROEntity, Long> {


}