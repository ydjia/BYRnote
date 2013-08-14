<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html>
<head>

<title>上传照片</title>
  <script language="javascript">
</script>
</head>
<body>
	
    <form  action="uploadPhoto" method="post" enctype="multipart/form-data">
        <input type="hidden" value="${user}" name="userName" />
        <input type="hidden" value="${param.id}" name="id" />
         <span id="files"> <input type='file' name='upload' />
             <p/>
         </span>           
         <input type="submit" value="上传"/>
    </form>   
</body>
</html>

