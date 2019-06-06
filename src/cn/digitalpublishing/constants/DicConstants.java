package cn.digitalpublishing.constants;

public class DicConstants {

	/**
	 * 成本分类
	 */
	public static final String DIC_COST_TYPE = "CostType";
	
	/**
	 * 成本预算分类
	 */
	public static final String DIC_COST_CATEGORY ="CostCategory";
	
	
	/**
	 * 附加信息分类
	 */
	public static final String DIC_ATTACH_TYPE = "AttachType";

	/**
	 * 审核决定分类
	 */
	public static final String DIC_DECISION = "Decision";

    public static final String DIC_FLOW_STATUS = "FlowStatus";

    /**
     * 授权方式
     */
    public static final String DIC_LICENSE_MODE = "LicenseMode";

    /**
     * 授权类型
     */
    public static final String DIC_LICENSE_TYPE = "LicenseType";
    /**
     * 语种
     */
    public static final String DIC_LANGUAGE_TYPE = "LanguageType";
    /**
     * 策划可见状态
     */
    public static final String DIC_PROPOSAL_ROLE_TYPE = "ProposalRoleType";
	/*
	 * 公用数据状态
	 */
	public static final Integer DATA_PRODUCT_MARCFLAG_TRUE = 1;// 已绑定Marc 数据

	public static final Integer DATA_PRODUCT_MARCFLAG_FALSE = 0;// 未绑定Marc 数据

	public static final Integer DATA_STATUS_AVAILABLE = 1;// 可用(出入库凭证有效)(销售发票未开正式发票)

	public static final Integer DATA_STATUS_UN_AVAILABLE = 0;// 不可以(出入库凭证无效)

	public static final Integer DATA_STATUS_LOCK = 2;// 锁定

	public static final Integer DATA_STATUS_YES = 1;// 是

	public static final Integer DATA_STATUS_NO = 0;// 否

	public static final String DATA_FLAG_CLIENTINFO = "clientInfo";

	public static final String DATA_FLAG_ACCOUNT = "account";

	public static final String DATA_FLAG_SALE = "sale";// 正式 销售订单标识

	public static final String DATA_FLAG_PRE_SALE = "preSale";// 预销售订单

	public static final Integer DATA_DECISION_AGREE = 1;// 同意

	public static final Integer DATA_DECISION_NOT_AGREE = 2;// 拒绝

	public static final Integer DATA_DECISION_UPDATE = 3;// 修改

	public static final String DISPLAY_SELSECT_CODE = "select";

	public static final String DISPLAY_TEXT_CODE = "text";

	// 汇率类别
	// public static final Integer DATA_RATE_TYPE_UN_CATEGORY = 1;// 一般汇率
	//
	// public static final Integer DATA_RATE_TYPE_CATEGORY = 2;// 协议汇率

	/*
	 * 自动生成编号
	 */
	public static final Integer NUM_ISBN = 0; // ISBN

	public static final Integer NUM_SALE_ORDER = 1; // 销售订单批号

	public static final Integer NUM_SALE_ITEM = 2; // 销售订单号

	public static final Integer NUM_PURCHASE_ORDER = 3; // 采购订单批号

	public static final Integer NUM_PURCHASE_ITEM = 4; // 采购订单号

	public static final Integer NUM_PUBLISHING_LIST = 5; // 发行清单号

	public static final Integer NUM_PUBLISHING_DETAIL = 6; // 发行详情号

	public static final Integer NUM_PACKING = 7; // 装箱单号

	public static final Integer NUM_CUSTOMER = 8; // 客户编号

	public static final Integer NUM_ACCOUNT = 9; // 账户编号

	public static final Integer NUM_SUPPLIER = 10; // 供应商编号

	public static final Integer NUM_SUPPLIER_ACCOUNT = 11; // 供应商账户编号

	public static final Integer NUM_PRE_WAREHOUSING = 12; // 预入库单号

	public static final Integer NUM_WAREHOUSING = 13; // 入库单号

	public static final Integer NUM_PRE_STOCK_OUT = 14; // 预出库单号

	public static final Integer NUM_STOCK_OUT = 15; // 出库单号

	public static final Integer NUM_TENDER = 16; // 投标批号

	public static final Integer NUM_FINANCE = 17; // 财务类号

	public static final Integer NUM_STOCK_COLLECT = 18; // 进货汇总单号

	public static final Integer NUM_SALE_COLLECT = 19; // 销售汇总单号

	public static final Integer NUM_VALIDATE_UPDATE = 20; // 验更单号

	public static final Integer NUM_DELIVER = 21; // 发货批次

	public static final Integer NUM_PINCARD = 22; // 销卡批次

	/*
	 * 自动生成编号前缀
	 */
	public static final String NUM_PREFIX_SALE_ITEM = "T"; // 销售订单号

	public static final String NUM_PREFIX_PURCHASE_ORDER = "C"; // 采购订单批号

	public static final String NUM_PREFIX_PACKING = "Z"; // 装箱单号

	public static final String NUM_PREFIX_PRE_WAREHOUSING = "R"; // 预入库单号

	public static final String NUM_PREFIX_WAREHOUSING = "RK"; // 入库单号

	public static final String NUM_PREFIX_PRE_STOCK_OUT = "C"; // 预出库单号

	public static final String NUM_PREFIX_STOCK_OUT = "CK"; // 出库单号

	public static final String NUM_PREFIX_TENDER = "T"; // 投标批号

	public static final String NUM_PREFIX_STOCK_COLLECT = "J"; // 进货汇总单号

	public static final String NUM_PREFIX_SALE_COLLECT = "X"; // 销售汇总单号

	public static final String NUM_PREFIX_VALIDATE_UPDATE = "Y"; // 验更单号

	public static final String NUM_PREFIX_DELIVER = "S"; // 发货批次

	public static final String NUM_PREFIX_PINCARD = "X"; // 销卡批次

	/**
	 * 是否生成 发行详情
	 */
	public static final Integer SALERELEASE_STATUS_READY = 0;// 未生成发行详情

	public static final Integer SALERELEASE_STATUS_NOTYET = 1;// 已生成发行详情

	/**
	 * 发票 是否汇总
	 */
	public static final Integer INVOICE_COLLECT_STATUS_READY = 1;// 已汇总

	public static final Integer INVOICE_COLLECT_STATUS_NOTYET = 0;// 未汇总

	/*
	 * 发票类型
	 */
	public static final Integer ISALEINVOICE_REDTYPE_RED = 1;// 红发票

	public static final Integer ISALEINVOICE_REDTYPE_UN_RED = 2;// 正常发票

	/**
	 * 销售 是否汇总
	 */
	public static final Integer SUM_SALE_STATUS_READY = 1;// 已汇总

	public static final Integer SUM_SALE_STATUS_NOTYET = 0;// 未汇总

