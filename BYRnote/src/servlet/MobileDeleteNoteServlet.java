package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.*;
import javax.servlet.http.*;

import model.Note;


public class MobileDeleteNoteServlet extends HttpServlet  {
		private static final long serialVersionUID = 314719472293387358L;
		private Connection getConnection() throws Exception
		{
			Class.forName("com.mysql.jdbc.Driver");
			// 获得Connection对象
			Connection conn = DriverManager.getConnection(
					"jdbc:mysql://localhost/BYRnote?characterEncoding=UTF8", "root",
					"1993");
			return conn;
		}
		    @Override
		    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
		            throws ServletException, IOException {
		        //获得客户端提交用户名密码
		        int id = Integer.parseInt(req.getParameter("note_id"));
		        try {
		        	Note note=new Note();
		        	dao.NoteDAO noteDAO=new dao.NoteDAO(getConnection(),note);
		        	noteDAO.getNote().setId(id);
		            DataOutputStream output=new DataOutputStream(resp.getOutputStream());
		            noteDAO.deleteNote();
		            output.writeUTF("删除成功");
		            System.out.println("删除成功");
		            output.writeInt(1);
		            output.close();
		            }
		           
		        catch (Exception e) {
		        	DataOutputStream output=new DataOutputStream(resp.getOutputStream());
		        	output.writeUTF("删除失败");

		        }
		    }

	}
