package servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.lang.reflect.Constructor;
import java.sql.Connection;
import java.sql.DriverManager;

public abstract class CommonServlet extends HttpServlet
{

	// CommonServlet类的子类只需要在execute方法中编写代码即可，
	// obj表示Service对象或模型类对象
	protected abstract String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj);

	// 将一个属性名转换成setter方法名，如name属性对应的setter方法名是setName
	private String getSetter(String property)
	{
		String methodName = "set" + property.substring(0, 1).toUpperCase()
				+ property.substring(1);
		return methodName;
	}

	// 获得连接数据库的Connection对象
	private Connection getConnection() throws Exception
	{
		Class.forName("com.mysql.jdbc.Driver");
		// 获得Connection对象
		Connection conn = DriverManager.getConnection(
				"jdbc:mysql://localhost/BYRnote?characterEncoding=UTF8", "root",
				"1993");
		return conn;
	}

	// 创建Service对象或模型类对象，并返回创建的对象，model参数表示封装用户请求参数的
	// 模型类对象
	private Object LoadObject(HttpServletRequest request, Object model)
			throws Exception
	{
		if (model == null)
			return null;
		try
		{
			// 获得DAO类名（package.classname)
			String daoClassName = "dao." + model.getClass().getSimpleName()
					+ "DAO";
			// 获得Service类名（package.classname)
			String serviceClassName = "service."
					+ model.getClass().getSimpleName() + "Service";
			Connection connection = getConnection();
			// 装载DAO类
			Class daoClass = Class.forName(daoClassName);
			// 获得DAO类带参数的构造方法对象（Constructor对象）
			Constructor constructor = daoClass.getConstructor(Connection.class,
					model.getClass());

			// 使用DAO类带参数的构造方法创建一个DAO对象
			Object dao = constructor.newInstance(connection, model);
			// 装载Service类
			Class serviceClass = Class.forName(serviceClassName);
			// 获得Service类带参数的构造方法对象（Constructor对象）
			constructor = serviceClass.getConstructor(dao.getClass());

			// 使用Service类带参数的构造方法创建一个Service对象
			Object service = constructor.newInstance(dao);

			return service;
		}
		catch (Exception e)
		{

			return model;
		}
	}

	// 对字符串进行解码
	protected String decode(HttpServletRequest request, String s)
			throws UnsupportedEncodingException
	{
		String encoding = request.getCharacterEncoding();
		if (encoding == null)
			encoding = "ISO-8859-1";
		s = new String(s.getBytes(encoding), "UTF-8");
		return s;
	}

	// 核对验证码是否正确
	private void checkValidationCode(HttpServletRequest request, Object model)
			throws Exception
	{
		// 如果模型类是model.User，则验证效验码
		if (model instanceof model.User)
		{
			model.User user = (model.User) model;
			// 获得用户提交的验证码
			String validationCode = user.getValidationCode();
			if (validationCode != null)
			{
				// 对验证码进行编码
				// 从HttpSession对象中获得服务端生成的验证码
				String vCode = (String) request.getSession().getAttribute(
						"vCode");
				// 如果HttpSession对象中没有验证码，则抛出“Session失效”异常
				if (vCode == null)
				{
					throw new Exception("Session过期，验证码失效！");
				}
				// 如果验证码不一致，抛出“验证码错误”异常
				if (!validationCode.equals(vCode))
				{
					throw new Exception("验证码错误！");
				}
			}
		}
	}

	// 核对用户是否已经登录，如果当前用户已经登录，返回true
	protected boolean checkLogin(HttpServletRequest request, Object obj)
	{
		// 从web.xml文件中获得不进行核对我Servlet
		String ignoreServlets = this.getServletContext().getInitParameter(
				"ignoreServlets");
		if (ignoreServlets != null)
		{
			String[] servlets = ignoreServlets.split(",");
			String servlet = this.getServletName();
			for (String s : servlets)
			{
				// 如果当前Servlet被忽略，则直接返回true
				if (s.trim().equals(servlet))
				{
					return true;
				}
			}
		}
		boolean isOK = false;
		HttpSession session = request.getSession(false);
		if (session != null)
		{
			String user = (String) session.getAttribute("user");
			if (user != null)
			{
				isOK = true;
			}
		}
		return isOK;
	}

	protected void out(HttpServletResponse response, String text)
	{
		try
		{
			PrintWriter out = response.getWriter();
			out.println(text);
		}
		catch (Exception e)
		{

		}
	}

	@Override
	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{

		response.setContentType("text/html;charset=UTF-8");

		// 从request域中获得封装用户请求参数的模型类
		Object model = request.getAttribute("#form");

		try
		{
			Object obj = LoadObject(request, model);
			checkValidationCode(request, model);
			if (checkLogin(request, obj) == false)
			{
				// 如果当前用户未登录，重定向到login.jsp
				response.sendRedirect("login.jsp");
				return;
			}

			String result = null;
			String username = (String) request.getSession()
					.getAttribute("user");
			// 调用当前Servlet的execute方法来处理客户端请求。
			result = execute(request, response, username, obj);
			if (result != null)
			{
				out(response, result);
			}
		}
		catch (Exception e)
		{
			out(response, "{'message':\"" + e.getMessage() + "\"}");
		}
	}
}
