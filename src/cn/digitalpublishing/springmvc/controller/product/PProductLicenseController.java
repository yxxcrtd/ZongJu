package cn.digitalpublishing.springmvc.controller.product;

import cn.com.daxtech.framework.exception.CcsException;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.BDicClass;
import cn.digitalpublishing.po.PProductLicense;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.product.PProductLicenseForm;
import com.google.common.base.Strings;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by huangchenxi on 14-6-25.
 */
@Controller
@RequestMapping("/pages/pLicense")
public class PProductLicenseController extends BaseController {

    @RequestMapping(value = "/form/manager", headers = "Accept=application/json")
    @ResponseBody
    public PProductLicenseForm manage(PProductLicenseForm form) throws Exception {

        Map<String, Object> condition = new HashMap<String, Object>();
        try {
            if (!Strings.isNullOrEmpty(form.getName())) {
                condition.put("name", "%" + form.getName() + "%");
            }
            condition.put("tid", form.getTid());
            form.setiTotalDisplayRecords(this.productLicenseService.getLicenceCount(condition));
            form.setiTotalRecords(form.getiTotalDisplayRecords());
            List<PProductLicense> licenseList = new ArrayList<PProductLicense>();
            if (form.getiTotalDisplayRecords() > 0) {
                licenseList = this.productLicenseService.getLicencePagingList(condition, " order by a.order", form.getiDisplayLength(), form.getiDisplayStart());
            }
            form.setAaData(licenseList);
        } catch (Exception e) {
            form.setMsg(exMsg(e));
        }
        return form;
    }

    @RequestMapping(value = "/form/editSubmit")
    @ResponseBody
    public PProductLicenseForm editSubmit(PProductLicenseForm form) throws Exception {

        try {
            PProductLicense obj = form.getProductLicense();
            if (Strings.isNullOrEmpty(obj.getLicenseId())) {
                PProductType productType = this.productTypeService.getProductType(form.getTid());
                obj.setProductType(productType);
                this.productLicenseService.insertLicence(obj);
            } else {
                this.productLicenseService.updateLicence(obj, obj.getLicenseId(), null);
            }


            form.setIsSuccess(SUCCESS);
            form.setMsg("成功");
        } catch (Exception e) {
            form.setMsg(exMsg(e));
        }
        return form;
    }

    @RequestMapping(value = "/form/edit")
    public ModelAndView edit(PProductLicenseForm form) throws Exception {
        String forwardString = "product/productType/license_edit";
        Map<String, Object> model = new HashMap<String, Object>();
        try {

            Map<String, Object> condition = new HashMap<String, Object>();
            condition.put("code", DicConstants.DIC_LICENSE_MODE);
            List<BDicClass> dicClassList = this.dicClassService.getDicClassList(condition);
            BDicClass licenseMode = dicClassList.get(0);
            condition.clear();
            condition.put("dicClassId", licenseMode.getId());
            List<BDic> modeList = this.dicClassService.getDicList(condition, null);
            form.setModeList(modeList);
            condition.clear();
            condition.put("code", DicConstants.DIC_LICENSE_TYPE);
            List<BDicClass> licenseTypeList = this.dicClassService.getDicClassList(condition);
            BDicClass licenseType = licenseTypeList.get(0);
            condition.clear();
            condition.put("dicClassId", licenseType.getId());
            List<BDic> typeList = this.dicClassService.getDicList(condition, null);
            form.setTypeList(typeList);
            if (!Strings.isNullOrEmpty(form.getId())) {
                PProductLicense productLicense = this.productLicenseService.getLicence(form.getId());
                form.setProductLicense(productLicense);
            }
            model.put("form", form);
        } catch (Exception e) {
            form.setMsg(exMsg(e));
            forwardString = "msg";
        }
        return new ModelAndView(forwardString, model);
    }

    @RequestMapping(value = "/form/delete", headers = "Accept=application/json")
    @ResponseBody
    public PProductLicenseForm delete(PProductLicenseForm form) throws Exception {

        try {
            this.productLicenseService.deleteLicence(form.getId());
            form.setIsSuccess(SUCCESS);
            form.setMsg("删除成功");

        } catch (Exception e) {
            form.setMsg(exMsg(e));
        }
        return form;
    }

    @RequestMapping(value = "/form/upload")
    public ModelAndView upload(PProductLicenseForm form) throws Exception {
        Map<String, Object> model = new HashMap<String, Object>();
        String forwardString = "product/productType/uploadLicense";
        try {
            model.put("form", form);
        } catch (Exception e) {
            form.setIsSuccess(FAILURE);
            form.setMsg((e instanceof CcsException) ? ((CcsException) e).getPrompt() : e.getMessage());
            forwardString = "msg";
        }
        return new ModelAndView(forwardString, model);
    }

    @RequestMapping(value = "/form/uploadSubmit")
    @ResponseBody
    public PProductLicenseForm uploadSubmit(PProductLicenseForm form) throws Exception {
        try {
            InputStream is = form.getTxtFile().getInputStream();
            this.productLicenseService.upload(is, form.getTid());
            form.setTxtFile(null);
            form.setIsSuccess(SUCCESS);
            form.setMsg("上传成功!");
        } catch (Exception e) {
            form.setTxtFile(null);
            form.setIsSuccess(FAILURE);
            form.setMsg((e instanceof CcsException) ? ((CcsException) e).getPrompt() : e.getMessage());
        }
        return form;
    }


}
