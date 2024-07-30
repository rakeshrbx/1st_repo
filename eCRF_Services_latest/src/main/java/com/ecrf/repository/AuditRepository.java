package com.ecrf.repository;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ecrf.entity.AuditEntity;

@Transactional
public interface AuditRepository extends JpaRepository<AuditEntity, Long> {

    List<AuditEntity> findByModifiedOnBetween(LocalDateTime startDate, LocalDateTime endDate);

    @Query(value="SELECT * FROM audit_data data "+
            "WHERE (cast(:startDate as date) IS NULL OR data.modified_on>=:startDate)"+
            "AND  (cast(:endDate as date) IS NULL OR data.modified_on<=:endDate)"+
            "AND  (:siteId IS NULL OR data.site_Id=:siteId)"+
            "AND  (:subjectId IS NULL OR data.subject_Id=:subjectId)",
            nativeQuery = true)
    List<AuditEntity> findAuditDataByDynamicCriteria(@Param("startDate") LocalDateTime startDate,
                                                                @Param("endDate") LocalDateTime endDate,
                                                                @Param("siteId") String siteId,
                                                                @Param("subjectId") String subjectId);

   @Query(value="SELECT * FROM audit_data data "+
            " WHERE (cast(?1 as date) IS NULL OR data.modified_on>=?1)"+
            " AND  (cast(?2 as date) IS NULL OR data.modified_on<=?2)"+
           	" AND (case when ?3='ALL' then 'ALL' else data.site_id end)  in "+
		" (select unnest as site_id  from  unnest (string_to_array(COALESCE(?3,'ALL'),',')) ) "+
         	" AND data.subject_id>=COALESCE(?4,data.subject_id) and data.subject_id<=COALESCE(?5,data.subject_id)",
            nativeQuery = true)
    List<AuditEntity> findAuditDataByDynamicCriteria(@Param("startDate") LocalDateTime startDate,
                                                                @Param("endDate") LocalDateTime endDate,
                                                                @Param("siteId") String siteId,
                                                                @Param("fromSubjectId") Optional<String> fromSubjectId,
                                                                @Param("toSubjectId") Optional<String> toSubjectId
                                                                );

}