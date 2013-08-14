package servlet;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Random;
import javax.imageio.ImageIO;
import javax.servlet.*;
import javax.servlet.http.*;

public class ValidationCode extends HttpServlet
{
	private static String codeChars = null;

	private static Color getRandomColor(int minColor, int maxColor)
	{
		Random random = new Random();
		int red = minColor + random.nextInt(maxColor - minColor);
		int green = minColor + random.nextInt(maxColor - minColor);
		int blue = minColor + random.nextInt(maxColor - minColor);
		return new Color(red, green, blue);
	}

	@Override
	protected void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		// 如果未加载验证码字符串，从code.txt文件中读取验证码字符串
		if(codeChars == null)
		{
			FileInputStream fis = new FileInputStream(this.getServletContext()
					.getRealPath("/WEB-INF/code.txt"));
			InputStreamReader isr = new InputStreamReader(fis);
			BufferedReader br = new BufferedReader(isr);
			String s = "";
			while ((s = br.readLine()) != null)
			{
				codeChars = s;
			}
		}
		// 获得验证码集合的长度
		int charsLength = codeChars.length();

		// 禁止客户端缓存网页
		response.setHeader("ragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		// 设置图形验证码的长和宽（验证码图像的大小）
		int width = 150, height = 30;
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();
		Random random = new Random();
		// 随机设置要填充的颜色
		g.setColor(getRandomColor(190, 250));
		// 填充图形背景
		g.fillRect(0, 0, width, height);
		// 随机设置字体颜色
		g.setColor(getRandomColor(80, 160));
		// 用于保存最后随机生成的验证码
		StringBuilder validationCode = new StringBuilder();
		String[] fontNames = new String[]{"宋体", "楷体", "隶书"};
		// 随机生成3个到5个验证码
		for (int i = 0; i < 3 + random.nextInt(3); i++)
		{
			// 随机设置当前验证码的字符的字体
			g.setFont(new Font(fontNames[random.nextInt(3)], Font.ITALIC, height));
			// 随机获得当前验证码的字符
			
			char codeChar = codeChars.charAt(random.nextInt(charsLength));
			validationCode.append(codeChar);
			// 随机设置当前验证码字符的颜色
			g.setColor(getRandomColor(10, 100));
			// 在图形上输出验证码字符
			g.drawString(String.valueOf(codeChar), 25 * i + 6,
					height - random.nextInt(5));

		} 

		HttpSession session = request.getSession();

		// 设置session对象30分钟失效
		session.setMaxInactiveInterval(30 * 60); 
		// 将验证码保存在session对象中，key为vcode
		session.setAttribute("vCode", validationCode.toString());

		g.dispose();
		OutputStream os = response.getOutputStream();
		ImageIO.write(image, "JPEG", os);
	}
}
