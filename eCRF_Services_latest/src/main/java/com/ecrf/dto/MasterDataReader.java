package com.ecrf.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class MasterDataReader {


    public MasterDataReader() {
        this.section1 = new Section1();
        this.section2 = new Section2();
        this.section3 = new Section3();
        this.section4 = new Section4();
        this.section5 = new Section5();
        this.section6 = new Section6();
        this.section7 = new Section7();
        this.section8 = new Section8();
        this.section9 = new Section9();
        this.section10 = new Section10();
        this.section11 = new Section11();
        this.section12 = new Section12();
        this.section13 = new Section13();
        this.section14 = new Section14();
    }
    private String subjectId;
    private String siteId;
    private Section1 section1;
    private Section2 section2;
    private Section3 section3;
    private Section4 section4;
    private Section5 section5;
    private Section6 section6;
    private Section7 section7;
    private Section8 section8;
    private Section9 section9;
    private Section10 section10;
    private Section11 section11;
    private Section12 section12;
    private Section13 section13;
    private Section14 section14;


}
