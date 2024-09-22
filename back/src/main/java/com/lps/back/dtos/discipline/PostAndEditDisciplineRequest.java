package com.lps.back.dtos.discipline;

import java.util.List;

public record PostAndEditDisciplineRequest(String name, Integer credits, List<Long> curriculumsId) {}