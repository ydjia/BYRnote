package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
//import java.util.List;
import model.Note;
//import model.Photo;
import util.FileExt;

public class NoteDAO extends DAOSupport
{
	private Note note;

	public NoteDAO(Connection connection, Note note)
	{
		super(connection);
		this.note = note;
	}

	public Note getNote()
	{
		return note;
	}
    //  �����û��ϴ���Ƭ������������t_photos���в���0��N����¼
	public void save(String username) throws Exception
	{
		FileExt file = note.getUpload();
		if(file!=null)
		{	
		String sql = "insert into t_notes(user_name,text,title,name,content_type, upload_date) values(?,?,?,?,?,?)";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		//  ����Ƭ�ϴ�ʱ�������û��ϴ��ļ�¼��ÿ���ϴ���Ƭ����Ϣ��Ϊһ����¼�����뵽t_notes����
			pstmt.setString(1, username);
			pstmt.setString(2, note.getText());
			pstmt.setString(3, note.getTitle());
			pstmt.setString(4, file.getNewFilename());
			pstmt.setString(5, file.getContentType());
			pstmt.setDate(6, new java.sql.Date((new java.util.Date()).getTime()));
			pstmt.executeUpdate();
		}
		else
		{
		String sql = "insert into t_notes(user_name,text,title,upload_date) values(?,?,?,?)";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		//  ����Ƭ�ϴ�ʱ�������û��ϴ��ļ�¼��ÿ���ϴ���Ƭ����Ϣ��Ϊһ����¼�����뵽t_notes����
				pstmt.setString(1, username);
				//pstmt.setString(2, "null");
				pstmt.setString(2, note.getText());
				pstmt.setString(3, note.getTitle());
				pstmt.setDate(4, new java.sql.Date((new java.util.Date()).getTime()));
				pstmt.executeUpdate();
		}
		
	}	
	  //  ����t_notes���е�ָ����¼��
		public void updateNote() throws Exception
		{
			FileExt file = note.getUpload();
			if(file!=null)
			{	
			String sql = "update t_notes set title=?,text=?,name=?,content_type=?, upload_date=? where id=?";
			
			PreparedStatement pstmt = connection.prepareStatement(sql);
			//  ����Ƭ�ϴ�ʱ�������û��ϴ��ļ�¼��ÿ���ϴ���Ƭ����Ϣ��Ϊһ����¼�����뵽t_notes����
				pstmt.setString(1, note.getTitle());
				pstmt.setString(2, note.getText());
				pstmt.setString(3, file.getNewFilename());
				pstmt.setString(4, file.getContentType());
				pstmt.setDate(5, new java.sql.Date((new java.util.Date()).getTime()));
				pstmt.setInt(6, note.getId());
				pstmt.executeUpdate();
			}
			else
			{
				String sql = "update t_notes set title=?,text=? where id=?";
				
				PreparedStatement pstmt = connection.prepareStatement(sql);
				//  ����Ƭ�ϴ�ʱ�������û��ϴ��ļ�¼��ÿ���ϴ���Ƭ����Ϣ��Ϊһ����¼�����뵽t_notes����
					pstmt.setString(1, note.getTitle());
					pstmt.setString(2, note.getText());
					pstmt.setInt(3, note.getId());
					pstmt.executeUpdate();
			}
			
		}
		/*public void mupdateNote() throws Exception
		{
			
			String sql = "update t_notes set title=?,text=? where id=?";
			
			PreparedStatement pstmt = connection.prepareStatement(sql);
			pstmt.setString(1, note.getTitle());
			pstmt.setString(2, note.getName());
			pstmt.setString(3, note.getText());		
			pstmt.setInt(4, note.getId());
			
			pstmt.executeUpdate();
			
		}*/
		//�����Ƭ
		public void updatePhoto() throws Exception
		{
			FileExt file = note.getUpload();
			String sql = "update t_notes set name=?,content_type=? where id=?";
			
			PreparedStatement pstmt = connection.prepareStatement(sql);
			pstmt.setString(1, file.getNewFilename());
			pstmt.setString(2, file.getContentType());	
			pstmt.setInt(3, note.getId());
			
			pstmt.executeUpdate();
			
		}