	// 销售发票状态
	public static final Integer DATA_SALE_STATUS_ALREADY = 3;// 已开过正式发票的

	public static final Integer DATA_SALE_STATUS_READY = 2;// 已经关联，可开发票

	public static final Integer DATA_SALE_STATUS_DISABLE = 0;// 无效

	public static final Integer DATA_SALE_STATUS_NOTREADY = 1;// 未关联 发行清单

	/*
	 * 财务类号
	 */
	public static final String FINANCE_CODE_T = "T"; // 图书进口中心

	public static final String FINANCE_CODE_D = "D"; // 直订户

	public static final String FINANCE_CODE_L = "L"; // 临时户

	public static final String FINANCE_CODE_M = "M"; // 免税

	public static final String FINANCE_CODE_W = "W"; // 非免税

	/*
	 * 是否免税
	 */
	public static final Integer ACCOUNT_TAX_NO = 0; // 非免税

	public static final Integer ACCOUNT_TAX_YES = 1; // 免税

	/*
	 * 汇总是否提交财务
	 */
	public static final Integer SUM_COMMIT_NO = 0; // 未提交

	public static final Integer SUM_COMMIT_YES = 1; // 已提交

	/*
	 * 装箱状态
	 */
	public static final Integer PACK_STATUS_READY = 0; // 已装箱

	public static final Integer PACK_STATUS_NOTYET = 1; // 未装箱

	/*
	 * 汇率类型
	 */
	public static final String DIC_EXCHANGE_TYPE = "ExchangeType";

	public static final Integer EXCHANGE_TYPE_NORMAL = 1; // 一般汇率

	public static final Integer EXCHANGE_TYPE_PROTOCOL = 2; // 协议汇率

	/*
	 * 到货标识
	 */
	public static final Integer ARRIVAL_FLAG_NOT = 1; // 未到货

	public static final Integer ARRIVAL_FLAG_PART = 2; // 部分到货

	public static final Integer ARRIVAL_FLAG_ALL = 3; // 完全到货

	/**
	 * 付款标识
	 */
	public static final String PAY_FLAG = "payFlag";
	public static final Integer PAY_FLAG_NOT = 0;

	public static final Integer PAY_FLAG_YES = 1;
	/**
	 * 是否跑平
	 */
	public static final String IS_EQUAL = "isEqual";
	public static final Integer IS_EQUAL_NOT = 0;// 未跑平
	public static final Integer IS_EQUAL_YES = 1;// 跑平

	/**
	 * 销卡isbn 和 采购订单号 0:不一致 1:一致
	 */
	public static final String IDENTICAL = "identical";
	public static final Integer IS_IDENTICAL_NOT = 0;
	public static final Integer IS_IDENTICAL_YES = 1;
	/**
	 * 是否已关联标识
	 */
	public static final String CHOOSE_FLAG = "chooseFlag";
	public static final Integer CHOOSE_FLAG_NOT = 0;// 未关联
	public static final Integer CHOOSE_FLAG_YES = 1;// 关联
	/*
	 * 库存明细状态
	 */
	public static final Integer STORAGE_STATUS_IN = 1; // 在库

	public static final Integer STORAGE_STATUS_OUT = 2; // 出库

	public static final Integer STORAGE_STATUS_DESTORY = 3; // 报废

	public static final Integer STORAGE_STATUS_ONWAY = 4; // 在途

	public static final Integer STORAGE_STATUS_PRE = 5;// 待入库

	public static final Integer STORAGE_STATUS_ABNORMAL = 6;// 异常

	public static final Integer STORAGE_STATUS_ABNORMAL_CANCLED = 7;// 异常撤销

	public static final Integer STORAGE_STATUS_ABNORMAL_CHECHIN = 8;// 异常入库

	public static final Integer STORAGE_STATUS_PRE_OUT = 9;// 待出库

	public static final Integer STORAGE_STATUS_ROLLBACK = 99; // 撤销

	/*
	 * 凭证类型
	 */
	public static final String DIC_IPROOF_TYPE = "IproofType";
	public static final Integer IPROOF_TYPE_IN = 1; // 入库

	public static final Integer IPROOF_TYPE_OUT = 2; // 出库

	public static final Integer IPROOF_TYPE_DESTORY = 3; // 销毁
	/*
	 * 出库类型
	 */
	public static final String DIC_IPROOF_TYPE_OUT = "IproofOutType";
	public static final Integer IPROOF_TYPE_OUT_SPOT = 1;// 现货扣单出库
	public static final Integer IPROOF_TYPE_OUT_ORDER = 2;// 订单流出库
	public static final Integer IPROOF_TYPE_OUT_MOVE = 3;// 调拨出库
	/*
	 * 入库类型
	 */
	public static final String DIC_IPROOF_TYPE_IN = "IproofInType";
	public static final Integer IPROOF_TYPE_IN_ACTIVE = 1;// 进货入库
	public static final Integer IPROOF_TYPE_IN_ORDER = 2;// 订单流入库
	public static final Integer IPROOF_TYPE_IN_CHECK = 3;// 退货入库
	public static final Integer IPROOF_TYPE_IN_MOVE = 4;// 调拨入库
	/*
	 * 销卡类型
	 */
	public static final String PINCARD_TYPE = "PincardType";
	public static final Integer PINCARD_TYPE_SPOT = 1; // 现货备货（点击备货按钮从库存中备货）
	public static final Integer PINCARD_TYPE_PINCARD = 0;

	/*
	 * 销卡标识
	 */
	public static final Integer PINCARD_STATUS_UNCHECK = 1; // 未销卡

	public static final Integer PINCARD_STATUS_CHECKING = 2; // 销卡中

	public static final Integer PINCARD_STATUS_CHECKED = 3; // 已销卡

	/*
	 * 发票--配书标识
	 */
	public static final String DIC_INVOICE_MATCH = "InvoiceMatchFlag";
	public static final Integer PUINVOICE_MATCH_YES = 1;// 已配书
	public static final Integer PUINVOICE_MATCH_NO = 0;// 未配书

	/*
	 * 发票--是否预入库标识
	 */
	public static final String DIC_INVOICE_PRECHECKIN = "InvoicePreCheckInFlag";
	public static final Integer PUINVOICE_MATCH_UN_CHECKIN = 0;// 未预入库
	public static final Integer PUINVOICE_MATCH_CHECKIN = 1;// 已预入库

	/**
	 * isbn 类型
	 */
	public static final String DIC_ISBN_TYPE = "ISBNCodeType";
	public static final Integer DATA_AUTO_CODE = 1;// 流通编号

	public static final Integer DATA_UN_AUTO_CODE = 0;// 手动生成

	/**
	 * 采购订单状态
	 */
	public static final String DIC_ITEMSTATUS = "ItemStatus";

	public static final int DATA_PU_STATUS_READY = 1;// 准备

	public static final int DATA_PU_STATUS_DOING = 2;// 采购中

