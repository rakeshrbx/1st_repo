package com.ecrf.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecrf.entity.RecordMasterData;
@Repository
public interface EcrfRepository extends JpaRepository<RecordMasterData, String> {	
	Logger logger = LogManager.getLogger(EcrfRepository.class);		

String TableName = "ecrf_master_data";

@Query(value = "SELECT * FROM "+TableName+" WHERE section1->>?1 = ?2", nativeQuery = true)
Iterable<RecordMasterData> findEmployeeByNamee(String tt,String vv);




@Query(value = "SELECT count(*) AS exact_count FROM "+TableName, nativeQuery = true)
int getTotalRecordCount();

@Query(value = "SELECT * FROM "+TableName+" WHERE to_date (section14->>'createdOn', 'YYYY-MM-DD') \r"
		+ "    BETWEEN ?1 \r"
		+ "    AND     ?2 AND (dispatched_to =(case when ?3='ALL' then dispatched_to else ?3 end)) AND siteid=?4", nativeQuery = true)
List<RecordMasterData> findRecordOnDate(LocalDateTime fromDate,LocalDateTime toDate, String roleName,String siteId);


@Query(value = "SELECT * FROM "+TableName+" WHERE to_date (section14->>'createdOn', 'YYYY-MM-DD') \r"
		+ "    BETWEEN ?1 \r"
		+ "    AND ?2 AND (dispatched_to =(case when ?3='ALL' then dispatched_to else ?3 end)) AND "
		+"  (case when ?4='ALL' then 'ALL' else siteid end)  in (select unnest as siteid  from  unnest(string_to_array(COALESCE(?4,'ALL'),',')) ) "
		+" AND subjectid>=COALESCE(?5,subjectid) and subjectid<=COALESCE(?6,subjectid)"
		, nativeQuery = true)
List<RecordMasterData> findRecordOnDate(LocalDateTime fromDate,LocalDateTime toDate, String roleName,String siteId,Optional<String> fromSubjectId,Optional<String> toSubjectId);


/*
 * @Query(value = "SELECT * FROM "
 * +TableName+" WHERE createdate >= ?1 AND createdate < ?2 AND dispatched_to = ?3 AND siteid=?4"
 * , nativeQuery = true) List<RecordMasterData> findRecordOnDate(LocalDateTime
 * fromDate,LocalDateTime toDate, String roleName,String siteId);
 */


//  @Query(value = "SELECT * FROM "+TableName+" WHERE dispatched_to = ?1 AND siteid=?2", nativeQuery = true)
// @Query(value = "SELECT * FROM " + TableName + ""
//             + " WHERE (case when status='INIT' then ?1 else dispatched_to end) =(case  when status='INIT' then 'ROLE_DATAENTRY' "
// 			+" WHEN ?1='ALL' then dispatched_to "
// 			+" else ?1 end)  AND siteid=?2", nativeQuery = true)


@Query(value = "select  m.* from public.ecrf_master_data m "+
"left join ( "+
"select record_id,role,count(*) cnt from public.audit_data "+
"group by record_id,role "+
")a on a.record_id=m.recordid "+
"where siteid=?2 "+
" and ( "+
"case when status not in ('INIT','SUBMITTED_TO_REVIEWER_FROM_DATAENTRY') and a.role='ROLE_PI' then 'ROLE_PI' "+
"when status not in ('INIT') and a.role='ROLE_REVIEWER' then 'ROLE_REVIEWER' "+
"else 'ROLE_DATAENTRY' end) =?1", nativeQuery = true)
 
 
List<RecordMasterData> getRecentRecords(String roleName,String siteId);



@Query(value = "select distinct  m.* from public.ecrf_master_data m "+
"left join ( "+
"select record_id,role,count(*) cnt from public.audit_data "+
"group by record_id,role "+
")a on a.record_id=m.recordid "+
"where  to_date(section14->>'createdOn', 'YYYY-MM-DD') BETWEEN COALESCE(?3,to_date(section14->>'createdOn', 'YYYY-MM-DD')) AND COALESCE(?4,to_date(section14->>'createdOn', 'YYYY-MM-DD')) "+
"AND siteid=?2  and ( "+
"case  when ?1='ROLE_DATAENTRY' then 'ROLE_DATAENTRY' "+
" when (status not in ('INIT','SUBMITTED_TO_REVIEWER_FROM_DATAENTRY','SUBMITTED_TO_DATAENTRY_FROM_REVIEWER') and a.role='ROLE_PI') and ?1='ROLE_PI' then 'ROLE_PI' "+
"when (status not in ('INIT','SUBMITTED_TO_REVIEWER_FROM_DATAENTRY','SUBMITTED_TO_DATAENTRY_FROM_REVIEWER') and   dispatched_to='ROLE_PI') and  ?1 = 'ROLE_PI' then 'ROLE_PI'  "+
"when status not in ('INIT') and ?1='ROLE_REVIEWER' then 'ROLE_REVIEWER' "+
"else dispatched_to end) =?1", nativeQuery = true) 
 
List<RecordMasterData> getRecentRecords(String roleName,String siteId,Optional<LocalDateTime> fromDate,Optional<LocalDateTime> toDate);

@Query(value = "select last_value from ?1", nativeQuery = true)
public Integer getCurrentVal(String seqName);

@Query(value = "SELECT setval(?1, ?2, true)", nativeQuery = true)
public Integer incrementVal(String seqName,long l);

@Query(value = "SELECT COUNT(*) FROM information_schema.sequences WHERE sequence_schema='public' AND sequence_name=?1", nativeQuery = true)
public Integer checkIfSeqExists(String seqName);

@Query(value = "SELECT * FROM "+TableName+" WHERE dispatched_to IN ?1", nativeQuery = true)
List<RecordMasterData> getRecordIn(List<String> roleName);

@Modifying
@Query(value = "create sequence ?1 increment 1 start 1", nativeQuery = true)
public Integer createSeq(String seqName);

List<RecordMasterData> findByCreateDateBetween(LocalDateTime startDate, LocalDateTime endDate);

@Query(value="SELECT * FROM ecrf_master_data data "+
					"WHERE (cast(:startDate as date)  IS NULL OR data.createdate>=:startDate)"+
					"AND  (cast(:endDate as date) IS NULL OR data.createdate<=:endDate )"+
					"AND  (:siteId IS NULL OR data.siteId=:siteId)"+
					"AND  (:subjectId IS NULL OR data.subjectId=:subjectId)",
		nativeQuery = true)
List<RecordMasterData> findRecordMaterDataByDynamicCriteria(@Param("startDate") LocalDateTime startDate,
															@Param("endDate") LocalDateTime endDate,
															@Param("siteId") String siteId,
															@Param("subjectId") String subjectId);


@Query(value="SELECT * FROM ecrf_master_data data "+
					" WHERE (cast(?1 as date)  IS NULL OR data.createdate>=?1)"+
					" AND  (cast(?2 as date) IS NULL OR data.createdate<=?2 )"+
				" AND (case when ?3='ALL' then 'ALL' else data.siteid end)  in "+
		" (select unnest as site_id  from  unnest (string_to_array(COALESCE(?3,'ALL'),',')) ) "+
         	" AND data.subjectid>=COALESCE(?4,data.subjectid) and data.subjectid<=COALESCE(?5,data.subjectid)",
		nativeQuery = true)
List<RecordMasterData> findRecordMaterDataByDynamicCriteria(@Param("startDate") LocalDateTime startDate,
															@Param("endDate") LocalDateTime endDate,
															@Param("siteId") String siteId,										
															@Param("fromSubjectId") Optional<String> fromSubjectId,
															@Param("toSubjectId") Optional<String> toSubjectId
															);



@Query(value = "SELECT siteid," + 
		" sum(cnt) as ENTERED," + 
		" COALESCE(SUM(CASE WHEN status = 'INIT' THEN cnt END), 0) AS INIT," + 
		" COALESCE(SUM(CASE WHEN status = 'SUBMITTED_TO_REVIEWER_FROM_DATAENTRY' THEN cnt END), 0) AS SUBMITTED_TO_REVIEWER_FROM_DATAENTRY," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_SUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_SUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_RESUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_DATAENTRY_FROM_REVIEWER_RESUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'RESUBMITTED_TO_REVIEWER_FROM_DATAENTRY' THEN cnt END), 0) AS RESUBMITTED_TO_REVIEWER_FROM_DATAENTRY," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_SUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_SUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_REVIEWER_FROM_PI_SUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_REVIEWER_FROM_PI_SUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_RESUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_REVIEWER_FROM_DATAENTRY_RESUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_REVIEWER_FROM_PI_RESUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_REVIEWER_FROM_PI_RESUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'SUBMITTED_TO_DATAENTRY_FROM_REVIEWER' THEN cnt END), 0) AS SUBMITTED_TO_DATAENTRY_FROM_REVIEWER," + 
		" COALESCE(SUM(CASE WHEN status = 'RESUBMITTED_TO_DATAENTRY_FROM_REVIEWER' THEN cnt END), 0) AS RESUBMITTED_TO_DATAENTRY_FROM_REVIEWER," + 
		" COALESCE(SUM(CASE WHEN status = 'SUBMITTED_TO_PI' THEN cnt END), 0) AS SUBMITTED_TO_PI," + 
		" COALESCE(SUM(CASE WHEN status = 'RESUBMITTED_TO_PI' THEN cnt END), 0) AS RESUBMITTED_TO_PI," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_PI_SUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_PI_SUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'INPROGRESS_AT_PI_RESUBMISSION' THEN cnt END), 0) AS INPROGRESS_AT_PI_RESUBMISSION," + 
		" COALESCE(SUM(CASE WHEN status = 'SUBMITTED_TO_REVIWER_FROM_PI' THEN cnt END), 0) AS SUBMITTED_TO_REVIWER_FROM_PI," + 
		" COALESCE(SUM(CASE WHEN status = 'RESUBMITTED_TO_REVIWER_FROM_PI' THEN cnt END), 0) AS RESUBMITTED_TO_REVIWER_FROM_PI," + 
		" COALESCE(SUM(CASE WHEN status = 'SIGN_OFF' THEN cnt END), 0) AS SIGN_OFF" + 
		" FROM (" + 
		"    SELECT siteid, status, COUNT(*) AS cnt" + 
		"    FROM ecrf_master_data" + 
		" 	WHERE (to_date (section14->>'createdOn', 'YYYY-MM-DD')  BETWEEN ?1 and ?2) "+
		" AND (case when ?3='ALL' then 'ALL' else siteid end)  in "+
		" (select unnest as siteid  from  unnest (string_to_array(COALESCE(?3,'ALL'),',')) ) "+
		" AND subjectid>=COALESCE(?4,subjectid) and subjectid<=COALESCE(?5,subjectid)"+
		"   GROUP BY siteid, status" + 
		" ) AS subquery" + 
		" GROUP BY siteid" + 
		" ORDER BY siteid;"
		, nativeQuery = true)
	List<Map<String, Object>> dashboardReport(@Param("fromDate") LocalDateTime fromDate,
			@Param("toDate") LocalDateTime toDate,
			@Param("siteId") String siteId,
			Optional<String> fromSubjectId,Optional<String> toSubjectId
			);


		
}