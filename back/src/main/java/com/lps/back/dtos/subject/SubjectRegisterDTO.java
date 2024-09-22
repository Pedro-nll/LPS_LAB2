package com.lps.back.dtos.subject;

import java.util.List;

public record SubjectRegisterDTO(Long disciplineId, double price, List<Long> teachersIds) {

}
