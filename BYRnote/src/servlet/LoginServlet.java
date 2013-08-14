package servlet;

import javax.servlet.http.*;

import model.User;
import service.UserService;

public class LoginServlet extends CommonServlet
{
	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username,Object obj)
	{
		UserService userService = (UserService) obj;
		try
		{

            //  验证登录用户
            userService.verifyUser();
            HttpSession session = request.getSession();
            session.setAttribute("user",
                    userService.getUserDAO().getUser().getName());
            session.setMaxInactiveInterval(3600 * 24);            
            String json = "{\"message\":\"success\",\"target\":\"home.jsp\"}";
            return json;
 
		} 
		catch (Exception e)
		{
			e.printStackTrace();
			return "{\"message\":\"error\"}";
			
		}
	}

}
