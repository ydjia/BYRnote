<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="../common/CommonHTMLHead.jsp"%>
<title>修改笔记| BYRnote</title>
<script>
    function showPath(){
	var params = $("form").serialize();
　　var s =document.getElementById("fileUpload").value;
	var b = s.substring(s.lastIndexOf("\\")+1, s.length);
	$(document.getElementById("uploaded")).css("display","block");
    document.getElementById("fname").innerText=b;
	};
	function imgLoad(img,index)
	{
	
		if(img.clientWidth / img.clientHeight > 4/3)
		{
			img.height = img.clientHeight * 160 / img.clientWidth;
			img.width = 160;
		  
		}  
		else
		{
			img.width = img.clientWidth * 120 / img.clientHeight;
			img.height = 120;
		} 
	} 
</script>
</head>
<body class="projects">
<c:import url="getNote"/>
	<header>
	  <nav class="container">
		<a class="logo" href="./home.jsp" title="回到首页">BYR云笔记</a>
		<div class="wel">
		  <!--<a href="/1234276/users/793390">Me</a> -->
			<p>${user}，欢迎您使用BYR云笔记</p>  
		</div>
		<div class="current-user">
		  <a href="./account.jsp">账户设置</a>
		  <a href="#">使用说明</a>
		  <a href="./index.html">退出</a>
		</div>
		<div class="nav-search">
		  <form style="margin:0;" method="get" action="/1234276/search">
			<input type="text" name="key" placeholder="搜索..." />
		  </form>
		</div>
	  </nav>
	</header>

<div class="content">
    <div class="container stack-container">
      <div class="sheet clearfix inactive">
        <header>
          <h1>查看笔记</h1>
        </header>
        <div class="sheet">
          <div class="page_left auto_float left">
            <div class="project-edit-header">
              <a class="project-remove"  href="./home.jsp">返回</a>
              <h3 class="page-header">笔记内容</h3>
              <div class="project-form">
                
                
<form id="updateNote" name="updateNote" class="form-horizontal" action="updateNote" method="post" enctype="multipart/form-data">
  <input type="hidden" name="id" value="${note.id}" />
   <input type="hidden" name="uploadDate" value="${note.uploadDate}" />
  <div class="control-group">
    <h5 style="width:300px;height:30px;">标题：</h5>
	<p style="width:300px;height:20px;">${note.title}</p>
  </div>
  <div class="control-group">
    <h5 style="width: 414px;">内容：</h5>
	<p style="width:300px;">${note.text}</p>
  </div> 
	<c:if test="${note.name != null}">
	<div class="control-group">
			<h3>图片</h3>
	</div>
	<c:url value="viewPhoto?id=${note.id}" var="viewPhoto" />
	<img id="img${status.index}" onload="imgLoad(this, ${status.index})" style="margin-top:5px;" src="${viewPhoto}" />
	</c:if>	
</form>
			  </div>
            </div>
          </div>
		</div>
	  </div>
	</div>
</div>
 <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>
</body>
</html>

