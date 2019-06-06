package cn.digitalpublishing.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.model.Param;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.service.PStructureService;
import cn.digitalpublishing.springmvc.form.product.PStructureForm;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.TreeNode;

import com.google.common.base.Strings;

@SuppressWarnings({ "unused", "unchecked" })
public class PStructureServiceImpl extends BaseServiceImpl implements PStructureService {

	@Override
	public void edit(PStructureForm form) throws Exception {
		
	}

	@Override
	public void editSubmit(PStructureForm form) throws Exception {
		String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
		PProductStructureRelationship relation = form.getProductStructureRelation();
		
		if (Strings.isNullOrEmpty(relation.getId())) { // 保存
			if (form.getParentProductStructureRelation().getId().equals("root")) {
				relation.setParentProductStructureRelationship(null);
			} else {
				relation.setParentProductStructureRelationship(form.getParentProductStructureRelation());
			}
			relation.setStatus(statusAvailable);
			relation.setProduct(form.getProduct());
			
			daoFacade.getProductStructureRelationshipDao().insert(relation);
			
		} else { // 修改
			daoFacade.getProductStructureRelationshipDao().update(relation, PProductStructureRelationship.class.getName(), relation.getId(), null);
			form.setProductStructureRelation(relation);
		}
		
		form.setNode(createTreeNode(relation));
		
	}

