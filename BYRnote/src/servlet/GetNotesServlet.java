package servlet;

import javax.servlet.http.*;

//import service.AlbumService;
import service.NoteService;

public class GetNotesServlet extends CommonServlet
{
	
	@Override

	
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{	
		
		NoteService noteService = (NoteService) obj;
		try
		{	
			request.setAttribute("notes", noteService.getNotes(username));
			//request.setAttribute("notes", noteService.getNotes());
		}
		catch (Exception e) 
		{
			return "{'message':\"" + e.getMessage() + "\"}";
		}
		return null;
	}
}
