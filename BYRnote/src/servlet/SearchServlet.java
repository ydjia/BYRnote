package servlet;

import javax.servlet.http.*;

//import service.AlbumService;
import service.NoteService;

public class SearchServlet extends CommonServlet
{
	
	@Override

	
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{	
		
		NoteService noteService = (NoteService) obj;
		try
		{	String key = new String (request.getParameter("key").getBytes("ISO-8859-1"),"utf-8");
			request.setAttribute("notes",key);
			request.setAttribute("notes", noteService.searchNotes(username,key));
			//request.getRequestDispatcher("search.jsp").forward(request, response);
			//request.setAttribute("notes", noteService.getNotes());
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return "{'message':\"" + e.getMessage() + "\"}";
		}
		return null;
	}
}
