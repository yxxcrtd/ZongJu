package cn.digitalpublishing.springmvc.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.XMLWriter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductLicense;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.po.Section;
import cn.digitalpublishing.springmvc.form.product.PProductForm;
import cn.digitalpublishing.util.DateFormatUitl;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.io.PdfHelper;
import cn.digitalpublishing.util.io.ToolUtil;
import cn.digitalpublishing.util.io.UploadFileUtil;


/**
 * 产品审核信息
 * 
 * @author CuiXian
 */
@Controller
@RequestMapping("/pages/audit")
public class ProductAuditController extends BaseController {

	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/index")
	public ModelAndView index() throws Exception {
		return new ModelAndView("audit/ProductAuditList.ftl");
	}
	
	/**
	 * 待审核信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public PProductForm manage(PProductForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<PProduct> productList = new ArrayList<PProduct>();
		try {
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			condition.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_UNDO));
			form.setiTotalDisplayRecords(this.productService.getProductCount(condition));
			form.setiTotalRecords(form.getiTotalDisplayRecords());
			if (form.getiTotalRecords() > 0) {
				productList = this.productService.getProductPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setAaData(productList);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	/**
	 * 查看产品信息内容
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/look")
	public ModelAndView look(PProductForm form) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		forwardString = "audit/book.jsp";
		try {
			if (null != form.getId() && !"".equals(form.getId())) {
				PProduct product = this.productService.getProduct(form.getId());
				form.setProduct(product);
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		map.put("form", form);
		return new ModelAndView(forwardString, map);
	}
	
	/**
	 * 审核产品信息
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/edit/{code}")
	public ModelAndView edit(@PathVariable String code, PProductForm form) throws Exception {
		String forwardString = "audit/AuditEdit";
		String id = form.getId();
		Map<String, Object> model = new HashMap<String, Object>();
		Map<String, Object> condition = new HashMap<String, Object>();
		Map<String, Object> map = new LinkedHashMap<String, Object>();// 按插入顺序排序
		Map<String, String> productProposalMap = new HashMap<String, String>();
        List<PProductLicense> productLicenseList = new ArrayList<PProductLicense>();

        try {
			form.setBindingMap(DicCache.getDicData(DicConstants.DIC_PRODUCT_BINDING_TYPE));
			if (id != null) {
				PProduct pi = this.productService.getProduct(id);
				form.setProduct(pi);
			}
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			if (this.productTypeService.getProductTypeCount(condition) != 0) {
				PProductType pt = this.productTypeService.getProductTypeByCode(code);
				form.setTid(pt.getId());

                condition.clear();
                condition.put("tid", pt.getId());
                productLicenseList = this.productLicenseService.getList(condition);
			}

			condition.clear();
			condition.put("productId", form.getId());

            form.setProductLicenseList(productLicenseList);
			form.setProductProposalMap(productProposalMap);
			form.setCode(code);

			form.setMap(map);
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	/**
	 * 修改完善产品信息
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public PProductForm editSubmit(PProductForm form) throws Exception {
		try {
			PProduct pi = form.getProduct();
			// 当前资源的前缀命名
			String prefix = DateFormatUitl.formatString();
			//图片存放路径
			String filePath = new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.IMAGE).append(File.separator).toString();
			if(form.getUpLoadFile()!=null){
			  //获取图片名称
			  String fileName = prefix + form.getUpLoadFile().getOriginalFilename().substring(form.getUpLoadFile().getOriginalFilename().lastIndexOf("."));
			  UploadFileUtil.writeFile(filePath, fileName, form.getUpLoadFile().getBytes());
			    pi.setBookCovers(fileName);
			}else{
				pi.setBookCovers(form.getProduct().getBookCovers());
			}
			//二维码以ISBN命名的文件夹(需要验证ISBN中不能包含中文、特殊字符等)，没有就创建
			if (null != pi.getIsbn() && !"".equals(pi.getIsbn())) {
				File isbn = new File(getUploadPath() + File.separator + pi.getIsbn());
				if (!isbn.exists()) {
					isbn.mkdir();
				}
			} else {
				form.setMsg("资源没有ISBN！");
			}
			// 检查二维码文件夹的路径，没有就创建
			String twoDimension = new StringBuffer(getUploadPath()).append(File.separator).append(pi.getIsbn()).toString();
			File twoDimensionPath = new File(twoDimension);
			if (!twoDimensionPath.exists()) {
				twoDimensionPath.mkdirs();
			}
			// 在二维码图片前加一个下划线，以区别于可能出现重复的图片封面
			twoDimension = new StringBuffer(twoDimension).append(File.separator).append("_").append(prefix).append(ProcessQueue.SUFFIX_PNG).toString();
			//得到主机的ip和端口号
			String ip = request.getLocalAddr();
			int port = request.getLocalPort();
			String projectName = request.getContextPath();
			String bookCovers = prefix + ProcessQueue.SUFFIX_PNG;
			pi.setTwoDimension("_" + bookCovers);
			
			//修改产品
			pi.setUpdateOn(new Date());
			pi.setFlowStatus(DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));
			//生成pdf
			String pdfname = createPDF(pi.getIsbn(),pi.getContent());
			pi.setBookPDFOriginName(pi.getTitle()+".pdf");
			pi.setBookPDFSystemName(pdfname+".pdf");
			File temp = new File(getUploadPath()+File.separator+pi.getIsbn()+File.separator+pdfname+".html");
			temp.delete();
			
			//生成xml
			createXML(pi.getObjName(), pi.getObjId(), getUploadPath()+File.separator+pi.getIsbn()+File.separator+"Main.xml");
			String identity = "ISBN_" + pi.getIsbn() + "_" + prefix;
			pi.setIdentityId(identity);
			this.productService.auditUpdateProduct(pi, pi.getId(), ip, port, twoDimension, projectName, null);
			form.setProductId(pi.getId());
			form.setMsg("审核完善产品信息成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}finally {
			form.setUpLoadFile(null);
		}
		return form;
	}
	
	/**
	 * 产品信息审核失败
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public PProductForm delete(PProductForm form) throws Exception {
		try {
			String id = form.getId();
			PProduct ci = this.productService.getProduct(id);
			ci.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE));
			this.productService.deletecProduct(ci);
			form.setMsg("注销数据成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	/**
	 * 创建Pdf文件
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	public String createPDF(String isbn,String content) throws Exception {
		//生成的文件名（以时间格式生成）
		String time = DateFormatUitl.formatString();
		try {
			//生成html文件 并保存
			String strHTML = ToolUtil.stringHTML(content);
			File tempHtml = new File(new StringBuffer(getUploadPath()).append(File.separator).append(isbn).append(File.separator).toString());
			//路径是否存在
			if(!tempHtml.exists()){
				tempHtml.mkdirs();
			}
			//生成的html路径
			String filePath = tempHtml+File.separator+time+".html";
			//转换后生成的PDF文件路径
			String savePath = tempHtml+File.separator+time+".pdf";
			//生成临时转换html文件
			PdfHelper.createHTML(filePath, strHTML, "UTF-8");
			//生成pdf文件	
			this.pdfservice.createPDF(filePath, savePath, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return time;
	}
	
	
	@SuppressWarnings("unused")
	public void createXML(String tableFlag,String id,String savePath) throws IOException{
		XMLWriter writer = null;
		try {
			writer = new XMLWriter(new FileOutputStream(savePath));
			Document mainXML = DocumentHelper.createDocument();
			Element bookNode = DocumentHelper.createElement("book");
			mainXML.add(bookNode);
			if("Article".equals(tableFlag)){
				
				//通过id查询 图书对象
				Article article = this.articleService.findById(id);
				//inof
				
				Element inofNode = DocumentHelper.createElement("info");
				bookNode.add(inofNode);
				
				//toc
				Element tocNode = DocumentHelper.createElement("toc");
				bookNode.add(tocNode);
				Element tocTitleNode = DocumentHelper.createElement("title");
				tocTitleNode.setText("目录");
				tocNode.add(tocTitleNode);
				for(Chapter chapter:article.getChapters()){
					//创建章
					Element chapterNode = DocumentHelper.createElement("chapter");
					tocNode.add(chapterNode);
					
					//章标题
					Element chapterTitleNode = DocumentHelper.createElement("title");
					chapterNode.add(chapterTitleNode);
					chapterTitleNode.setText(chapter.getNumber()+"  "+chapter.getName());
					
					for(Section section : chapter.getSections()){
						
						Element chapterNodeChild = DocumentHelper.createElement("chapter");
						chapterNode.add(chapterNodeChild);
						//创建节 sect
						Element sectNode = DocumentHelper.createElement("sect");
						chapterNodeChild.add(sectNode);
						//节标题 title
						Element sectTitleNode = DocumentHelper.createElement("title");
						sectNode.add(sectTitleNode);
						sectTitleNode.setText(section.getName()+"  "+section.getName());
						//节内容  para
						Element paraTitleNode = DocumentHelper.createElement("para");
						paraTitleNode.setText(section.getNoStyleContent());
						sectNode.add(paraTitleNode);
					}
				}
				
				//
				
			}else if("Chapter".equals(tableFlag)){
				//查询chapter对象
				Chapter chapter = this.chapterService.findById(id);
				Article article = chapter.getArticle();
				Element inofNode = DocumentHelper.createElement("info");
				bookNode.add(inofNode);
				
				//toc
				Element tocNode = DocumentHelper.createElement("toc");
				bookNode.add(tocNode);
				Element tocTitleNode = DocumentHelper.createElement("title");
				tocTitleNode.setText("目录");
				tocNode.add(tocTitleNode);
				
				Element chapterNode = DocumentHelper.createElement("chapter");
				tocNode.add(chapterNode);
				
				//章标题
				Element chapterTitleNode = DocumentHelper.createElement("title");
				chapterNode.add(chapterTitleNode);
				chapterTitleNode.setText(chapter.getNumber()+"  "+chapter.getName());
				
				for(Section section : chapter.getSections()){
					
					Element chapterNodeChild = DocumentHelper.createElement("chapter");
					chapterNode.add(chapterNodeChild);
					//创建节 sect
					Element sectNode = DocumentHelper.createElement("sect");
					chapterNodeChild.add(sectNode);
					//节标题 title
					Element sectTitleNode = DocumentHelper.createElement("title");
					sectNode.add(sectTitleNode);
					sectTitleNode.setText(section.getNumber()+"  "+section.getName());
					//节内容  para
					Element paraTitleNode = DocumentHelper.createElement("para");
					paraTitleNode.setText(section.getNoStyleContent());
					sectNode.add(paraTitleNode);
				}
				
			}else if("Section".equals(tableFlag)){
				Section section = this.sectionService.findById(id);
				
				Element inofNode = DocumentHelper.createElement("info");
				bookNode.add(inofNode);
				//toc
				Element tocNode = DocumentHelper.createElement("toc");
				bookNode.add(tocNode);
				
				Element tocTitleNode = DocumentHelper.createElement("title");
				tocTitleNode.setText("目录");
				tocNode.add(tocTitleNode);
				//创建章
				Element chapterNode = DocumentHelper.createElement("chapter");
				tocNode.add(chapterNode);
				//章标题
				Element chapterTitleNode = DocumentHelper.createElement("title");
				chapterNode.add(chapterTitleNode);
				chapterTitleNode.setText(section.getChapter().getNumber()+"  "+section.getChapter().getName());
				//
				Element chapterNodeChild = DocumentHelper.createElement("chapter");
				chapterNode.add(chapterNodeChild);
				//创建节 sect
				Element sectNode = DocumentHelper.createElement("sect");
				chapterNodeChild.add(sectNode);
				
				//节标题 title
				Element sectTitleNode = DocumentHelper.createElement("title");
				sectNode.add(sectTitleNode);
				sectTitleNode.setText(section.getNumber()+"  "+section.getName());
				//节内容  para
				Element paraTitleNode = DocumentHelper.createElement("para");
				paraTitleNode.setText(section.getNoStyleContent());
				sectNode.add(paraTitleNode);
			}

			writer.write(mainXML);  
			System.out.println("文件写入成功");
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}finally{
			if(writer!=null){
				writer.close();
			}
		}
	}

}