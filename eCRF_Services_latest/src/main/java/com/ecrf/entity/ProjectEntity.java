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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_details")

public class ProjectEntity {

	public static final String TABLE_NAME = "project_details";

	@Serial
	private static final long serialVersionUID = 2137607105409362080L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "study_id")

	private String studyId;

	@Column(name = "sponsor_name")

	private String sponsorName;

	@Column(name = "cro_name")

	private String croName;

	@Column(name = "regulatory_agency")

	private String regulatoryAgency;
	
	@Column(name = "study_title")

	private String studyTitle;

	@Column(name = "study_design")

	private String studyDesign;

	@Column(name = "phase")

	private String phase;

	@Column(name = "default_StudyDesign")

	private String defaultStudyDesign;

	@Column(name = "created_by")

	private String createdBy;

	@Column(name = "created_on")
	// @JsonProperty("date") @JsonDeserialize(using = MultiDateDeserializer.class)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd[ HH:mm:ss]")
	private LocalDateTime createdOn;

	@Column(name = "changed_by")

	private String changedBy;

	@Column(name = "changed_on")
	// @JsonProperty("date") @JsonDeserialize(using = MultiDateDeserializer.class)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd[ HH:mm:ss]")
	private LocalDateTime changedOn;

}