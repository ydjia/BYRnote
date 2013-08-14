package filters;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import util.FileExt;

public class FileFilter extends FormFilter
{
	// 这两个变量值从过滤器的初始化参数中的读取
	private String paramCacheName;// 将表示请求参数的Map对象保存在request域中的域属性名
	private long maxSize = 2048; // 允许上传文件的默认总尺寸， 单位是K

	@Override
	public void init(FilterConfig filterConfig) throws ServletException
	{
		// 调用父类的init方法
		super.init(filterConfig);
		// 读取paramCacheName参数值
		paramCacheName = filterConfig.getInitParameter("paramCacheName");
		// 读取maxSize参数值
		String value = filterConfig.getInitParameter("maxSize");
		if(value != null)
		{
			maxSize = Integer.parseInt(value);
		}
	}

	@Override
	protected List<String> getFilterParamNames()
	{
		List<String> paramNames = super.getFilterParamNames();
		// 添加两个普通参数
		paramNames.add("paramCacheName");
		paramNames.add("maxSize");
		return paramNames;
	}

	// 获得当前上传的所有文件的总尺寸
	private long getFileSize(List files)
	{
		long size = 0;
		for (Object file : files)
		{
			FileExt fileExt = (FileExt) file;
			size += fileExt.getSize();
		}
		return size;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException
	{

		try
		{
			// 在调用父类的doFilter之前，先将请求参数信息都保存在Map对象中，
			// 然后在getParamValue方法中从Map对象中获取请求参数值
			// /////////////////////////////////////////////
			Map<String, Object> paramNames = new HashMap<String, Object>();
			// 使用common-fileupload组件处理请求信息
			FileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			// 分析请求信息，并返回表示请求参数（包括文件域的信息）的List对象

			List<FileItem> items = upload
					.parseRequest((HttpServletRequest) request);
	
			String filename = "";
			InputStream is = null;

			// 处理所有请求参数（包括文件域）
			for (FileItem item : items)
			{
				// 如果是普通的请求参数，将请求参数名和请求参数值加到Map对象中（paramNames变量）
				if(item.isFormField())
				{
					paramNames.put(item.getFieldName(), item.getString());
				}
				// 如果上传文件名不为空或空字符串，处理文件域中的文件内容
				else if(item.getName() != null && !item.getName().equals(""))
				{

					FileExt fe = new FileExt();
					// 将上传文件的信息保存在FileExt对象的相应属性中
					fe.setFileStream(item.getInputStream());
					fe.setFilename(new String(item.getName().getBytes("GBK"),
							"UTF-8"));
					fe.setSize(item.getSize());
					fe.setContentType(item.getContentType());
					// 看看Map对象中是否已经有同名的请求参数，如果存在，表示客户端上传的是多个文件
					Object value = paramNames.get(item.getFieldName());
					List files = null;
					// 处理第一个文件域
					if(value == null)
					{
						// 创建一个ArrayList对象，不管是上传一个文件还是多个文件，
						// 表示上传文件的FileExt对象都保存在ArrayList对象中
						files = new ArrayList();
						files.add(fe);
						paramNames.put(item.getFieldName(), files);
					}
					else
					{
						files = (List) value;
						// 如果已经处理完同字段名的文件域，将当前表示上传文件的FileExt对象添加到相应的ArrayList对象中
						files.add(fe);
					}
					// 获得已经上传文件的总尺寸（单位是K）
					long size = getFileSize(files) / 1024;
					if(size > maxSize)
					{
						// 如果已经上传文件的总尺寸大于最大允许上传的文件尺寸，则抛出异常
						throw new Exception("上传文件尺寸：" + size + "K，大于最大上传文件尺寸："
								+ maxSize + "K");
					}
				}
			}

			// 将保存请求参数信息的Map对象保存在request域中，属性名为paramCacheName参数的值
			
			request.setAttribute(paramCacheName, paramNames);
			// 调用父类的doFilter方法，继续处理JavaBean对象属性和请求参数的映射关系
			super.doFilter(request, response, chain);
		}
		catch (Exception e)
		{
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().write(e.getMessage());
		}
	}

	// 该方法用于处理FileExt类型的JavaBean属性
	// form参数表示JavaBean对象实例，paramValue表示当前处理的请求参数值，在本例中该值只能是List类型
	// method参数表示当前处理的JavaBean属性的setter方法的Method对象
	// JavaBean属性的名称和paramValue请求参数名相同。在本方法中要将该paramValue参数值赋给method参数值对应的属性
	@Override
	protected void doMethod(Object form, Object paramValue, Method method)
	{
		try
		{
			// 为了以后的扩展，在这里要判断当前请求参数的类型是否为List类型，但在本例中只能是List类型
			if(paramValue instanceof List)
			{
				List<FileExt> params = (List) paramValue;
				if(params.size() == 0)
					return;
				// 处理JavaBean属性类型为FileExt对象的情况
				if(method.getParameterTypes()[0] == FileExt.class)
				{
					method.invoke(form, params.get(0));
				}
				// 处理JavaBean属性类型为FileExt对象数组的情况
				else if(method.getParameterTypes()[0] == FileExt[].class)
				{
					method.invoke(form, new Object[]
					{ params.<FileExt> toArray(new FileExt[params.size()]) });
				}
				// 处理JavaBean属性类型为List<FileExt>对象的情况
				else if(method.getParameterTypes()[0] == List.class)
				{
					method.invoke(form, params);
				}
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}

	// 在该方法中从Map对象中获得请求参数值，该Map对象是在doFilter方法中保存在request域中的
	@Override
	protected Object getParamValue(HttpServletRequest request, String name)
	{
		Map<String, Object> paramNames = (Map<String, Object>) request
				.getAttribute(paramCacheName);
		Object result = paramNames.get(name);
		return result;

	}

}
