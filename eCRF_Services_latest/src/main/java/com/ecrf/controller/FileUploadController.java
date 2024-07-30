package com.ecrf.controller;

import com.ecrf.exceptionhandler.CustomMessageException;
import com.ecrf.services.ImportExcelService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@RestController
public class FileUploadController {



    private final ImportExcelService importExcelService;

    private static final Logger logger = LogManager.getLogger(FileUploadController.class);

    @Autowired
    public FileUploadController(ImportExcelService importExcelService) {
        this.importExcelService = importExcelService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        logger.info("Controller Method Entry- uploadFile ");

        /*File Empty Check*/
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file!", HttpStatus.BAD_REQUEST);
        }

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            /*Calling the service method for file upload*/
            importExcelService.uploadFile(file);
            logger.info("Controller Method Exit- uploadFile ");
            return new ResponseEntity<>("File uploaded successfully: " + fileName, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Unable to Upload file Excel file {} ", e.getMessage(),e);
            throw new CustomMessageException("Unable to Upload file Excel file");
        }


    }
}
