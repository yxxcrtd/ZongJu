package cn.digitalpublishing.service.impl;
import java.awt.Insets;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.security.InvalidParameterException;

import org.zefer.pd4ml.PD4Constants;
import org.zefer.pd4ml.PD4ML;

import cn.digitalpublishing.service.PDFService;

public class PDFServiceImpl implements PDFService { 
	
	    protected int topValue = 10;  
	    protected int leftValue = 20;  
	    protected int rightValue = 10;  
	    protected int bottomValue = 10;  
	    protected int userSpaceWidth = 1300;  
	    public void doConversion( String htmlDocument, String outputPath )   
	                throws InvalidParameterException, MalformedURLException, IOException {  
	        PD4ML pd4ml = new PD4ML();  
	        pd4ml.setHtmlWidth(userSpaceWidth);
	        pd4ml.setPageSize(pd4ml.changePageOrientation(PD4Constants.A4));   
	        pd4ml.setPageInsetsMM(new Insets(topValue, leftValue, bottomValue, rightValue));   
	        pd4ml.addStyle("BODY {margin: 0}", true);  
			pd4ml.useTTF("java:cn/com/pdf/fonts", true);
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();  
	        pd4ml.render(new StringReader(htmlDocument), baos);   
	        baos.close();  
	        System.out.println( "resulting PDF size: " + baos.size() + " bytes" );  
	        File output = new File(outputPath);  
	        java.io.FileOutputStream fos = new java.io.FileOutputStream(output);  
	        fos.write( baos.toByteArray() );  
	        fos.close();  
	        System.out.println( outputPath + "\ndone." );  
	    }  
	
	  public final static String readFile( String path, String encoding ) throws IOException {  
	        File f = new File( path );  
	        FileInputStream is = new FileInputStream(f);  
	        BufferedInputStream bis = new BufferedInputStream(is);  
	        ByteArrayOutputStream fos = new ByteArrayOutputStream();  
	       byte buffer[] = new byte[2048];  
	        int read;  
	        do {  
	            read = is.read(buffer, 0, buffer.length);  
	            if (read > 0) {   
	                fos.write(buffer, 0, read);   
	            }  
	       } while (read > -1);  
	  
	        fos.close();  
	        bis.close();  
	        is.close();  
	        return fos.toString(encoding);  
	    }
	@Override
	public void createPDF(String soucePath, String savePath, String enCoding)
			throws Exception {
		// TODO Auto-generated method stub
        String html = readFile(soucePath, enCoding);  
        System.out.println(html);
        doConversion(html, savePath);
	}  
}  

