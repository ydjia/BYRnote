package servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.*;
import javax.servlet.http.*;

import service.MobileUserService;

public class MobileRegisterServlet extends HttpServlet  {
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
		        String username = req.getParameter("username");
		        String password = req.getParameter("password");
		        String xm = req.getParameter("xm");
		        String email = req.getParameter("email");
		        try {
		        	model.MobileUser muser=new model.MobileUser();
		        	dao.MobileUserDAO muserDAO=new dao.MobileUserDAO(getConnection(),muser);
		        	MobileUserService muserService=new MobileUserService(muserDAO);
		 	        muserDAO.getUser().setName(username);
		 	        muserDAO.getUser().setPassword(password);
		 	        muserDAO.getUser().setXm(xm);
		 	        muserDAO.getUser().setEmail(email);
		 	        DataOutputStream output=new DataOutputStream(resp.getOutputStream());
		 	        if(muserService.checkexist()){
		 	        	output.writeUTF("用户名存在");
			            System.out.println("用户名存在");
			            output.writeInt(1);
			            output.close();
		 	        }
		 	        else{
		 	        	muserService.addUser();
		 	        	output.writeUTF("注册成功");
		 	        	System.out.println("注册成功");
		 	        	output.writeInt(1);
		 	        	output.close();
		 	        }
		            }
		           
		        catch (Exception e) {
		        	DataOutputStream output=new DataOutputStream(resp.getOutputStream());
		        	output.writeUTF("注册失败");

		        }
		    }

	}
