package com.lps.back.utils;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class UsuarioTypesEnumTest {

    @Test
    void testEnumValues() {
        UsuarioTypesEnum[] values = UsuarioTypesEnum.values();
        assertEquals(3, values.length);
        
        assertTrue(containsEnumValue(values, "STUDENT"));
        assertTrue(containsEnumValue(values, "TEACHER"));
        assertTrue(containsEnumValue(values, "SECRETARY"));
    }

    @Test
    void testEnumValuesOrder() {
        UsuarioTypesEnum[] values = UsuarioTypesEnum.values();
        
        assertEquals(UsuarioTypesEnum.STUDENT, values[0]);
        assertEquals(UsuarioTypesEnum.TEACHER, values[1]);
        assertEquals(UsuarioTypesEnum.SECRETARY, values[2]);
    }

    @Test
    void testEnumValueOf() {
        assertEquals(UsuarioTypesEnum.STUDENT, UsuarioTypesEnum.valueOf("STUDENT"));
        assertEquals(UsuarioTypesEnum.TEACHER, UsuarioTypesEnum.valueOf("TEACHER"));
        assertEquals(UsuarioTypesEnum.SECRETARY, UsuarioTypesEnum.valueOf("SECRETARY"));
    }

    @Test
    void testEnumValueOfInvalid() {
        assertThrows(IllegalArgumentException.class, () -> UsuarioTypesEnum.valueOf("INVALID_TYPE"));
    }

    private boolean containsEnumValue(UsuarioTypesEnum[] values, String valueName) {
        for (UsuarioTypesEnum value : values) {
            if (value.name().equals(valueName)) {
                return true;
            }
        }
        return false;
    }
}