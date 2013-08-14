package service;

import java.io.File;

import dao.MobileUserDAO;

public class MobileUserService
{
	private MobileUserDAO muserDAO;
    public MobileUserService(MobileUserDAO userDAO)
    {
        this.muserDAO = userDAO;	
    }
    
    public MobileUserDAO getUserDAO()
	{
		return muserDAO;
	}
	public void addUser() throws Exception
    {
		muserDAO.Save();
		File dir = new File("BYRnote" + File.separator + muserDAO.getUser().getName().hashCode());			
		dir.mkdirs();
    }	
	public boolean checkexist()throws Exception
	{
		if(muserDAO.getUsername()==null)
			return false;
		return true;
	}
	
	
}
