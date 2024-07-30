package com.ecrf.utilities;

import java.io.IOException;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.ecrf.entity.AuditEntity;
import com.ecrf.entity.ExportImportConfig;
import com.ecrf.entity.RecordMasterData;
import com.ecrf.exceptionhandler.CustomMessageException;
import com.ecrf.services.ExportImportConfigLoader;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ExcelGenerator {

    public static final String EXCEL_CONFIGURATION_IS_EMPTY = "Excel Configuration is Empty";
    public static final String NEW_VALUE = "newValue";
    public static final int STARTROW = 3;
    public static final String COMMENT = "comment";
    private static final Logger logger = LogManager.getLogger(ExcelGenerator.class);
    public static final String CHANGE = "Change";
    public static final String E_CRF_AUDIT_TEMPLATES = "eCRF_Audit_Templates_V2.xlsx";
    public static final String E_CRF_TEMPLATES = "eCRF_Templates_V2.xlsx";
    public static final String GENERAL = "General";
    public static final String EXPORT_TEMPLATE = "ExportTemplate";
    public static final String AUDIT = "Audit";
    public static final String SECTION = "sectionName";

    public static final String OLD_VALUE = "oldValue";
    public static final String EXPORT_AUDIT_TEMPLATE = "ExportAuditTemplate";
    public static final String SUBJECT_ID = "subjectId";
    public static final String SITE_ID = "siteId";
    public static final String LABEL_NAME = "labelName";
    public static final String FIELD_NAME = "fieldName";

    private final ExportImportConfigLoader exportImportConfigLoader;


    private  List<RecordMasterData> recordMasterDataList;
    private List<AuditEntity> auditEntities;
    private ArrayList<ExportImportConfig> config;

    @Autowired
    public ExcelGenerator(ExportImportConfigLoader exportImportConfigLoader) {
        this.exportImportConfigLoader = exportImportConfigLoader;
        this.config= exportImportConfigLoader.getKeysList();
    }

    public  Workbook generateExcel(List<RecordMasterData> recordMasterData){

        logger.info("ExcelGenerator Method Entry- generateExcel() ");

        // Load the Excel template from the classpath
        if(exportImportConfigLoader.getKeysList().isEmpty()){
            logger.error(EXCEL_CONFIGURATION_IS_EMPTY);
            throw new CustomMessageException(EXCEL_CONFIGURATION_IS_EMPTY);
        }


        this.recordMasterDataList=recordMasterData;

        //Populating the data rows and returning workbook
        Workbook workbook = populateDataRows(E_CRF_TEMPLATES, GENERAL);
        logger.info("ExcelGenerator Method Exit- generateExcel() ");


        return workbook;
    }


    private  Workbook populateDataRows(String file,String type) {

        logger.info("ExcelGenerator Method Entry- populateDataRows()");
        Workbook workbook;
        try
        {
            workbook = new XSSFWorkbook(getInputStream(file));



            //Populate data rows starting from the third row

            if(type.equals(AUDIT)){
                Sheet sheet = workbook.getSheet(EXPORT_AUDIT_TEMPLATE);
                populateAuditRows(sheet);
            }else{
                Sheet sheet = workbook.getSheet(EXPORT_TEMPLATE);
                populateRows(sheet);
            }

            logger.info("ExcelGenerator Method Exit- populateDataRows() ");

            return workbook;

        } catch (IOException e) {
            logger.error("Unable to populate data into Excel rows {} ", e.getMessage(),e);
            throw new CustomMessageException("Unable to populate data into rows");
        }
    }











    private  void populateRows(Sheet sheet) {

        logger.info("Initiate export of data for {} rows",this.recordMasterDataList.size());
        try {
            this.config= exportImportConfigLoader.getKeysList();
            IntStream.range(0, this.recordMasterDataList.size()).forEach(index ->
                    {
                        int rowIndex = index + STARTROW;
                        RecordMasterData recordMasterData = recordMasterDataList.get(index);
                        logger.info("Started Exporting data for record Id {} ", recordMasterData.getId());
                        Row row = sheet.createRow(rowIndex);

                        Map<String, Object> mergedMap = mergeMaps(recordMasterData);

                        IntStream.range(0, config.size()).forEach(configIndex ->
                                {

                                    ExportImportConfig exportImportConfig = config.get(configIndex);
                                    Object value = mergedMap.get(exportImportConfig.getDatabaseKey());

                                    if(exportImportConfig.getDatabaseKey() !=null && exportImportConfig.getDatabaseKey().equals(SUBJECT_ID)){
                                        row.createCell(configIndex).setCellValue(recordMasterData.getSubjectId());
                                    }
                                   else if(exportImportConfig.getDatabaseKey() !=null && exportImportConfig.getDatabaseKey().equals(SITE_ID)){
                                        row.createCell(configIndex).setCellValue(recordMasterData.getSiteId());
                                    }
                                    /*If DatabaseKey is null then update column value */
                                    else if (exportImportConfig.getDatabaseKey() == null) {
                                        row.createCell(configIndex).setCellValue(exportImportConfig.getColumnName());
                                    }
                                    /*If value is null then update empty  */
                                    else if (value == null) {
                                        row.createCell(configIndex).setCellValue("");
                                    } else {
                                        row.createCell(configIndex).setCellValue(String.valueOf(value));
                                    }
                                }

                        );

                        logger.info("End exporting data for record Id {} ", recordMasterData.getId());
                    }
            );
        }catch(Exception e){
            logger.error("Unable to Populate Rows into Sheet {}", e.getMessage(),e);
            throw new CustomMessageException("Unable to Populate Rows into Sheet");

        }

        logger.info("Complete Exporting data ");
    }


    public  Workbook generateAuditExcel(List<AuditEntity> auditData){

        logger.info("ExcelGenerator Method Entry- generateAuditExcel() ");

        // Load the Excel template from the classpath
        if(exportImportConfigLoader.getKeysList().isEmpty()){
            logger.error(EXCEL_CONFIGURATION_IS_EMPTY);
            throw new CustomMessageException(EXCEL_CONFIGURATION_IS_EMPTY);

        }

        this.auditEntities=auditData;

        //Populating the data rows and returning workbook
        Workbook workbook = populateDataRows(E_CRF_AUDIT_TEMPLATES, AUDIT);
        logger.info("ExcelGenerator Method Exit- generateAuditExcel() ");


        return workbook;
    }

    private void populateAuditRows(Sheet sheet) {

        logger.info("Initiate Audit export of data for {} rows",auditEntities.size());

        int[] rowIndex={1};

        try{
            this.config= exportImportConfigLoader.getKeysList();
            auditEntities.stream().forEach(auditEntity -> {
                logger.info("Started Exporting data for record Id {} ", auditEntity.getId());
                List<Object> objects = auditEntity.getAuditData();
                IntStream.range(0, objects.size()).forEach(jsonIndex ->
                        {

                            Row row = sheet.createRow(rowIndex[0]);
                            Object obj = objects.get(jsonIndex);
                            Map<String, Object> map = convertObjectToMap(obj);
                            logger.info("map:   "+map);
                            row.createCell(0).setCellValue(auditEntity.getSiteId());
                            String subjectId = auditEntity.getSubjectId();
                            String s=subjectId!=null?subjectId.split("-").length==2?subjectId.split("-")[1]:"":"";
                            logger.info("-----------result----------"+s);
                            row.createCell(1).setCellValue(s);
                            row.createCell(2).setCellValue(String.valueOf(map.get(SECTION)));
                            row.createCell(3).setCellValue(String.valueOf(map.get(LABEL_NAME)));
                            row.createCell(4).setCellValue(CHANGE);
                            row.createCell(5).setCellValue(String.valueOf(map.get(OLD_VALUE)));
                            row.createCell(6).setCellValue(String.valueOf(map.get(NEW_VALUE)));
                            row.createCell(7).setCellValue(String.valueOf(map.get(COMMENT)));
                            row.createCell(8).setCellValue(auditEntity.getModifiedBy());
                            row.createCell(9).setCellValue(auditEntity.getRole());
                            row.createCell(10).setCellValue(auditEntity.getModifiedOn().format(DateTimeFormatter.ofPattern("DD-MM-YYYY, HH:mm:ss")));
                            row.createCell(11).setCellValue(String.valueOf(map.get(FIELD_NAME)));
                            rowIndex[0]++;
                        }


                );
                logger.info("End exporting data for record Id {} ", auditEntity.getId());
            });
        }catch (Exception e){
            logger.error("Unable to PopulateAudit Rows into Sheet {}", e.getMessage(),e);
            throw new CustomMessageException("Unable to PopulateAudit Rows into Sheet");
        }


        logger.info("Complete Exporting data ");
    }


    private  HashMap<String, Object> mergeMaps( RecordMasterData recordMasterData){

        logger.info("ExcelGenerator Method Entry- mergeMaps() for Record Id {} ",recordMasterData.getId() );

        HashMap<String, Object> mergedMap;
        try{
            mergedMap= new HashMap<>(recordMasterData.getSection1());
            mergedMap.putAll(recordMasterData.getSection2());
            mergedMap.putAll(recordMasterData.getSection3());
            mergedMap.putAll(recordMasterData.getSection4());
            mergedMap.putAll(recordMasterData.getSection5());
            mergedMap.putAll(recordMasterData.getSection6());
            mergedMap.putAll(recordMasterData.getSection7());
            mergedMap.putAll(recordMasterData.getSection8());
            mergedMap.putAll(recordMasterData.getSection9());
            mergedMap.putAll(recordMasterData.getSection10());
            mergedMap.putAll(recordMasterData.getSection11());
            mergedMap.putAll(recordMasterData.getSection12());
            mergedMap.putAll(recordMasterData.getSection13());
            mergedMap.putAll(recordMasterData.getSection14());
    }catch(Exception e){
        logger.error("Unable to Merge Maps {} ",e.getMessage(),e);
        throw new CustomMessageException("Unable to Merge Maps" );
    }


        logger.info("ExcelGenerator Method Exit- mergeMaps() for Record Id {} ",recordMasterData.getId() );
       return mergedMap;

    }


    private static InputStream getInputStream(String file) {
        InputStream inputStream;
        try {
            inputStream = new ClassPathResource(file).getInputStream();
        } catch (IOException e) {
            logger.error("Unable to access Excel {} {} ",file, e.getMessage(),e);
            throw new CustomMessageException("Unable to access Excel");
        }
        return inputStream;
    }

    public static Map<String,Object> convertObjectToMap(Object jsonObject) {
        // Create ObjectMapper instance
        ObjectMapper objectMapper = new ObjectMapper();

        // Convert Object to Map<String, String>
        return objectMapper.convertValue(jsonObject, Map.class);
    }

}
