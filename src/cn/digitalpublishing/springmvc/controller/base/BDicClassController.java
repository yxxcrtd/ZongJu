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
import cn.digitalpublishing.springmvc.form.base.BDicClassForm;
import cn.digitalpublishing.util.DicCache;
import com.google.common.base.Strings;

@Controller
@RequestMapping(value="/pages/dicClass")
public class BDicClassController extends BaseController {
	
	@RequestMapping(value="/form/list")
	public ModelAndView index(BDicClassForm form)throws Exception {
		String forwardString="base/dicClass/list"; 
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return new ModelAndView(forwardString, model);
	}
	@RequestMapping(value="/form/manager", headers="Accept=application/json")
	@ResponseBody
	public BDicClassForm manager(BDicClassForm form) throws Exception
	{
		List<BDicClass> bDicClasseList = new ArrayList<BDicClass>();
		try{
			Map<String, Object> condition = form.getCondition();
			condition.put("status",DicCache.getIdByCode(DicConstants.DIC_STATUS,DicConstants.DATA_STATUS_AVAILABLE));
			if(!Strings.isNullOrEmpty(form.getName())){
				condition.put("name","%"+form.getName()+"%");
			}
			if(!Strings.isNullOrEmpty(form.getCode()))
			{
				condition.put("code","%"+form.getCode()+"%");
			}
			if(!Strings.isNullOrEmpty(form.getInternationCode()))
			{
				condition.put("internationCode", "%"+form.getInternationCode()+"%");
			}
			form.setiTotalRecords(this.dicClassService.getDicClassCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if(form.getiTotalRecords()>0){
				bDicClasseList = this.dicClassService.getDicClassPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setAaData(bDicClasseList);
		}catch(Exception e){
			form.setMsg(exMsg(e));
		}
		return form;
	}
	@RequestMapping(value="/form/edit")
	public ModelAndView edit(BDicClassForm form)throws Exception {
		String forwardString="base/dicClass/edit"; 
		Map<String,Object> model = new HashMap<String,Object>();
		try {
			//修改
			String id = request.getParameter("id");
			if(!Strings.isNullOrEmpty(id)){
				form.setObj(this.dicClassService.getDicClass(id));
				form.setId(id);
			}
			} catch (Exception e) {
				form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	
	@RequestMapping(value="/form/editSubmit")
	@ResponseBody
	public BDicClassForm editSubmit(BDicClassForm form)throws Exception {
		BDicClass bDicClass = form.getObj();
		try {
			//修改
			if(form.getId() != null&&!"".equals(form.getId())){
				this.dicClassService.updateDicClass(bDicClass, form.getId(), null);
				form.setMsg("修改数据字典分类数据成功！");
			}else{
			//新增
				this.dicClassService.insertDicClass(bDicClass);
				form.setMsg("新增数据字典分类数据成功！");
			}
			form.setIsSuccess(SUCCESS);
			} catch (Exception e) {
				form.setIsSuccess(FAILURE);
				form.setMsg(exMsg(e));
		}
		return form;
	}
	//删除
	@RequestMapping(value="/form/delete")
	@ResponseBody
	public BDicClassForm deleteDicClass(BDicClassForm form)throws Exception {
		Map<String,Object> condition = new HashMap<String,Object>();
		try{
			String id = request.getParameter("id");
			condition.put("dicClassId", id);
			BDicClass bDicClass = this.dicClassService.getDicClass(id);
			bDicClass.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE));
			condition.put("status",DicCache.getIdByCode(DicConstants.DIC_STATUS,DicConstants.DATA_STATUS_AVAILABLE));
			List<BDic> dicList = this.dicClassService.getDicPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart()); 
			if(dicList.size() != 0){
				for(BDic bDic : dicList){
					this.dicClassService.deleteDic(bDic,bDic.getId(),null);
				}
			}
			this.dicClassService.deleteDicClass(bDicClass, id, null);
			form.setMsg("删除数据字典分类数据成功！");
			form.setIsSuccess(SUCCESS);
		}catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg("修改数据字典分类数据出错！");
		}
		return form;
	}
	@RequestMapping(value="/form/codeUnique")
	@ResponseBody
	public BDicClassForm codeUnique(BDicClassForm form) throws Exception {
		try{
			String id = request.getParameter("id");
			if(this.dicClassService.checkDicClassCodeUnique(id, form.getCode())) {
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
	
}
