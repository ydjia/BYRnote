package service;

import dao.NoteDAO;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

import model.Note;
//import java.util.List;
import util.FileExt;

public class NoteService
{

	private NoteDAO noteDAO;

	public NoteService(NoteDAO note) throws Exception
	{
		this.noteDAO = note;
		note.loadNote();
	}

	public NoteDAO getNoteDAO()
	{
		return noteDAO;
	}
    //  获得保存在本地的照片文件路径
	public String getPhotoDir() throws Exception
	{		
		String photoDir = "BYRnote" + File.separator
		+ noteDAO.getNote().getUserName().hashCode() + File.separator;		
		return photoDir;

	}
	//  增加照片文件（0个或多个），并将上传的照片文件保存在本地的相册目录中
	public void addNote(String username) throws Exception
	{
		FileExt file = noteDAO.getNote().getUpload();
		if(file!=null)
		{
			String photoDir = getPhotoDir();		
			File dir = new File(photoDir);
			if(!dir.exists())
			{
				dir.mkdirs();
			}
			FileOutputStream fos = new FileOutputStream(photoDir
					+ file.getNewFilename());
			InputStream is = file.getFileStream();
			byte[] buffer = new byte[8192];
			int count = 0;
			// 开始在本地保存上传文件，每次写入8K字节
			while ((count = is.read(buffer)) > 0)
			{
				fos.write(buffer, 0, count);
			}
			is.close();
			fos.close();
		}		
		//  向t_notes表中插入相应的记录
		noteDAO.save(username);
	}
	public void addPhoto() throws Exception
	{
		FileExt file = noteDAO.getNote().getUpload();
		String photoDir = getPhotoDir();		
		File dir = new File(photoDir);
		if(!dir.exists())
		{
			dir.mkdirs();
		}
		

			FileOutputStream fos = new FileOutputStream(photoDir
					+ file.getNewFilename());
			InputStream is = file.getFileStream();
			byte[] buffer = new byte[8192];
			int count = 0;
			// 开始在本地保存上传文件，每次写入8K字节
			while ((count = is.read(buffer)) > 0)
			{
				fos.write(buffer, 0, count);
			}
			is.close();
			fos.close();

		
		//  向t_photos表中插入相应的记录
		noteDAO.updatePhoto();
	}
	//  删除指定的照片（同时删除t_notes表中记录以及本地相册目录中照片文件）
	public void deletePhoto() throws Exception
	{
		String path = getPhotoDir();

		File file = new File(path);
		if(file.exists())
			file.delete();		
		noteDAO.deletePhoto();
				
	}
	
	//删除笔记
	public void deleteNote() throws Exception
	{
		String path = getPhotoDir() + noteDAO.getNote().getName();

		File file = new File(path);
		if(file.exists())
			file.delete();		
		noteDAO.deleteNote();
				
	}
	
	
	
	public String getContentType() throws Exception
	{
		
		return noteDAO.getNote().getContentType();
	}
	public List<Note> searchNotes(String username,String key) throws Exception
	{
		return noteDAO.searchNotes(username,key);
	}
	
	public List<Note> getNotes(String username) throws Exception
	{
		return noteDAO.getNotes(username);
	}
	// pageIndex参数表示当前显示的页索引，该参数值从1开始，pageCount参数表示每页最多显示的记录数
	public List<Note> getNotes(int pageIndex, int pageCount,String username) throws Exception
	{
		return noteDAO.getNotes((pageIndex - 1) * pageCount, pageCount,username);
	}
	public void updateNote() throws Exception
	{
		FileExt file = noteDAO.getNote().getUpload();
		if(file!=null)
		{
			String photoDir = getPhotoDir();		
			File dir = new File(photoDir);
			if(!dir.exists())
			{
				dir.mkdirs();
			}
			FileOutputStream fos = new FileOutputStream(photoDir
					+ file.getNewFilename());
			InputStream is = file.getFileStream();
			byte[] buffer = new byte[8192];
			int count = 0;
			// 开始在本地保存上传文件，每次写入8K字节
			while ((count = is.read(buffer)) > 0)
			{
				fos.write(buffer, 0, count);
			}
			is.close();
			fos.close();
		}		
		noteDAO.updateNote();
	}

}
