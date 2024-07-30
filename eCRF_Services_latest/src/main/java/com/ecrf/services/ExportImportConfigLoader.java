package com.ecrf.services;


/*
This Class is for importing config from Excel file using start up
 */


import com.ecrf.entity.ExportImportConfig;
import lombok.Getter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import org.apache.poi.ss.usermodel.*;

@Getter
@Service
public class ExportImportConfigLoader implements ApplicationListener<ApplicationStartedEvent> {

    private ArrayList<ExportImportConfig> keysList;
    private static final  Logger logger = LogManager.getLogger(ExportImportConfigLoader.class);


    @Override
    public boolean supportsAsyncExecution() {
        return ApplicationListener.super.supportsAsyncExecution();
    }



    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        logger.info("Entry ExportImportConfigLoader : onApplicationEvent() ");
        ClassPathResource resource = new ClassPathResource("ECRF_Export_Mapping_Document.xlsx");
        try {
            loadConfigFromExcel(resource.getInputStream());
        } catch (IOException e) {
            logger.error("Unable to Load File ECRF_Export_Mapping_Document.xlsx");
            logger.error(e.getMessage());
        }
        logger.info("Exit ConfigLoadService : onApplicationEvent() ");
    }

    private void loadConfigFromExcel(InputStream inputStream) {

        logger.info("Entry ExportImportConfigLoader : loadConfigFromExcel() ");

        try  (Workbook workbook = WorkbookFactory.create(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            keysList = new ArrayList<>();

            for (int i=0;i<sheet.getPhysicalNumberOfRows();i++) {

                Row row = sheet.getRow(i);
                // Skip the first row (header row)
                if (i == 0) {
                    continue;
                }
                ExportImportConfig exportImportConfig=ExportImportConfig.builder()
                        .databaseKey(row.getCell(0) !=null ? row.getCell(0).getStringCellValue():null)
                        .columnName(row.getCell(1) !=null ? row.getCell(1).getStringCellValue():null)
                        .section(row.getCell(2) !=null ? row.getCell(2).getStringCellValue():null)
                        .build();

                logger.info(exportImportConfig);
                keysList.add(exportImportConfig);
            }

        } catch (IOException |  IllegalStateException | NullPointerException e) {
            logger.error("Unable to create config from File ECRF_Export_Mapping_Document.xlsx");
            logger.error(e.getMessage());
        }

        logger.info("Exit ExportImportConfigLoader : loadConfigFromExcel() ");
        logger.info("No of Config loaded ConfigLoadService : {} " ,keysList.size());
    }




}