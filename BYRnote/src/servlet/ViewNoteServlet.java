package servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.*;
import service.NoteService;

public class ViewNoteServlet extends CommonServlet
{

/*	protected boolean checkLogin(HttpServletRequest request, Object obj)
	{
		NoteService noteService = (NoteService) obj;
		if(noteService != null)
		{
			try
			{
				int albumType = albumService.getAlbumType();
				request.setAttribute("albumType", albumType);
				// 公开的相册
				if(albumType == 1)
				{
					return true;
				}
			}
			catch (Exception e)
			{
			}

		}
		return super.checkLogin(request, obj);
	}*/

	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		NoteService noteService = (NoteService) obj;
		try
		{			
			request.setAttribute("note", noteService.getNoteDAO().getNote());            
			RequestDispatcher rd = request
					.getRequestDispatcher("view_note.jsp");
			rd.forward(request, response);
		}
		catch (Exception e)
		{
			return "{'message':\"" + e.getMessage() + "\"}";
		}
		return null;
	}

}
