package com.ecrf.services;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecrf.dto.MasterDataReader;
import com.ecrf.dto.Section14;
import com.ecrf.entity.RecordMasterData;
import com.ecrf.exceptionhandler.CustomMessageException;
import com.ecrf.repository.EcrfRepository;
import com.ecrf.utilities.CustomDateFormatter;
import com.ecrf.utilities.ExcelProcessor;
import com.ecrf.utilities.MapKey;

@Service
public class ImportExcelService {

    private static final Logger logger = LogManager.getLogger(ImportExcelService.class);
    public static final String DATAENTRY = "ROLE_DATAENTRY";
    public static final String REVIEWER = "ROLE_REVIEWER";
    public static final String STATUS = "at reviewer";
    EcrfRepository ecrfRepository;
    ExcelProcessor excelProcessor;

    // Define the format you want
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    CustomDateFormatter customDateFormatter;
    RecordDataServiceImpl recordDataService;

    @Autowired
    public ImportExcelService(EcrfRepository ecrfRepository, ExcelProcessor excelProcessor,
            RecordDataServiceImpl recordDataService) {
        this.ecrfRepository = ecrfRepository;
        this.excelProcessor = excelProcessor;
        this.recordDataService = recordDataService;
    }

    public List<RecordMasterData> uploadFile(MultipartFile file) {
        logger.info("Service Method Entry- uploadFile ");
        List<RecordMasterData> savedrecordMasterData = null;
        try {
            List<MasterDataReader> masterDatareaderList = excelProcessor.masterDataReaderExcel(file);
            logger.info("masterDatareaderList Count " + masterDatareaderList.size());

            for (MasterDataReader masterDataReader : masterDatareaderList) {
                String siteId = masterDataReader.getSiteId();
                logger.info("Start Processing SiteId {}", siteId);
                RecordMasterData recordMasterData = new RecordMasterData();
                recordMasterData.setSiteId(masterDataReader.getSiteId());
                recordMasterData.setSubjectId(masterDataReader.getSubjectId());
                recordMasterData.setSection1(entityToMap(masterDataReader.getSection1()));
                recordMasterData.setSection2(entityToMap(masterDataReader.getSection2()));
                recordMasterData.setSection3(entityToMap(masterDataReader.getSection3()));
                recordMasterData.setSection4(entityToMap(masterDataReader.getSection4()));
                recordMasterData.setSection5(entityToMap(masterDataReader.getSection5()));
                recordMasterData.setSection6(entityToMap(masterDataReader.getSection6()));
                recordMasterData.setSection7(entityToMap(masterDataReader.getSection7()));
                recordMasterData.setSection8(entityToMap(masterDataReader.getSection8()));
                recordMasterData.setSection9(entityToMap(masterDataReader.getSection9()));
                recordMasterData.setSection10(entityToMap(masterDataReader.getSection10()));
                recordMasterData.setSection11(entityToMap(masterDataReader.getSection11()));
                recordMasterData.setSection12(entityToMap(masterDataReader.getSection12()));
                recordMasterData.setSection13(entityToMap(masterDataReader.getSection13()));
                recordMasterData.setSection14(entityToMap(getSection14()));

                recordMasterData.setCreateDate(LocalDateTime.parse(LocalDateTime.now().format(formatter), formatter));
                recordMasterData.setDispatchDate(LocalDateTime.parse(LocalDateTime.now().format(formatter), formatter));
                recordMasterData.setDispatchedFrom(DATAENTRY);
                // recordMasterData.setDispatchedTo(REVIEWER);
                // recordMasterData.setStatus(STATUS);
                recordMasterData.setDispatchedTo(DATAENTRY);
                recordMasterData.setStatus("INIT");

                recordDataService.addOneRecord(recordMasterData);
                logger.info("End Processing SiteId {}", siteId);
            }

            logger.info("Processing {} records Complete", masterDatareaderList.size());

        } catch (Exception e) {
            logger.error("Unable to Process data from Excel rows {} ", e.getMessage(), e);
            throw new CustomMessageException("Unable to Process data from Excel rows");
        }
        logger.info("Service Method Exit- uploadFile ");
        return savedrecordMasterData;
    }

    public static Map<String, Object> entityToMap(Object entity) throws IllegalAccessException {
        logger.info("Start entityToMap {}", entity.getClass());
        Map<String, Object> map = new HashMap<>();
        Class<?> clazz = entity.getClass();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true); // Allows accessing private fields
            Object value = field.get(entity);
            String key = field.getName();
            // Check if the field has the MapKey annotation
            if (field.isAnnotationPresent(MapKey.class)) {
                MapKey mapKeyAnnotation = field.getAnnotation(MapKey.class);
                key = mapKeyAnnotation.value();
            }
            map.put(key, value);
        }
        logger.info("End entityToMap {}", entity.getClass());
        return map;
    }

    protected Section14 getSection14() {

        Section14 section14 = new Section14();
        section14.setChangedBy("Admin");
        section14.setCreatedBy("Admin");
        section14.setCreatedOn(LocalDateTime.now().format(formatter));
        section14.setChangedOn(LocalDateTime.now().format(formatter));

        return section14;

    }

}
