package cn.digitalpublishing.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.model.Param;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.service.PElementService;
import cn.digitalpublishing.springmvc.form.product.PElementForm;
import cn.digitalpublishing.util.DicCache;

@SuppressWarnings("unused")
public class PElementServiceImpl extends BaseServiceImpl implements PElementService {

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.PStructureDao")
				.get("getCount");
		try {
			num = this.daoFacade.getStructureDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt() 
						: "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}

	@Override
	public List<PStructure> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		Map<String, String> config = Param.getParam("product.structure.element.path");
		String srcDir = config.get("src").replace("-", ":");
		String destDir = config.get("dest").replace("-", ":");
		
		List<PStructure> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.PStructureDao")
				.get("getPagingList");
		try {
			list = this.daoFacade.getStructureDao().getPagingList(condition, sort, pageCount, page, hqlBean);
			for (PStructure item : list) {
				String path = destDir + File.separator + item.getPath();
				if (new File(path).exists()) {
					Document xml = loadXML(path);
					item.setName(xml.getRootElement().getTextTrim()); // name = 素材内容
				}
				
			}
			
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "transaction.info.getCTransactionList.error", e);
		}
		return list;
	}

	@Override
	public void selectElementSubmit(PElementForm form) throws Exception {
		String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
		
		PStructure element = daoFacade.getStructureDao().get(PStructure.class.getName(), form.getElement().getId());
		PProductStructureRelationship parentStructure = form.getStructure();
		PProduct product = form.getProduct();
		
		PProductStructureRelationship elementStructure = new PProductStructureRelationship();
		elementStructure.setStatus(statusAvailable);
		elementStructure.setProduct(product);
		elementStructure.setStructure(element);
		
		if (parentStructure.getId().equals("root")) {
			elementStructure.setParentProductStructureRelationship(null);
		} else {
			elementStructure.setParentProductStructureRelationship(parentStructure);
		}
		
		daoFacade.getProductStructureRelationshipDao().insert(elementStructure);
	}

	@Override
	public void insert(PStructure element, PProductStructureRelationship structure, PProduct product, String khids) throws Exception {
		Map<String, String> config = Param.getParam("product.structure.element.path");
		String srcDir = config.get("src").replace("-", ":");
		String destDir = config.get("dest").replace("-", ":");
		
		String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
		
		Element paraNode = DocumentHelper.createElement("para");
		paraNode.setText(element.getName());
		Document xml = DocumentHelper.createDocument();
		xml.add(paraNode);
		
		File f = new File(destDir +  File.separator + System.nanoTime() + ".xml");		
		XMLWriter writer = new XMLWriter(new OutputStreamWriter(new FileOutputStream(f), "utf-8"), OutputFormat.createPrettyPrint());
		writer.write(xml);
		writer.close();
		
		PStructure paraElement = new PStructure();
		paraElement.setCode(String.valueOf(System.nanoTime()));
		paraElement.setName(f.getName());
		paraElement.setStatus(statusAvailable);
		paraElement.setPath(f.getName());
		paraElement.setKeyword(element.getKeyword());
		daoFacade.getStructureDao().insert(paraElement);
		
		PProductStructureRelationship paraElementStructure = new PProductStructureRelationship();
		paraElementStructure.setStatus(statusAvailable);
		paraElementStructure.setProduct(product);
		paraElementStructure.setParentProductStructureRelationship(structure);
		paraElementStructure.setStructure(paraElement);
		daoFacade.getProductStructureRelationshipDao().insert(paraElementStructure);
		
	}
	
	private Document loadXML(String path) throws Exception {
		Map<String, String> xmlNamespace = new HashMap<String, String>();
		xmlNamespace.put("book", "http://docbook.org/ns/docbook");
		xmlNamespace.put("xi", "http://www.w3.org/2001/XInclude");
		xmlNamespace.put("xlink", "http://www.w3.org/1999/xlink");

		SAXReader reader = new SAXReader();
		reader.getDocumentFactory().setXPathNamespaceURIs(xmlNamespace);
		reader.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
		return reader.read(new File(path));
	}
	
}