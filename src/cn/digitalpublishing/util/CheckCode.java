
package cn.digitalpublishing.util;

public class CheckCode {

	
	/**
	 * 用户 户号验证 
	 * 户号 共 6 位 第6位 为检验位
	 * 由 前 5 位 逐一 乘  9 8 7 。。。 的和  取余  
	 * 如果与 第六位相等   则为  正确 
	 * @param checkNum
	 * @return
	 * 		by Ma Guoqing
	 */
	public static boolean checkClientNum(String checkNum) {

		boolean flag = false;

		if (checkNum == null || checkNum.length() != 6) {
			return flag;
		} else {
			int sum = 0;
			for (int i = 0, j = 9; i < 5; i++, j--) {
				sum += Integer.parseInt(checkNum.substring(i, i + 1)) * j;
			}

			if ((Integer.parseInt(checkNum.substring(5, 6))) == (sum % 11)) {
				flag = true;
			} else {
				flag = false;
			}
		}

		return flag;
	}
//	public static void main(String[] args) {
//
//		boolean  flag = CheckCode.checkClientNum("123123");
//	}
}
