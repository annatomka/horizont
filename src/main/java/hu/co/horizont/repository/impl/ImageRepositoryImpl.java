package hu.co.horizont.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import hu.co.horizont.domain.FileInfo;
import hu.co.horizont.mapper.ImageMapper;
import hu.co.horizont.repository.ImageRepository;

@Repository
public class ImageRepositoryImpl implements ImageRepository{
	@Autowired
	private ImageMapper imageMapper;
	
	@Override
	public List<FileInfo> getFileInfosToUser(String user_id) {
		return imageMapper.getFileInfosToUser(user_id);
	}

	@Override
	public FileInfo getFileInfo(String id) {
		return imageMapper.getFileInfo(id);
	}

	@Override
	public void insert(FileInfo fileInfo) {
		imageMapper.insert(fileInfo);
	}

	@Override
	public void delete(String id) {
		imageMapper.delete(id);
	}

}
