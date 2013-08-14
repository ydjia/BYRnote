package model;

//import java.util.List;
import util.FileExt; 
public class Note
{
    private FileExt upload;
    private int Id;
    private String userName;
    private String text;
    private String title;
    private String name;
    private String contentType;
    private java.util.Date uploadDate;
    
    public String toString()
    {
    	return(""+Id+';'+title+';'+text+';'+uploadDate);
    }

	public int getId()
	{
		return Id;
	}

	public void setId(int id)
	{
		Id = id;
	}

	public FileExt getUpload()
	{
		return upload;
	}

	public void setUpload(FileExt upload)
	{
		this.upload = upload;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getText()
	{
		return text;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}
	public String getTitle()
	{
		return title;
	}

	public void setText(String text)
	{
		this.text = text;
	}
	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getContentType()
	{
		return contentType;
	}

	public void setContentType(String contentType)
	{
		this.contentType = contentType;
	}

	public java.util.Date getUploadDate()
	{
		return uploadDate;
	}

	public void setUploadDate(java.util.Date uploadDate)
	{
		this.uploadDate = uploadDate;
	}
 



    
}
