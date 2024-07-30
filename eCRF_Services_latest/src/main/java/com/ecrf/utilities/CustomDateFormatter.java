package com.ecrf.utilities;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class CustomDateFormatter {

	public LocalDateTime formatDate(String dateToFormat) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd[ HH:mm:ss]");
		return LocalDateTime.parse(dateToFormat, formatter);

	}
}
