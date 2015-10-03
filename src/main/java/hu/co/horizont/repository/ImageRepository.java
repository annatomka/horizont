package hu.co.horizont.repository;

import hu.co.horizont.domain.FileInfo;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface ImageRepository {

	public List<FileInfo> getFileInfosToUser(String user_id);
	
	public FileInfo getFileInfo( String id);

	public void insert(FileInfo fileInfo);

	public void delete(String id);
}
