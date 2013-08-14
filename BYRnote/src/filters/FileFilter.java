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
	// ����������ֵ�ӹ������ĳ�ʼ�������еĶ�ȡ
	private String paramCacheName;// ����ʾ���������Map���󱣴���request���е���������
	private long maxSize = 2048; // �����ϴ��ļ���Ĭ���ܳߴ磬 ��λ��K

	@Override
	public void init(FilterConfig filterConfig) throws ServletException
	{
		// ���ø����init����
		super.init(filterConfig);
		// ��ȡparamCacheName����ֵ
		paramCacheName = filterConfig.getInitParameter("paramCacheName");
		// ��ȡmaxSize����ֵ
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
		// ���������ͨ����
		paramNames.add("paramCacheName");
		paramNames.add("maxSize");
		return paramNames;
	}

	// ��õ�ǰ�ϴ��������ļ����ܳߴ�
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
			// �ڵ��ø����doFilter֮ǰ���Ƚ����������Ϣ��������Map�����У�
			// Ȼ����getParamValue�����д�Map�����л�ȡ�������ֵ
			// /////////////////////////////////////////////
			Map<String, Object> paramNames = new HashMap<String, Object>();
			// ʹ��common-fileupload�������������Ϣ
			FileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			// ����������Ϣ�������ر�ʾ��������������ļ������Ϣ����List����

			List<FileItem> items = upload
					.parseRequest((HttpServletRequest) request);
	
			String filename = "";
			InputStream is = null;

			// ����������������������ļ���
			for (FileItem item : items)
			{
				// �������ͨ�������������������������������ֵ�ӵ�Map�����У�paramNames������
				if(item.isFormField())
				{
					paramNames.put(item.getFieldName(), item.getString());
				}
				// ����ϴ��ļ�����Ϊ�ջ���ַ����������ļ����е��ļ�����
				else if(item.getName() != null && !item.getName().equals(""))
				{

					FileExt fe = new FileExt();
					// ���ϴ��ļ�����Ϣ������FileExt�������Ӧ������
					fe.setFileStream(item.getInputStream());
					fe.setFilename(new String(item.getName().getBytes("GBK"),
							"UTF-8"));
					fe.setSize(item.getSize());
					fe.setContentType(item.getContentType());
					// ����Map�������Ƿ��Ѿ���ͬ�������������������ڣ���ʾ�ͻ����ϴ����Ƕ���ļ�
					Object value = paramNames.get(item.getFieldName());
					List files = null;
					// �����һ���ļ���
					if(value == null)
					{
						// ����һ��ArrayList���󣬲������ϴ�һ���ļ����Ƕ���ļ���
						// ��ʾ�ϴ��ļ���FileExt���󶼱�����ArrayList������
						files = new ArrayList();
						files.add(fe);
						paramNames.put(item.getFieldName(), files);
					}
					else
					{
						files = (List) value;
						// ����Ѿ�������ͬ�ֶ������ļ��򣬽���ǰ��ʾ�ϴ��ļ���FileExt������ӵ���Ӧ��ArrayList������
						files.add(fe);
					}
					// ����Ѿ��ϴ��ļ����ܳߴ磨��λ��K��
					long size = getFileSize(files) / 1024;
					if(size > maxSize)
					{
						// ����Ѿ��ϴ��ļ����ܳߴ������������ϴ����ļ��ߴ磬���׳��쳣
						throw new Exception("�ϴ��ļ��ߴ磺" + size + "K����������ϴ��ļ��ߴ磺"
								+ maxSize + "K");
					}
				}
			}

			// ���������������Ϣ��Map���󱣴���request���У�������ΪparamCacheName������ֵ
			
			request.setAttribute(paramCacheName, paramNames);
			// ���ø����doFilter��������������JavaBean�������Ժ����������ӳ���ϵ
			super.doFilter(request, response, chain);
		}
		catch (Exception e)
		{
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().write(e.getMessage());
		}
	}

	// �÷������ڴ���FileExt���͵�JavaBean����
	// form������ʾJavaBean����ʵ����paramValue��ʾ��ǰ������������ֵ���ڱ����и�ֵֻ����List����
	// method������ʾ��ǰ�����JavaBean���Ե�setter������Method����
	// JavaBean���Ե����ƺ�paramValue�����������ͬ���ڱ�������Ҫ����paramValue����ֵ����method����ֵ��Ӧ������
	@Override
	protected void doMethod(Object form, Object paramValue, Method method)
	{
		try
		{
			// Ϊ���Ժ����չ��������Ҫ�жϵ�ǰ��������������Ƿ�ΪList���ͣ����ڱ�����ֻ����List����
			if(paramValue instanceof List)
			{
				List<FileExt> params = (List) paramValue;
				if(params.size() == 0)
					return;
				// ����JavaBean��������ΪFileExt��������
				if(method.getParameterTypes()[0] == FileExt.class)
				{
					method.invoke(form, params.get(0));
				}
				// ����JavaBean��������ΪFileExt������������
				else if(method.getParameterTypes()[0] == FileExt[].class)
				{
					method.invoke(form, new Object[]
					{ params.<FileExt> toArray(new FileExt[params.size()]) });
				}
				// ����JavaBean��������ΪList<FileExt>��������
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

	// �ڸ÷����д�Map�����л���������ֵ����Map��������doFilter�����б�����request���е�
	@Override
	protected Object getParamValue(HttpServletRequest request, String name)
	{
		Map<String, Object> paramNames = (Map<String, Object>) request
				.getAttribute(paramCacheName);
		Object result = paramNames.get(name);
		return result;

	}

}
