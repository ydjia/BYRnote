package servlet;

import javax.servlet.http.*;
import service.NoteService;


public class DeleteNoteServlet extends CommonServlet
{
	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{	
		String json = "";
		try
		{	

			NoteService noteService = (NoteService) obj;
			noteService.deleteNote();
			//json = "{'message':'�ɹ�ɾ���ʼ�','target':'main.jsp'}";
			request.getRequestDispatcher("home.jsp").forward(request, response);
			return null;
		}
		catch (Exception e)
		{
			json = e+"{ɾ���ʼ�ʧ�ܣ�}";
			e.printStackTrace();
			return json;
		}
		
	}
}
