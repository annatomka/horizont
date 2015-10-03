package hu.co.horizont.repository;

import hu.co.horizont.domain.Category;

import java.util.List;

public interface CategoryRepository {

	public List<Category> getCategories();

	public Category getCategory(String id);

	public void saveCategory(Category category);
}