	//ɾ���ʼ��е���Ƭ
	public void deletePhoto() throws Exception
	{
		loadNote();
		String sql = "update t_notes set name=null,content_type=null where id=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setInt(1, note.getId());
		pstmt.executeUpdate();		
	}
		
	//  ɾ��ָ����note��¼
	public void deleteNote() throws Exception
	{
		loadNote();
		String sql = "delete from t_notes where id=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setInt(1, note.getId());
		pstmt.executeUpdate();
	}
	public int getId(String username) throws Exception
	{
		String sql = "select max(id) from t_notes where user_name=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setString(1, username);
		ResultSet rs = pstmt.executeQuery();
		while (rs.next())
		{
			return rs.getInt("max(id)");			
		}
		throw new Exception("������idΪ ��note");
	}
	
	
	//  ���ָ����note����
	public String getTitle(int Id) throws Exception
	{
		String sql = "select title from t_notes where id=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setInt(1, Id);
		ResultSet rs = pstmt.executeQuery();
		while (rs.next())
		{
			return rs.getString("title");			
		}
		throw new Exception("������idΪ" + Id + "��note");
	}
	/*public void updatePhoto() throws Exception
	{
		
		String sql = "update t_notes set title=?,text=? where id=?";
		
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setString(1, note.getTitle());
		pstmt.setString(2, note.getText());		
		pstmt.setInt(3, note.getId());
		
		pstmt.executeUpdate();
		
	}*/
	//  ���ָ�����ı���·����t_albums���е�path�ֶε�ֵ��
	/*public String getAlbumPath(int albumId) throws Exception
	{
		String sql = "select path from t_albums where id=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setInt(1, albumId);
		ResultSet rs = pstmt.executeQuery();
		while (rs.next())
		{
			return rs.getString("path");			
		}
		throw new Exception("������idΪ" + albumId + "�����");
	}
	
	//  ����ָ������Ƭ��IDװ����������Ƭ��Ϣ*/
	public void loadNote() throws Exception
	{
		String sql = "select * from t_notes where id=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setInt(1, note.getId());
		ResultSet rs = pstmt.executeQuery();
		if(rs.next())
		{ 
			note.setName(rs.getString("name"));
			note.setUserName(rs.getString("user_name"));
			note.setContentType(rs.getString("content_type"));
			note.setUploadDate(rs.getDate("upload_date"));	
		}
		rs.close();				
	}
	public List<Note> searchNotes(String username,String key)throws Exception
	{
		String sql = "select * from t_notes where title like? or text like ? and user_name=? order by id DESC";
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setString(1,"%"+key+"%");
		pstmt.setString(2,"%"+key+"%");
		pstmt.setString(3, username);
		ResultSet rs = pstmt.executeQuery();
		List<Note> notes = new LinkedList<Note>();
		while (rs.next())
		{
			Note note = new Note();
			
			note.setId(rs.getInt("id"));
			note.setText(rs.getString("text"));
			note.setName(rs.getString("name"));
			note.setTitle(rs.getString("title"));
			note.setContentType(rs.getString("content_type"));
				//note.setUserName(rs.getString("user_name"));
			note.setUploadDate(rs.getDate("upload_date"));
			notes.add(note);
		}

		return notes;
	}
	public List<Note> getNotes(int startRow, int count,String username) throws Exception
	{		
		String limit = "";
		if(startRow > 0 || count >= 0)
		{
			limit = "limit " + startRow + "," + count;
		}
		String sql = "select * from t_notes where user_name=? order by id DESC " + limit;
		PreparedStatement pstmt = connection.prepareStatement(sql);
		pstmt.setString(1, username);

		ResultSet rs = pstmt.executeQuery();
		List<Note> notes = new LinkedList<Note>();
		while (rs.next())
		{
			Note note = new Note();
			
			note.setId(rs.getInt("id"));
			note.setText(rs.getString("text"));
			note.setName(rs.getString("name"));
			note.setTitle(rs.getString("title"));
			note.setContentType(rs.getString("content_type"));
				//note.setUserName(rs.getString("user_name"));
			note.setUploadDate(rs.getDate("upload_date"));
			notes.add(note);
		}

		return notes;
	}
	//  ���ص�ǰ���ȫ������Ƭ
	public List<Note> getNotes(String username) throws Exception
	{
		return getNotes(0, -1,username);
	}

}

