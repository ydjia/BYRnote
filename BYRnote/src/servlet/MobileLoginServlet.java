package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.*;
import javax.servlet.http.*;





public class MobileLoginServlet extends HttpServlet {
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
	        //登陆成功标志
	    	String LOGIN_FLAG="";
	        //获得客户端提交用户名密码
	        String username = req.getParameter("username");
	        String password = req.getParameter("password");
	        try {
	        	model.MobileUser muser=new model.MobileUser();
	        	dao.MobileUserDAO muserDAO=new dao.MobileUserDAO(getConnection(),muser);
	        	//dao.NoteDAO noteDAO=new dao.NoteDAO(getConnection(), null);
	 	        muserDAO.getUser().setName(username);
	 	        muserDAO.getUser().setPassword(password);
	 	        int flag=muserDAO.isLogin();
	            DataOutputStream output=new DataOutputStream(resp.getOutputStream());
	
	            if (flag==1) {
	                LOGIN_FLAG="success";
	                output.writeUTF("success");
	                System.out.println(LOGIN_FLAG);
	                output.writeInt(1);
	                output.close();
	            }
	            else if(flag==2){
	                 //登录失败 
	                LOGIN_FLAG="failure,wrong password";
	                System.out.println(LOGIN_FLAG);
	                output.writeUTF(LOGIN_FLAG);
	                output.close();
	            }
	            else{
	            	 LOGIN_FLAG="failure,invalid username";
	            	 System.out.println(LOGIN_FLAG);
		             output.writeUTF(LOGIN_FLAG);
		             output.close();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();

	        }
	    }

}
