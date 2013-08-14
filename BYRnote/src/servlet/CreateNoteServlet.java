package servlet;

import javax.servlet.http.*;
import service.NoteService;

public class CreateNoteServlet extends CommonServlet
{
	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		NoteService noteService = (NoteService) obj;
		try
		{
			
			noteService.addNote(username);	
			//noteService.addNote();
			request.getRequestDispatcher("home.jsp").forward(request, response);
			//String json = "{'message':'成功建立笔记','target':"+noteService.getNoteDAO().getId(username)+"}";
			//return json;
			return null;
		} 
		catch (Exception e)
		{
			return "{'message':\"" +e.getMessage() + "\"}";
		}
	}

}
