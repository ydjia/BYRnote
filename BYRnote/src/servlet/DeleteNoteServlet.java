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
			//json = "{'message':'³É¹¦É¾³ý±Ê¼Ç','target':'main.jsp'}";
			request.getRequestDispatcher("home.jsp").forward(request, response);
			return null;
		}
		catch (Exception e)
		{
			json = e+"{É¾³ý±Ê¼ÇÊ§°Ü£¡}";
			e.printStackTrace();
			return json;
		}
		
	}
}
