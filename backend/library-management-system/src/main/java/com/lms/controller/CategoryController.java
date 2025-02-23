package com.lms.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.ErrorResponseDTO;
import com.lms.dto.request.CategoryRequestDTO;
import com.lms.dto.response.CategoryResponseDTO;
import com.lms.exceptions.ResourceNotFoundException;
import com.lms.service.CategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Validated
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(
            @Valid @RequestBody CategoryRequestDTO categoryRequestDto) {
        CategoryResponseDTO createdCategory = categoryService.createCategory(categoryRequestDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable("id") Long categoryId) {
        try {
        	CategoryResponseDTO category = categoryService.getCategoryById(categoryId);
            return ResponseEntity.ok(category);
        } catch(ResourceNotFoundException ex) {
        	ErrorResponseDTO errorResponse = new ErrorResponseDTO(
        			"Category not found",
        			Collections.singletonList(ex.getMessage())
        	);
        	return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(
            @PathVariable("id") Long categoryId,
            @Valid @RequestBody CategoryRequestDTO categoryRequestDto) {
        CategoryResponseDTO updatedCategory = categoryService.updateCategory(categoryId, categoryRequestDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category deleted successfully.");
    }
    
}
