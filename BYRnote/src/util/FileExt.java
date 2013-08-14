package util;
import java.io.File;
import java.io.InputStream;
public class FileExt
{
    private InputStream fileStream;
    private String filename;
    private String newFilename;
    private String contentType;
    private long size;
        
    
	public InputStream getFileStream()
	{
		return fileStream;
	}
	public void setFileStream(InputStream fileStream)
	{
		this.fileStream = fileStream;
	} 
	public String getFilename()
	{
		return filename; 
	}
	public void setFilename(String filename)
	{
		int index = filename.lastIndexOf(File.separator);		
		this.filename = filename.substring(index + 1);
		this.newFilename = String.valueOf(filename.hashCode()) + String.valueOf(new java.util.Date().getTime());

	}
	public String getContentType()
	{
		return contentType;
	}
	public void setContentType(String contentType)
	{
		this.contentType = contentType;
	}
	public long getSize()
	{
		return size;
	}
	public void setSize(long size)
	{
		this.size = size;
	}
	public String getNewFilename()
	{
		
		return newFilename;
	}
    
}
