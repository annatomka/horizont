package hu.co.horizont.mapper;

import hu.co.horizont.domain.FileInfo;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface ImageMapper {
	public List<FileInfo> getFileInfos();

	public List<FileInfo> getFileInfosToUser(@Param("user_id") String user_id);

	public FileInfo getFileInfo(@Param("id") String id);

	public void insert(FileInfo fileInfo);

	public void update(FileInfo fileInfo);

	public void delete(@Param("id") String id);
}
