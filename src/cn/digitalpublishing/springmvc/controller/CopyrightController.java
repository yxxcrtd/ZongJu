package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.Copyright;
import cn.digitalpublishing.springmvc.form.CopyrightForm;

import com.google.common.base.Strings;

/**
 * 版权信息
 * 
 * @author YangXinXin
 */
@Controller
@RequestMapping("/pages/copyright")
public class CopyrightController extends BaseController {
	
	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/index")
	public ModelAndView index() throws Exception {
		return new ModelAndView("copyright/CopyrightList.ftl");
	}

	/**
	 * 版权信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	public CopyrightForm manager(CopyrightForm form) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Copyright> copyrightList = new ArrayList<Copyright>();
		try {
			if (!Strings.isNullOrEmpty(form.getBelong())) {
				map.put("belong", "%" + form.getBelong() + "%");
			}
			if (!Strings.isNullOrEmpty(form.getProperty())) {
				map.put("property", "%" + form.getProperty() + "%");
			}
			if (!Strings.isNullOrEmpty(form.getUnder())) {
				map.put("under", "%" + form.getUnder() + "%");
			}
			form.setiTotalRecords(this.copyrightService.getCount(map));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (0 < form.getiTotalRecords()) {
				copyrightList = this.copyrightService.getCopyrightPagingList(map, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		form.setAaData(copyrightList);
		return form;
	}
	
	/**
	 * 显示添加页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/saveSubmit")
    public ModelAndView saveSubmit(CopyrightForm form) throws Exception {
        String forwardString = "copyright/CopyrightAdd.ftl";
        Map<String, Object> model = new HashMap<String, Object>();
        try {
        	form.setSourceId(form.getId());
        	model.put("form", form);
        } catch (Exception e) {
            form.setMsg(exMsg(e));
            forwardString = "msg";
        }
        return new ModelAndView(forwardString, model);
    }
	
	/**
	 * 添加或修改
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/edit")
	public ModelAndView edit(CopyrightForm form) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		forwardString = "copyright/CopyrightEdit.ftl";
		try {
			if (null != form.getId() && !"".equals(form.getId())) {
				Copyright copyright = this.copyrightService.findById(form.getId());
				form.setObj(copyright);
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
	@RequestMapping("/form/save")
	public CopyrightForm save(CopyrightForm form) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Copyright copyright = form.getObj();
			// 新增
			if (Strings.isNullOrEmpty(copyright.getId())) {
				map.put("sourceId", copyright.getSourceId().getId());
				List<Copyright> copyrightlist = this.copyrightService.getList(map, "");
				if(0 < copyrightlist.size()){
					form.setMsg("版权信息已完善!");
				}else{
					this.copyrightService.insert(copyright);
					form.setMsg("新增版权信息成功!");
					form.setIsSuccess(SUCCESS);
				}
			} else { // 修改
				this.copyrightService.update(copyright, Copyright.class.getName(), copyright.getId(), null);
				form.setMsg("修改版权信息成功！");
				form.setIsSuccess(SUCCESS);
			}
		} catch (Exception e) {
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
	@RequestMapping("/form/del")
	public CopyrightForm del(CopyrightForm form) throws Exception {
		try{
			this.copyrightService.delete(Copyright.class.getName(), form.getId());
			form.setMsg("版权信息删除成功！");
			form.setIsSuccess(SUCCESS);
		}catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg("版权信息删除出错！");
		}
		return form;
	}

}
