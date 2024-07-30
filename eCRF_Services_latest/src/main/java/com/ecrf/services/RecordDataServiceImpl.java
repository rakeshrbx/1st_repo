package com.ecrf.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.ecrf.exceptionhandler.CustomMessageException;
import com.ecrf.repository.AuditRepository;
import com.ecrf.repository.CRODetailsRepository;
import com.ecrf.repository.CustomEntityManager;
import com.ecrf.repository.EcrfRepository;
import com.ecrf.repository.ProjectDetailsRepository;
import com.ecrf.repository.SiteDetailsRepository;
import com.ecrf.repository.SponsorDetailsRepository;
import com.ecrf.utilities.ObjectMapperUtils;

@Transactional
@Service
public class RecordDataServiceImpl implements RecordDataService {
	Logger logger = LogManager.getLogger(RecordDataServiceImpl.class);
	@Autowired
	private EcrfRepository ecrfRepository;

	@Autowired
	private SiteDetailsRepository siteDetailsRepository;

	@Autowired
	private CRODetailsRepository croDetailsRepository;

	@Autowired
	private SponsorDetailsRepository sponsorDetailsRepository;

	@Autowired
	private ProjectDetailsRepository projectDetailsRepository;

	@Autowired
	private AuditRepository auditRepository;
	@Autowired
	private CustomEntityManager customEntityManager;


	RecordDataServiceImpl(EcrfRepository ecrfRepository, AuditRepository auditRepository) {
		this.ecrfRepository = ecrfRepository;
		this.auditRepository = auditRepository;
	}

	@Override
	public int getRecordCount() {

		return ecrfRepository.getTotalRecordCount();
	}

	@Override
	public List<RecordDto> findRecordOnDate(LocalDateTime fromDate, LocalDateTime toDate, String roleName,String siteId) {
		logger.info("Method Entry - findRecordOnDate");
		List<RecordDto> recordDto = null;
		try {
			List<RecordMasterData> recordMasterData = ecrfRepository.findRecordOnDate(fromDate, toDate, roleName,siteId);
			recordDto = ObjectMapperUtils.mapAll(recordMasterData, RecordDto.class);
		} catch (Exception e) {
			logger.error("Error in method - findRecordOnDate() "+e.getMessage());
		}
		logger.info("Method Exit - findRecordOnDate()");
		return recordDto;
	}


	@Override
	public List<RecordDto> findRecordOnDate(LocalDateTime fromDate, LocalDateTime toDate, String roleName,String siteId,Optional<String> fromSubjectId,Optional<String> toSubjectId) {
		logger.info("Method Entry - findRecordOnDate");
		List<RecordDto> recordDto = null;
		try {
			List<RecordMasterData> recordMasterData = ecrfRepository.findRecordOnDate(fromDate, toDate, roleName,siteId,fromSubjectId,toSubjectId);
			recordDto = ObjectMapperUtils.mapAll(recordMasterData, RecordDto.class);
		} catch (Exception e) {
			logger.error("Error in method - findRecordOnDate() "+e.getMessage());
		}
		logger.info("Method Exit - findRecordOnDate()");
		return recordDto;
	}


	@Override
	public List<RecordDto> getRecentRecords(String roleName,String siteId) {
		logger.info("Method Entry - getRecentRecords()");
		List<RecordDto> recordDto = null;
		try {
			List<RecordMasterData> recordMasterData = ecrfRepository.getRecentRecords(roleName,siteId);
			recordDto = ObjectMapperUtils.mapAll(recordMasterData, RecordDto.class);
			/*
			 * int nextval =ecrfRepository.getCurrentVal();
			 * logger.info("nextval "+nextval);
			 * ecrfRepository.incrementVal(nextval+1); List<String> roles = new
			 * ArrayList<String>(); roles.add("Reviewer"); roles.add("Data Entry");
			 * List<RecordMasterData> rc = ecrfRepository.getRecordIn(roles);
			 * logger.info(rc.size()); logger.info(rc.toString());
			 */
		} catch (Exception e) {
			logger.error("Error in method - getRecentRecords() "+e.getMessage());
		}
		logger.info("Method Entry - getRecentRecords()");
		return recordDto;
	}

	
	@Override
	public List<RecordDto> getRecentRecords(String roleName,String siteId,Optional<LocalDateTime> fromDate,Optional<LocalDateTime> toDate) {
		logger.info("Method Entry - getRecentRecords()");
		List<RecordDto> recordDto = null;
		try {
			List<RecordMasterData> recordMasterData = ecrfRepository.getRecentRecords(roleName,siteId,fromDate,toDate);
			recordDto = ObjectMapperUtils.mapAll(recordMasterData, RecordDto.class);
			/*
			 * int nextval =ecrfRepository.getCurrentVal();
			 * logger.info("nextval "+nextval);
			 * ecrfRepository.incrementVal(nextval+1); List<String> roles = new
			 * ArrayList<String>(); roles.add("Reviewer"); roles.add("Data Entry");
			 * List<RecordMasterData> rc = ecrfRepository.getRecordIn(roles);
			 * logger.info(rc.size()); logger.info(rc.toString());
			 */
		} catch (Exception e) {
			logger.error("Error in method - getRecentRecords() "+e.getMessage());
		}
		logger.info("Method Entry - getRecentRecords()");
		return recordDto;
	}

