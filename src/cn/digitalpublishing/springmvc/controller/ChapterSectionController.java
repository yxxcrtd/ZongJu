package cn.digitalpublishing.springmvc.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.ArticleForm;
import cn.digitalpublishing.util.io.PdfHelper;

/**
 * Chapter
 * 
 * @author yul
 */
@Controller
@RequestMapping("/chapter")
public class ChapterSectionController extends BaseController {
	
	
	/**
	 * 添加或修改
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/manager")
	public ModelAndView manager(ArticleForm form){
		//用户id
		User user = (User) session.getAttribute("user");
		String userid = user.getId();
		List<Article> articleList = new ArrayList<Article>();
		Map<String, Object> map = new HashMap<String, Object>();
		//添加用户id 作为检索条件
		map.put("userid", userid);
		forwardString = "article/articleList.ftl";
		Map<String,Object> model = new HashMap<String,Object>();
		int dataCount = 0;
		try {
			dataCount = this.articleService.getCount(map);
			if(dataCount>0){
			form.setiTotalRecords(dataCount);
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			articleList = this.articleService.getArticlePagingList(map, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			model.put("articleList", articleList);
			model.put("form", form);
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
	
	
	@ResponseBody
	@RequestMapping(value = "/save")
	public ArticleForm saveOrEdite(ArticleForm articleForm) throws Exception {
		try {
			//用户id
			User u = (User) session.getAttribute("user");
			String userid = u.getId();
			Article article = articleForm.getObj();
			User user = new User();
			user.setId(userid);
			article.setUser(user);
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
		}
		return form;
	}
	
	/**
	 * 添加章
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/addchapter")
	public void addChapter(ArticleForm form){
		//用户id
		try {
			
		} catch (Exception e) {
			e.printStackTrace();
		}
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
}