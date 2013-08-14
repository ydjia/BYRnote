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
	function deletePhoto(id)
	{	
		 //  定义要请求的Servlet  
        var url = 'deletePhoto';
        //  创建一个Ajax.Request对象来发送请求
        $.ajax({
		  type: "POST",
		  url: url,
		  data: "id="+id,
		  success: function success(data){
				obj=JSON.parse(data);
				if(obj.message=="success")
				{	
					$(document.getElementById("havpic")).css("display","none");
					$(document.getElementById("nopic")).css("display","block");
					$(document.getElementById("signin-del")).css("display","block");	
				}
				if(obj.message=="fail")
				{
					$(document.getElementById("signin-delfail")).css("display","block");	
				}    		
			}
		});
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
          <h1>修改笔记</h1>
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
    <input type="text" name="title" style="width:300px;height:30px;" placeholder="笔记标题" value="${note.title}" required />
  </div>
  <div class="control-group">
    <textarea class="autofit" rows="3" style="width: 414px;" name="text" placeholder="笔记内容" required>${note.text}</textarea>
  </div> 
		<div id="havpic" style="display:none;">
			<div class="control-group">
					<h3>图片</h3>
			</div>
			<c:url value="viewPhoto?id=${note.id}" var="viewPhoto" />
			<img id="img${status.index}" onload="imgLoad(this, ${status.index})" style="margin-top:5px;" src="${viewPhoto}" />
			<div class="button_group clearfix">
				<a href="javascript:void(0);" onClick="deletePhoto(${note.id})" class="btn btn-commit right">删除图片</a>
			</div>
			<div class="input-wrapper" id="signin-delfail" style="display: none">
				  <span class="input-icon icon-warning-sign"></span>
				  <p>删除失败，请重试</p>
				</div>
		</div>
		<div id="nopic" style="display:none;">
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
		 <div class="input-wrapper" id="signin-del" style="display: none">
			<span class="input-icon icon-warning-sign"></span><p>删除成功</p>
		 </div>
	    </div>
  <div class="button_group clearfix">
    <button type="submit" class="btn btn-commit right">保 存</button>
  </div>
</form>
			  </div>
            </div>
          </div>
		</div>
	  </div>
	</div>
</div>
<script>
<c:if test="${note.name == null}">
$(document.getElementById("nopic")).css("display","block");
</c:if>
<c:if test="${note.name != null}">
$(document.getElementById("havpic")).css("display","block");
</c:if>
</script>
 <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>
</body>
</html>

