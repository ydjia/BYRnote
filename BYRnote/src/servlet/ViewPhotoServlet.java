package servlet;

import javax.servlet.http.*;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.FileInputStream;
import service.NoteService;
import model.Note;

public class ViewPhotoServlet extends CommonServlet
{
	//  ��ֹ����response.getWriter
	@Override
	protected void out(HttpServletResponse response, String text)
	{

	}

	@Override
	protected boolean checkLogin(HttpServletRequest request, Object obj)
	{
		NoteService noteService = (NoteService) obj;
		return super.checkLogin(request, obj);
	}

	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		NoteService noteService = (NoteService) obj;
	
		try
		{
			
			Note note = noteService.getNoteDAO().getNote();
			String path = noteService.getPhotoDir() + note.getName();
             
			response.setContentType(noteService.getContentType());
			OutputStream out = response.getOutputStream();

			InputStream is = new FileInputStream(path);
			byte[] buffer = new byte[1024 * 64];
			int count = 0;
			// ��ʼ�ڱ��ر����ϴ��ļ���ÿ��д��64K�ֽ�
			while ((count = is.read(buffer)) > 0)
			{
				out.write(buffer, 0, count); 
			}
			is.close();

		}
		catch (Exception e)
		{
		}
		return null;
	}

}
