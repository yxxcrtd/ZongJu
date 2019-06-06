
package cn.digitalpublishing.util;

public class CreateIsbn {

	//public static int a = 1;

	public static synchronized String createIsbn(String str) {

		String isbn = "";
		int numIsbn = 0;

		for (int i = 0; i < str.length(); i++) {
			String s = str.substring(i, i + 1);

			if ((i % 2) == 0) {
				numIsbn += Integer.parseInt(s) * 1;
			} else {
				numIsbn += Integer.parseInt(s) * 3;
			}

		}

		int checkIsbn = 10 - (numIsbn % 10);

		if (checkIsbn == 10) {
			checkIsbn = 0;
		}

//		System.out.println(str + "num:" + a++);
		return isbn + checkIsbn;
//		return null;
	}

	public static void main(String[] args) {

		 String isbn = CreateIsbn.createIsbn("222000000001");
		 System.out.println(isbn);
		 String checkIsbn = "222000000001" + isbn;
		
		 System.out.println(ISBN.checkISBN(checkIsbn));

//		TicketSouce a = new TicketSouce("a");
//		TicketSouce b = new TicketSouce("b");
//		TicketSouce c = new TicketSouce("c");
//		new Thread(a, "a").start();
//		new Thread(b, "b").start();
//		new Thread(c, "c").start();
	}
}

//class TicketSouce implements Runnable {
//
//	String a;
//
//	public TicketSouce(String a) {
//
//		this.a = a;
//	}
//
//	// 票的总数
//	public void run() {
//
//		for (int i = 1; i < 50; i++) {
//			try {
//				// 休眠1s秒中，为了使效果更明显，否则可能出不了效果
//				Thread.sleep(1000);
//				CreateIsbn.createIsbn(this.a);
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
//		}
//	}
//}