	public static final int DATA_PU_STATUS_CANCELLED = 3;// 撤销

	public static final int DATA_PU_STATUS_COMPLETED = 4;// 完成

	public static final int DATA_PU_STATUS_SENDED = 6;// 完成

	// 采购优先级
	public static final String PU_STATUS = "PuStatus";

	public static final int DATA_PU_PRIORITY_HIGH = 1;// 高

	public static final int DATA_PU_PRIORITY_LITTLE_HIGH = 2;// 较高

	public static final int DATA_PU_PRIORITY_NORMAL = 3;// 一般

	public static final int DATA_PU_PRIORITY_LITTLE_LOW = 4;// 较低

	public static final int DATA_PU_PRIORITY_LOW = 5;// 低

	/*
	 * 销售订单批次--录单完成标识
	 */
	public static final String DIC_FLAG_FINISHED = "FinishedFlag";
	public static final int DATA_SALE_FLAG_UN_FINISHED = 0;// 未完成录单
	public static final int DATA_SALE_FLAG_FINISHED_NO = 1;// 录单完成--无异常订单
	public static final int DATA_SALE_FLAG_FINISHED_YES = 2;// 录单完成--有异常订单
	public static final String DATA_SALE_FLAG_FINISHED_REPEAT = "repeat";// 重订单异常
	public static final String DATA_SALE_FLAG_FINISHED_SPOT = "spot";// 扣现货异常订单

	/*
	 * 是否扣现货标识
	 */
	public static final String DIC_SALE_SPOTBUCKLE = "SpotBuckle";
	public static final Integer DATA_SPOT_AVAILABLE = 1;// 扣现货
	public static final Integer DATA_SPOT_UN_AVAILABLE = 0;// 不扣现货

	/*
	 * 重订单 类型
	 */
	public static final String DIC_FLAG_REPEATE = "RepeateFlag";

	public static final int DATA_SALE_FLAG_UN_REPEATE = 0;// 非重订单

	public static final int DATA_SALE_FLAG_PRE_REPEATE = 1;// 重订单标识--预订单

	public static final int DATA_SALE_FLAG_FORMAL_REPEATE = 2;// 重订单标识--正式订单

	/*
	 * 销售订单状态--正常订单
	 */
	public static final String DIC_SALE_STATUS = "SaleStatus";

	public static final int DATA_SALE_STATUS_PRE = 1;// 预订单

	public static final int DATA_SALE_STATUS_FORMAL = 2;// 正式订单

	public static final int DATA_SALE_STATUS_PRE_PURCHASE = 3;// 待采购

	public static final int DATA_SALE_STATUS_CONFIRM_SUPPLIER = 4;// 确认书商完成

	public static final int DATA_SALE_STATUS_SPOT_BUCKLE_PRE = 8;// 预扣现货状态
	public static final int DATA_SALE_STATUS_SPOT_BUCKLED = 9;// 扣现货流程完成

	/*
	 * 销售订单状态--重订单状态
	 */
	public static final String DIC_SALE_REPEATE = "SaleRepeate";

	public static final int DATA_SALE_STATUS_REPEATE_BATCH = 3;// 批次内重订单

	public static final int DATA_SALE_STATUS_REPEATE_ACCOUNT = 4;// 账户上重订单

	public static final int DATA_SALE_STATUS_REPEATE_AMAONGACCOUNT = 5;// 账户间重

	public static final int DATA_SALE_STATUS_REPEATE_CLIENTGROUP = 10;// 客户组重订单

	public static final int DATA_SALE_STATUS_REPEATE_SELECTANY = 11;// 自选查重重订单

	/*
	 * 销售订单状态--撤销订单状态
	 */
	public static final String DIC_SALE_CANCELLED = "SaleCanceled";

	public static final int DATA_SALE_STATUS_CANCELLED_REPEATE = 6;// 重订单 撤销

	public static final int DATA_SALE_STATUS_CANCELLED_FORMAL = 7;// 正式订单 撤销

	/**
	 * 冻结状态
	 */
	public static final String DIC_FREEZE_STATUS = "FreezeStatus";

	public static final int DATA_FREEZE_UN_STATUS = 1;// 未冻结

	public static final int DATA_FREEZE_STATUS = 0;// 冻结

	/*
	 * 用户类型
	 */
	public static final String DIC_CLIENT_TYPE = "ClientType";

	/*
	 * 合同类型
	 */
	public static final String DIC_CONTRACT_TYPE = "ContractType";

	/*
	 * 发票类型
	 */
	public static final String DIC_INVOICE_TYPE = "InvoiceType";
	public static final Integer DATA_INVOICE_DL_TYPE = 1;// 大龙流程
	public static final Integer DATA_INVOICE_ZD_TYPE = 2;// 主动进货

	/*
	 * 招投标保证金类型
	 */
	public static final String DIC_RECOGNIZANCE_TYPE = "RecognizanceType";

	/*
	 * 支付形式
	 */
	public static final String DIC_RECOGNIZANCE_PAYTYPE = "PayType";

	/*
	 * 票据形式
	 */
	public static final String DIC_RECOGNIZANCE_BILLSTATUS = "BillStatus";

	/*
	 * 财务状态
	 */
	public static final String DIC_RECOGNIZANCE_FINANCESTATUS = "FinanceStatus";

	/*
	 * 结算规则
	 */
	public static final String DIC_RECOGNIZANCE_SETTLEMENTRULE = "SettlementRule";

	/*
	 * 行业类型
	 */
	public static final String DIC_BINDUSTRYTYPE = "BIndustryType";

	/*
	 * 语言种类
	 */
	public static final String DIC_BLANGUAGETYPE = "BLanguageType";

	/*
	 * 事件类型
	 */
	public static final String DIC_EVENTTYPE = "EventType";

	/*
	 * 交流方式
	 */
	public static final String DIC_COMMUNICATION_TYPE = "CommunicationType";

	/*
	 * 交易类型
	 */
	public static final String DIC_TRANSACTION_TYPE = "TransactionType";

	/*
	 * 价格系数分类
	 */
	public static final String DIC_MODULUS_TYPE = "ModulusType";

	/*
	 * 是否生成发行清单
	 */
	public static final String DIC_SALERELEASE_STATUS = "SaleReleaseStatus";

	public static final String DIC_PERSON_CONTACT_TYPE = "ContactType";

	public static final String DIC_PERSON_ADMIN_TYPE = "PersonAdminType";

	/*
	 * =====================start mgq===============================
	 */

	/*
	 * 发票到货
	 */
	public static final String DIC_INVOICE_INVOICEARRIVALFLAG = "InvoiceStatus";

	/*
	 * 验更原因
	 */
	public static final String DIC_INSPECTION_REASON = "InspectionReason";

	/*
	 * 验更结果
	 */
	public static final String DIC_INSPECTION_RESULT = "InspectionResult";

