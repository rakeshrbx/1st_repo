package com.ecrf.utilities;

import com.ecrf.dto.MasterDataReader;
import com.ecrf.exceptionhandler.CustomMessageException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.jxls.reader.XLSReadStatus;
import org.jxls.reader.XLSReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExcelProcessor {

    private static final Logger logger = LogManager.getLogger(ExcelProcessor.class);
    public static final String EXCEL_UPLOAD_XML = "ExcelUpload.xml";
    private final XLSReader xlsReader;

    @Autowired
    public ExcelProcessor(XLSReader xlsReader) {
        this.xlsReader = xlsReader;
    }

    public List<MasterDataReader> masterDataReaderExcel(MultipartFile file) throws IOException {

        logger.info("ExcelProcessor Method Entry-masterDataReaderExcel()");

        List<MasterDataReader> masterDataReaderList = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {

            Map<String, Object> beans = new HashMap<>();
            beans.put("recordMasterDataList", masterDataReaderList);
            logger.info("Converting File to Beans -masterDataReaderExcel()");
            XLSReadStatus readStatus = xlsReader.read(inputStream, beans);
            if (!readStatus.isStatusOK()) {
                throw new IOException("Failed to read Excel file");
            }
            logger.info("Conversion Complete with size {}" ,masterDataReaderList.size());

        } catch (InvalidFormatException e) {
            logger.error("Unable to process data from Excel rows into beans {} ", e.getMessage(),e);
            throw new CustomMessageException("Unable to process data from Excel rows into beans");
        }
        logger.info("ExcelProcessor Method Exit-masterDataReaderExcel()");
        return masterDataReaderList;

    }



}