	@Override
	public List<TreeNode> getChildTreeNodes(PStructureForm form) throws Exception {
		String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
		String daoClassName = "cn.digitalpublishing.dao.PProductStructureRelationshipDao";
		String daoMethodName = "getTreeChildNodes";
		List<TreeNode> nodes = new ArrayList<TreeNode>();
		Map<String, Object> condition = new HashMap<String, Object>();
		try {
			condition.put("parentId", form.getParentProductStructureRelation().getId());
			condition.put("status", statusAvailable);
			condition.put("product_id", form.getProduct().getId());
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get(daoClassName).get(daoMethodName);
			List<PProductStructureRelationship> list = this.daoFacade.getProductStructureRelationshipDao().getList(condition, "", hqlBean);
			for (PProductStructureRelationship item : list) {
				nodes.add(createTreeNode(item));
			}
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "corp.getCorpPagingList.error", e);
		}
		return nodes;
	}
	
	/**
	 * 构建树节点对象
	 * @param relationship
	 * @param needId
	 * @return
	 */
	private TreeNode createTreeNode(PProductStructureRelationship relation) {
		TreeNode node = new TreeNode();
		node.setId(relation.getId());
		node.setName(relation.getName());
		if (relation.getChildSize() != null && relation.getChildSize() > 0) {
			node.setIsParent(true);
		} else {
			node.setIsParent(false);
		}
		return node;
	}

	@Override
	public void save(PStructureForm form) throws Exception {
		
		
	}

	@Override
	public void update(PStructureForm form) throws Exception {
		
	}

	@Override
	public void delete(PStructureForm form) throws Exception {
		String statusUnAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE);
		PProductStructureRelationship relation = form.getProductStructureRelation();
		relation.setStatus(statusUnAvailable);
		daoFacade.getProductStructureRelationshipDao().update(relation, PProductStructureRelationship.class.getName(), relation.getId(), null);
	}

	@Override
	public boolean checkCodeAvailable(PStructure structure) throws Exception {
		if (Strings.isNullOrEmpty(structure.getId())) {
			structure = getByCode(structure.getCode());
			if(structure == null) {
				return true;
			}
		} else {
			PStructure pstructure = daoFacade.getStructureDao().get(PStructure.class.getName(), structure.getId());
			if (structure.getCode().equals(pstructure.getCode())) {
				return true;
			}
			
			structure = getByCode(structure.getCode());
			if(structure == null) {
				return true;
			}
		}
		return false;
	}

	@Override
	public PStructure getByCode(String code) throws Exception {
		String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("code", code);
		condition.put("status", statusAvailable);
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.PStructureDao")
				.get("getList");
		List<PStructure> list = daoFacade.getStructureDao().getList(condition, hqlBean);
		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}
	
	private String noSupportChar = "";

	@Override
	public byte[] getChapterBytes(PStructureForm form, String context) throws Exception {
		Map<String, String> config = Param.getParam("product.structure.element.path");
		String srcDir = config.get("src").replace("-", ":");
		String destDir = config.get("dest").replace("-", ":");
		
		String xmlpath = destDir + File.separator + form.getAction();
		return FileUtils.readFileToByteArray(new File(xmlpath));
	}
	
	/***********************拆分XML*************************/
	@Override
	public void splitXML(String isbn) throws Exception {
		Map<String, String> config = Param.getParam("product.structure.element.path");
		String srcDir = config.get("src").replace("-", ":");
		String destDir = config.get("dest").replace("-", ":");
		
		/***********************************************************/
		
		String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
		File file = new File(srcDir + File.separator + isbn + File.separator + "Main.xml");
		
		Document xml = loadXML(file.getPath());
		
		Node infoNode = xml.selectSingleNode("book:book/book:info");
		
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductDao").get("getByIsbn");
		Map<String, Object> getProductCondition = new HashMap<String, Object>();
		getProductCondition.put("status", statusAvailable);
		getProductCondition.put("isbn", isbn);
		
		PProduct product = daoFacade.getProductDao().getProductByIsbn(getProductCondition, hqlBean);
		
		Element tocNode = (Element) xml.selectSingleNode("book:book/book:toc");
		
		PProductStructureRelationship tocStructure = new PProductStructureRelationship();
		tocStructure.setStatus(statusAvailable);
		tocStructure.setName(tocNode.elementText("title"));
		tocStructure.setStructureOrder(1);
		tocStructure.setProduct(product);
		daoFacade.getProductStructureRelationshipDao().insert(tocStructure);
		
		recursiveChapter(tocNode, tocStructure, product, statusAvailable, destDir);
		
	}
	
	private final String XML_HEAD = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
	private final String XML_LEFT_CHAR = "<";
	private final String XML_RIGHT_CHAR = ">";
	
	private void recursiveChapter(Element element, PProductStructureRelationship parent, PProduct product, String status, String dest) throws Exception {
		List<Element> chapterNodeList = element.elements("chapter");
		if (!chapterNodeList.isEmpty()) {
			for (Element chapterNode : chapterNodeList) {
				PProductStructureRelationship chapterStructure = new PProductStructureRelationship();
				chapterStructure.setStatus(status);
				chapterStructure.setName(chapterNode.elementTextTrim("title"));
				if (Strings.isNullOrEmpty(chapterStructure.getName())) {
					chapterStructure.setName("TEMP");
				}
				
				chapterStructure.setProduct(product);
				chapterStructure.setParentProductStructureRelationship(parent);
				daoFacade.getProductStructureRelationshipDao().insert(chapterStructure);
				
				List<Element> paraNodeList = chapterNode.elements("para");
				for (Element para : paraNodeList) {
					String paraXML = para.asXML();
					String buildXML = XML_HEAD + XML_LEFT_CHAR + para.getName() + paraXML.substring(paraXML.indexOf(XML_RIGHT_CHAR));
					File f = new File(dest +  File.separator + System.nanoTime() + ".xml");
					FileUtils.writeStringToFile(f, buildXML, "utf-8");
					
					PStructure paraElement = new PStructure();
					paraElement.setCode(String.valueOf(System.nanoTime()));
					paraElement.setName(f.getName());
					paraElement.setStatus(status);
					paraElement.setPath(f.getName());
					daoFacade.getStructureDao().insert(paraElement);
					
					PProductStructureRelationship paraElementStructure = new PProductStructureRelationship();
					paraElementStructure.setStatus(status);
					paraElementStructure.setProduct(product);
					paraElementStructure.setParentProductStructureRelationship(chapterStructure);
					paraElementStructure.setStructure(paraElement);
					daoFacade.getProductStructureRelationshipDao().insert(paraElementStructure);
					
				}
				
				recursiveChapter(chapterNode, chapterStructure, product, status, dest);
			}
		}
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

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.PProductStructureRelationshipDao")
				.get("getCount");
		try {
			num = this.daoFacade.getProductStructureRelationshipDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}

	@Override
	public List<PProductStructureRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		Map<String, String> config = Param.getParam("product.structure.element.path");
		String srcDir = config.get("src").replace("-", ":");
		String destDir = config.get("dest").replace("-", ":");
		
		List<PProductStructureRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.PProductStructureRelationshipDao")
				.get("getPagingList");
		try {
			list = this.daoFacade.getProductStructureRelationshipDao().getPagingList(condition, sort, pageCount, page, hqlBean);
			for (PProductStructureRelationship item : list) {
				String path = destDir + File.separator + item.getStructure().getPath();
				if (new File(path).exists()) {
					Document xml = loadXML(path);
					item.setName(xml.getRootElement().getTextTrim()); // name = 素材内容
				}
				
			}
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionList.error", e);
		}
		return list;
	}
	
}