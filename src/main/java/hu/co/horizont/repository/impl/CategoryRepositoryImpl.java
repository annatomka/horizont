package hu.co.horizont.repository.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import hu.co.horizont.domain.Category;
import hu.co.horizont.mapper.CategoryMapper;
import hu.co.horizont.repository.CategoryRepository;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository{

	@Autowired
	private CategoryMapper categoryMapper;
	
	@Override
	public List<Category> getCategories() {
		return categoryMapper.getCategories();
	}

	@Override
	public Category getCategory(String id) {
		return categoryMapper.getCategory(id);
	}

	@Override
	public void saveCategory(Category category) {
		if(category.is_destroy()){
			categoryMapper.delete(category.getId());
		}else{
			if(category.getRev()==0){
				category.setId('a'+UUID.randomUUID().toString());//isotope miatt, a szűrő osztály csak betűvel kezdődhet
				categoryMapper.insert(category);
			}else{
				categoryMapper.update(category);
			}
		}
	}

}
