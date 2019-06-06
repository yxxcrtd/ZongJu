package cn.digitalpublishing.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * PDF文件转SWF文件
 * 
 * @author YangXinXin
 */
public class PDF2SWF {

	/**
	 * 转换
	 * 
	 * @param sourcePath - PDF源文件的全路径
	 * @param destPath - 转换后的存储路径
	 * @param fileName - 转换后的swf文件名
	 * @return
	 * @throws IOException
	 */
	public static int convertPDF2SWF(String swftoolsPath, String sourcePath, String destPath, String fileName, String xpdfPath, String page) throws IOException {

		// 1，源文件不存在的话，就返回
		File source = new File(sourcePath);
		if (!source.exists()) {
			System.out.println("PDF源文件不存在！");
			return 0;
		}
		
		// 2，如果目标路径不存在，则需要创建目标路径
		File dest = new File(destPath);
		if (!dest.exists()) {
			dest.mkdirs();
		}

		// 3，调用 pdf2swf 进行转换
		String command = new StringBuffer(swftoolsPath).append(" ").append(sourcePath).append(" -o ").append(destPath).append(fileName).append(".swf").append(" -f -T 9 -s languagedir=").append(xpdfPath).toString();
		if (!"".equals(page)) {
			command = new StringBuffer(command).append(" ").append(page).toString();
		}
		System.out.println("转换命令：" + command);
		Process pro = Runtime.getRuntime().exec(command);
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(pro.getInputStream()));
		while (bufferedReader.readLine() != null);
		try {
			pro.waitFor();
			System.out.println("转换成功！");
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return pro.exitValue();
	}

}
