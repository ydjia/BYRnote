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
	// 被拦截的URL和JavaBean的对应关系，key表示被拦截的URL，value表示封装请求参数的JavaBean
	Map<String, String> actions = new HashMap<String, String>();
	// 封装请求参数的JavaBean对象实例保存在request域中的属性名称，从过滤器的初始化参数中读取
	private String formName;
	
    //  如果过滤器初始化参数名在该方法返回的List对象中，则表示该参数值不是JavaBean，而是普通的参数值
	//  可以覆盖该方法，并添加新的普通参数名称
	protected List<String> getFilterParamNames()
	{
		List<String> paramNames = new LinkedList<String>();
		paramNames.add("formName");
		return paramNames;
	}
	public void init(FilterConfig filterConfig) throws ServletException
	{
		Enumeration names = filterConfig.getInitParameterNames();
		//  读取所有的过滤器初始化参数值
		while (names.hasMoreElements())
		{
			String name = names.nextElement().toString();
			List<String> paramNames = getFilterParamNames();
			//  如果当前参数是普通参数，将该参数值赋给相应的变量
			if(paramNames.contains(name))
			{
				if(name.equals("formName"))
					formName = filterConfig.getInitParameter(name);
			}
			else
			{
				//  如果当前参数表示一个被拦截的URL，那么该参数值必须是一个与其对应的JavaBean，并这个对应关系加入Map中
				actions.put(name, filterConfig.getInitParameter(name));
			}
		}
	}	
    //  返回一个setter方法对应的属性名称
	protected String getProperty(String setter)
	{
		String property = setter.substring(3);
		property = property.substring(0, 1).toLowerCase()
				+ property.substring(1);
		return property;
	}

	// 对字符串进行解码
	protected String decode(HttpServletRequest request, String s)
			throws UnsupportedEncodingException
	{
		String encoding = request.getCharacterEncoding();
		if(encoding == null)
			encoding = "ISO-8859-1";
		s = new String(s.getBytes(encoding), "UTF-8");
		return s;

	}
    //  如果JavaBean中属性的数据类型无法处理，则调用该方法。其他的过滤器类可以继承FormFilter类，并覆盖该方法以处理这些属性
	protected void doMethod(Object form, Object paramValue, Method method)
	{

	}
	//  返回指定的请求参数的值，该方法也可以在FormFilter类的子类被覆盖，以使用其他方法获得请求参数的值
	protected Object getParamValue(HttpServletRequest request, String name)
	{
		return request.getParameter(name);
	}
	
	
	
    //  处理过滤器逻辑的方法
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException
	{
		HttpServletRequest myRequest = (HttpServletRequest) request;
		//  获得被拦截的Web资源的路径，该路径可看作一个动作
		String action = myRequest.getServletPath();
        //  根据该动作从过滤器
		String className = actions.get(action);

		if(className != null)
		{
			try
			{
				//  创建JavaBean的对象实例
				Object form = Class.forName(className).newInstance();
				//  保存JavaBean中所有setter方法的Method对象
				List<Method> setterMethods = new ArrayList<Method>();
				//  获得JavaBean中所有方法的Method对象
				Method[] methods = form.getClass().getMethods();
				for (Method method : methods)
				{
					//  如果方法名称的前三个字符是set，并且只有一个参数，则表示该方法是setter方法，
					if(method.getName().startsWith("set")
							&& method.getParameterTypes().length == 1)
						setterMethods.add(method);
				}
				//  为JavaBean中的属性寻找与其同名的请求参数
				for (Method method : setterMethods)
				{
					//  获得setter方法的参数类型的Class对象
					Class paramType = method.getParameterTypes()[0];
					//  获得与setter方法对应的属性同名的请求参数的值
					Object paramValue = getParamValue(myRequest,
							getProperty(method.getName()));
				    //  如果不存在同名的请求参数，则继续处理下一个setter方法
					if(paramValue == null)
						continue;
					//  处理字符串类型的属性
					if(paramType == String.class)
					{
						String value = decode(myRequest, paramValue.toString());
						// 调用setter方法为属性赋值
						method.invoke(form, value);
					}
					//  处理整数类型的属性
					else if(paramType == int.class
							|| paramType == Integer.class)
					{
						//  进行类型转换
						int value = Integer.parseInt(paramValue.toString());
						method.invoke(form, value);
					}
					//  处理浮点类型的属性
					else if(paramType == float.class
							|| paramType == Float.class)
					{
						float value = Float.parseFloat(paramValue.toString());
						method.invoke(form, value);
					}
					//  处理日期类型的属性
					else if(paramType == java.util.Date.class)
					{
						DateFormat df = DateFormat.getDateInstance();
						java.util.Date value = df.parse(paramValue.toString());
						method.invoke(form, value);
					}
					//  处理布尔类型的属性
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
				
				//  将JavaBean对象实例保存在request域中，域属性名称为formName变量的值
				request.setAttribute(formName, form);
				//  调用下一个过滤器的Servlet
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
