package cn.digitalpublishing.springmvc.controller;

import java.awt.Color;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.Compress;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.RecordCompress;
import cn.digitalpublishing.po.Watermark;
import cn.digitalpublishing.springmvc.form.CompressForm;
import cn.digitalpublishing.springmvc.form.product.PProductForm;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.io.PdfHelper;

import com.google.common.base.Strings;

/**
 * 产品信息打包
 * @author CuiXian
 */
@Controller
@RequestMapping("/pages/compress")
public class CompressController extends BaseController {
	
	/**
	 * 显示首页
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/index")
    public ModelAndView index(CompressForm form) throws Exception {
        String forwardString = "compress/ProductList.ftl";
        Map<String, Object> model = new HashMap<String, Object>();
        try {
        	form.setCompressId(form.getId());
            model.put("form", form);
        } catch (Exception e) {
            form.setMsg(exMsg(e));
            forwardString = "msg";
        }
        return new ModelAndView(forwardString, model);
    }
	
	/**
	 * 产品信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	public PProductForm manager(PProductForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<PProduct> list = new ArrayList<PProduct>();
		try {
			if (!Strings.isNullOrEmpty(form.getTitle())) {
				condition.put("title", "%" + form.getTitle() + "%");
			}
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			condition.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));
			form.setiTotalRecords(this.productService.getProductCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (0 < form.getiTotalRecords()) {
				list = this.productService.getProductPagingList(condition, "",form.getiDisplayLength(), form.getiDisplayStart());
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		form.setAaData(list);
		return form;
	}
	
	/**
	 * 新增ZIP文件夹
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("form/save")
	@ResponseBody
	public CompressForm save(CompressForm form)throws Exception {
		try {
			String compressId = form.getCompressId();
			Compress compress = this.compressService.getId(compressId);
			// 拷贝临时文件的存放路径
			File copyfile = new File(new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.COMPRESS).append(File.separator).append(compress.getPath()).append(File.separator).toString());
			
			// 判定文件夹是否存在，不存在创建新文件夹
			if (!copyfile.exists()) {
				copyfile.mkdirs();
			}
	
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("active", 1);
			Watermark watermark = (Watermark) watermarkService.getActive(condition, "");
			String content = watermark.getContent();
			float fontSize = (float) watermark.getFont();
			
			// 根据Id循环获取选取的文件存储路径
			for(int i = 0; i<form.getIds().length; i++){
				PProduct product = this.productService.getProduct(form.getIds()[i]);
				
				// 获得选取文件存储路径
				String path = product.getBookPDFSystemName();
				
				// 选取的文件，存储的，完整路径
				String temp = new StringBuffer(getUploadPath()).append(File.separator).append(product.getIsbn()).append(File.separator).append(path).toString();
				
				// 将每个文件拷贝到compress下的时间文件夹中
				File copy = new File(temp);
				if (copy.exists()) {
					FileUtils.copyFileToDirectory(copy, copyfile);
					// 加水印
					PdfHelper.textMark(content, fontSize, "", temp, copyfile + File.separator + path, Color.LIGHT_GRAY, "STSong-Light", "UniGB-UCS2-H", true);
					//插入记录
					RecordCompress record = new RecordCompress();
					record.setName(compress.getPath());
					record.setOriginName(product.getBookPDFOriginName());
					record.setSystemName(product.getBookPDFSystemName());
					this.recordCompressService.insert(record);
					
					// 新增
					form.setMsg("添加成功！");
					form.setIsSuccess(SUCCESS);
				}else{
					System.err.println("文件不存在");
					form.setIsSuccess(FAILURE);
				}
			}
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
}