	/*
	 * 业务管理员
	 */
	public static final String DIC_ADMIN_TYPE = "AdminType";

	/*
	 * 装帧
	 */
	public static final String DIC_PRODUCT_BINDING_TYPE = "BindingType";

	/**
	 * 数据状态
	 */
	public static final String DIC_STATUS = "Status";

	/**
	 * 发票销卡 状态
	 */
	public static final String DIC_INVOICE_PINCARD = "InvoicePinCard";

	/**
	 * 发票汇总状态
	 */
	public static final String DIC_INVOICE_COLLECTSTATUS = "InvoiceCollectFlag";

	/**
	 * 销售发票 状态
	 */
	public static final String DIC_SALEINVOICE_STATUS = "SaleInvoiceStatus";

	/**
	 * 销售发票 红发票状态
	 */
	public static final String DIC_SALEINVOICE_REDTYPE = "SaleInvoiceRedType";

	/**
	 * 装箱 状态
	 */
	public static final String DIC_PACKSTATUS = "PackStatus";

	/**
	 * 库存 状态
	 */
	public static final String DIC_STORAGESTATUS = "StorageStatus";
	/**
	 * 产品 marc 状态
	 */
	public static final String DIC_PRODUCT_MARCFLAG = "MarcFlag";

	/**
	 * SaleRelease remit 是否汇款
	 */
	public static final String DIC_SALERELEASE_REMIT = "SaleReleaseRemit";

	/**
	 * SaleRelease remit 是否汇款 : 0 未回款
	 */
	public static final Integer DATA_SALERELEASE_REMIT_NOT = 0;
	/**
	 * SaleRelease remit 是否汇款 : 1 已回款
	 */
	public static final Integer DATA_SALERELEASE_REMIT_YES = 1;

	/**
	 * SaleRelease collect 是否销货汇总
	 */
	public static final String DIC_SALERELEASE_COLLECT = "SaleReleaseCollect";

	/**
	 * SaleRelease collect 是否销货汇总 : 0 未销货汇总
	 */
	public static final Integer DATA_SALERELEASE_COLLECT_NOT = 0;
	/**
	 * SaleRelease collect 是否销货汇总 : 1 已销货汇总
	 */
	public static final Integer DATA_SALERELEASE_COLLECT_YES = 1;
	/*
	 * 汇总是否提交财务
	 */
	public static final String DIC_SALERELEASE_COMMIT = "SaleReleaseCommit";
	/**
	 * 订单回注 类型
	 */
	public static final String DIC_ITEM_REINJECTIONTYPE = "ReinjectionType";
	/**
	 * 订单回注 类型 （不确定）
	 */
	public static final String DATA_ITEM_REINJECTIONTYPE_STOCKOUT = "J";
	public static final String DATA_ITEM_REINJECTIONTYPE_REWRITE = "Z";

	/**
	 * 产品附件类型
	 */
	public static final String DIC_PROUDCT_ATTACHMENT_TYPE = "ProudctAttachmentType";
	/**
	 * 产品附件类型 ： marc数据 = 1
	 */
	public static final Integer DATA_PROUDCT_ATTACHMENT_TYPE_MARC = 1;

	public static final String DIC_TEMPLATE_TYPE = "TemplateType";

	public static final String DIC_SALERELEASE_ISCONFIRM = "IsConfirm";

	public static final Integer DATA_SALERELEASE_ISCONFIRM_NOT = 0;

	public static final Integer DATA_SALERELEASE_ISCONFIRM_YES = 1;

	public static final String DIC_PPRODUCTROLE_AUTHORITY = "Authority";
	public static final Integer DATA_PPRODUCTROLE_AUTHORITY_READ = 1;
	public static final Integer DATA_PPRODUCTROLE_AUTHORITY_WRITE = 2;
	public static final Integer DATA_PPRODUCTROLE_AUTHORITY_DISPLAY = 3;
	/*
	 * =====================end mgq===============================
	 */
	/*
	 * 目录分类
	 */
	public static final String DIC_CATALOG_TYPE = "CatalogType";

	/*
	 * 是否中标
	 */
	public static final String DIC_HASBID = "HasBid";

	/*
	 * 是否首次
	 */
	public static final String DIC_FIRST = "First";

	/*
	 * 是否有纸板
	 */
	public static final String DIC_HASPAPER = "HasPaper";

	/*
	 * 是否默认
	 */
	public static final String DIC_DEFAULT = "Default";

	/*
	 * 开标结果
	 */
	public static final String DIC_RESULT = "BidResult";

	/*
	 * 结果显示型式
	 */
	public static final String DIC_DISPLAY = "Display";

	public static final String DIC_DISPLAY_SELECT = "select";// 下拉框

	public static final String DIC_DISPLAY_CHECKBOX = "checkbox";// 复选框

	public static final String DIC_DISPLAY_BUTTON = "button";// 按钮

	public static final String DIC_DISPLAY_DATATABLE = "datatable";// 列表

	public static final String DIC_DISPLAY_TEXT = "text";// 文本框

	public static final String DIC_DISPLAY_TEXTAREA = "textarea";// 文本域

	/*
	 * 是否必填
	 */
	public static final String DIC_MUST = "Must";

	/**
	 * 是否固定
	 */
	public static final String DIC_FIXED = "Fixed";

	/*
	 * 订单类型
	 */
	public static final String DIC_ORDER_TYPE = "OrderType";

	/*
	 * 账户查重方式
	 */
	public static final String DIC_ACCOUNT_RECHECKTYPE = "ReCheckType";

	public static final String DIC_DATA_RECHECHTYPECODE = "BetweenCAccount";// 账户间查重常量

	public static final String DIC_DATA_RECHECHTYPECODE_BATCH = "SaleOrderBatch";// 批次内

	public static final String DIC_DATA_RECHECHTYPECODE_ACCOUNT = "CAccount";// 账户内

	public static final String DIC_DATA_RECHECHTYPECODE_CLIENTGROUP = "ClientGroup";// 客户组查重

	public static final String DIC_DATA_RECHECHTYPECODE_SELECTANY = "SelectAny";// 自选查重

	public static final String DIC_DATA_RECHECHTYPECODE_NO = "nocheck";// 不查重

	/*
	 * 库存类型
	 */
	public static final String DIC_INVENTORY_TYPE = "InventoryType";
	public static final String ISTORAGE_TYPE_WAREHOUSE = "warehouse";// 库房
	public static final String ISTORAGE_TYPE_STORE = "store";// 仓库

	/*
	 * 部门--销售订单批次录入
	 */
	public static final String DIC_DATA_DEPARTMENT = "Department";

	/*
	 * 账户类型
	 */
	public static final String DIC_DATA_ACCOUNTTYPE = "AccountType";

	// 合同甲方乙方
	public static final String DIC_DATA_CLIENTTYPE_A = "clientA";

