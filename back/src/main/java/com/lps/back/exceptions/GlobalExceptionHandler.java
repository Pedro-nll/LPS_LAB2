package com.lps.back.exceptions;

import java.io.UnsupportedEncodingException;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.lps.back.dtos.ResponseDTO;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseDTO> handleIllegalArgumentException(IllegalArgumentException e) {
        ResponseDTO message = new ResponseDTO("IllegalArgumentException", e.getMessage());
        return ResponseEntity.badRequest().body(message);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ResponseDTO> handleEntityNotFoundException(EntityNotFoundException e) {
        ResponseDTO message = new ResponseDTO("EntityNotFoundException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ResponseDTO> handleNoSuchElementException(NoSuchElementException e) {
        ResponseDTO message = new ResponseDTO("NoSuchElementException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ResponseDTO> handleNoHandlerFoundException(NoHandlerFoundException e) {
        ResponseDTO message = new ResponseDTO("NoHandlerFoundException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseDTO> runtimeException(RuntimeException e) {
        ResponseDTO message = new ResponseDTO("Exception", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }

    @ExceptionHandler(InvalidInformationException.class)
    public ResponseEntity<ResponseDTO> handleInvalidInformationException(InvalidInformationException e) {
        ResponseDTO message = new ResponseDTO("InvalidInformationException", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    @ExceptionHandler(ChangePasswordException.class)
    public ResponseEntity<ResponseDTO> handleChangePasswordException(ChangePasswordException e) {
        ResponseDTO message = new ResponseDTO("ChangePasswordException", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    @ExceptionHandler(EntityAlreadyExistsException.class)
    public ResponseEntity<ResponseDTO> handleEntityAlreadyExistsException(EntityAlreadyExistsException e) {
        ResponseDTO message = new ResponseDTO("EntityAlreadyExistsException", e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
    }

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity<ResponseDTO> handleObjectNotFoundException(ObjectNotFoundException e) {
        ResponseDTO message = new ResponseDTO("ObjectNotFoundException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ResponseDTO> handleMessagingException(MessagingException e) {
        ResponseDTO message = new ResponseDTO("MessagingException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(UnsupportedEncodingException.class)
    public ResponseEntity<ResponseDTO> handleUnsupportedEncodingException(UnsupportedEncodingException e) {
        ResponseDTO message = new ResponseDTO("UnsupportedEncodingException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

}