	public RecordMasterData addOneRecord(RecordMasterData recordMasterData) {
		logger.info("Method Entry - addOneRecord()");
		/*
		 * int count = ecrfRepository.checkIfSeqExists("jtp"+"sequence1");
		 * logger.info("count "+count);
		 * 
		 * 
		 * if(count<1) {
		 * 
		 * int t1 = getNumber("jtp"+"sequence1");
		 * 
		 * logger.info("count1 "+t1); }
		 */

		// int nextval =ecrfRepository.getCurrentVal();
		// logger.info("nextval "+nextval);
		//recordMasterData.setSiteID("mx01");
		recordMasterData.getSiteId();
		String seqName = "";
		seqName = "\"" + (recordMasterData.getSiteId()+"_seq").toLowerCase() + "\"";
		logger.info("seqName "+seqName);		 
		
		int count = ecrfRepository.checkIfSeqExists((recordMasterData.getSiteId()+"_seq").toLowerCase());
		//logger.info("seqName "+seqName);
		logger.info("count "+count);
		if(count<1) {
			customEntityManager.createSequence(seqName);
			logger.info("Sequence does not exist, Created now with name "+recordMasterData.getSiteId()+"_seq");
		}
		Long seqCurrentVal = customEntityManager.getCurrentVal(seqName);
		logger.info("Sequence value "+seqCurrentVal);
		String generatedSubjectId = recordMasterData.getSiteId()+"-"+String.format("%05d", seqCurrentVal);
		logger.info("generatedSubjectId value "+generatedSubjectId);
		//java.util.Map<String, Object> section2 = recordMasterData.getSection2();
		//section2.put("subjectId", generatedSubjectId);
		//recordMasterData.setSection2(section2);
		recordMasterData.setSubjectId(generatedSubjectId);
		RecordMasterData savedData = null;
		try {
			savedData = ecrfRepository.save(recordMasterData);
		} catch (DataAccessException e) {
			logger.error("Error in method - addOneRecord() "+e.getMessage());
		}
		ecrfRepository.incrementVal(seqName,seqCurrentVal+1);
		logger.info("Method Exit - addOneRecord()");
		return savedData;

	}

