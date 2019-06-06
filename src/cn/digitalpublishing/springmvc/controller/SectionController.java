package cn.digitalpublishing.springmvc.controller;

import java.io.FileOutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JOptionPane;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.XMLWriter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.Section;
import cn.digitalpublishing.springmvc.form.SectionForm;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.io.ToolUtil;

/**
 * Article
 * 
 * @author yul
 */
@Controller
@RequestMapping("/section")
public class SectionController extends BaseController {
	
	@ResponseBody
	@RequestMapping(value = "/addinit")
	public SectionForm addinit(SectionForm form) throws Exception {
		try {
			//生成uuid
			String id = ToolUtil.getUUID();
			form.setId(id);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return form;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/save")
	public SectionForm save(SectionForm form) throws Exception {
		try {
			String id = request.getParameter("chapterid");
			String noStyleContent = request.getParameter("noStyleContent");
			System.out.println(noStyleContent);
			Section section = form.getObj();
			section.setNoStyleContent(noStyleContent);
			Chapter chapter = new Chapter();
			chapter.setId(id);
			section.setChapter(chapter);
			//判断节数是否存在   
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("isnotown", section.getId());
			map.put("number", section.getNumber());
			//章id 为本章id
			map.put("chapterid", id);
			int count = this.sectionService.getCount(map);
			if(count>0){
				form.setIsSuccess("1");
				form.setMsg("“"+section.getNumber()+"” 已经存在！");
			}else{
				//查询是否已经存储数据
				Section sectionNow = this.sectionService.findById(section.getId());
				if(sectionNow==null){
					this.sectionService.insert(section); 
					form.setIsSuccess("1");
					form.setMsg("保存成功");
				}else{
					this.sectionService.update(section, Section.class.getName(), section.getId(), null);
					form.setIsSuccess("1");
					form.setMsg("更新成功");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return form;
	}
	
	@ResponseBody
	@RequestMapping(value = "/edit")
	public SectionForm edit(SectionForm form) throws Exception {
		try {
			Section section = form.getObj();
			this.sectionService.update(section, Section.class.getName(), section.getId(), null);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return form;
	}
	
	@RequestMapping(value = "/delete")
	public ModelAndView delete(SectionForm form) throws Exception {
		String sectionid = request.getParameter("sectionid");
		String chapterid = request.getParameter("chapterid");
		try {
			this.sectionService.delete(Section.class.getName(), sectionid);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return new ModelAndView("redirect:/article/chapteredit?chapterid="+chapterid);
	}
	
	
	@RequestMapping(value = "/finishsection")
	public ModelAndView finishSection(SectionForm form) throws Exception {
		
		String id = form.getObj().getId();
		
		Map<String,Object> condition = new HashMap<String,Object>();
		condition.put("sectionid", id);
		List<Section> list = this.sectionService.getList(condition, null);
		StringBuffer content=new StringBuffer("");
		String bookName = "";
		String chapterid = "";
		for (Section section : list) {
			Chapter chapter = section.getChapter();
			chapterid = chapter.getId();
			Article article = section.getChapter().getArticle();
			bookName = article.getBookName();
			content.append(ToolUtil.returnBookTitle(bookName));
			content.append(ToolUtil.returnChapter(chapter.getNumber()+"&nbsp; &nbsp; &nbsp; &nbsp;"+chapter.getName()));
			content.append(ToolUtil.returnSection(section.getNumber()+"&nbsp; &nbsp; &nbsp; &nbsp;"+section.getName()));
			content.append(ToolUtil.returnSection(section.getContent()));
			
			//保存到pproduct 中 设置审核状态为待审核
			PProduct product = new PProduct();
			product.setTitle(bookName);
			//设置作者
			
			product.setUser(article.getUser());
			//设置内容
			product.setContent(content.toString());
			product.setCreateOn(new Date());
			//设置产品类型
			product.setProductType(article.getProductType());
			//可用状态
			product.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			//设置审核状态 为未审批
			String flowStatus = DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_UNDO);
			product.setFlowStatus(flowStatus);
			//设置对象名
			product.setObjName("Section");
			//设置对象主键id
			product.setObjId(section.getId());
			//保存资源 修改在线创作状态
			String articleStatus = DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_DOING);
			section.setFlowStatus(articleStatus);
			//调用生成xml文件
//			createXml(section,chapter,article);
			this.sectionService.finishAndSave(product,section);
		}
		//跳转到章修改页面
		return new ModelAndView("redirect:/article/chapteredit?flag=1&chapterid="+chapterid);
	}
	private void createXml(Section section, Chapter chapter, Article article) {
		// TODO Auto-generated method stub
		try {
			//inof
			Document mainXML = DocumentHelper.createDocument();
			Element bookNode = DocumentHelper.createElement("book");
			mainXML.add(bookNode);
			
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
			chapterTitleNode.setText("章标题");
			//
			Element chapterNodeChild = DocumentHelper.createElement("chapter");
			chapterNode.add(chapterNodeChild);
			//创建节 sect
			Element sectNode = DocumentHelper.createElement("sect");
			chapterNodeChild.add(sectNode);
			
			//节标题 title
			Element sectTitleNode = DocumentHelper.createElement("title");
			sectNode.add(sectTitleNode);
			sectTitleNode.setText("节标题");
			//节内容  para
			Element paraTitleNode = DocumentHelper.createElement("para");
			paraTitleNode.setText("节内容");
			sectNode.add(paraTitleNode);
			
			XMLWriter writer = new XMLWriter(new FileOutputStream("d://main.xml"));
			writer.write(mainXML);  
			writer.close();
			System.out.println("文件写入成功");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}

	public static void main(String[] args) {
		new SectionController().createXml(null, null, null);
	}

}