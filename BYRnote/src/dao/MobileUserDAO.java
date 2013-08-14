package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.MobileUser;

public class MobileUserDAO extends DAOSupport
{
    private MobileUser user;
	public MobileUserDAO(Connection connection, MobileUser user)
	{
		super(connection);		
		this.user = user;
	}    
	public MobileUser getUser() 
	{
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
	public String getUsername() throws Exception
	{
		String sql = "select createtime from t_users where name = ?";
	    PreparedStatement pstmt = connection.prepareStatement(sql);
	    pstmt.setString(1, user.getName());
	    ResultSet rs = pstmt.executeQuery();
	    while(rs.next())
	    {
	    	return rs.getString("createtime");
	    }
	    return null;
		
	}
	
	public int isLogin()
	{
		try{
			String passwordMD5 = user.getPassword_md5();
			String sql = "select password_md5 from t_users where name = ?";
		    PreparedStatement pstmt = connection.prepareStatement(sql);
		    pstmt.setString(1, user.getName());
		    ResultSet rs = pstmt.executeQuery();
		    while(rs.next())
		    {	
		    	if  (passwordMD5.equals(rs.getString("password_md5")))
		    		return 1;
		    	else 
		    		return 2;
		    }
		    		return 3;
		}
		catch(Exception e)
		{
			return 3;
		}
		
	}

}

