package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.*;
import javax.servlet.http.*;





public class MobileGetNotesServlet extends HttpServlet {
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
	        String username = req.getParameter("username");
	       // String password = req.getParameter("password");
	        try {
	        	model.MobileUser muser=new model.MobileUser();
	        	dao.MobileUserDAO muserDAO=new dao.MobileUserDAO(getConnection(),muser);
	        	dao.NoteDAO noteDAO=new dao.NoteDAO(getConnection(), null);
	 	        muserDAO.getUser().setName(username);
	 	        //muserDAO.getUser().setPassword(password);
	 	        //int flag=muserDAO.isLogin();
	            DataOutputStream output=new DataOutputStream(resp.getOutputStream());	            
	            output.writeUTF(noteDAO.getNotes(username).toString());
	            System.out.println(noteDAO.getNotes(username).toString());
	            output.close();   
	        } catch (Exception e) {
	            e.printStackTrace();

	        }
	    }

}