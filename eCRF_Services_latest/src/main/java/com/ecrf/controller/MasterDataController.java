package com.ecrf.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
import com.ecrf.repository.EcrfRepository;
import com.ecrf.services.ExportExcelService;
import com.ecrf.services.RecordDataService;
import com.ecrf.utilities.CustomDateFormatter;
import com.ecrf.utilities.ExcelGenerator;

@CrossOrigin()
@RestController
public class MasterDataController {
	
	 public static final String AUDIT = "Audit";
	    public static final String GENERAL = "General";

	Logger logger = LogManager.getLogger(MasterDataController.class);
	@Autowired
	EcrfRepository ecrfRepository;

	@Autowired
	RecordDataService recordDataService;
	@Autowired
	CustomDateFormatter customDateFormatter;

	@Autowired
	ExportExcelService exportExcelService;

	@Autowired
	ExcelGenerator excelGenerator;
	
	public MasterDataController(EcrfRepository ecrfRepository) {

		this.ecrfRepository = ecrfRepository;
	}

	// To fetch all existing records
	@GetMapping("/findAllRecords")
	public Iterable<RecordMasterData> findAllRecords() {
		logger.info("Method Entry - findAllRecords()");
		return this.ecrfRepository.findAll();
	}

	// To add a new record 
	@PostMapping("/addRecord")
	public RecordMasterData addOneRecord(@RequestBody RecordMasterData recordMasterData) {
		logger.info("Method Entry - addOneRecord()");
		return recordDataService.addOneRecord(recordMasterData);

	}

	// To find a record 
	@GetMapping("/findRecord")
	public Optional<RecordMasterData> findOneRecord(@RequestParam("key") String key,
			@RequestParam("value") String value) {
		logger.info("Method Entry - findOneRecord()");
		return this.ecrfRepository.findById(value);
	}

	// To update an existing record 
	@PostMapping("/updateRecord")
	public RecordMasterData updateRecord(@RequestBody RecordMasterData recordMasterData) {
		logger.info("Method Entry - updateRecord()");
		return this.ecrfRepository.save(recordMasterData);
	}

	// To get total count of records 
	@GetMapping("/getTotalRecordCount")
	public int getTotalRecordCount() {
		logger.info("Method Entry - getTotalRecordCount()");
		return recordDataService.getRecordCount();
	}

	// To find records on given dates & logged in role
	@GetMapping("/findRecordOnDate")
	public List<RecordDto> findRecordOnDate(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("roleName") String roleName,@RequestParam("siteId") String siteId,
			@RequestParam("fromSubjectId") Optional<String> fromSubjectId,
			@RequestParam("toSubjectId") Optional<String> toSubjectId
			) throws Exception {
		logger.info("Method Entry - findRecordOnDate()");
		LocalDateTime dispatchFrom = customDateFormatter.formatDate(startDate);
		LocalDateTime dispatchTo = customDateFormatter.formatDate(endDate);

		List<RecordDto> recordMasterData = recordDataService.findRecordOnDate(dispatchFrom, dispatchTo, roleName,siteId,fromSubjectId,toSubjectId);
		if (((recordMasterData).isEmpty()))
			throw new CustomMessageException("No Records Found for the Dates");

		return recordMasterData;
	}
	
@GetMapping("/getRecentRecords")
public ResponseEntity<List<RecordDto>> getRecentRecords(
        @RequestParam("roleName") String roleName,
        @RequestParam("siteId") String siteId,
        @RequestParam("startDate") Optional<String> startDate,
        @RequestParam("endDate") Optional<String> endDate) {

    logger.info("Method Entry - getRecentRecords()");
    
    Optional<LocalDateTime> convertedStartDate = Optional.empty();
    Optional<LocalDateTime> convertedEndDate = Optional.empty();

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd[ HH:mm:ss]");

    // Handle optional startDate
    if (startDate.isPresent()) {
        try {
            convertedStartDate = Optional.of(LocalDateTime.parse(startDate.get(), formatter));
        } catch (DateTimeParseException e) {
            logger.error("Error parsing startDate: " + startDate.get(), e);
            throw new CustomMessageException("Invalid startDate format");
        }
    }

    // Handle optional endDate
    if (endDate.isPresent()) {
        try {
            convertedEndDate = Optional.of(LocalDateTime.parse(endDate.get(), formatter));
        } catch (DateTimeParseException e) {
            logger.error("Error parsing endDate: " + endDate.get(), e);
            throw new CustomMessageException("Invalid endDate format");
        }
    }
	logger.info("------------------------convertedStartDate: "+convertedStartDate);
	logger.info("-----------------------convertedEndDate: "+convertedEndDate);

    List<RecordDto> recordDTO = recordDataService.getRecentRecords(roleName, siteId, convertedStartDate, convertedEndDate);

    if (recordDTO.isEmpty()) {
        throw new CustomMessageException("No Records Found for this Role");
    }

    return ResponseEntity.ok(recordDTO);
}


