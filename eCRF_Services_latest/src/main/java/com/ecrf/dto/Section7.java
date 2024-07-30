package com.ecrf.dto;


import com.ecrf.utilities.MapKey;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Section7 {



    private String largeTurmorValue	;
    @MapKey("tPrimaryValue")
    private String tprimaryValue	;//radio buttons
    @MapKey("nRegionalValue")
    private String nregionalValue	;//radio buttons
    @MapKey("mRegionalValue")
    private String mregionalValue	;//radio buttons
    private String anatomicStageTNM	;
    private String tumorDiffValue	;
    private String ecogperformace	;
    private String tumorStageValue	;
    private String typeOfVascular	;
    private String microvascularInvasion	;
    private String tumorWithinMilan	;
    private String childPughClassfication	;
    private String barcelonaClinic	;
}
