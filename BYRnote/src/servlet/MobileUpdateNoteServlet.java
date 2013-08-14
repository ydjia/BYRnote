package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.*;
import javax.servlet.http.*;

import model.Note;


public class MobileUpdateNoteServlet extends HttpServlet  {
		private static final long serialVersionUID = 314719472293387358L;
		private Connection getConnection() throws Exception
		{
			Class.forName("com.mysql.jdbc.Driver");
			// ���Connection����
			Connection conn = DriverManager.getConnection(
					"jdbc:mysql://localhost/BYRnote?characterEncoding=UTF8", "root",
					"1993");
			return conn;
		}
		    @Override
		    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
		            throws ServletException, IOException {
		        //��ÿͻ����ύ�û�������
		        int id = Integer.parseInt(req.getParameter("note_id"));
		        String title=new String (req.getParameter("title").getBytes("ISO-8859-1"),"utf-8");
		    	String text=new String (req.getParameter("text").getBytes("ISO-8859-1"),"utf-8");
		        try {
		        	Note note=new Note();
		        	dao.NoteDAO noteDAO=new dao.NoteDAO(getConnection(),note);
		        	noteDAO.getNote().setId(id);
		        	noteDAO.getNote().setTitle(title);
		        	noteDAO.getNote().setText(text);
		            DataOutputStream output=new DataOutputStream(resp.getOutputStream());
		            noteDAO.updateNote();
		            output.writeUTF("�޸ĳɹ�");
		            System.out.println("�޸ĳɹ�");
		            output.writeInt(1);
		            output.close();
		            }
		           
		        catch (Exception e) {
		        	DataOutputStream output=new DataOutputStream(resp.getOutputStream());
		        	output.writeUTF("�޸�ʧ��");

		        }
		    }

	}