	public static final String DIC_DATA_CLIENTTYPE_B = "clientB";

	// 序列化管理
	public static final String DIC_Sequence_Type = "sequenceType";

	// 入库单状态
	public static final String DIC_INSTORAGE_STATUS = "InStorageStatus";
	public static final Integer INSTORAGE_STATUS_ING = 1; // 进行中
	public static final Integer INSTORAGE_STATUS_DONE = 2;// 完成

	// 异常类型
	public static final String DIC_ISTORAGE_ABNORMALTYPE = "AbnormalType";
	public static final Integer ISTORAGE_ABNORMALTYPE_ONE = 1;// 多到数
	public static final Integer ISTORAGE_ABNORMALTYPE_TWO = 2;// 少到数
	public static final Integer ISTORAGE_ABNORMALTYPE_THREE = 3;// 错到书

	// 出库单状态
	public static final String DIC_OUTSTORAGE_STATUS = "OutStorageStatus";
	public static final Integer OUTSTORAGE_STATUS_ING = 1; // 进行中
	public static final Integer OUTSTORAGE_STATUS_DONE = 2;// 完成
	public static final Integer OUTSTORAGE_STATUS_MATCH = 3;// 匹配完

	// 发行清单 是否分配运输商
	public static final String DIC_SALERELEASE_ISASSIGN = "saleReleaseIsAssign";
	public static final Integer SALERELEASE_ISASSIGN_NO = 0; // 否
	public static final Integer SALERELEASE_ISASSIGN_YES = 1;// 是

	// 发行清单 是否生成运输单
	public static final String DIC_SALERELEASE_ISTRANSPORTORDER = "IsTransportOrder";
	public static final Integer SALERELEASE_ISTRANSPORTORDER_NO = 0; // 否
	public static final Integer SALERELEASE_ISTRANSPORTORDER_YES = 1;// 是

	// 订单回注类型
	public static final String DIC_REINJECTION_TYPE = "ReinjectionType";

	/**
	 * 招投标附件类型
	 */
	public static final String DIC_TENDER_ATTACHMENT_TYPE = "TenderAttachmentType";
	// 账期
	public static final String DIC_ACCOUNT_PERIOD = "accountPeriod";
	public static final Integer ACCOUNT_PERIOD_ONE = 1; // 一个月
	public static final Integer ACCOUNT_PERIOD_TWO = 2; // 二个月
	public static final Integer ACCOUNT_PERIOD_THREE = 3; // 三个月
	public static final Integer ACCOUNT_PERIOD_SIX = 6; // 六个月

	// 采购项完整性标识
	public static final String DIC_PUITEM_ISCOMPLETE = "IsComplete";
	public static final Integer ISCOMPLETE_YES = 1;
	public static final Integer ISCOMPLETE_NO = 0;

	/**
	 * 日期格式
	 */
	public static final String SIMPLE_DATE_FORMAT = "yyyy-MM-dd";

	/**
	 * Tree节点 ：1-根节点 2-非根节点
	 */
	public static final String TREE_ROOT = "1";
	public static final String TREE_NOT_ROOT = "2";

	/**
	 * 汇率类型
	 */

	public static final String EXCHANGE_TYPE = "exchangeType";

	public static final Integer EXCHANGE_YES = 1;
	public static final Integer EXCHANGE_NO = 0;

	/**
	 * 第三方平台推送结果展示方式
	 */

	public static final String PLUGINS_TYPE = "plugins";

	public static final Integer PLUGINS_JSON = 1;
	public static final Integer PLUGINS_BOOLEAN = 2;
	public static final Integer PLUGINS_NOTHING = 0;

	/**
	 * 价格订单分类
	 */
	public static final String PRICE_ORDER_CATEGORY = "priceOrderCategory";

	/**
	 * 价格默认标识
	 */
	public static final String PRICE_DEFAULT_FLG = "priceDefaultFlg";

	/**
	 * 折扣分类
	 */
	public static final String PRICE_DISCOUNT_CATEGORY = "priceDiscountCategory";

	/**
	 * 字号
	 */
	public static final String ZIHAO_DISCOUNT_NAME = "zihao";
	public static final String ZIHAO_DISCOUNT_NO_ONE = "1";
	public static final String ZIHAO_DISCOUNT_NO_TWO = "2";
	public static final String ZIHAO_DISCOUNT_NO_THREE = "3";
	public static final String ZIHAO_DISCOUNT_NO_FOUR = "4";
	/**
	 * 字体
	 */
	public static final String ZITI_DISCOUNT_NAME = "ziti";
	public static final String ZITI_DISCOUNT_BLACK = "1";// 黑体
	public static final String ZITI_DISCOUNT_SONGTI = "2";// 宋体
	public static final String ZITI_DISCOUNT_KAITI = "3";// 楷体
	public static final String ZITI_DISCOUNT_LISHU = "4";// 隶书
	public static final String ZITI_DISCOUNT_FANGSONG = "5";// 仿宋
	/**
	 * 倍数
	 */
	public static final String BEISHU_DISCOUNT_NAME = "beishu";
	public static final String BEISHU_DISCOUNT_ONE = "1"; // 1
	public static final String BEISHU_DISCOUNT_ONED = "2";// 1.5
	public static final String BEISHU_DISCOUNT_TWO = "3";// 2
	public static final String BEISHU_DISCOUNT_TWOD = "4";// 2.5
	/**
	 * 开数
	 */
	public static final String KAISHU_DISCOUNT_NAME = "kaishu";
	public static final String KAISHU_DISCOUNT_ONE = "4"; // 4
	public static final String KAISHU_DISCOUNT_TWO = "8";// 8
	public static final String KAISHU_DISCOUNT_THREE = "16";// 16
	public static final String KAISHU_DISCOUNT_FOUR = "32";// 32
	public static final String KAISHU_DISCOUNT_FIVE = "64";// 64
	/**
	 * 成品
	 */
	public static final String CHENGPIN_DISCOUNT_NAME = "chengpin";
	public static final String CHENGPIN_DISCOUNT_ONE = "1"; // 胶片
	public static final String CHENGPIN_DISCOUNT_TWO = "2";// 纸样
	public static final String CHENGPIN_DISCOUNT_THREE = "3";// 硫酸纸

	/**
	 * 纸张规格
	 */
	public static final String GUIGE_DISCOUNT_NAME = "guige";
	public static final String GUIGE_DISCOUNT_ONE = "1"; // 880mm x 1230mm
	public static final String GUIGE_DISCOUNT_TWO = "2";// 900mm x 1280mm
	public static final String GUIGE_DISCOUNT_THREE = "3";// 1000mm x 1400mm
	public static final String GUIGE_DISCOUNT_FOUR = "4";// 787mm x 1092mm
	public static final String GUIGE_DISCOUNT_FIVE = "5";// 850mm x 1168mm
	/**
	 * 存在
	 */
	public static final String CUNZAI_DISCOUNT_NAME = "cunzai";
	public static final String CUNZAI_DISCOUNT_YES = "1"; // YES
	public static final String CUNZAI_DISCOUNT_NO = "2";// NO
	
