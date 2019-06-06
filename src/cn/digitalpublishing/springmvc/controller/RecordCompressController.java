package cn.digitalpublishing.springmvc.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.po.Compress;
import cn.digitalpublishing.po.RecordCompress;
import cn.digitalpublishing.springmvc.form.CompressForm;
import cn.digitalpublishing.springmvc.form.RecordCompressForm;
import cn.digitalpublishing.util.io.FileUtil;

import com.google.common.base.Strings;

/**
 * 打包记录
 * @author CuiXian
 */
@Controller
@RequestMapping("/pages/record")
public class RecordCompressController extends BaseController {
	
	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/index")
    public ModelAndView index(RecordCompressForm form) throws Exception {
        String forwardString = "record/RecordCompressList.ftl";
        Map<String, Object> model = new HashMap<String, Object>();
        try {
        	Compress compress = this.compressService.getId(form.getId());
        	form.setName(compress.getPath());
        	form.setBname(compress.getName());
            model.put("form", form);
        } catch (Exception e) {
            form.setMsg(exMsg(e));
            forwardString = "msg";
        }
        return new ModelAndView(forwardString, model);
    }
	
	/**
	 * 打包记录信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	public RecordCompressForm manager(RecordCompressForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<RecordCompress> list = new ArrayList<RecordCompress>();
		String name = form.getName();
		try {
			condition.put("name", name);
			form.setiTotalRecords(this.recordCompressService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (0 < form.getiTotalRecords()) {
				list = this.recordCompressService.getPagingList(condition, "",form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		form.setAaData(list);
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
	public RecordCompressForm delete(RecordCompressForm form)throws Exception {
		try{
			String id = request.getParameter("id");
			RecordCompress record = this.recordCompressService.getId(id);
			File Path = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).append(File.separator).append(record.getName()).toString());
			File file = new File(Path+File.separator+record.getSystemName());
		    if(file.exists()){
		        file.delete();
		    }
			this.recordCompressService.delete(id);
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
	 * 编辑
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/form/edit")
	public ModelAndView edit(CompressForm form)throws Exception {
		String forwardString="compress/CompressEnd.ftl"; 
		Map<String,Object> model = new HashMap<String,Object>();
		try {
			//修改
			String id = request.getParameter("id");
			if(!Strings.isNullOrEmpty(id)){
				form.setObj(this.compressService.getId(id));
				form.setId(id);
			}
			} catch (Exception e) {
				form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	/**
	 * 新增zip压缩包
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("form/save")
	@ResponseBody
	public CompressForm save(CompressForm form)throws Exception {
		Compress compress = form.getObj();
		Compress box = this.compressService.getId(compress.getId());
		// 文件压缩后的储存路径
		File compressPath = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).append(File.separator).toString());	
		// 文件的存放路径
		File copyfile = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).append(File.separator).append(box.getPath()).append(File.separator).toString());
		
		// 生成zip压缩包
		new FileUtil().compressedFile(copyfile.toString(), compressPath.toString());
		
		delFolder(copyfile.toString());
		try {
			// 新增
			compress.setStatus(1);
			this.compressService.update(compress, compress.getId(), null);
			form.setMsg("生成zip压缩包成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	/**
	 * 删除新增时产生的临时文件夹
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	public void delFolder(String folderPath) {
		try {
			delAllFile(folderPath); // 删除完里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			java.io.File myFilePath = new java.io.File(filePath);
			myFilePath.delete(); //删除空文件夹
		} catch (Exception e) {
			log.error("删除临时文件出错----------------");
		}
	}
	
	/**
	 * 删除新增时产生的临时文件夹里的内容
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	public  boolean delAllFile(String path) {
        boolean flag = false;
        File file = new File(path);
        if (!file.exists()) {
          return flag;
        }
        if (!file.isDirectory()) {
          return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
           if (path.endsWith(File.separator)) {
              temp = new File(path + tempList[i]);
           } else {
               temp = new File(path + File.separator + tempList[i]);
           }
           try {
                if (temp.isFile()||javax.imageio.ImageIO.read(temp)!=null) {
                    temp.delete();
                }
           } catch (IOException e) {
	                log.error("删除临时文件出错----------------");
           }
           if (temp.isDirectory()) {
              delAllFile(path + "/" + tempList[i]);//先删除文件夹里面的文件
              delFolder(path + "/" + tempList[i]);//再删除空文件夹
              flag = true;
           }
        }
        return flag;
    } 
	
}
