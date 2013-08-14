package service;

import java.io.File;

import dao.UserDAO;

public class UserService
{
	private UserDAO userDAO;
    public UserService(UserDAO userDAO)
    {
        this.userDAO = userDAO;	
    }
    
    public UserDAO getUserDAO()
	{
		return userDAO;
	}
	public void addUser() throws Exception
    {
    	userDAO.Save();
		File dir = new File("BYRnote" + File.separator + userDAO.getUser().getName().hashCode());			
		dir.mkdirs();
    }	
	public void verifyUser() throws Exception
	{
		String passwordMD5 = userDAO.getPasswordMD5();
		if(passwordMD5 == null)
			throw new Exception("<" + userDAO.getUser().getName() + ">不存在!");
		
		if(!passwordMD5.equals(userDAO.getUser().getPassword_md5()))
			throw new Exception("密码不正确！");		
	}
	public void updateUser() throws Exception
	{
		userDAO.updateUser();
	}
	
	
}
