package cn.digitalpublishing.springmvc.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JOptionPane;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.po.Section;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.ArticleForm;
import cn.digitalpublishing.springmvc.form.ChapterForm;
import cn.digitalpublishing.springmvc.form.SectionForm;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.Pager;
import cn.digitalpublishing.util.io.PdfHelper;
import cn.digitalpublishing.util.io.ToolUtil;

/**
 * Article
 * 
 * @author yul
 */
@Controller
@RequestMapping("/article")
public class ArticleController extends BaseController {
	
	/**
	 * 添加或修改
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/manager")
	public ModelAndView manager(ArticleForm form,@RequestParam(value = "p", required = false, defaultValue = "1") int p) throws Exception{
		Map<String,Object> model = new HashMap<String,Object>();
		String flag = request.getParameter("flag");
		if(flag!=null&&"1".equals(flag)){
			form.setMsg("文章已提交完成");
		}
		//用户id
		User user = (User) session.getAttribute("user");
		if(user==null){
			return new ModelAndView("website/Login.ftl", model);
		}
		String userid = user.getId();
		List<Article> articleList = new ArrayList<Article>();
		Map<String, Object> map = new HashMap<String, Object>();
		//添加用户id 作为检索条件
		map.put("userid", userid);
		forwardString = "article/articleList.ftl";
		
		
		
		int dataCount = 0;
		try {
				dataCount = this.articleService.getCount(map);
				//分页处理
				Pager pager = new Pager();
				pager.setPageNo(p);
				pager.setTotalCount(dataCount);
				if(dataCount>0){
				articleList = this.articleService.getArticlePagingList(map, "", pager.getPageSize(), pager.getOffset());
				//循环articlelist 通过 图书id查询Chapter记录集合
				for(Article article:articleList){
					Map<String,Object> condition = new HashMap<String,Object>();
					condition.put("articleid", article.getId());
					List<Chapter> chapterList = this.chapterService.getList(condition, " order by a.coder ");
					article.setChapterList(chapterList);
				}
			}
			model.put("articleList", articleList);
			model.put("form", form);
			model.put("pager", pager);
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.put("active", "article");
		return new ModelAndView(forwardString,model);
	}
	
	
	@RequestMapping("/edit")
	public ModelAndView edit(ArticleForm form){
		forwardString = "article/articleEdit.ftl";
		Map<String,Object> model = new HashMap<String,Object>();
		String id = form.getId();
		try {
			//查询分类
			Map<String, Object> conidtion = new HashMap<String, Object>();
			List<PProductType> productTypeList = this.productTypeService.getProductTypeTreeList(conidtion, "");
			Article article = null;
			//编辑图书
			if(id!=null&&!"".equals(id)){
				//通过id 查询
				article = this.articleService.findById(id);
			}
			form.setObj(article);
			form.setId(id);
			model.put("form", form);
			model.put("productTypeList", productTypeList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ModelAndView(forwardString,model);
	}
	
	@RequestMapping("/chapteredit")
	public ModelAndView chapteredit(ChapterForm form){
		forwardString = "article/chapterSectionEdit.ftl";
		Map<String,Object> model = new HashMap<String,Object>();
		String chapterid = request.getParameter("chapterid");
		String flag = request.getParameter("flag");
		try {
			Chapter chapter = null;
			//编辑图书
			if(chapterid!=null&&!"".equals(chapterid)){
				//通过id 查询
				chapter = this.chapterService.findById(chapterid);
			}
			if(flag!=null&&"1".equals(flag)){
				form.setMsg("已提交完成");
			}
			form.setChapter(chapter);
			form.setId(chapterid);
			model.put("form", form);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ModelAndView(forwardString,model);
	}
	
	@RequestMapping(value = "/save")
	public ModelAndView saveOrEdite(ArticleForm articleForm) throws Exception {
		try {
			//用户id
			User u = (User) session.getAttribute("user");
			String userid = u.getId();
			Article article = articleForm.getObj();
			User user = new User();
			user.setId(userid);
			article.setUser(user);
			//设置资源分类
//			PProductType prodctType = new PProductType();
//			prodctType.setId();
//			article.setProductType(prodctType);
			String id = articleForm.getId();
			if(id!=null&&!"".equals(id)){
				this.articleService.update(article, Article.class.getName(), id, null);
			}else{
			//保存
				this.articleService.insert(article);
				articleForm.setId(article.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return new ModelAndView("redirect:/article/manager");
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/savechapter")
	public ArticleForm saveChapter(ArticleForm articleForm) throws Exception {
		try {
			String id=request.getParameter("id");
			//用户id
			Chapter chapter = articleForm.getChapter();
			if(id!=null&&!"".equals(id)){
				//判断章数是否存在
				Map<String,Object> map = new HashMap<String, Object>(); 
				map.put("number", chapter.getNumber());
				map.put("isnotown", id);
				map.put("articleid", chapter.getBookid());
				int count = chapterService.getCount(map);
				if(count>0){
					articleForm.setIsSuccess("1");
					articleForm.setMsg("“"+ chapter.getNumber()+"” 已经存在！");
				}else{
					this.chapterService.update(chapter, Chapter.class.getName(), id, null);
				}
			}else{
				//判断章数是否存在
				Map<String,Object> map = new HashMap<String, Object>(); 
				map.put("number", chapter.getNumber());
				int count = chapterService.getCount(map);
				if(count>0){
					articleForm.setIsSuccess("1");
					articleForm.setMsg("“"+ chapter.getNumber()+"” 已经存在！");
				}else{
					//保存
					Article article = new Article();
					article.setId(chapter.getBookid());
					chapter.setArticle(article);
					this.chapterService.insert(chapter);
					articleForm.setId(chapter.getId());
					//通过articleid 查询chapter列表
					Map<String,Object> condition = new HashMap<String,Object>();
					condition.put("articleid", chapter.getBookid());
					List<Chapter> chapterList = this.chapterService.getList(condition, " order by a.number ");
					articleForm.setChapterList(chapterList);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return articleForm;
	}
	
	@ResponseBody
	@RequestMapping(value = "/create")
	public ArticleForm createPDF(ArticleForm form) throws Exception {
		String id = form.getId();
		System.out.println(id);
		try {
			Article article = null;
			article = this.articleService.findById(id);
			//生成html文件 并保存
			String strHTML = stringHTML(article.getContent());
			System.out.println(strHTML);
			File tempHtml = new File(ProcessQueue.WEBROOT+File.separator+ProcessQueue.TEMPHTML);

			if(!tempHtml.exists()){
				tempHtml.mkdirs();
			}
			//生成的html路径
			String filePath = tempHtml+File.separator+id+".html";
			//转换后生成的PDF文件路径
			String savePath = tempHtml+File.separator+id+".pdf";
			//生成临时转换html文件
			PdfHelper.createHTML(filePath, strHTML, "UTF-8");
			//生成pdf文件
			this.pdfservice.createPDF(filePath, savePath, "UTF-8");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw e;
		}
		return form;
	}
	
	@RequestMapping(value = "/del")
	public ModelAndView delete(ArticleForm articleForm) throws Exception {
		try {
			String id = request.getParameter("articleid");
			//删除
			this.articleService.delete(Article.class.getName(), id);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return new ModelAndView("redirect:/article/manager");
	}
	
	/**
	 * 完成在线编辑图书
	 * @param content
	 * @return
	 */
	public ArticleForm finishBook(ArticleForm form) throws Exception {
		return null;
	}
	
