package com.lps.back.utils;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class SubjectSituationEnumTest {

    @Test
    void testEnumValues() {
        SubjectSituationEnum[] values = SubjectSituationEnum.values();
        assertEquals(6, values.length);
        
        assertTrue(containsEnumValue(values, "Approved"));
        assertTrue(containsEnumValue(values, "Fail"));
        assertTrue(containsEnumValue(values, "InProgress"));
        assertTrue(containsEnumValue(values, "Canceled"));
        assertTrue(containsEnumValue(values, "Available"));
        assertTrue(containsEnumValue(values, "Closed"));
    }

    @Test
    void testEnumValuesOrder() {
        SubjectSituationEnum[] values = SubjectSituationEnum.values();
        
        assertEquals(SubjectSituationEnum.Approved, values[0]);
        assertEquals(SubjectSituationEnum.Fail, values[1]);
        assertEquals(SubjectSituationEnum.InProgress, values[2]);
        assertEquals(SubjectSituationEnum.Canceled, values[3]);
        assertEquals(SubjectSituationEnum.Available, values[4]);
        assertEquals(SubjectSituationEnum.Closed, values[5]);
    }

    @Test
    void testEnumValueOf() {
        assertEquals(SubjectSituationEnum.Approved, SubjectSituationEnum.valueOf("Approved"));
        assertEquals(SubjectSituationEnum.Fail, SubjectSituationEnum.valueOf("Fail"));
        assertEquals(SubjectSituationEnum.InProgress, SubjectSituationEnum.valueOf("InProgress"));
        assertEquals(SubjectSituationEnum.Canceled, SubjectSituationEnum.valueOf("Canceled"));
        assertEquals(SubjectSituationEnum.Available, SubjectSituationEnum.valueOf("Available"));
        assertEquals(SubjectSituationEnum.Closed, SubjectSituationEnum.valueOf("Closed"));
    }

    @Test
    void testEnumValueOfInvalid() {
        assertThrows(IllegalArgumentException.class, () -> SubjectSituationEnum.valueOf("InvalidValue"));
    }

    private boolean containsEnumValue(SubjectSituationEnum[] values, String valueName) {
        for (SubjectSituationEnum value : values) {
            if (value.name().equals(valueName)) {
                return true;
            }
        }
        return false;
    }
}