	/**
	 * 排版格式
	 */
	public static final String GESHI_DISCOUNT_NAME = "geshi";
	public static final String GESHI_DISCOUNT_HENG = "1"; // 横排
	public static final String GESHI_DISCOUNT_SHU = "2";// 竖排
	
	/**
	 * 切口处
	 */
	public static final String QIEKOU_DISCOUNT_NAME = "qiekou";
	public static final String QIEKOU_DISCOUNT_TOP = "1"; // 上切口
	public static final String QIEKOU_DISCOUNT_DOWN = "2";// 下切口
	
	/**
	 * 人员名称分类
	 */
	public static final String PERSON_NAME_TYPE = "personNameType";
	public static final String PEN_NAME = "penName";//笔名
	public static final String REAL_NAME = "realName";//真名
	
	/**
	 * 人员Email是否为主邮箱&人员电话是否为主要电话
	 */
	public static final String PERSON_EMAIL_DEFAULTFLG = "personEmailDefaultflg";
	public static final String DEFAULTFLG_YES = "defaultflgYes";//是
	public static final String DEFAULTFLG_NO = "defaultflgNo";//否
	
	/**
	 * 人员电话分类
	 */
	public static final String PERSON_PHONE_TYPE = "personPhoneType";
	public static final String TELPHONE = "telphone";//座机
	public static final String CELLPHONE = "cellphone";//手机
	
	/**
	 * 人员标识分类
	 */
	public static final String PERSON_IDENTITY_TYPE = "personIdentityType";
	public static final String ID_CARD = "idCard";//身份证
	public static final String PASSPORT = "passport";//护照
	
	/**
	 * 印装费用
	 */
	public static final String YINZHUANG_NAME_TYPE = "YinZhuang";
	public static final String YINZHUANG_YIN_SHUA = "1";//印刷费
	public static final String YINZHUANG_PIN_SHAI_BAN = "2";//拼晒版费
	public static final String YINZHUANG_ZHUANG_DING = "3";//装订费
	public static final String YINZHUANG_TANG_JIN = "4";//烫金
	public static final String YINZHUANG_GUO_YOU = "5";//过油
	public static final String YINZHUANG_FU_MO = "6";//腹膜
	public static final String YINZHUANG_U_V = "7";//UV
	public static final String YINZHUANG_SU_FENG = "8";//塑封费
	public static final String YINZHUANG_HUAN_CHEN = "9";//环衬费
	
	/**
	 * 装订方式
	 */
	public static final String ZHUANG_DING_NAME_TYPE = "ZhuangDing";
	/**
	 * 材料类型
	 */
	public static final String CAI_LIAO_NAME_TYPE = "CaiLiaoType";
	/**
	 * 纸张类型
	 */
	public static final String PAPER_TYPE_NAME_TYPE = "PaperType";
	/**
	 *材料克重
	 */
	public static final String CAI_LIAO_KE_ZHONG_NAME_TYPE = "ZhiZhangKeZhong";
	/**
	 * 材料规格
	 */
	public static final String CAI_LIAO_GUI_GE_NAME_TYPE = "CaiLiao";
	
	/**
	 * 校对程序卡类型
	 */
	public static final String PRODUCT_CHECK_TYPE = "checkType";

    /**
     * 审批状态
     */
    public static final String FLOW_STATUS_UNDO = "1"; //未审批
    public static final String FLOW_STATUS_DOING = "2"; //审批中
    public static final String FLOW_STATUS_END = "3";//审批通过
    public static final String FLOW_STATUS_KILL = "4";//审批未通过

    /**
     * 授权方式
     */
    public static final String LICENSE_MODE_FORVER = "1";
    public static final String LICENSE_MODE_TEMPORARY = "2";

    /**
     * 授权类型
     */
    public static final String LINCESE_TYPE_BUY = "1";
    public static final String LINCESE_TYPE_USE = "2";
    /**
     * 编号类别
     */
    public static final String CODE_TYPE_PROJECT = "0"; // 项目编号
    public static final String CODE_TYPE_SALE_ORDER = "1"; // 销售订单编号（O_SO_20140810_000001）
    public static final String CODE_TYPE_SALE_ITEM = "2"; // 销售订单项编号（O_SI_20140810_000001）
    public static final String CODE_TYPE_STOCK_IN = "3"; // 入库单编号（IV_SI_20140810_000001）
    public static final String CODE_TYPE_STOCK_IN_ITEM = "4"; // 入库单明细编号（IV_SII_20140810_000001）
    public static final String CODE_TYPE_STOCK_OUT = "5"; // 出库单编号（IV_SO_20140810_000001）
    public static final String CODE_TYPE_STOCK_OUT_ITEM = "6"; // 出库单明细编号（IV_SOI_20140810_000001）
    public static final String CODE_TYPE_CHECK = "7"; // 验更单编号（IV_C_20140810_000001）
    public static final String CODE_TYPE_RACKING = "8"; // 上架指导单编号（IV_R_20140810_000001）
    public static final String CODE_TYPE_RACKING_ITEM = "9"; // 上架指导单明细编号（IV_RI_20140810_000001）
    public static final String CODE_TYPE_DISTRIBUTION = "10"; // 配书单编号（IV_D_20140810_000001）
    public static final String CODE_TYPE_DISTRIBUTION_ITEM = "11"; // 配书单明细编号（IV_DI_20140810_000001）
    public static final String CODE_TYPE_REPAYMENT_REQ = "12"; // 来款申请单编号（O_RR_20140810_000001）
    public static final String CODE_TYPE_INVOICE_REQ = "13"; // 销售发票申请单编号（O_IR_20140810_000001）
    public static final String CODE_TYPE_TRANSPORT = "14"; // 运输等级单编号(IV_T_20140810_000001）
    /**
     * 策划可见状态
     */
    public static final String PROPOSAL_ROLE_PRIVATE = "0";
    public static final String PROPOSAL_ROLE_PROTECTED = "1";
    public static final String PROPOSAL_ROLE_PUBLIC = "2";
    
    /**
     * 策划性质
     */
    public static final String PROPOSAL_PROPERTY = "ProposalProperty";
    //合作策划
    public static final String COOPERTATION_PROPOSAL = "cooperationalProposal";

    /**
     * 收款信息状态
     */
    public static final String REPAYMENTREQ_STATUS = "repaymentReqStatus";//已录入，未认领

    public static final String REPAYMENTREQ_UNCLAIM = "0";//已录入，未认领
    public static final String REPAYMENTREQ_CLAIM = "1";//已认领
    public static final String REPAYMENTREQ_PAY = "2";//已支付