	// To capture audit
	@PostMapping("/audit")
	public AuditEntity captureAudit(@RequestBody AuditEntity auditEntity) {
		logger.info("Method Entry - captureAudit()");
		return recordDataService.captureAudit(auditEntity);
	}

	// Add Site Details
	@PostMapping("/site-details")
	public SiteEntity addSiteDetails(@RequestBody SiteEntity siteEntity) {
		logger.info("Method Entry - addSiteDetails()");
		return recordDataService.addSiteDetails(siteEntity);
	}

	// Update Site Details
	@PutMapping("/site-details/{userId}")
	public ResponseEntity<SiteEntity> updateSiteDetails(@PathVariable Integer userId,
			@RequestBody SiteEntity siteEntity) {
		logger.info("Method Entry - updateSiteDetails()");

		return ResponseEntity.ok(recordDataService.updateSiteDetails(userId, siteEntity));
	}

//Get all Site Details
	@GetMapping("/site-details")
	public ResponseEntity<List<SiteEntity>> getAllSites() {
		logger.info("Method Entry - getAllSites()");
		return ResponseEntity.ok(recordDataService.getAllSites());

	}

//Add CRO Details
	@PostMapping("/cro-details")
	public CROEntity addCRODetails(@RequestBody CROEntity croEntity) {
		logger.info("Method Entry - addCRODetails()");
		return recordDataService.addCRODetails(croEntity);
	}

//Update cro Details
	@PutMapping("/cro-details/{croId}")
	public ResponseEntity<CROEntity> updateCroDetails(@PathVariable Integer croId, @RequestBody CROEntity croEntity) {
		logger.info("Method Entry - updateCroDetails()");

		return ResponseEntity.ok(recordDataService.updateCRODetails(croId, croEntity));
	}

//Get all cro Details
	@GetMapping("/cro-details")
	public ResponseEntity<List<CROEntity>> getAllCRO() {
		logger.info("Method Entry - getAllCRO()");
		return ResponseEntity.ok(recordDataService.getAllCRO());

	}

//Add Sponsor Details
	@PostMapping("/sponsor-details")
	public SponsorEntity addSponsorDetails(@RequestBody SponsorEntity sponsorEntity) {
		logger.info("Method Entry - addSponsorDetails()");
		return recordDataService.addSponsorDetails(sponsorEntity);
	}

//Update Sponsor Details
	@PutMapping("/sponsor-details/{sponsorId}")
	public ResponseEntity<SponsorEntity> updateSponsorDetails(@PathVariable Integer sponsorId,
			@RequestBody SponsorEntity sponsorEntity) {
		logger.info("Method Entry - updateSponsorDetails()");

		return ResponseEntity.ok(recordDataService.updateSponsorDetails(sponsorId, sponsorEntity));
	}

//Get all Sponsor Details
	@GetMapping("/sponsor-details")
	public ResponseEntity<List<SponsorEntity>> getAllSponsors() {
		logger.info("Method Entry - getAllSponsors()");
		return ResponseEntity.ok(recordDataService.getAllSponsors());

	}

//Add project Details
	@PostMapping("/project-details")
	public ProjectEntity addProjectDetails(@RequestBody ProjectEntity projectEntity) {
		logger.info("Method Entry - addProjectDetails()");
		return recordDataService.addProjectDetails(projectEntity);
	}

//Update project Details
	@PutMapping("/project-details/{projectId}")
	public ResponseEntity<ProjectEntity> updateProjectDetails(@PathVariable Integer projectId,
			@RequestBody ProjectEntity projectEntity) {
		logger.info("Method Entry - updateProjectDetails()");

		return ResponseEntity.ok(recordDataService.updateProjectDetails(projectId, projectEntity));
	}

//Get all project Details
	@GetMapping("/project-details")
	public ResponseEntity<List<ProjectEntity>> getAllProjects() {
		logger.info("Method Entry - getAllProjects()");
		return ResponseEntity.ok(recordDataService.getAllProjects());

	}

