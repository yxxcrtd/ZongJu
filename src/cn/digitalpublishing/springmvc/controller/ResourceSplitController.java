package cn.digitalpublishing.springmvc.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.config.ProcessQueue;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductLicense;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.springmvc.form.product.PProductForm;
import cn.digitalpublishing.util.DateFormatUitl;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.io.UploadFileUtil;

import com.google.common.base.Strings;

@Controller
@RequestMapping("/pages/resource/split")
public class ResourceSplitController extends BaseController {

	@RequestMapping(value = "/form/list")
	public ModelAndView index(PProductForm form) throws Exception {
		String forwardString = "product/product/list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			Map<String, Object> conidtion = new HashMap<String, Object>();
			List<PProductType> productTypeList = this.productTypeService.getProductTypeTreeList(conidtion, " order by a.treeCode ");
			form.setProductTypeList(productTypeList);
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public PProductForm manage(PProductForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		try {
			if (!Strings.isNullOrEmpty(form.getQueryIsbn())) {
				condition.put("isbn", form.getQueryIsbn());
			}
			if (!Strings.isNullOrEmpty(form.getTitle())) {
				condition.put("title", "%" + form.getTitle() + "%");
			}
			if (!Strings.isNullOrEmpty(form.getAuthor())) {
				condition.put("author", "%" + form.getAuthor() + "%");
			}
            //产品删除状态是可用
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			//产品审核状态是审核通过
			condition.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));

			form.setiTotalDisplayRecords(this.productService.getProductCount(condition));
			form.setiTotalRecords(form.getiTotalDisplayRecords());
			List<PProduct> infoList = new ArrayList<PProduct>();
			if (form.getiTotalRecords() > 0) {
				infoList = this.productService.getProductPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setAaData(infoList);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return form;
	}

	@RequestMapping(value = "/form/edit/{code}")
	public ModelAndView edit(@PathVariable String code, PProductForm form) throws Exception {
		String forwardString = "product/product/edit";
		String id = form.getId();
		Map<String, Object> model = new HashMap<String, Object>();
		Map<String, Object> condition = new HashMap<String, Object>();
		Map<String, Object> map = new LinkedHashMap<String, Object>();// 按插入顺序排序
		Map<String, String> productProposalMap = new HashMap<String, String>();
        List<PProductLicense> productLicenseList = new ArrayList<PProductLicense>();

        try {
			form.setBindingMap(DicCache.getDicData(DicConstants.DIC_PRODUCT_BINDING_TYPE));
			if (id != null) {
				PProduct pi = this.productService.getProduct(id);
				form.setProduct(pi);
				condition.clear();
			}
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			if (this.productTypeService.getProductTypeCount(condition) != 0) {
				PProductType pt = this.productTypeService.getProductTypeByCode(code);
				form.setTid(pt.getId());

                condition.clear();
                condition.put("tid", pt.getId());
                productLicenseList = this.productLicenseService.getList(condition);
			}

			condition.clear();
			condition.put("productId", form.getId());

            form.setProductLicenseList(productLicenseList);
			form.setProductProposalMap(productProposalMap);
			form.setCode(code);

			form.setMap(map);
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public PProductForm editSubmit(PProductForm form) throws Exception {
		try {
			PProduct pi = form.getProduct();
			// 当前资源的前缀命名
			String prefix = DateFormatUitl.formatString();
			//图片存放路径
			String filePath = new StringBuffer(getUploadPath()).append(File.separator).append(ProcessQueue.IMAGE).append(File.separator).toString();
			if(form.getUpLoadFile()!=null){
			  //获取图片名称
			  String fileName = prefix + form.getUpLoadFile().getOriginalFilename().substring(form.getUpLoadFile().getOriginalFilename().lastIndexOf("."));
			  UploadFileUtil.writeFile(filePath, fileName, form.getUpLoadFile().getBytes());
			    pi.setBookCovers(fileName);
			}else{
				pi.setBookCovers(form.getProduct().getBookCovers());
			}
			if(form.getUpLoadFilePDF()!=null){
				//上传图书PDF文件
				String pdfFileName = prefix + form.getUpLoadFilePDF().getOriginalFilename().substring(form.getUpLoadFilePDF().getOriginalFilename().lastIndexOf("."));
				//保存pdf图书原名
				pi.setBookPDFOriginName(form.getUpLoadFilePDF().getOriginalFilename());
				// 保存系统名
				pi.setBookPDFSystemName(pdfFileName);
				UploadFileUtil.writeFile(getUploadPath() + File.separator + pi.getIsbn() + File.separator, pdfFileName, form.getUpLoadFilePDF().getBytes());
			}
			if(form.getUpLoadFileXML()!=null){
				//上传图书XML文件
				String FileXMLName = "Main" + form.getUpLoadFileXML().getOriginalFilename().substring(form.getUpLoadFileXML().getOriginalFilename().lastIndexOf("."));
				// 保存XML文件名
				pi.setBookXMLName(FileXMLName);
				UploadFileUtil.writeFile(getUploadPath() + File.separator + pi.getIsbn() + File.separator, FileXMLName, form.getUpLoadFileXML().getBytes());
			}
			//二维码以ISBN命名的文件夹(需要验证ISBN中不能包含中文、特殊字符等)，没有就创建
			if (null != pi.getIsbn() && !"".equals(pi.getIsbn())) {
				File isbn = new File(getUploadPath() + File.separator + pi.getIsbn());
				if (!isbn.exists()) {
					isbn.mkdir();
				}
			} else {
				form.setMsg("资源没有ISBN！");
			}
			// 检查二维码文件夹的路径，没有就创建
			String twoDimension = new StringBuffer(getUploadPath()).append(File.separator).append(pi.getIsbn()).toString();
			File twoDimensionPath = new File(twoDimension);
			if (!twoDimensionPath.exists()) {
				twoDimensionPath.mkdirs();
			}
			// 修改
			if (!Strings.isNullOrEmpty(pi.getId())) {
				this.productService.updateProduct(pi, pi.getId(), null);
				form.setProductId(pi.getId());
				form.setMsg("修改产品信息成功！");
				// 新增
			} else {
				// 在二维码图片前加一个下划线，以区别于可能出现重复的图片封面
				twoDimension = new StringBuffer(twoDimension).append(File.separator).append("_").append(prefix).append(ProcessQueue.SUFFIX_PNG).toString();
				//得到主机的ip和端口号
				String ip = request.getLocalAddr();
				int port = request.getLocalPort();
				System.out.println("ip:"+ip+"port:"+port);
				String projectName = request.getContextPath();
				String bookCovers = prefix + ProcessQueue.SUFFIX_PNG;
				pi.setTwoDimension("_" + bookCovers);
				pi.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
				PProductType pt = this.productTypeService.getProductType(form.getTid());
				pi.setProductType(pt);
				pi.setFlowStatus(DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));
				String identity = "ISBN_" + pi.getIsbn() + "_" + prefix;
				pi.setIdentityId(identity);
				this.productService.insertProduct(pi,ip,port,twoDimension,projectName);

				form.setCode(pt.getCode());
				form.setId(pi.getId());
				form.setMsg("新增产品信息成功!");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}finally {
			form.setUpLoadFile(null);
			form.setUpLoadFilePDF(null);
			form.setUpLoadFileXML(null);
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public PProductForm delete(PProductForm form) throws Exception {
		try {
			String id = form.getId();
			PProduct ci = this.productService.getProduct(id);
			ci.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE));
			this.productService.deletecProduct(ci);
			form.setMsg("注销数据成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

}