package cn.digitalpublishing.springmvc.controller;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.model.Param;
import cn.digitalpublishing.service.ArticleService;
import cn.digitalpublishing.service.BDicClassService;
import cn.digitalpublishing.service.ChapterService;
import cn.digitalpublishing.service.CoderService;
import cn.digitalpublishing.service.CompressService;
import cn.digitalpublishing.service.CopyrightService;
import cn.digitalpublishing.service.CrContractService;
import cn.digitalpublishing.service.CrCrcRelationshipService;
import cn.digitalpublishing.service.CrCsrRelationshipService;
import cn.digitalpublishing.service.CrLicenseTypeService;
import cn.digitalpublishing.service.CrLrcRelationshipService;
import cn.digitalpublishing.service.CrLsrRelationshipService;
import cn.digitalpublishing.service.CrRightService;
import cn.digitalpublishing.service.CrRlFormulaService;
import cn.digitalpublishing.service.CrRlOwnerFeeService;
import cn.digitalpublishing.service.CrRlOwnerPayeeService;
import cn.digitalpublishing.service.CrRlOwnerRoyaltyService;
import cn.digitalpublishing.service.CrRlOwnerService;
import cn.digitalpublishing.service.CrRlProductService;
import cn.digitalpublishing.service.CrRlRoyaltyRuleService;
import cn.digitalpublishing.service.CrSubsidaryRightService;
import cn.digitalpublishing.service.IntegralService;
import cn.digitalpublishing.service.OrderService;
import cn.digitalpublishing.service.PDFService;
import cn.digitalpublishing.service.PElementService;
import cn.digitalpublishing.service.PProductLicenseService;
import cn.digitalpublishing.service.PProductService;
import cn.digitalpublishing.service.PProductTypeService;
import cn.digitalpublishing.service.PStructureService;
import cn.digitalpublishing.service.PublishTradeService;
import cn.digitalpublishing.service.RechargeService;
import cn.digitalpublishing.service.RecordCompressService;
import cn.digitalpublishing.service.SectionService;
import cn.digitalpublishing.service.ShoppingCartService;
import cn.digitalpublishing.service.UserService;
import cn.digitalpublishing.service.WatermarkService;

public class BaseController extends MultiActionController {

    public Logger log = Logger.getLogger(this.getClass());

    public static final String FAILURE = "false";
    public static final String SUCCESS = "true";
    public static final String TIMEOUT = "timeout";
    
    protected String forwardString = "";

    private static final boolean DEBUG = true;

    protected HttpServletRequest request;
    protected HttpServletResponse response;
    protected HttpSession session;

    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    public HttpServletResponse getResponse() {
        return response;
    }

    public void setResponse(HttpServletResponse response) {
        this.response = response;
    }

    public HttpSession getSession() {
        return session;
    }

    public void setSession(HttpSession session) {
        this.session = session;
    }

    /**
     * 异常消息处理
     *
     * @param e
     * @return
     */
    public String exMsg(Exception e) {
        return exMsg(e, null, null);
    }

    /**
     * 异常消息处理
     *
     * @param e
     * @param language
     * @return
     */
    public String exMsg(Exception e, String language) {
        return exMsg(e, null, language);
    }

    /**
     * 异常消息处理
     *
     * @param msg
     * @param e
     * @return
     */
    public String exMsg(String msg, Exception e) {
        return exMsg(e, msg, null);
    }

    /**
     * 异常消息处理
     *
     * @param e
     * @param msg
     * @return
     */
    public String exMsg(Exception e, String msg, String language) {
        if (DEBUG) {
            e.printStackTrace();
        }
        if (msg != null && !msg.equals("")) {
            return msg;
        }
        if (e instanceof CcsException) {
            CcsException ce = (CcsException) e;
            return ce.getPrompt();
        } else {
            return e.getMessage();
        }
    }
    
    public static final String getSwftoolsPath() {
		Map<String, String> config = Param.getParam("pdf2swf");
    	return config.get("src").replace("-", ":");
    }
    
    public static final String getUploadPath() {
		Map<String, String> config = Param.getParam("product.structure.element.path");
    	return config.get("src").replace("-", ":");
    }
    
    public static final String getXpdfPath() {
		Map<String, String> config = Param.getParam("pdf2swf");
    	return config.get("font").replace("-", ":");
    }
    
    public static final String getConfigByPage() {
		Map<String, String> config = Param.getParam("pdf2swf");
    	return config.get("page");
    }
    
    public static final String getConfigByTitle() {
		Map<String, String> config = Param.getParam("pdf2swf");
    	return config.get("title");
    }

    /**
     * 基础
     */
    @Autowired
    @Qualifier("dicClassService")
    protected BDicClassService dicClassService;

    /**
     * 产品
     */
    @Autowired
    @Qualifier("productService")
    protected PProductService productService;

    /**
     * 产品分类
     */
    @Autowired
    @Qualifier("productTypeService")
    protected PProductTypeService productTypeService;