	@GetMapping("/siteids")
	public ResponseEntity<List<SiteDto>> getSiteids() {
		logger.info("Method Entry - getSiteids()");

		List<SiteDto> siteDtos = recordDataService.getSiteIds();
		if (((siteDtos).isEmpty()))
			throw new CustomMessageException("No Sites Found");

		return ResponseEntity.ok(siteDtos);
	}

	@GetMapping("/sponsors")
	public ResponseEntity<List<SponsorDto>> getSponsors() {
		logger.info("Method Entry - getSponsors()");

		List<SponsorDto> sponsorDtos = recordDataService.getSponsors();
		if (((sponsorDtos).isEmpty()))
			throw new CustomMessageException("No Sponsors Found");

		return ResponseEntity.ok(sponsorDtos);
	}

	@GetMapping("/cros")
	public ResponseEntity<List<CroDto>> getCROS() {
		logger.info("Method Entry - getCROS()");

		List<CroDto> croDtos = recordDataService.getCros();
		if (((croDtos).isEmpty()))
			throw new CustomMessageException("No Cros Found");
		/* Returning the CRO Entity */
		return ResponseEntity.ok(croDtos);
	}
	
	//To retrieve project details to auto populate at add record
	@GetMapping("/projects")
	public ResponseEntity<List<ProjectDto>> getProjectDetails() {
		logger.info("Method Entry - getProjectDetails()");

		List<ProjectDto> projectDtos = recordDataService.getProjectDetails();
		if (((projectDtos).isEmpty()))
			throw new CustomMessageException("No Cros Found");
		/* Returning the project dto */
		return ResponseEntity.ok(projectDtos);
	}
	
	//Delete project Details
		@DeleteMapping("/project-details/{Id}")
		public ResponseEntity<String> deleteProjectDetails(@PathVariable Integer Id) {
			logger.info("Method Entry - deleteProjectDetails()");			
			
			return ResponseEntity.ok(recordDataService.deleteProjectDetails(Id));
		}
		
		//Delete site Details
				@DeleteMapping("/site-details/{Id}")
				public ResponseEntity<String> deleteSiteDetails(@PathVariable Integer Id) {
					logger.info("Method Entry - deleteSiteDetails()");			
					
					return ResponseEntity.ok(recordDataService.deleteSiteDetails(Id));
				}
				
				//Delete Cro Details
				@DeleteMapping("/cro-details/{Id}")
				public ResponseEntity<String> deleteCroDetails(@PathVariable Integer Id) {
					logger.info("Method Entry - deleteCroDetails()");			
					
					return ResponseEntity.ok(recordDataService.deleteCroDetails(Id));
				}
				
				//Delete Sponsor Details
				@DeleteMapping("/sponsor-details/{Id}")
				public ResponseEntity<String> deleteSponsorDetails(@PathVariable Integer Id) {
					logger.info("Method Entry - deleteSponsorDetails()");			
					
					return ResponseEntity.ok(recordDataService.deleteSponsorDetails(Id));
				}

		 @GetMapping("/export/auditexcel")
		    public ResponseEntity<byte[]> exportAuditExcel(@RequestParam(name="startDate",required = false) String startDate,
														   @RequestParam(name="endDate",  required = false) String endDate,
														   @RequestParam(name="siteId",   required = false) String siteId,
														   @RequestParam(name="subjectId",required = false) Optional<String> subjectId,
														 @RequestParam(name="fromSubjectId",required = false) Optional<String> fromSubjectId,
														 @RequestParam(name="toSubjectId",required = false) Optional<String> toSubjectId  
														   ){

		        logger.info("Controller Method Entry- exportExcel ");
		        Result result = getDates(startDate, endDate);

		        /* Exporting data from DB */
		        List<AuditEntity> recordEntityData = getAuditData(result.parsedStartDate(), result.parsedEndDate(),siteId,subjectId,fromSubjectId,toSubjectId);
				logger.info("-----------------recordEntityData-----------------");
				logger.info(recordEntityData);
		        /*Generating Workbook for fetched rows*/
		        Workbook  workbook=getAuditWorkbook(recordEntityData);
		        return getResponse(workbook,AUDIT);

		    }