	public String stringHTML(String content){
		StringBuffer sb =  new StringBuffer();
		sb.append("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'>");
		sb.append("<html>");
		sb.append("<head>");
		sb.append("<title></title>");
		sb.append("<meta http-equiv=Content-Type content='text/html; charset=utf-8'>");
	
		sb.append("<style type='text/css'>");
		sb.append("*{");
		sb.append("font-family: KaiTi_GB2312;");
		sb.append("}");
		sb.append("</style>");
		sb.append("</head>");
		sb.append("<body>");
		sb.append(content);
		sb.append("<body>");
	
		return sb.toString();
	}
	
	@RequestMapping(value = "/finishArticle")
	public ModelAndView finishArticle(SectionForm form) throws Exception {
		
		String id = request.getParameter("articleid");
		
		Article article = this.articleService.findById(id);
		//循环出所有的记录 拼接内容content
		StringBuffer content = new StringBuffer("");
		if(article!=null){
			//拼接图书题目
			content.append(ToolUtil.returnBookTitle(article.getBookName()));
			for (Chapter chapter : article.getChapters()) {
				//拼接章数和章题
				content.append(ToolUtil.returnChapter(chapter.getNumber()+"&nbsp; &nbsp; &nbsp; &nbsp;"+chapter.getName()));
				for (Section section : chapter.getSections()) {
					content.append(section.getContent());
					
					content.append(ToolUtil.returnSection(section.getNumber()+"&nbsp; &nbsp; &nbsp; &nbsp;"+section.getName()));
					content.append(ToolUtil.returnSection(section.getContent()));
				}
			}
			
            Map<String,Object> condition = new HashMap<String, Object>();
            condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
            condition.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_UNDO));
            condition.put("objId", article.getId());
            List<PProduct> unList = productService.getList(condition, "");
            System.out.println("========总数======" + unList.size());
            
			if (0 == unList.size()) {
				//保存到pproduct 中 设置审核状态为待审核
				PProduct product = new PProduct();
				product.setTitle(article.getBookName());
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
				product.setObjName("Article");
				//设置对象主键id
				product.setObjId(article.getId());
				//保存资源 修改在线创作状态
				String articleStatus = DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_DOING);
				article.setFlowStatus(articleStatus);
				this.articleService.finishAndSave(product,article);
			}
		}
		//跳转到章修改页面
		return new ModelAndView("redirect:/article/manager?flag=1");
	}
	
	
	@RequestMapping(value = "/finishChapter")
	public ModelAndView finishChapter(ChapterForm form) throws Exception {
		String id = request.getParameter("chapterid");
		Chapter chapter = this.chapterService.findById(id);
		//循环出所有的记录 拼接内容content
		StringBuffer content = new StringBuffer("");
		if(chapter!=null){
			Article article = chapter.getArticle();
			//拼接图书题目
			content.append(ToolUtil.returnBookTitle(article.getBookName()));
				//拼接章数和章题
			content.append(ToolUtil.returnChapter(chapter.getNumber()+"&nbsp; &nbsp; &nbsp; &nbsp;"+chapter.getName()));
			for (Section section : chapter.getSections()) {
				content.append(section.getContent());
				
				content.append(ToolUtil.returnSection(section.getNumber()+"&nbsp; &nbsp; &nbsp; &nbsp;"+section.getName()));
				content.append(ToolUtil.returnSection(section.getContent()));
			}
			
			//保存到pproduct 中 设置审核状态为待审核
			PProduct product = new PProduct();
			product.setTitle(article.getBookName());
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
			product.setObjName("Chapter");
			//设置对象主键id
			product.setObjId(chapter.getId());
			//保存资源 修改在线创作状态
			String articleStatus = DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_DOING);
			chapter.setFlowStatus(articleStatus);
			this.articleService.finishAndSave(product,chapter);
		}
		//跳转到章修改页面
		return new ModelAndView("redirect:/article/chapteredit?flag=1&chapterid="+id);
	}
}