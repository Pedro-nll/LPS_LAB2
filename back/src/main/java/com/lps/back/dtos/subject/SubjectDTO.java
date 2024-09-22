package com.lps.back.dtos.subject;

import java.util.List;

import com.lps.back.utils.SubjectSituationEnum;

public record SubjectDTO(Long id, Double price, SubjectSituationEnum situationEnum, List<String> CurriculumName,
        String name, Integer credits) {

}
