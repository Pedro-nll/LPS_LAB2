package com.lps.back.utils;

public enum SubjectSituationEnum {
    Approved, // Approved
    Fail, // Failed
    InProgress, // In progress
    Canceled, // Canceled based on the number of students
    Available, // Waiting for end time of registration
    Closed; // Closed based on the number of students
}
