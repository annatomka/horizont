package hu.co.horizont.mapper;

import hu.co.horizont.domain.Category;

import java.util.List;

import org.apache.ibatis.annotations.Param;


public interface CategoryMapper {

	  public List<Category> getCategories();
	  
	  public Category getCategory(@Param("id") String id);
	  
	  public void insert(Category category);
	  
	  public void update(Category category);
	  
	  public void delete(@Param("id") String id);
	  
}