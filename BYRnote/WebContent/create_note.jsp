<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="../common/CommonHTMLHead.jsp"%>
<title>新建笔记| BYRnote</title>
<script>
  function showPath(){
	var params = $("form").serialize();
　　var s =document.getElementById("fileUpload").value;
	var b = s.substring(s.lastIndexOf("\\")+1, s.length);
	$(document.getElementById("uploaded")).css("display","block");
    document.getElementById("fname").innerText=b;
};
</script>
</head>
<body class="projects">
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
    <div class="container sheet clearfix" style="width: 500px;">
      <div class="page_left">
        <div class="project-edit-header">
          <a class="project-cancel" href="./home.jsp">←返回</a>
          <h3 class="page-header">新建笔记</h3>
          <div class="project-form">
            
			<form id="createNote" name="createNote"  action="createNote" method="post" enctype="multipart/form-data">
			   <input type="hidden" value="${user}" name="userName" />
			  <div class="control-group">
				<input type="text" name="title" style="width:300px;height:30px;" placeholder="笔记标题" value="" required />
			  </div>
			  <div class="control-group">
				<textarea name="text" class="autofit" rows="3" style="width: 414px;"  placeholder="笔记内容" required></textarea>
			  </div>
			  <div class="control-group">
				<h3>+添加图片(可选)</h3>
			  </div>
			   <header class="text_entry">
				<div class="attachments">
				   <a class="btn_addPic" href="javascript:void(0);">
					<span><em>+</em>添加图片</span> 
					<input name="upload" type="file" id="fileUpload" class="filePrew" title="支持jpg、jpeg、gif、png格式，文件小于5M" tabindex="3"  size="3" onchange ="showPath()">
				   </a>
					<li class="uploaded" id="uploaded" style="display: none;">
                      <a class="icon-pic"></a>
                      <span id="fname"></span>
                    </li>
			     </div>
			   </header>
			  <div class="button_group clearfix">
				<button type="submit" class="btn btn-commit right">保 存</button>
			 </div>
			</form>
          </div>
        </div>
      </div>
    </div>
  </div>
   <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>
</body>