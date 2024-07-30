package com.ecrf.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.ecrf.dto.CroDto;
import com.ecrf.dto.ProjectDto;
import com.ecrf.dto.RecordDto;
import com.ecrf.dto.SiteDto;
import com.ecrf.dto.SponsorDto;
import com.ecrf.entity.AuditEntity;
import com.ecrf.entity.CROEntity;
import com.ecrf.entity.ProjectEntity;
import com.ecrf.entity.RecordMasterData;
import com.ecrf.entity.SiteEntity;
import com.ecrf.entity.SponsorEntity;

public interface RecordDataService {

	int getRecordCount();

	List<RecordDto> findRecordOnDate(LocalDateTime fromDate, LocalDateTime toDate, String roleName, String siteId);
	List<RecordDto> findRecordOnDate(LocalDateTime fromDate, LocalDateTime toDate, String roleName, String siteId,Optional<String> fromSubjectId,Optional<String> toSubjectId);

	List<RecordDto> getRecentRecords(String roleName, String siteId);
	List<RecordDto> getRecentRecords(String roleName, String siteId,Optional<LocalDateTime> fromDate, Optional<LocalDateTime> toDate);

	RecordMasterData addOneRecord(RecordMasterData recordMasterData);

	RecordMasterData getRecordIn(List<String> roleName);

	SiteEntity addSiteDetails(SiteEntity siteEntity);

	AuditEntity captureAudit(AuditEntity auditEntity);

	SiteEntity updateSiteDetails(Integer siteId, SiteEntity siteEntity);

	List<SiteEntity> getAllSites();

	CROEntity addCRODetails(CROEntity croEntity);

	CROEntity updateCRODetails(Integer croId, CROEntity croEntity);

	List<CROEntity> getAllCRO();

	List<SponsorEntity> getAllSponsors();

	SponsorEntity updateSponsorDetails(Integer sponsorId, SponsorEntity sponsorEntity);

	SponsorEntity addSponsorDetails(SponsorEntity sponsorEntity);

	ProjectEntity addProjectDetails(ProjectEntity projectEntity);

	List<ProjectEntity> getAllProjects();

	ProjectEntity updateProjectDetails(Integer projectId, ProjectEntity projectEntity);

	List<SiteDto> getSiteIds();

	List<SponsorDto> getSponsors();

	List<CroDto> getCros();

	List<ProjectDto> getProjectDetails();

	String deleteProjectDetails(Integer id);

	String deleteSiteDetails(Integer id);

	String deleteCroDetails(Integer id);

	String deleteSponsorDetails(Integer id);
List<Map<String, Object>> dashboardReport(LocalDateTime fromDate, LocalDateTime toDate,
			String siteId,Optional<String> fromSubjectId,Optional<String> toSubjectId);

}
