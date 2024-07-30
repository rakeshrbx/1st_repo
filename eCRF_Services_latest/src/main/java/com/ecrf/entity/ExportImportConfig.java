package com.ecrf.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Builder
@Getter
@Setter
public class ExportImportConfig {

    private String databaseKey;
    private String columnName;
    private String section;

    @Override
    public String toString() {
        return "ExportImportConfig{" +
                "databaseKey='" + databaseKey + '\'' +
                ", columnName='" + columnName + '\'' +
                ", section='" + section + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExportImportConfig that = (ExportImportConfig) o;
        return Objects.equals(databaseKey, that.databaseKey) && Objects.equals(columnName, that.columnName) && Objects.equals(section, that.section);
    }

    @Override
    public int hashCode() {
        return Objects.hash(databaseKey, columnName, section);
    }

}
