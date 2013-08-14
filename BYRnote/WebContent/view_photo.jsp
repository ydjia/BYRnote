<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>

</head> 
<body >
    <img src="<c:url value ='/viewPhoto?userName=${param.username}&albumId=${param.id}&id=${param.id}'/>" />   
 <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>	
</body>
</html>
  
