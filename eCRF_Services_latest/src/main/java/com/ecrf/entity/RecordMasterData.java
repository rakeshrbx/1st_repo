package com.ecrf.entity;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.Map;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;

import com.ecrf.utilities.CustomSeqGenerator;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ecrf_master_data", uniqueConstraints = { 
	      @UniqueConstraint(columnNames = "subjectid"),
	      
	     })

public class RecordMasterData {

	public static final String TABLE_NAME = "ecrf_master_data";

	@Serial
	private static final long serialVersionUID = 2137607105409362080L;

	@Id
	@Column(name = "recordid")

	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jtpsequence")
	@GenericGenerator(name = "jtpsequence", type = CustomSeqGenerator.class, parameters = {
			@Parameter(name = CustomSeqGenerator.INCREMENT_PARAM, value = "1"),
			@Parameter(name = CustomSeqGenerator.VALUE_PREFIX_PARAMETER, value = "eCRFRecord"),
			@Parameter(name = CustomSeqGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;

	@Column(name = "siteid")

	private String siteId;
	
	
	@Column(name = "subjectid")

	private String subjectId;

	@Column(columnDefinition = "jsonb", name = "Section1")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section1;

	@Column(columnDefinition = "jsonb", name = "Section2")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section2;

	@Column(columnDefinition = "jsonb", name = "Section3")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section3;

	@Column(columnDefinition = "jsonb", name = "Section4")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section4;

	@Column(columnDefinition = "jsonb", name = "Section5")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section5;

	@Column(columnDefinition = "jsonb", name = "Section6")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section6;

	@Column(columnDefinition = "jsonb", name = "Section7")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section7;

	@Column(columnDefinition = "jsonb", name = "Section8")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section8;

	@Column(columnDefinition = "jsonb", name = "Section9")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section9;

	@Column(columnDefinition = "jsonb", name = "Section10")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section10;

	@Column(columnDefinition = "jsonb", name = "Section11")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section11;

	@Column(columnDefinition = "jsonb", name = "Section12")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section12;

	@Column(columnDefinition = "jsonb", name = "Section13")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section13;

	@Column(columnDefinition = "jsonb", name = "Section14")
	@Type(JsonBinaryType.class)
	private Map<String, Object> section14;

	/*
	 * @Id
	 * 
	 * @Column(name="last_name")
	 * 
	 * @GeneratedValue(strategy = GenerationType.SEQUENCE, generator =
	 * "jtpsequence1")
	 * 
	 * @GenericGenerator( name = "jtpsequence1", type=CustomSeqGenerator.class,
	 * parameters = {
	 * 
	 * @Parameter(name = CustomSeqGenerator.INCREMENT_PARAM, value = "1"),
	 * 
	 * @Parameter(name = CustomSeqGenerator.VALUE_PREFIX_PARAMETER, value = "B_"),
	 * 
	 * @Parameter(name = CustomSeqGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d")
	 * })
	 */
	@Column(name = "dispatchdate")
	// @JsonProperty("date") @JsonDeserialize(using = MultiDateDeserializer.class)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd[ HH:mm:ss]")
	private LocalDateTime dispatchDate;

	@Column(name = "createdate")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd[ HH:mm:ss]")
	private LocalDateTime createDate;

	@Column(name = "status")

	private String status;

	@Column(name = "dispatched_from")

	private String dispatchedFrom;

	@Column(name = "dispatched_to")

	private String dispatchedTo;

	@Column(columnDefinition = "jsonb", name = "comments")
	@Type(JsonBinaryType.class)
	private Map<String, Object> comments;

	
}