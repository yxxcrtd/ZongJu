package cn.digitalpublishing.springmvc.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.po.Compress;
import cn.digitalpublishing.springmvc.form.CompressForm;
import cn.digitalpublishing.util.DateFormatUitl;

import com.google.common.base.Strings;

/**
 * 网络素材信息
 * @author CuiXian
 */
@Controller
@RequestMapping("/pages/compresszip")
public class CompressZipController extends BaseController {
	
	/**
	 * 显示打包素材首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/index")
	public ModelAndView indexs() throws Exception {
		return new ModelAndView("compress/CompressList.ftl");
	}
	
	/**
	 * 打包素材信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	public CompressForm manager(CompressForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<Compress> compressList = new ArrayList<Compress>();
		try {
			if (!Strings.isNullOrEmpty(form.getName())) {
				condition.put("name", "%"+ form.getName() +"%");
			}
			if (!Strings.isNullOrEmpty(form.getRemark())) {
				condition.put("remark", "%"+ form.getRemark() +"%");
			}
			form.setiTotalRecords(this.compressService.getCompressCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (0 < form.getiTotalRecords()) {
				compressList = this.compressService.getCompressPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		form.setAaData(compressList);
		return form;
	}
	
	/**
	 * 显示新增页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/form/add")
	public ModelAndView add() throws Exception {
		return new ModelAndView("compress/CompressAdd.ftl");
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
		String forwardString="compress/CompressEdit.ftl"; 
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
	 * 保存
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/form/save")
	public CompressForm save(CompressForm form) throws Exception {
		try {
			Compress compress = form.getObj();
			if(Strings.isNullOrEmpty(compress.getId())){
				Map<String, Object> cond = new HashMap<String, Object>();
				cond.put("name", compress.getName());
				List<Compress> list = this.compressService.getCompressPagingList(cond, "", 10, 0);
				if(0 < list.size()){
					form.setMsg("该包名已被使用！");
				}else{
					//新增
					// 生成的最终的打包文件名（以时间格式生成）
					String lastCompressFile = DateFormatUitl.formatString();
					
					// 文件压缩后的储存路径
					File compressPath = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).append(File.separator).toString());
					
					// 拷贝临时文件的存放路径
					File copyfile = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).append(File.separator).append(lastCompressFile).append(File.separator).toString());
					
					// 判定文件夹是否存在，不存在创建新文件夹
					if (!compressPath.exists()) {
						compressPath.mkdirs();
					}
					if (!copyfile.exists()) {
						copyfile.mkdirs();
					}
					compress.setPath(lastCompressFile);
					compress.setRemark("");
					compress.setStatus(0);
					this.compressService.insert(compress);
					form.setMsg("新增成功！");
					form.setIsSuccess(SUCCESS);
				}
			}else{
				// 修改
				this.compressService.update(compress, compress.getId(), null);
				form.setMsg("修改成功！");
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
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/form/delete")
	@ResponseBody
	public CompressForm delete(CompressForm form)throws Exception {
		try{
			String id = request.getParameter("id");
			Compress compress = this.compressService.getId(id);
			File Path = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).toString());
			File file = new File(Path+File.separator+compress.getPath()+".zip");
		    if(file.exists()){
		        file.delete();
		    }
			this.compressService.delete(id);
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
	 * 下载
	 * @param id
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/download")
	public ResponseEntity<byte[]> downloadFile() throws Exception {
		byte[] data = null;
		HttpHeaders header = new HttpHeaders();
		String id = request.getParameter("id");
		try {
			Compress compress = this.compressService.getId(id);
			// 取得文件存储路径
			File Path = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).toString());
			//zip包名
			String name = new String(compress.getName().getBytes("gbk"), "iso-8859-1")+".zip";
			//下载
			header.setContentType(MediaType.parseMediaType("application/x-msdownload"));
			header.set("Content-Disposition", "attachment; filename=" + name);
			data = FileUtils.readFileToByteArray(new File(Path.toString()+File.separator+compress.getPath()+".zip"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<byte[]>(data, header, HttpStatus.OK);
	}
	
}