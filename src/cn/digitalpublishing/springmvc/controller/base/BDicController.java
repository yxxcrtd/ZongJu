package cn.digitalpublishing.springmvc.controller.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.BDicClass;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.base.BDicForm;
import cn.digitalpublishing.util.DicCache;
import com.google.common.base.Strings;

@Controller
@RequestMapping(value="/pages/dic")
public class BDicController extends BaseController {
	
	@RequestMapping(value="/form/list")
	public ModelAndView index(BDicForm form)throws Exception {
		String forwardString="base/dic/list"; 
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			form.setClassId(request.getParameter("dicClassId"));
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return new ModelAndView(forwardString, model);
	}
	@RequestMapping(value="/form/manager", headers="Accept=application/json")
	@ResponseBody
	public BDicForm manager(BDicForm form) throws Exception
	{
		List<BDic> bDicList = new ArrayList<BDic>();
		try {
			Map< String, Object> condition = form.getCondition();
			condition.put("status",DicCache.getIdByCode(DicConstants.DIC_STATUS,DicConstants.DATA_STATUS_AVAILABLE));
			form.setClassId(request.getParameter("dicClassId"));
			condition.put("dicClassId", form.getClassId());
			if(!Strings.isNullOrEmpty(form.getName())){
				condition.put("name","%"+form.getName()+"%");
			}
			if(!Strings.isNullOrEmpty(form.getCode()))
			{
				condition.put("code", "%"+form.getCode()+"%");
			}
			form.setiTotalRecords(this.dicClassService.getDicCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if(form.getiTotalRecords()>0)
			{
				bDicList = this.dicClassService.getDicPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		form.setAaData(bDicList);
		return form;
	}
	@RequestMapping(value="/form/edit")
	public ModelAndView edit(BDicForm form)throws Exception {
		String forwardString="base/dic/edit";
		Map<String , Object> model = new HashMap<String, Object>();
//		Map<String,Object> condition = form.getCondition();
		try {
			form.setClassId(request.getParameter("dicClassId"));
//			form.setDicList(this.dicClassService.getDicList(condition));
			if(request.getParameter("id")!= null){
				BDic bDic = this.dicClassService.getDic(request.getParameter("id"));
				form.setObj(bDic);
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	@RequestMapping(value="/form/editSubmit")
	@ResponseBody
	public BDicForm editSubmit(BDicForm form)throws Exception {
		BDic bDic = form.getObj();
		try {
			//修改
			if(!Strings.isNullOrEmpty(form.getId())){
				this.dicClassService.updateDic(bDic, form.getId(), null);
				form.setMsg("修改数据字典数据成功！");
			}else{
			//新增
				bDic.setDicClass(new BDicClass());
				bDic.getDicClass().setId(form.getClassId());
				this.dicClassService.insertDic(bDic);
				form.setMsg("新增数据字典数据成功！");
			}
			
			DicCache.reloadDicData(form.getClassId());
			
			form.setIsSuccess(SUCCESS);
			} catch (Exception e) {
				form.setIsSuccess(FAILURE);
				form.setMsg("维护数据字典数据出错！");
		}
		form.setClassId(request.getParameter("dicClassId"));
		return form;
	}
	//删除
	@RequestMapping(value="/form/delete")
	@ResponseBody
	public BDicForm deleteDic(BDicForm form)throws Exception {
		String id = request.getParameter("id");
		String dicClassId = request.getParameter("dicClassId");
		try{
			BDic bDic = this.dicClassService.getDic(id);
			this.dicClassService.deleteDic(bDic,id,null);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除数据字典数据成功！");
			DicCache.reloadDicData(dicClassId);
		}
		catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		form.setClassId(dicClassId);
		return form;
	}
	
	@RequestMapping(value="/form/codeUnique")
	@ResponseBody
	public BDicForm codeUnique(BDicForm form) throws Exception {
		try{
			String id = request.getParameter("id");
			String classId = request.getParameter("classId");
			if(this.dicClassService.checkDicCodeUnique(id, classId,form.getCode())) {
				form.setIsSuccess(SUCCESS);
				form.setMsg("通过验证");
			} else {
				form.setIsSuccess(FAILURE);
				form.setMsg("已存在相同code值");
			}
		}catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value="/form/orderUnique")
	@ResponseBody
	public BDicForm orderUnique(BDicForm form) throws Exception {
		try{
			String id = request.getParameter("id");
			String classId = request.getParameter("classId");
			if(this.dicClassService.dicOrderUnique(id, classId,form.getOrder())) {
				form.setIsSuccess(SUCCESS);
				form.setMsg("通过验证");
			} else {
				form.setIsSuccess(FAILURE);
				form.setMsg("已存在相同order值");
			}
		}catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}
