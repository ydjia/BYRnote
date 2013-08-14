package filters;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.util.Map;
import java.util.List;
import java.util.LinkedList;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Enumeration;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class FormFilter implements Filter
{
	// �����ص�URL��JavaBean�Ķ�Ӧ��ϵ��key��ʾ�����ص�URL��value��ʾ��װ���������JavaBean
	Map<String, String> actions = new HashMap<String, String>();
	// ��װ���������JavaBean����ʵ��������request���е��������ƣ��ӹ������ĳ�ʼ�������ж�ȡ
	private String formName;
	
    //  �����������ʼ���������ڸ÷������ص�List�����У����ʾ�ò���ֵ����JavaBean��������ͨ�Ĳ���ֵ
	//  ���Ը��Ǹ÷�����������µ���ͨ��������
	protected List<String> getFilterParamNames()
	{
		List<String> paramNames = new LinkedList<String>();
		paramNames.add("formName");
		return paramNames;
	}
	public void init(FilterConfig filterConfig) throws ServletException
	{
		Enumeration names = filterConfig.getInitParameterNames();
		//  ��ȡ���еĹ�������ʼ������ֵ
		while (names.hasMoreElements())
		{
			String name = names.nextElement().toString();
			List<String> paramNames = getFilterParamNames();
			//  �����ǰ��������ͨ���������ò���ֵ������Ӧ�ı���
			if(paramNames.contains(name))
			{
				if(name.equals("formName"))
					formName = filterConfig.getInitParameter(name);
			}
			else
			{
				//  �����ǰ������ʾһ�������ص�URL����ô�ò���ֵ������һ�������Ӧ��JavaBean���������Ӧ��ϵ����Map��
				actions.put(name, filterConfig.getInitParameter(name));
			}
		}
	}	
    //  ����һ��setter������Ӧ����������
	protected String getProperty(String setter)
	{
		String property = setter.substring(3);
		property = property.substring(0, 1).toLowerCase()
				+ property.substring(1);
		return property;
	}

	// ���ַ������н���
	protected String decode(HttpServletRequest request, String s)
			throws UnsupportedEncodingException
	{
		String encoding = request.getCharacterEncoding();
		if(encoding == null)
			encoding = "ISO-8859-1";
		s = new String(s.getBytes(encoding), "UTF-8");
		return s;

	}
    //  ���JavaBean�����Ե����������޷���������ø÷����������Ĺ���������Լ̳�FormFilter�࣬�����Ǹ÷����Դ�����Щ����
	protected void doMethod(Object form, Object paramValue, Method method)
	{

	}
	//  ����ָ�������������ֵ���÷���Ҳ������FormFilter������౻���ǣ���ʹ����������������������ֵ
	protected Object getParamValue(HttpServletRequest request, String name)
	{
		return request.getParameter(name);
	}
	
	
	
    //  ����������߼��ķ���
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException
	{
		HttpServletRequest myRequest = (HttpServletRequest) request;
		//  ��ñ����ص�Web��Դ��·������·���ɿ���һ������
		String action = myRequest.getServletPath();
        //  ���ݸö����ӹ�����
		String className = actions.get(action);

		if(className != null)
		{
			try
			{
				//  ����JavaBean�Ķ���ʵ��
				Object form = Class.forName(className).newInstance();
				//  ����JavaBean������setter������Method����
				List<Method> setterMethods = new ArrayList<Method>();
				//  ���JavaBean�����з�����Method����
				Method[] methods = form.getClass().getMethods();
				for (Method method : methods)
				{
					//  ����������Ƶ�ǰ�����ַ���set������ֻ��һ�����������ʾ�÷�����setter������
					if(method.getName().startsWith("set")
							&& method.getParameterTypes().length == 1)
						setterMethods.add(method);
				}
				//  ΪJavaBean�е�����Ѱ������ͬ�����������
				for (Method method : setterMethods)
				{
					//  ���setter�����Ĳ������͵�Class����
					Class paramType = method.getParameterTypes()[0];
					//  �����setter������Ӧ������ͬ�������������ֵ
					Object paramValue = getParamValue(myRequest,
							getProperty(method.getName()));
				    //  ���������ͬ������������������������һ��setter����
					if(paramValue == null)
						continue;
					//  �����ַ������͵�����
					if(paramType == String.class)
					{
						String value = decode(myRequest, paramValue.toString());
						// ����setter����Ϊ���Ը�ֵ
						method.invoke(form, value);
					}
					//  �����������͵�����
					else if(paramType == int.class
							|| paramType == Integer.class)
					{
						//  ��������ת��
						int value = Integer.parseInt(paramValue.toString());
						method.invoke(form, value);
					}
					//  ���������͵�����
					else if(paramType == float.class
							|| paramType == Float.class)
					{
						float value = Float.parseFloat(paramValue.toString());
						method.invoke(form, value);
					}
					//  �����������͵�����
					else if(paramType == java.util.Date.class)
					{
						DateFormat df = DateFormat.getDateInstance();
						java.util.Date value = df.parse(paramValue.toString());
						method.invoke(form, value);
					}
					//  ���������͵�����
					else if(paramType == boolean.class
							|| paramType == Boolean.class)
					{
						method.invoke(form, true);
					}
					else
					{
					
						doMethod(form, paramValue, method);
					}

				}
				
				//  ��JavaBean����ʵ��������request���У�����������ΪformName������ֵ
				request.setAttribute(formName, form);
				//  ������һ����������Servlet
				chain.doFilter(request, response);
			}
			catch (Exception e)
			{
				e.printStackTrace(response.getWriter());
			}
		}
	}
	public void destroy()
	{	
	}
}
