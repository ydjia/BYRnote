package servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.*;
import service.UserService;

public class GetUserServlet extends CommonServlet
{


	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		UserService userService = (UserService) obj;
		try
		{			
			request.setAttribute("user", userService.getUserDAO().getUser(username));            
		}
		catch (Exception e)
		{
			return "{'message':\"" + e.getMessage() + "\"}";
		}
		return null;
	}

}
