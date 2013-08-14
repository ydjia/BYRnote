package filters;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthenticateFilter implements Filter
{
	private boolean checkLogin(HttpServletRequest request)
	{
				
		HttpSession session = request.getSession(false);
		if(session != null)
		{
			String user = (String) session.getAttribute("user");
			if(user != null)
			{
				return true;
			}
		}

		return false;
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException
	{

		if(checkLogin((HttpServletRequest)request))
		{
			chain.doFilter(request, response);
		}
		else
		{
			((HttpServletResponse)response).sendRedirect("login.jsp");
		}

	}

	public void init(FilterConfig filterConfig) throws ServletException
	{
	}

	public void destroy()
	{
	}

}
