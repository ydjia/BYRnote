package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.User;

public class UserDAO extends DAOSupport
{
    private User user;
	public UserDAO(Connection connection, User user)
	{
		super(connection);		
		this.user = user;
	}    
	public User getUser() 
	{
		return user;
	}
	public User getUser(String username)throws Exception
	{
		User user =new User();
		String sql = "select * from t_users where name=?";
		PreparedStatement pstmt = connection.prepareStatement(sql);
	    pstmt.setString(1, username);
	    ResultSet rs = pstmt.executeQuery();   
	    while(rs.next())
	    { 
	    	user.setName(username) ;
	    	user.setXm(rs.getString("xm"));
	    	user.setEmail(rs.getString("email"));
	    }
	    return user;
	}

	public void Save() throws Exception
	{
		String sql = "insert into t_users(name, password_md5, xm, email,createtime) values(?,?,?,?,?)";
	    PreparedStatement pstmt = connection.prepareStatement(sql);
	    pstmt.setString(1, user.getName());
	    pstmt.setString(2, user.getPassword_md5());
	    pstmt.setString(3, user.getXm());
	    pstmt.setString(4, user.getEmail());
	    pstmt.setDate(5, new java.sql.Date((new java.util.Date()).getTime()));
	    pstmt.executeUpdate();	   

	}
	public void updateUser() throws Exception
	{
		if(user.getPassword().equals(""))
		{
			String sql = "update t_users set xm=?,email=? where name=?";
		    PreparedStatement pstmt = connection.prepareStatement(sql);
		    pstmt.setString(1, user.getXm());
		    pstmt.setString(2, user.getEmail());
		    pstmt.setString(3, user.getName());
		    pstmt.executeUpdate();	   
		}
		else
		{
			String sql = "update t_users set xm=?,email=?,password_md5=? where name=?";
		    PreparedStatement pstmt = connection.prepareStatement(sql);
		    pstmt.setString(1, user.getXm());
		    pstmt.setString(2, user.getEmail());
		    pstmt.setString(3, user.getPassword_md5());
		    pstmt.setString(4, user.getName());
		    pstmt.executeUpdate();	   
		}	

	}

	public String getPasswordMD5() throws Exception
	{
		String sql = "select password_md5 from t_users where name = ?";
	    PreparedStatement pstmt = connection.prepareStatement(sql);
	    pstmt.setString(1, user.getName());
	    ResultSet rs = pstmt.executeQuery();
	    while(rs.next())
	    {
	    	return rs.getString("password_md5");
	    }
	    return null;
		
	}

}

