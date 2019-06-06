package cn.digitalpublishing.constants;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


public class SessionFactoryUtil {
	public static final ThreadLocal<Session> threadlocal = new ThreadLocal<Session>();   
	public static SessionFactory sessionFactory;   
        //获取session的方法   
    public static Session getSession() throws HibernateException{   
       //返回线程局部变量的当前线程的值   
       Session s = (Session)threadlocal.get();   
           //如果sessionFactory为空，重新创建sessionFactory;如果线程为空，就打开一个新的session   
       if(s==null || !s.isOpen()){   
             if(sessionFactory == null){   
			       rebuildSessionFactory(); 
			       s = (sessionFactory != null)?sessionFactory.openSession():null;   
			       // 将hibernate的session放入到线程中保存；只要这个线程不结束，都可以通过线程的get()方法来获取   
			       threadlocal.set(s);
             } 
       	}
       	return s;
     }
    public static void rebuildSessionFactory(){
    	Configuration cfg = new Configuration().configure();   
		sessionFactory = cfg.buildSessionFactory(); 
    }
    
    public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public static void setSessionFactory(SessionFactory sessionFactory) {
		SessionFactoryUtil.sessionFactory = sessionFactory;
	}
}
