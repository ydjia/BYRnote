package servlet;

import javax.servlet.http.*;
import java.io.File;
import service.UserService;

public class RegisterServlet extends CommonServlet
{

	@Override
	protected String execute(HttpServletRequest request,
			HttpServletResponse response, String username,Object obj)
	{
        String json = "";
        try
        {

            UserService userService = (UserService) obj;
            
            userService.addUser();
            json = "{\"message\":\"×¢²á³É¹¦\",\"target\":\"login.jsp\"}";                			
		}
		catch (Exception e)
		{ 
			e.printStackTrace();
			json = "{\"message\":\"error\"}";        
		}
		   return json;
	}


}
