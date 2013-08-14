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
		// ���δ������֤���ַ�������code.txt�ļ��ж�ȡ��֤���ַ���
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
		// �����֤�뼯�ϵĳ���
		int charsLength = codeChars.length();

		// ��ֹ�ͻ��˻�����ҳ
		response.setHeader("ragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		// ����ͼ����֤��ĳ��Ϳ���֤��ͼ��Ĵ�С��
		int width = 150, height = 30;
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();
		Random random = new Random();
		// �������Ҫ������ɫ
		g.setColor(getRandomColor(190, 250));
		// ���ͼ�α���
		g.fillRect(0, 0, width, height);
		// �������������ɫ
		g.setColor(getRandomColor(80, 160));
		// ���ڱ������������ɵ���֤��
		StringBuilder validationCode = new StringBuilder();
		String[] fontNames = new String[]{"����", "����", "����"};
		// �������3����5����֤��
		for (int i = 0; i < 3 + random.nextInt(3); i++)
		{
			// ������õ�ǰ��֤����ַ�������
			g.setFont(new Font(fontNames[random.nextInt(3)], Font.ITALIC, height));
			// �����õ�ǰ��֤����ַ�
			
			char codeChar = codeChars.charAt(random.nextInt(charsLength));
			validationCode.append(codeChar);
			// ������õ�ǰ��֤���ַ�����ɫ
			g.setColor(getRandomColor(10, 100));
			// ��ͼ���������֤���ַ�
			g.drawString(String.valueOf(codeChar), 25 * i + 6,
					height - random.nextInt(5));

		} 

		HttpSession session = request.getSession();

		// ����session����30����ʧЧ
		session.setMaxInactiveInterval(30 * 60); 
		// ����֤�뱣����session�����У�keyΪvcode
		session.setAttribute("vCode", validationCode.toString());

		g.dispose();
		OutputStream os = response.getOutputStream();
		ImageIO.write(image, "JPEG", os);
	}
}
