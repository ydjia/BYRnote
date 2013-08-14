package model;

import util.Encrypter;

public class MobileUser {

    private String name;
    private String password;
    private String xm;
    private String email;
    private java.util.Date createtime;
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	public String getPassword()
	{
		return password;
	}
	public void setPassword(String password)
	{
		this.password = password;
	}
	public String getPassword_md5()
	{
		return Encrypter.md5(password);
	}

	public String getXm()
	{
		return xm;
	}
	public void setXm(String xm)
	{
		this.xm = xm;
	}
	public String getEmail()
	{
		return email;
	}
	public void setEmail(String email)
	{
		this.email = email;
	}
	public java.util.Date CreateTime()
	{
		return createtime;
	}

	public void setCreateTime(java.util.Date createtime)
	{
		this.createtime = createtime;
	}

}
