package servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.lang.reflect.Constructor;
import java.sql.Connection;
import java.sql.DriverManager;

public abstract class CommonServlet extends HttpServlet
{

	// CommonServlet�������ֻ��Ҫ��execute�����б�д���뼴�ɣ�
	// obj��ʾService�����ģ�������
	protected abstract String execute(HttpServletRequest request,
			HttpServletResponse response, String username, Object obj);

	// ��һ��������ת����setter����������name���Զ�Ӧ��setter��������setName
	private String getSetter(String property)
	{
		String methodName = "set" + property.substring(0, 1).toUpperCase()
				+ property.substring(1);
		return methodName;
	}

	// ����������ݿ��Connection����
	private Connection getConnection() throws Exception
	{
		Class.forName("com.mysql.jdbc.Driver");
		// ���Connection����
		Connection conn = DriverManager.getConnection(
				"jdbc:mysql://localhost/BYRnote?characterEncoding=UTF8", "root",
				"1993");
		return conn;
	}

	// ����Service�����ģ������󣬲����ش����Ķ���model������ʾ��װ�û����������
	// ģ�������
	private Object LoadObject(HttpServletRequest request, Object model)
			throws Exception
	{
		if (model == null)
			return null;
		try
		{
			// ���DAO������package.classname)
			String daoClassName = "dao." + model.getClass().getSimpleName()
					+ "DAO";
			// ���Service������package.classname)
			String serviceClassName = "service."
					+ model.getClass().getSimpleName() + "Service";
			Connection connection = getConnection();
			// װ��DAO��
			Class daoClass = Class.forName(daoClassName);
			// ���DAO��������Ĺ��췽������Constructor����
			Constructor constructor = daoClass.getConstructor(Connection.class,
					model.getClass());

			// ʹ��DAO��������Ĺ��췽������һ��DAO����
			Object dao = constructor.newInstance(connection, model);
			// װ��Service��
			Class serviceClass = Class.forName(serviceClassName);
			// ���Service��������Ĺ��췽������Constructor����
			constructor = serviceClass.getConstructor(dao.getClass());

			// ʹ��Service��������Ĺ��췽������һ��Service����
			Object service = constructor.newInstance(dao);

			return service;
		}
		catch (Exception e)
		{

			return model;
		}
	}

	// ���ַ������н���
	protected String decode(HttpServletRequest request, String s)
			throws UnsupportedEncodingException
	{
		String encoding = request.getCharacterEncoding();
		if (encoding == null)
			encoding = "ISO-8859-1";
		s = new String(s.getBytes(encoding), "UTF-8");
		return s;
	}

	// �˶���֤���Ƿ���ȷ
	private void checkValidationCode(HttpServletRequest request, Object model)
			throws Exception
	{
		// ���ģ������model.User������֤Ч����
		if (model instanceof model.User)
		{
			model.User user = (model.User) model;
			// ����û��ύ����֤��
			String validationCode = user.getValidationCode();
			if (validationCode != null)
			{
				// ����֤����б���
				// ��HttpSession�����л�÷�������ɵ���֤��
				String vCode = (String) request.getSession().getAttribute(
						"vCode");
				// ���HttpSession������û����֤�룬���׳���SessionʧЧ���쳣
				if (vCode == null)
				{
					throw new Exception("Session���ڣ���֤��ʧЧ��");
				}
				// �����֤�벻һ�£��׳�����֤������쳣
				if (!validationCode.equals(vCode))
				{
					throw new Exception("��֤�����");
				}
			}
		}
	}

	// �˶��û��Ƿ��Ѿ���¼�������ǰ�û��Ѿ���¼������true
	protected boolean checkLogin(HttpServletRequest request, Object obj)
	{
		// ��web.xml�ļ��л�ò����к˶���Servlet
		String ignoreServlets = this.getServletContext().getInitParameter(
				"ignoreServlets");
		if (ignoreServlets != null)
		{
			String[] servlets = ignoreServlets.split(",");
			String servlet = this.getServletName();
			for (String s : servlets)
			{
				// �����ǰServlet�����ԣ���ֱ�ӷ���true
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

		// ��request���л�÷�װ�û����������ģ����
		Object model = request.getAttribute("#form");

		try
		{
			Object obj = LoadObject(request, model);
			checkValidationCode(request, model);
			if (checkLogin(request, obj) == false)
			{
				// �����ǰ�û�δ��¼���ض���login.jsp
				response.sendRedirect("login.jsp");
				return;
			}

			String result = null;
			String username = (String) request.getSession()
					.getAttribute("user");
			// ���õ�ǰServlet��execute����������ͻ�������
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
