package com.ecrf.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.Type;

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
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "audit_data")

public class AuditEntity {

	public static final String TABLE_NAME = "audit_data";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "record_id")
	private String recordId;
	
	@Column(name = "subject_id")
	private String subjectId;
	
	@Column(name = "site_id")
	private String siteId;

	@Column(name = "modified_by")
	private String modifiedBy;

	@Column(name = "modified_on")
	//@JsonProperty("date") @JsonDeserialize(using = MultiDateDeserializer.class)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd[ HH:mm:ss]")	
	private LocalDateTime  modifiedOn;
	
	@Column(columnDefinition = "jsonb", name = "audit_data")
	@Type(JsonBinaryType.class)
	private List<Object> auditData;
	
	@Column(name = "role")
	private String role;


}