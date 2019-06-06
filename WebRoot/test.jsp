<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.io.InputStream" %>
<%@page import="java.io.FileInputStream" %>
<%@page import="java.io.ByteArrayOutputStream" %>
<%@page import="java.io.IOException" %>
<%!
public static String toBase64(InputStream in) throws IOException {
    ByteArrayOutputStream bout = new ByteArrayOutputStream();
    int len;
    byte[] buf = new byte[4096];
    while (true) {
        len = in.read(buf);
        if (len > 0) {
            bout.write(buf, 0, len);
        } else {
            break;
        }
    }
    bout.flush();
    bout.close();
    in.close();
    final byte[] data = bout.toByteArray();
    char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".toCharArray();
    byte[] codes = new byte[256];
    for (int i = 0; i < 256; i++) {
        codes[i] = -1;
    }
    for (int i = 'A'; i <= 'Z'; i++) {
        codes[i] = (byte) (i - 'A');
    }
    for (int i = 'a'; i <= 'z'; i++) {
        codes[i] = (byte) (26 + i - 'a');
    }
    for (int i = '0'; i <= '9'; i++) {
        codes[i] = (byte) (52 + i - '0');
    }
    codes['+'] = 62;
    codes['/'] = 63;
    final char[] out = new char[((data.length + 2) / 3) * 4];
    for (int i = 0, index = 0; i < data.length; i += 3, index += 4) {
        boolean quad = false;
        boolean trip = false;
 
        int val = (0xFF & data[i]);
        val <<= 8;
        if ((i + 1) < data.length) {
            val |= (0xFF & data[i + 1]);
            trip = true;
        }
        val <<= 8;
        if ((i + 2) < data.length) {
            val |= (0xFF & data[i + 2]);
            quad = true;
        }
        out[index + 3] = alphabet[(quad ? (val & 0x3F) : 64)];
        val >>= 6;
        out[index + 2] = alphabet[(trip ? (val & 0x3F) : 64)];
        val >>= 6;
        out[index + 1] = alphabet[val & 0x3F];
        val >>= 6;
        out[index + 0] = alphabet[val & 0x3F];
    }
    return new String(out);
}
%>
<%
//服务器端文件
String fileName = "D://1.docx";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<script type="text/javascript" src="xdoc.js"></script>
<script type="text/javascript">
XDoc.to("data:application/<%=fileName.substring(fileName.lastIndexOf('.') + 1)%>;base64,<%=toBase64(new FileInputStream(fileName))%>", "html5");
</script>
</body>
</html>