package servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.NoteService;

public class UpdateNoteServlet extends CommonServlet
{

	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		NoteService noteService = (NoteService) obj;
		try
		{
			noteService.updateNote();		
			request.getRequestDispatcher("home.jsp").forward(request, response);
			//String json = "{'message':'成功更新笔记','target':'main.jsp'}";
			return null;
		} 
		catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

}
