package cn.digitalpublishing.util.io;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.read.biff.BiffException;
import cn.digitalpublishing.util.ISBN;

public class JXLTool2 {
	private Workbook workbook = null; // 工作部对象

	private List<HashMap<String,Object>> mapData=null;
	
	private Sheet sheet = null; // 工作表

	public int totalRows = 0; // 总行数

	public int totalColumns = 0; // 总列数

	/**
	 * 以一个InputStream为参数的构造器
	 * 
	 * @param inputStream
	 * @throws IOException
	 * @throws BiffException
	 */
	public JXLTool2(InputStream inputStream) throws BiffException, IOException {
		WorkbookSettings setting=new  WorkbookSettings();
		setting.setEncoding("ISO-8859-1");//防止特殊字符乱码
		this.workbook = Workbook.getWorkbook(inputStream,setting);
		this.sheet = this.workbook.getSheet(0);
		this.getRows();
		this.getColumns();		
	}

	/**
	 * 以一个Struts FormFile为参数的构造器
	 * 
	 * @param file
	 * @throws IOException
	 * @throws FileNotFoundException
	 * @throws BiffException
	 */
	// public JXLTool(FormFile file) throws FileNotFoundException, IOException,
	// BiffException
	// {
	// this(file.getInputStream());
	// }

	/**
	 * 以一个File为参数的构造器
	 * 
	 * @param file
	 * @throws IOException
	 * @throws BiffException
	 */
	public JXLTool2(File file) throws BiffException, IOException {
		this(new FileInputStream(file));
	}

	/**
	 * 以一个文件路径path的构造器
	 * 
	 * @param filePath
	 * @throws IOException
	 * @throws BiffException
	 */
	public JXLTool2(String filePath) throws BiffException, IOException {

		this(new File(filePath));
	}

//	/**
//	 * 把所有数据放到一个map中去,key为行号加列号
//	 * 
//	 * @return
//	 */
//	public HashMap<String, String> getExcelDate() {
//		mapData = new HashMap<String, String>();
//		for (int i = 0; i < this.totalRows; i++) {
//			for (int j = 0; j < this.totalCells; j++) {
//				this.mapData.put(i + "" + j, this.getData(j, i));
//			}
//		}
//		return this.mapData;
//	}

	/**
	 * 得到总行数
	 */
	private void getRows() {
		this.totalRows = sheet.getRows();
	}

	/**
	 * 得到总列数
	 */
	private void getColumns() {
		this.totalColumns = this.sheet.getColumns();
	}

	public List<HashMap<String,Object>> getDatas(){
		return mapData;
	}
	public boolean Parse(Boolean hasheader)throws Exception{
		try{			
			if(this.sheet!=null){
				String[] header = null;
				mapData=new ArrayList<HashMap<String,Object>>();

				for(Integer i=0;i<totalRows;i++){
					
					// 表格首行为列标题，提取列标题---------------------
					if (hasheader && i==0) {
						Cell[] headrow=this.sheet.getRow(0);
						header=new String[totalColumns];
						for(int k=0;k<header.length;k++){
							header[k]=headrow[k].getContents();
						}
						continue;
					}
					else if(!hasheader && i==0){
						header = new String[totalColumns];
						// 初始化列标题为Column + 序号---------------
						for (Integer k = 0; k< header.length; k++) {
							header[k] = "Column" + (k + 1);
						}
					}
						HashMap<String,Object> map=new HashMap<String,Object>();
						//System.out.println(i.toString());
						//第一列ISBN不存在的，不进行循环
						if(this.sheet.getCell(0, i).getContents()!=null && !"".equals(this.sheet.getCell(0, i).getContents())){
							//ISBN的处理
							String isbn = this.sheet.getCell(0, i).getContents();
							//验证isbn的合法性
							if(!ISBN.checkISBN(isbn)){
								return false;
							}
							if(isbn.contains("-")||isbn.contains(" ")){
								isbn = isbn.replace("-","");
								isbn = isbn.replace(" ","");
							}
							map.put(header[0].toUpperCase(), isbn);
						for(Integer j=1;j<totalColumns;j++){
								String content=this.sheet.getCell(j, i).getContents();
								if(content!=null){
									content=new String(content.getBytes("UTF-8"),"UTF-8");							
								}
								map.put(header[j].toUpperCase(), content);
							}
						
						mapData.add(map);
						}else{
							//isbn为空
							mapData = null;
						}
				}
				this.workbook.close();
				return true;
			}else{
				this.workbook.close();
				return false;
			}			
		}catch(Exception e){
			throw e;
		}
	}
}