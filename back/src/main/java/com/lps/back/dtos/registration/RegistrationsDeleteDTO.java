package com.lps.back.dtos.registration;

import java.util.List;

public record RegistrationsDeleteDTO(Long registrationId, List<Long> subjectsIds) {

}