    /**
     * 出库单状态
     */

    public static final String STOCKOUT_STATUS = "stockOutStatus";//未出库

    public static final String STOCKOUT_UN = "0";//未出库
    public static final String STOCKOUT_DOING = "1";//部分出库
    public static final String STOCKOUT_DONE = "2";//已出库
    public static final String STOCKOUT_TRANSPORT = "3";//已生成运输单
    public static final String STOCKOUT_INVOICE = "4";//已开发票
    
    /**
     * D出库单明细状态
     */
    public static final String STOCKOUT_ITEM_STATUS = "StockOutItemStatus"; // 出库单明细状态
    public static final String STOCKOUT_ITEM_STATUS_NO = "1"; // 未下架
    public static final String STOCKOUT_ITEM_STATUS_PART = "2"; // 部分下架
    public static final String STOCKOUT_ITEM_STATUS_ALL = "3"; // 全部下架
    
    /**
     * D配书单状态
     */
    public static final String STOCK_DISTRIBUTION_STATUS  = "StockDistributionStatus"; // 配书单状态
    public static final String STOCK_DISTRIBUTION_STATUS_UNFINISHED = "1"; // 未完成
    public static final String STOCK_DISTRIBUTION_STATUS_COMPLETED = "2"; // 已完成
    
    /**
     * D配书单明细状态
     */
    public static final String STOCK_DISTRIBUTION_ITEM_STATUS = "StockDistributionItemStatus"; // 配书单明细状态
    public static final String STOCK_DISTRIBUTION_ITEM_STATUS_UNALLOCATED = "1"; // 未分配
    public static final String STOCK_DISTRIBUTION_ITEM_STATUS_ASSIGNED = "2"; // 已分配
    public static final String STOCK_DISTRIBUTION_ITEM_STATUS_COMPLETED = "3"; // 已完成



    /*配单状态*/
    //public static  final String STOCK_DISTRIBUTION="stockDistribution";
    //public static final String STOCK_DISTRIBUTION_UN = "0";//未分配
    /*配单项状态*/
    //public static final String STOCK_DISTRIBUTION_ITEM ="stockDistributionItem";
    //public static final String STOCK_DISTRIBUTION_ITEM_UN = "0";//未分配

    /**
     * 销售订单项状态
     */
    
    //public static final String SALEITEM_STATUS = "saleItemStatus";//未出库

    //public static final String SALEITEM_UN = "0";//未发货
    //public static final String SALEITEM_PART = "1";//部分发货
    //public static final String SALEITEM_DONE = "2";//已发货

    /**
     * 发票状态
     */
    public static final String INVOICE_STATUS = "invoiceStatus";//未出库

    public static final String INVOICE_UN = "0";//未通过
    public static final String INVOICE_DONE = "1";//已通过
    public static final String INVOICE_SOME_PAY = "2";//已部分付款
    public static final String INVOCIE_ALL_PAY = "3";//已付款

    /**
     * 付款方式
     */
    public static  final String PAY_BY = "payBy";//付款方式
    public static  final String PAY_BY_CASH = "0";//现金
    public static  final String PAY_BY_REMIT = "1";//汇款

    /**
     * 销售管理
     */
    /**
     * 订单状态
     */
    public static final String ORDER_STATUS = "orderStatus";
    //已录入
    public static final String ORDER_WRITED = "writed";
    //已扣货
    public static final String ORDER_HAVE_DELIVER = "haveOrderDeliver";
    //部分扣货
    public static final String ORDER_NO_DELIVER = "noOrderDeliver";
    /**
     * 是否查重
     */
    public static final String Is_CHECK_REPEAT = "isCheckRepeat";
    //是查重
    public static final String YES_CHECK_REPEAT = "yes";
    //否查重
    public static final String NO_CHECK_REPEAT = "no";
    /**
     * 订单详情初始状态
     */
    public static final String INI_ORDER_ITEM_STATUS = "iniOrderItemStatus";
    //初始已审核
    public static final String INI_HAVE_CHECKED = "haveChecked";
    //初始未审核
    public static final String INI_NO_CHECKED = "noChecked";

    /**
     * 订单详情状态
     */
    public static final String ORDER_ITEM_STATUS = "orderItemStatus";
    //订单详情已录入
    public static final String ORDER_WRITE_ORDER = "writeOrder";
    //订单重订单
    public static final String ORDER_REPEAT_ORDER = "repeatOrder";
    //订单撤销
    public static final String ORDER_REVOCATEION_ORDER = "revocationOrder";
    //已发货
    public static final String ORDER_ITEM_HAVE_DELIVER = "haveDeliver";
    //部分发货
    public static final String ORDER_ITEM_PART_DELIVER = "partDeliver";
    //未发货
    public static final String ORDER_ITEM_NO_DELIVER ="noDeliver";

    /**
     * 销售发票和销售来款关系类型
     */
    public static  final String INVOICE_REPAYMENT_TYPE = "invoiceRepaymentType";
    public static  final String INVOICE_REPAYMENT_ADVANCE_AMOUT = "0";//预付款
    public static  final String INVOICE_REPAYMENT_REPAYMENT = "1";//现金

    /**
     * 发票类型
     */
    public static final String INVOICE_TYPE = "InvoiceType";
    public static final String INVOICE_TYPE_NOMAL = "1";//普通发票
    public static final String INVOICE_TYPE_OTHER = "2";//增值税发票

    /**
     * 本版/外板
     */
    public static final String PRODUCT_OWNER_FLAG = "ProductOwnerFlag";
    public static final String PRODUCT_OWNER_FLAG_SELF = "0";//本版
    public static final String PRODUCT_OWNER_FLAG_OTHER = "1";//外板

    /**
     * 任务类型
     */
    public static final String TASK_TYPE_TASK = "task";
    public static final String TASK_TYPE_DECISION = "decision";
    public static final String TASK_TYPE_FORK = "fork";
    public static final String TASK_TYPE_JOIN = "join";
    public static final String TASK_TYPE_JAVA = "java";
    public static final String TASK_TYPE_OTHER = "other";
    
	/**
	 * 权利合同状态
	 */
	public static final String RIGHT_CONTRACT_STATUS = "RightContractStatus";
	public static final String RIGHT_CONTRACT_STATUS_1 = "1"; // 有效
	public static final String RIGHT_CONTRACT_STATUS_2 = "2"; // 失效

	/**
	 * 权利是否独享
	 */
	public static final String RIGHT_EXCLUSIVE_FLAG = "RightExclusiveFlag";
	public static final String RIGHT_EXCLUSIVE_FLAG_1 = "1"; // 是
	public static final String RIGHT_EXCLUSIVE_FLAG_2 = "2"; // 否

