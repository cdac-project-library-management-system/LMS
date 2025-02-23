package com.lms.service;

import java.util.List;

import com.lms.dto.request.CategoryRequestDTO;
import com.lms.dto.response.CategoryResponseDTO;

public interface CategoryService {
	
    CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDto);
    
    CategoryResponseDTO updateCategory(Long categoryId, CategoryRequestDTO categoryRequestDto);
    
    CategoryResponseDTO getCategoryById(Long categoryId);
    
    List<CategoryResponseDTO> getAllCategories();
    
    void deleteCategory(Long categoryId);
}
