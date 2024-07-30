package com.ecrf.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RecordDto {

	 private String id;
	 private LocalDateTime dispatchDate;
	 private LocalDateTime createDate;
	 private Map<String,Object> section1;
	 private Map<String,Object> section14;
	 private String subjectId;
	 private String status;
	 private String siteId;
	 private String dispatchedTo;
	 
	
	
	
}