	/**
	 * 授权开始方式
	 */
	public static final String LICENCE_START_TYPE = "LicenceStartType";
	public static final String LICENCE_START_TYPE_1 = "1"; // 合同日开始
	public static final String LICENCE_START_TYPE_2 = "2"; // 出版日开始
	public static final String LICENCE_START_TYPE_3 = "3"; // 设置日开始

	/**
	 * 结算公告周期
	 */
	public static final String SETTLE_PERIOD = "SettlePeriod";
	public static final String SETTLE_PERIOD_1 = "1"; // 月度
	public static final String SETTLE_PERIOD_2 = "2"; // 季度
	public static final String SETTLE_PERIOD_3 = "3"; // 半年
	public static final String SETTLE_PERIOD_4 = "4"; // 一年

	/**
	 * 市场
	 */
	public static final String MARKET = "Market";
	public static final String MARKET_1 = "1"; // 所有市场
	public static final String MARKET_2 = "2"; // 美国
	public static final String MARKET_3 = "3"; // 中国
	public static final String MARKET_4 = "4"; // 英国
	public static final String MARKET_5 = "5"; // 阿根廷

	/**
	 * 价格类型
	 */
	public static final String PRICE_TYPE = "PriceType";
	public static final String PRICE_TYPE_1 = "1"; // 本地价格
	public static final String PRICE_TYPE_2 = "2"; // 单本价格
	public static final String PRICE_TYPE_3 = "3"; // 出版价格
	public static final String PRICE_TYPE_4 = "4"; // 指定价格
	public static final String PRICE_TYPE_5 = "5"; // 特殊价格

	/**
	 * 税务说明
	 */
	public static final String TAX_FLAG = "TaxFlag";
	public static final String TAX_FLAG_1 = "1"; // 上税
	public static final String TAX_FLAG_2 = "2"; // 不上税

	/**
	 * 版税类型
	 */
	public static final String ROYALTY_TYPE = "RoyaltyType";
	public static final String ROYALTY_TYPE_1 = "1"; // 作者销售
	public static final String ROYALTY_TYPE_2 = "2"; // 书店销售
	public static final String ROYALTY_TYPE_3 = "3"; // 亚马逊销售
	public static final String ROYALTY_TYPE_4 = "4"; // 展销会销售

	/**
	 * 规则状态
	 */
	public static final String RULE_STATUS = "RuleStatus";
	public static final String RULE_STATUS_1 = "1"; // 有效
	public static final String RULE_STATUS_2 = "2"; // 失效

	/**
	 * 附属权利状态
	 */
	public static final String ATTACHED_RIGHT_STATUS = "AttachedRightStatus";
	public static final String ATTACHED_RIGHT_STATUS_1 = "1"; // 有效
	public static final String ATTACHED_RIGHT_STATUS_2 = "2"; // 失效

	/**
	 * 附属权利级别
	 */
	public static final String ATTACHED_RIGHT_LEVEL = "AttachedRightLevel";
	public static final String ATTACHED_RIGHT_LEVEL_1 = "1"; // 授权级别
	public static final String ATTACHED_RIGHT_LEVEL_2 = "2"; // 产品级别
	public static final String ATTACHED_RIGHT_LEVEL_3 = "3"; // 素材类型级别
	public static final String ATTACHED_RIGHT_LEVEL_4 = "4"; // 素材级别

	/**
	 * 版税规则
	 */
	public static final String ROYALTY_RULE = "RoyaltyRule";
	public static final String ROYALTY_RULE_1 = "1"; // 简单分割原则
	public static final String ROYALTY_RULE_2 = "2"; // 按单本价格
	public static final String ROYALTY_RULE_3 = "3"; // 按约定价格
	public static final String ROYALTY_RULE_4 = "4"; // 按出版价格

	/**
	 * 调整规则
	 */
	public static final String ADJUST_RULE = "AdjustRule";
	public static final String ADJUST_RULE_1 = "1"; // 不调整
	public static final String ADJUST_RULE_2 = "2"; // 按销售收入调整
	public static final String ADJUST_RULE_3 = "3"; // 按销售数量调整
	public static final String ADJUST_RULE_4 = "4"; // 按销售金额调整
	
	/**
	 * 权利授权产品状态
	 */
	public static final String RIGHT_LICENCE_PRO_STATUS = "RightLicenceProStatus";
	public static final String RIGHT_LICENCE_PRO_STATUS_1 = "1"; // 有效
	public static final String RIGHT_LICENCE_PRO_STATUS_2 = "2"; // 失效

	/**
	 * 贡献者状态
	 */
	public static final String AUTHOR_STATUS = "AuthorStatus";
	public static final String AUTHOR_STATUS_1 = "1"; // 有效
	public static final String AUTHOR_STATUS_2 = "2"; // 失效

	/**
	 * 收款人状态
	 */
	public static final String PAYEE_STATUS = "PayeeStatus";
	public static final String PAYEE_STATUS_1 = "1"; // 有效
	public static final String PAYEE_STATUS_2 = "2"; // 失效

	/**
	 * 费用类型
	 */
	public static final String EXPENSE_TYPE = "ExpenseType";
	public static final String EXPENSE_TYPE_1 = "1"; // 预付
	public static final String EXPENSE_TYPE_2 = "2"; // CD费用
	public static final String EXPENSE_TYPE_3 = "3"; // 材料费
	public static final String EXPENSE_TYPE_4 = "4"; // 其他费用
	public static final String EXPENSE_TYPE_5 = "5"; // 许可费
	public static final String EXPENSE_TYPE_6 = "6"; // 索引制作费

    /**
     * 版权版税
     */
    public static final String CR_ATTACHED_RIGHT_LEVEL = "AttachedRightLevel";//附属权利级别
    public static final String CR_ATTACHED_RIGHT_STATUS = "AttachedRightStatus";//附属权利状态
    public static final String CR_ROYALTY_RULE = "RoyaltyRule";//版税规则
    public static final String CR_ADJUST_RULE = "AdjustRule";//调整规则

	/**
	 * 版税计算公式类型
	 */
	public static final String CR_FORMULA_TYPE = "CrFormulaType";
	public static final String CR_FORMULA_TYPE_1 = "1"; // 人员版税计算
	public static final String CR_FORMULA_TYPE_2 = "2"; // 附属版权计算
	
	/**
	 * 印刷色系类型
	 */
	public static final String PRINT_COLOR_TYPE = "PrintColorType";
	public static final String PRINT_COLOR_TYPE_1 = "1"; // 单色印刷
	public static final String PRINT_COLOR_TYPE_2 = "2"; // 专色印刷
	public static final String PRINT_COLOR_TYPE_3 = "3"; // 双色印刷
	public static final String PRINT_COLOR_TYPE_4 = "4"; // 彩色印刷
}

// 销卡isbn 和 采购订单号 0:不一致 1:一致
// public static final Integer PU_IDENTICAL_NO =0;//不一致
// public static final Integer PU_IDENTICAL_YES =1;//一致

