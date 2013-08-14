package servlet;

import javax.servlet.http.*;
import service.NoteService;


public class DeletePhotoServlet extends CommonServlet
{
	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{	
		String json = "";
		try
		{	

			NoteService noteService = (NoteService) obj;
			noteService.deletePhoto();
			//response.sendRedirect("./update_note.jsp");
			json = "{\"message\":\"success\"}";;
            
		}
		catch (Exception e)
		{
		    json = "{\"message\":\"fail\"}";
			e.printStackTrace();
		}
		return json;
	}
}
