package cn.digitalpublishing.springmvc.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Strings;

import cn.com.daxtech.framework.exception.CcsException;
import cn.digitalpublishing.po.PublishTrade;
import cn.digitalpublishing.springmvc.form.PublishTradeForm;

/**
 * 版权交易信息管理
 * 
 * @author cuixian
 */
@Controller
@RequestMapping("/pages/trade")
public class PublishTradeController extends BaseController {
	
	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/index")
    public ModelAndView index(PublishTradeForm form) throws Exception {
        String forwardString = "publishTrade/PublishTradeList.ftl";
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
	 * 版权交易信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	public PublishTradeForm manager(PublishTradeForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<PublishTrade> tradeList = new ArrayList<PublishTrade>();
		String sourceId = form.getSourceId();
		try {
			if (!Strings.isNullOrEmpty(form.getTradeStr())) {
				condition.put("tradeDate",  form.getTradeDate());
			}
			condition.put("sourceId", sourceId);
			form.setiTotalRecords(this.publishTradeService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (0 < form.getiTotalRecords()) {
				tradeList = this.publishTradeService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		form.setAaData(tradeList);
		return form;
	}
	
	/**
	 * 显示新增页
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/form/edit")
	public ModelAndView edit(PublishTradeForm form)throws Exception {
		String forwardString="publishTrade/PublishTradeEdit.ftl"; 
		Map<String,Object> model = new HashMap<String,Object>();
		try {
			//修改
			form.setSourceId(form.getSourceId());
			model.put("form", form);
			} catch (Exception e) {
				form.setMsg(exMsg(e));
		}
		return new ModelAndView(forwardString, model);
	}
	
	/**
	 * 新增版权交易信息
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/form/save")
	public PublishTradeForm save(PublishTradeForm form) throws Exception {
		PublishTrade trade = form.getObj();
		try {
			this.publishTradeService.insert(trade);
			form.setMsg("添加成功!");
			form.setIsSuccess("true");	
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	/**
	 * 删除
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/form/delete")
	@ResponseBody
	public PublishTradeForm delete(PublishTradeForm form)throws Exception {
		try{
			String id = request.getParameter("id");
			this.publishTradeService.delete(id);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除成功！");
		}
		catch(Exception e){
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	/**
	 * 显示Excel导入页
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/upload")
    public ModelAndView upload(PublishTradeForm form) throws Exception {
        Map<String, Object> model = new HashMap<String, Object>();
        String forwardString = "publishTrade/PublishTradeUpload.ftl";
        try {
        	form.setSourceId(form.getSourceId());
            model.put("form", form);
        } catch (Exception e) {
            form.setIsSuccess(FAILURE);
            form.setMsg((e instanceof CcsException) ? ((CcsException) e).getPrompt() : e.getMessage());
            forwardString = "msg";
        }
        return new ModelAndView(forwardString, model);
    }
	/**
	 * Excel导入版权交易信息
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value = "/form/uploadSubmit")
    @ResponseBody
    public PublishTradeForm uploadSubmit(PublishTradeForm form) throws Exception {
    	String sourceId = form.getSourceId();
        try {
            InputStream is = form.getTxtFile().getInputStream();
            this.publishTradeService.upload(is,sourceId);
            form.setMsg("上传成功!");
            form.setIsSuccess(SUCCESS);
        } catch (Exception e) {
            form.setIsSuccess(FAILURE);
            form.setMsg((e instanceof CcsException) ? ((CcsException) e).getPrompt() : e.getMessage());
        } finally {
			form.setTxtFile(null);
		}
        return form;
    }
	
}
