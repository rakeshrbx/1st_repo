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
@Table(name = "cro_details")

public class CROEntity {

	public static final String TABLE_NAME = "cro_details";

	@Serial
	private static final long serialVersionUID = 2137607105409362080L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "cro_code")

	private String croCode;

	@Column(name = "cro_name")

	private String croName;

	@Column(name = "legal_name")

	private String legalName;

	@Column(columnDefinition = "jsonb", name = "Address_Details")
	@Type(JsonBinaryType.class)
	private Map<String, Object> addressDetails;

	@Column(columnDefinition = "jsonb", name = "communication_details")
	@Type(JsonBinaryType.class)
	private Map<String, Object> communicationDetails;

	@Column(name = "notes")

	private String notes;

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