package com.lps.back.dtos.discipline;

import java.util.List;

public class GetDisciplineResponse {

    private Long id;
    private String name;
    private Integer credits;
    private List<Long> curriculumsIds;

    // Constructor
    public GetDisciplineResponse(Long id, String name, Integer credits, List<Long> curriculumsIds) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.curriculumsIds = curriculumsIds;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public List<Long> getcurriculumsIds() {
        return curriculumsIds;
    }

    public void setcurriculumsIds(List<Long> curriculumsIds) {
        this.curriculumsIds = curriculumsIds;
    }
}