		    @GetMapping("/export/excel")
		    public ResponseEntity<byte[]> exportExcel(@RequestParam(name="startDate",required = false) String startDate,
		                                              @RequestParam(name="endDate",  required = false) String endDate,
													  @RequestParam(name="siteId",   required = false) String siteId,
													  @RequestParam(name="subjectId",required = false) Optional<String> subjectId,
													  @RequestParam(name="fromSubjectId",required = false) Optional<String> fromSubjectId,
													   @RequestParam(name="toSubjectId",required = false) Optional<String> toSubjectId 
													 
													  ){

		        logger.info("Controller Method Entry- exportExcel ");
		        Result result = getDates(startDate, endDate);

		        /* Exporting data from DB */
		        List<RecordMasterData> recordMasterData = getRecordMasterData(result.parsedStartDate(), result.parsedEndDate(),siteId,subjectId,fromSubjectId,toSubjectId);
		        /*Generating Workbook for fetched rows*/
		        Workbook  workbook=getWorkbook(recordMasterData);

		        return getResponse(workbook, GENERAL);

		    }

		    private ResponseEntity<byte[]> getResponse(Workbook  workbook,String type) {

		       /*Convert WorkBook to Byte Array*/
		        byte[] excelBytes = getExcelBytes(workbook);

		        /* Headers for the response*/
		        HttpHeaders httpHeaders=new HttpHeaders();
		        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		        if(type.equals(AUDIT)){
		            httpHeaders.setContentDispositionFormData("attachment","ECRF_Audit_Export.xlsx");
		        }else{
		            httpHeaders.setContentDispositionFormData("attachment","ECRF_MasterData_Export.xlsx");
		        }


		        /*Returning the Excel file as Entity*/
		        logger.info("Controller Method Exit- exportExcel ");
		        return ResponseEntity.ok().headers(httpHeaders).body(excelBytes);
		    }

		    private static Result getDates(String startDate, String endDate) {

		        /* check if dates are in format yyyy-mm-dd*/

		        DateTimeFormatter dateTimeFormatter=DateTimeFormatter.ofPattern("yyyy-MM-dd");

		        LocalDateTime parsedStartDate=null;
		        LocalDateTime parsedEndDate=null;


		        try{

					if(startDate!=null && !(startDate.isEmpty()) && endDate !=null && !(endDate.isEmpty())) {


						LocalDate parsedStartDateWithoutTime = LocalDate.parse(startDate, dateTimeFormatter);
						LocalDate parsedEndDateWithoutTime = LocalDate.parse(endDate, dateTimeFormatter);
						parsedStartDate = LocalDateTime.of(parsedStartDateWithoutTime, LocalTime.MIN);
						parsedEndDate = LocalDateTime.of(parsedEndDateWithoutTime, LocalTime.MAX);

					}
		        }catch(Exception e){
		            throw new CustomMessageException("Invalid Dates provided to extract report");
		        }
		        Result result = new Result(parsedStartDate, parsedEndDate);
		        return result;
		    }

		    private record Result(LocalDateTime parsedStartDate, LocalDateTime parsedEndDate) {
		    }

		    private byte[] getExcelBytes(Workbook workbook) {
		        byte[] excelBytes;
		        try(ByteArrayOutputStream bos=new ByteArrayOutputStream()){

		            workbook.write(bos);
		            excelBytes= bos.toByteArray();
		        }catch(IOException e){
		            logger.info("unable to create ByteArray from workbook {}" , e.getMessage());
		            throw new CustomMessageException("unable to create ByteArray from workbook  ");
		        }
		        return excelBytes;
		    }

		    private Workbook getWorkbook(List<RecordMasterData> recordMasterData) {
		        Workbook workbook;
		        try {
		            workbook = excelGenerator.generateExcel(recordMasterData);
		        } catch (Exception e) {
		            logger.info("unable to export RecordMasterData into workbook {} " , e.getMessage());
		            throw new CustomMessageException("unable to export RecordMasterData into workbook ");
		        }
		        return workbook;
		    }


