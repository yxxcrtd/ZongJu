package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.Watermark;
import cn.digitalpublishing.springmvc.form.WatermarkForm;

import com.google.common.base.Strings;

/**
 * 水印管理
 * 
 * @author hejiaojiao
 */
@Controller
@RequestMapping("/pages/watermark")
public class WatermarkController extends BaseController {

	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/index")
	public ModelAndView index() throws Exception {
		return new ModelAndView("watermark/WatermarkList.ftl");
	}

	/**
	 * 水印信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	
	@ResponseBody
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json"  )
	public WatermarkForm manager(WatermarkForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<Watermark> list = new ArrayList<Watermark>();

		try {
			if (!Strings.isNullOrEmpty(form.getContent())) {
				condition.put("content", "%" + form.getContent() + "%");
			}
			form.setiTotalRecords(this.watermarkService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (0 < form.getiTotalRecords()) {
				list = this.watermarkService.getPagingList(condition, "",
						form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		form.setAaData(list);
		return form;
	}

	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/add")
	public ModelAndView add() throws Exception {
		return new ModelAndView("watermark/WatermarkAdd.ftl");
	}

	/**
	 * 修改页
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/edit")
	public ModelAndView edit(WatermarkForm form) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		forwardString = "watermark/WatermarkEdit.ftl";
		try {
			if (null != form.getId() && !"".equals(form.getId())) {
				Watermark watermark = this.watermarkService.getId(form.getId());
				form.setObj(watermark);
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		map.put("form", form);
		return new ModelAndView(forwardString, map);
	}

	/**
	 * 保存
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/form/addftl")
	public WatermarkForm add(WatermarkForm form) throws Exception {
		try {
			Map<String, Object> condition = new HashMap<String, Object>();
			Watermark watermark = form.getObj();
			String formContent = watermark.getContent();
			if (!Strings.isNullOrEmpty(formContent)) {
				condition.put("content", formContent);
			}

			List<Watermark> list = this.watermarkService.getByContent(condition, "");
			if (0 < list.size()) {
				form.setMsg("内容不能重复！");
				form.setIsSuccess(SUCCESS);
			} else {
				watermark.setActive(0);
				this.watermarkService.insert(watermark);
				form.setMsg("添加成功!");
				form.setIsSuccess(SUCCESS);
			}
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	/**
	 * 修改
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/form/editftl")
	public WatermarkForm editftl(WatermarkForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		Watermark watermark = form.getObj();
		try{
			String formContent = watermark.getContent();
			if (!Strings.isNullOrEmpty(formContent)) {
				condition.put("content", formContent);
			}
			List<Watermark> list = this.watermarkService.getByContent(condition, "");
			String id = watermark.getId();
			if(list.size()>0){
				String iid = list.get(0).getId();
				if ((id).equals(iid)) {
					//设置激活
					int formActive = watermark.getActive();
					condition.put("active", 1);
					List<Watermark> l = watermarkService.getByActive(condition,"");
					if (1 == formActive) {
						// 设置所有的激活状态为未激活
						for (Watermark w : l) {
							w.setActive(0);
							this.watermarkService.update(w, w.getId(), null);
						}
						watermark.setActive(1);
						this.watermarkService.update(watermark, watermark.getId(), null);
						form.setMsg("激活成功！");
						form.setIsSuccess(SUCCESS);
					}
					form.setMsg("修改成功");
					form.setIsSuccess(SUCCESS);
				} else {
					form.setMsg("内容不能重复!");
				}
			}else{
				//设置激活
				int formActive = watermark.getActive();
				condition.put("active", 1);
				List<Watermark> l = watermarkService.getByActive(condition,"");
				if (1 == formActive) {
					// 设置所有的激活状态为未激活
					for (Watermark w : l) {
						w.setActive(0);
						this.watermarkService.update(w, w.getId(), null);
					}
					watermark.setActive(1);
					this.watermarkService.update(watermark, watermark.getId(), null);
					form.setMsg("激活成功！");
					form.setIsSuccess(SUCCESS);
				}
				this.watermarkService.update(watermark, watermark.getId(),null);
				form.setMsg("修改成功");
				form.setIsSuccess(SUCCESS);
			}
		}catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

	
	/**
	 * 删除
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/form/delete")
	public WatermarkForm delete(WatermarkForm form) throws Exception {
		String id = request.getParameter("id");
		try {
			this.watermarkService.delete(id);
			form.setMsg("删除成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("删除出错！");
		}
		return form;
	}

}
