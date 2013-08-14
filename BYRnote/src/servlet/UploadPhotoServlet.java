package servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.NoteService;

public class UploadPhotoServlet extends CommonServlet
{

	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		NoteService noteService = (NoteService) obj;
		try
		{	
			noteService.addPhoto();
			//response.sendRedirect("viewNote?id="
					//+ noteService.getNoteDAO().getNote().getId()+ "&username=" + username);
			response.sendRedirect("main.jsp");
		}
		catch (Exception e)
		{
			return e.getMessage();
		}
		return null;
	}

}
