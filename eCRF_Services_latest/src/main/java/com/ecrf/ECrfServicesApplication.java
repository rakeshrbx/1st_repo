package com.ecrf;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

import com.ecrf.exceptionhandler.CustomMessageException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jxls.reader.ReaderBuilder;
import org.jxls.reader.XLSReader;
import org.modelmapper.ModelMapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


import com.ecrf.jwt.AuthTokenFilter;
import org.xml.sax.SAXException;

import static com.ecrf.utilities.ExcelProcessor.EXCEL_UPLOAD_XML;


@SpringBootApplication(scanBasePackages = {"com.ecrf","com.ecrf.controller","com.ecrf.exceptionhandler", "com.ecrf.repository","com.ecrf.services","com.ecrf.jwt","com.ecrf.utilities"})
public class ECrfServicesApplication {
	
	Logger logger = LogManager.getLogger(ECrfServicesApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ECrfServicesApplication.class, args);
	}


	 @Bean
	    public ModelMapper getModelMapper() { 
	        return new ModelMapper(); 
	    } 
	 
		
		/*
		 * @Bean public FilterRegistrationBean<AuthFilter> filterRegistrationBean() {
		 * FilterRegistrationBean<AuthFilter> registrationBean = new
		 * FilterRegistrationBean<>(); registrationBean.setOrder(1); AuthFilter
		 * authFilter = new AuthFilter(); registrationBean.setFilter(authFilter);
		 * registrationBean.addUrlPatterns("/*"); return registrationBean; }
		 */
		/*
		 * @Bean public ObjectMapper objectMapper() { JavaTimeModule module = new
		 * JavaTimeModule(); LocalDateTimeDeserializer localDateTimeDeserializer = new
		 * LocalDateTimeDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
		 * ; module.addDeserializer(LocalDateTime.class, localDateTimeDeserializer);
		 * ObjectMapper objectMapperObj = Jackson2ObjectMapperBuilder.json()
		 * .modules(module)
		 * .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS) .build();
		 * return objectMapperObj; }
		 */
	 
	 @Bean
	    public CorsFilter corsFilter() {
	        CorsConfiguration corsConfiguration = new CorsConfiguration();
	        corsConfiguration.setAllowCredentials(true);
	        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
	        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
	                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
	                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
	        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
	                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
	        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
	        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
	        return new CorsFilter(urlBasedCorsConfigurationSource);
	    }
	 @Bean
	  public AuthTokenFilter authenticationJwtTokenFilter() {
	    return new AuthTokenFilter();
	  }

	@Bean
	protected XLSReader getXLSReader() throws IOException {
		logger.info("Application Method Entry-getXLSReader()");
		ClassPathResource resource = new ClassPathResource(EXCEL_UPLOAD_XML);

		try (InputStream xmlInputStream =  resource.getInputStream()) {
			try {
				logger.info("Application Method Exit-getXLSReader()");
				return ReaderBuilder.buildFromXML(xmlInputStream);
			} catch (SAXException e) {
				logger.error("Unable to create XLSReader {} ", e.getMessage(),e);
				throw new CustomMessageException("Unable to create XLSReader");
			}
		}
	}

	 
}
