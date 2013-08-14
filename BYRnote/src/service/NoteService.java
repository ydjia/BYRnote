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
    //  ��ñ����ڱ��ص���Ƭ�ļ�·��
	public String getPhotoDir() throws Exception
	{		
		String photoDir = "BYRnote" + File.separator
		+ noteDAO.getNote().getUserName().hashCode() + File.separator;		
		return photoDir;

	}
	//  ������Ƭ�ļ���0���������������ϴ�����Ƭ�ļ������ڱ��ص����Ŀ¼��
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
			// ��ʼ�ڱ��ر����ϴ��ļ���ÿ��д��8K�ֽ�
			while ((count = is.read(buffer)) > 0)
			{
				fos.write(buffer, 0, count);
			}
			is.close();
			fos.close();
		}		
		//  ��t_notes���в�����Ӧ�ļ�¼
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
			// ��ʼ�ڱ��ر����ϴ��ļ���ÿ��д��8K�ֽ�
			while ((count = is.read(buffer)) > 0)
			{
				fos.write(buffer, 0, count);
			}
			is.close();
			fos.close();

		
		//  ��t_photos���в�����Ӧ�ļ�¼
		noteDAO.updatePhoto();
	}
	//  ɾ��ָ������Ƭ��ͬʱɾ��t_notes���м�¼�Լ��������Ŀ¼����Ƭ�ļ���
	public void deletePhoto() throws Exception
	{
		String path = getPhotoDir();

		File file = new File(path);
		if(file.exists())
			file.delete();		
		noteDAO.deletePhoto();
				
	}
	
	//ɾ���ʼ�
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
	// pageIndex������ʾ��ǰ��ʾ��ҳ�������ò���ֵ��1��ʼ��pageCount������ʾÿҳ�����ʾ�ļ�¼��
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
			// ��ʼ�ڱ��ر����ϴ��ļ���ÿ��д��8K�ֽ�
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