		    private Workbook getAuditWorkbook(List<AuditEntity> auditData) {
		        Workbook workbook;
		        try {
		            workbook = excelGenerator.generateAuditExcel(auditData);
		        } catch (Exception e) {
		            logger.info("unable to export RecordMasterData into workbook {} " , e.getMessage());
		            throw new CustomMessageException("unable to export RecordMasterData into workbook ");
		        }
		        return workbook;
		    }


		    private List<RecordMasterData> getRecordMasterData(LocalDateTime parsedStartDate, LocalDateTime parsedEndDate,String siteId,Optional<String> subjectId,Optional<String> fromSubjectId,Optional<String> toSubjectId) {
		        List<RecordMasterData> recordMasterData;
		        try{
		            recordMasterData = exportExcelService.exportExcel(parsedStartDate,parsedEndDate,siteId,fromSubjectId,toSubjectId);
					logger.info("Below Criteria is passed for Master Data Export");
					//printCriteria(parsedStartDate, parsedEndDate, siteId, subjectId);
					logger.info("Number of Records Extracted : {} ",recordMasterData.size());
		        }catch (Exception e){
		            logger.error("unable to fetch RecordMasterData from DB {} " , e.getMessage(),e);
		            throw new CustomMessageException("unable to fetch RecordMasterData from DB ");
		        }
		        return recordMasterData;
		    }


		    private List<AuditEntity> getAuditData(LocalDateTime parsedStartDate, LocalDateTime parsedEndDate,String siteId,Optional<String> subjectId,Optional<String> fromSubjectId,Optional<String> toSubjectId) {
		        List<AuditEntity> auditData;
		        try{
		            auditData = exportExcelService.exportAuditExcel(parsedStartDate,parsedEndDate,siteId,fromSubjectId,toSubjectId);

					logger.info("Below Criteria is passed for Audit Data Export");
					printCriteria(parsedStartDate, parsedEndDate, siteId, subjectId);
					logger.info("Number of Records Extracted : {} ",auditData.size());


		        }catch (Exception e){
		            logger.error("unable to fetch RecordMasterData from DB {} " , e.getMessage(),e);
		            throw new CustomMessageException("unable to fetch RecordMasterData from DB ");
		        }
		        return auditData;
		    }

	private void printCriteria(LocalDateTime parsedStartDate, LocalDateTime parsedEndDate, String siteId, Optional<String> subjectId) {


		if (parsedStartDate !=null && parsedEndDate !=null){
			logger.info("Start End dates are {} and {} ",  parsedStartDate.toLocalDate()
					, parsedEndDate.toLocalDate());
		}

		if(siteId !=null){
			logger.info("Site Id : {}", siteId);
		}

		if(subjectId !=null){
			logger.info("Subject Id : {}", subjectId);
		}
	}
// To get all recent records based on logged in role for inbox
	@GetMapping("/overviewReport")
	public ResponseEntity<List<Map<String, Object>>> dashboardReport(
			@RequestParam(name = "startDate", required = false) String startDate,
			@RequestParam(name = "endDate", required = false) String endDate,
			@RequestParam(name = "siteId", required = false) String siteId,
			@RequestParam("fromSubjectId") Optional<String> fromSubjectId,
			@RequestParam("toSubjectId") Optional<String> toSubjectId
			) {
		logger.info("Method Entry - dashboardReport()");
		logger.info("fromDate :"+startDate);
				logger.info("toDate :"+endDate);

		Result result = getDates(startDate, endDate);

		List<Map<String, Object>> recordDTO = recordDataService.dashboardReport(result.parsedStartDate(),
				result.parsedEndDate(), siteId,fromSubjectId,toSubjectId);
		

		return ResponseEntity.ok(recordDTO);
	}
@PostMapping("/updateStatus")
	public ResponseEntity<RecordMasterData> updateStatus(@RequestBody RecordMasterData recordMasterData) {
		logger.info("Method Entry - updateStatus()");
		logger.info("Status "+recordMasterData.getStatus());
		logger.info("ID "+recordMasterData.getId());
		  RecordMasterData record =this.ecrfRepository.findById(recordMasterData.getId())
                                            .orElseThrow(() -> new CustomMessageException("No Records Found for this Id"));
		record.setStatus(recordMasterData.getStatus());
		RecordMasterData savedData=this.ecrfRepository.save(record);

		return ResponseEntity.ok(savedData);
	}

}