	@Override
	public RecordMasterData getRecordIn(List<String> roleName) {
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * @PersistenceContext EntityManager em;
	 * 
	 * public int getNumber(String seqName){ return
	 * em.createNativeQuery("create sequence "+seqName+" increment 1 start 1").
	 * executeUpdate(); }
	 */

	@Override
	public AuditEntity captureAudit(AuditEntity auditEntity) {
		logger.info("Method Entry - captureAudit()");
		AuditEntity savedEntity = null;
		try {

			savedEntity = auditRepository.save(auditEntity);
		} catch (DataAccessException e) {
			logger.error("Error in method - captureAudit() "+e.getMessage());
			throw new CustomMessageException("Can't save data. Error occured");
		}
		logger.info("Method exit - captureAudit()");
		return savedEntity;
	}

	@Override
	public SiteEntity addSiteDetails(SiteEntity siteEntity) {
		logger.info("Method Entry - addSiteDetails()");
		SiteEntity savedEntity = null;
		try {
			
			if(siteDetailsRepository.existsBySiteIdContainingIgnoreCase(siteEntity.getSiteId()))
				throw new CustomMessageException("Site ID already exists");
			
			savedEntity = siteDetailsRepository.save(siteEntity);
		} catch (DataAccessException e) {
			logger.error("Error in method - addSiteDetails() "+e.getMessage());
			throw new CustomMessageException("Can't save data. Error occured");
		}
		logger.info("Method exit - addSiteDetails()");
		return savedEntity;
	}

	@Override
	public SiteEntity updateSiteDetails(Integer siteId, SiteEntity siteEntity) {
		logger.info("Method Entry - updateSiteDetails()");
		SiteEntity savedEntity = null;
		try {
			SiteEntity currentSiteDetails = siteDetailsRepository.findById(Long.valueOf(siteId))
					.orElseThrow(() -> new RuntimeException("Site Id is not found."));

			BeanUtils.copyProperties(siteEntity, currentSiteDetails);
			currentSiteDetails.setId(siteId);
			savedEntity = siteDetailsRepository.save(currentSiteDetails);
		} catch (DataAccessException e) {
			logger.error("Error in method - updateSiteDetails() "+e.getMessage());
			throw new CustomMessageException("Can't save data. Error occured");
		}
		logger.info("Method exit - updateSiteDetails()");
		return savedEntity;
	}

	@Override
	public List<SiteEntity> getAllSites() {
		logger.info("Method Entry - getAllSites()");
		List<SiteEntity> retrievedSites = null;
		try {
			retrievedSites = siteDetailsRepository.findAll();
		} catch (DataAccessException e) {
			logger.error("Error in method - getAllSites() "+e.getMessage());
			throw new CustomMessageException("Can't retrieve data. Error occured");
		}
		logger.info("Method exit - getAllSites()");
		return retrievedSites;
	}

	@Override
	public CROEntity addCRODetails(CROEntity croEntity) {
		logger.info("Method Entry - addCRODetails()");
		return croDetailsRepository.save(croEntity);
	}

	@Override
	public CROEntity updateCRODetails(Integer croId, CROEntity croEntity) {
		logger.info("Method Entry - updateCRODetails()");
		CROEntity currentCRODetails = croDetailsRepository.findById(Long.valueOf(croId))
				.orElseThrow(() -> new RuntimeException("Site Id is not found."));

		BeanUtils.copyProperties(croEntity, currentCRODetails);
		currentCRODetails.setId(croId);
		logger.info("Method exit - updateCRODetails()");
		return croDetailsRepository.save(currentCRODetails);
	}

	@Override
	public List<CROEntity> getAllCRO() {
		logger.info("Method Entry - getAllCRO()");
		return croDetailsRepository.findAll();
	}

	@Override
	public SponsorEntity addSponsorDetails(SponsorEntity sponsorEntity) {
		logger.info("Method Entry - addSponsorDetails()");
		return sponsorDetailsRepository.save(sponsorEntity);
	}

	@Override
	public SponsorEntity updateSponsorDetails(Integer sponsorId, SponsorEntity sponsorEntity) {
		logger.info("Method Entry - updateSponsorDetails()");
		SponsorEntity currentCRODetails = sponsorDetailsRepository.findById(Long.valueOf(sponsorId))
				.orElseThrow(() -> new RuntimeException("Site Id is not found."));

		BeanUtils.copyProperties(sponsorEntity, currentCRODetails);
		currentCRODetails.setId(sponsorId);
		return sponsorDetailsRepository.save(currentCRODetails);
	}

	@Override
	public List<SponsorEntity> getAllSponsors() {
		logger.info("Method Entry - getAllSponsors()");
		return sponsorDetailsRepository.findAll();
	}

	@Override
	public ProjectEntity addProjectDetails(ProjectEntity projectEntity) {
		logger.info("Method Entry - addProjectDetails()");
		if((projectEntity.getDefaultStudyDesign()!= null) && projectEntity.getDefaultStudyDesign().equalsIgnoreCase("default")) {
		int updatedRows = customEntityManager.updateProjectDefaultValue(projectEntity.getDefaultStudyDesign());
		logger.info("addProjectDetails()-- updated default value column in rows "+updatedRows);
		}
		return projectDetailsRepository.save(projectEntity);
	}

	@Override
	public ProjectEntity updateProjectDetails(Integer projectId, ProjectEntity projectEntity) {
		logger.info("Method Entry - updateProjectDetails()");
		ProjectEntity currentProjectDetails = projectDetailsRepository.findById(Long.valueOf(projectId))
				.orElseThrow(() -> new RuntimeException("Project Id is not found."));
		if((projectEntity.getDefaultStudyDesign()!= null) && projectEntity.getDefaultStudyDesign().equalsIgnoreCase("default")) {
			int updatedRows = customEntityManager.updateProjectDefaultValue(projectEntity.getDefaultStudyDesign());
			logger.info("updateProjectDetails()-- updated default value column in rows "+updatedRows);
			
		}
		BeanUtils.copyProperties(projectEntity, currentProjectDetails);
		currentProjectDetails.setId(projectId);	
		
		logger.info("updateProjectDetails() -- set project id");
		
		if((projectEntity.getDefaultStudyDesign()!= null) && projectEntity.getDefaultStudyDesign().equalsIgnoreCase("default")) {
			currentProjectDetails.setDefaultStudyDesign("default");	
			logger.info(currentProjectDetails.getDefaultStudyDesign());
		
		}
		return projectDetailsRepository.save(currentProjectDetails);
	}

	@Override
	public List<ProjectEntity> getAllProjects() {
		logger.info("Method Entry - getAllProjects()");
		return projectDetailsRepository.findAll();
	}

	@Override
	public List<SiteDto> getSiteIds() {
		logger.info("Method Entry - getSiteIds()");
		List<SiteDto> siteDtos = null;

		List<SiteEntity> siteEntities = siteDetailsRepository.findAll();
		siteDtos = ObjectMapperUtils.mapAll(siteEntities, SiteDto.class);
		return siteDtos;
	}

	@Override
	public List<SponsorDto> getSponsors() {
		logger.info("Method Entry - getSponsors()");
		List<SponsorDto> sponsorDtos = null;

		List<SponsorEntity> sponsorEntities = sponsorDetailsRepository.findAll();
		sponsorDtos = ObjectMapperUtils.mapAll(sponsorEntities, SponsorDto.class);
		return sponsorDtos;
	}

	@Override
	public List<CroDto> getCros() {
		logger.info("Method Entry - getCros()");
		List<CroDto> croDtos = null;

		List<CROEntity> croEntities = croDetailsRepository.findAll();
		croDtos = ObjectMapperUtils.mapAll(croEntities, CroDto.class);
		return croDtos;
	}

	@Override
	public List<ProjectDto> getProjectDetails() {
		
		logger.info("Method Entry - getProjectDetails()");
		List<ProjectDto> projectDtos = null;

		List<ProjectEntity> projectEntities = projectDetailsRepository.findByDefaultStudyDesign("default");
		projectDtos = ObjectMapperUtils.mapAll(projectEntities, ProjectDto.class);
		return projectDtos;
	}

	@Override
	public String deleteProjectDetails(Integer id) {
		
		try {
			projectDetailsRepository.findById(Long.valueOf(id))
					.orElseThrow(() -> new RuntimeException("Project Details not found."));
			projectDetailsRepository.deleteById(Long.valueOf(id));
			logger.info("Project details with "+id+"deleted successfully");	
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw new CustomMessageException("Can't delete project details");

		}
		return "Record deleted successfully";
	}

	@Override
	public String deleteSiteDetails(Integer id) {
		
		try {
			siteDetailsRepository.findById(Long.valueOf(id))
			.orElseThrow(() -> new RuntimeException("Site Details not found."));
			siteDetailsRepository.deleteById(Long.valueOf(id));
			logger.info("Site details with "+id+"deleted successfully");	
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw new CustomMessageException("Can't delete site details");

		}
		return "Record deleted successfully";
	}
	
	@Override
	public String deleteCroDetails(Integer id) {
		
		try {
			croDetailsRepository.findById(Long.valueOf(id))
			.orElseThrow(() -> new RuntimeException("Cro Details not found."));
			croDetailsRepository.deleteById(Long.valueOf(id));
			logger.info("Cro details with "+id+"deleted successfully");	
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw new CustomMessageException("Can't delete cro details");

		}
		return "Record deleted successfully";
	}
	
	@Override
	public String deleteSponsorDetails(Integer id) {
		
		try {
			sponsorDetailsRepository.findById(Long.valueOf(id))
			.orElseThrow(() -> new RuntimeException("Sponsor Details not found."));
			sponsorDetailsRepository.deleteById(Long.valueOf(id));
			logger.info("Sponsor details with "+id+"deleted successfully");	
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw new CustomMessageException("Can't delete Sponsor details");

		}
		return "Record deleted successfully";
	}
@Override
	public List<Map<String, Object>> dashboardReport(LocalDateTime parsedStartDate, LocalDateTime parsedEndDate,
			String siteId,Optional<String> fromSubjectId,Optional<String> toSubjectId) {
		logger.info("Method Entry - dashboardReport()");
		List<Map<String, Object>> recordDto = null;
		try {
			recordDto = ecrfRepository.dashboardReport(parsedStartDate, parsedEndDate, siteId,fromSubjectId,toSubjectId);

		} catch (Exception e) {
			logger.error("Error in method - getRecentRecords() " + e.getMessage());
		}
		logger.info("Method Entry - getRecentRecords()");
		return recordDto;
	}

	
}
