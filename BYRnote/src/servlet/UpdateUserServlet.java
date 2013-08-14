package servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.UserService;

public class UpdateUserServlet extends CommonServlet
{

	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj)
	{
		UserService userService = (UserService) obj;
		try
		{
			userService.updateUser();		
			String json = "{\"message\":\"更新成功\",\"target\":\"home.jsp\"}";
			return json;
		} 
		catch (Exception e)
		{
			e.printStackTrace();
			return "{\"message\":\"error\"}";
		}
	}

}