    /**
     * 碎片化
     */
    @Autowired
    @Qualifier("structureService")
    protected PStructureService structureService;
    
	/**
	 * 结构
	 */
	@Autowired
	@Qualifier("productElementService")
	protected PElementService productElementService;

	/**
	 * 版权版税
	 */
	@Autowired
	@Qualifier("copyrightService")
	protected CopyrightService copyrightService;
	
	/**
	 * 用户注册
	 */
	@Autowired
	@Qualifier("userService")
	protected UserService userService;

    @Autowired
    @Qualifier("productLicenseService")
    protected PProductLicenseService productLicenseService;

	/**
	 * 在线发表图书
	 */
	@Autowired
	@Qualifier("articleService")
	protected ArticleService articleService;
	
	/**
	 * 节
	 */
	@Autowired
	@Qualifier("sectionService")
	protected SectionService sectionService;
	
	/**
	 * 版权交易记录
	 */
	@Autowired
	@Qualifier("publishTradeService")
	protected PublishTradeService publishTradeService;
	
	/**
	 * 合同
	 */
    @Autowired
    @Qualifier("crContractService")
    protected CrContractService crContractService;
	
    /**
	 * 国别权利合同关系
	 */
    @Autowired
    @Qualifier("crcRelationshipService")
    protected CrCrcRelationshipService crcRelationshipService;
    
    /**
	 * 国别附属权利关系
	 */
    @Autowired
    @Qualifier("csrRelationshipService")
    protected CrCsrRelationshipService csrRelationshipService;
    
    /**
	 * 授权类型
	 */
	@Autowired
	@Qualifier("crLicenseTypeService")
	protected CrLicenseTypeService crLicenseTypeService;
    
    /**
	 * 语种权利合同关系
	 */
	@Autowired
    @Qualifier("lrcRelationshipService")
    protected CrLrcRelationshipService lrcRelationshipService;
	
    /**
	 * 语种附属权利关系
	 */
    @Autowired
    @Qualifier("lsrRelationshipService")
    protected CrLsrRelationshipService lsrRelationshipService;

    /**
	 * 权利授权
	 */
    @Autowired
    @Qualifier("crRightService")
    protected CrRightService crRightService;

    /**
	 * 计算公式
	 */
    @Autowired
    @Qualifier("crFormulaService")
    protected CrRlFormulaService crFormulaService; 
    
    /**
	 * 权利授权者
	 */
    @Autowired
    @Qualifier("crOwnerService")
    protected CrRlOwnerService crOwnerService;

    /**
	 * 预付款及固定费用
	 */
    @Autowired
    @Qualifier("crOwnerFeeService")
    protected CrRlOwnerFeeService crOwnerFeeService;
    
    /**
	 * 付款对象
	 */
    @Autowired
    @Qualifier("crOwnerPayeeService")
    protected CrRlOwnerPayeeService crOwnerPayeeService;
    
    /**
	 * 人员版税计算规则
	 */
    @Autowired
    @Qualifier("crOwnerRoyaltyService")
    protected CrRlOwnerRoyaltyService crOwnerRoyaltyService;
    
    /**
	 * 权利授权产品
	 */
    @Autowired
    @Qualifier("crProductService")
    protected CrRlProductService crProductService;
    
    /**
	 * 版税规则库
	 */
    @Autowired
    @Qualifier("crRoyaltyRuleService")
    protected CrRlRoyaltyRuleService crRoyaltyRuleService;
    
    /**
	 * 版税附属权利
	 */
    @Autowired
    @Qualifier("subsidaryRightService")
    protected CrSubsidaryRightService subsidaryRightService;
    
	/**
	 * 素材包
	 */
	@Autowired
	@Qualifier("compressService")
	protected CompressService compressService;
	
	/**
	 * 打包记录
	 */
	@Autowired
	@Qualifier("recordCompressService")
	protected RecordCompressService recordCompressService;
	
	/**
	 * 购物车
	 */
	@Autowired
	@Qualifier("shoppingCartService")
	protected ShoppingCartService shoppingCartService;
	
	/**
	 * 订单
	 */
	@Autowired
	@Qualifier("orderService")
	protected OrderService orderService;
	
	/**
	 * pdf
	 */
	@Autowired
	@Qualifier("pdfservice")
	protected PDFService pdfservice; 

	/**
	 * 水印
	 */
	@Autowired
	@Qualifier("watermarkService")
	protected WatermarkService watermarkService;
	
	/**
	 * 积分记录
	 */
	@Autowired
	@Qualifier("integralService")
	protected IntegralService integralService;
	
	/**
	 * 充值记录
	 */
	@Autowired
	@Qualifier("rechargeService")
	protected RechargeService rechargeService;
	
	/**
	 * 图书章
	 */
	@Autowired
	@Qualifier("chapterService")
	protected ChapterService chapterService;
	
	/**
	 * 加密
	 */
	@Autowired
	@Qualifier("coderService")
	protected CoderService coderService;
	
}