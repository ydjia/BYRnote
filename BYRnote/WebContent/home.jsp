<%@ page language="java" pageEncoding="UTF-8"%>
<%request.setCharacterEncoding("UTF-8");%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="../common/CommonHTMLHead.jsp"%>
<title>所有笔记| BYRnote</title>
<script>
function search()
{
		//  定义要请求的Servlet  
        var url = 'search';
        //  将form1表单域的值转换成请求参数
        var params = $(document.getElementById("search")).serialize();
        //  创建一个Ajax.Request对象来发送请求
		alert(params);
        $.ajax({
		  type: "POST",
		  url: url,
		  data: params,
		  success: function(response){
		   $.html(response);
		  }
		  });     
		return false;
}
function viewNote(id, name, title, text)
{
	view_note.id.value = id;
	view_note.name.value = name;
	view_note.title.value = title;
	view_note.text.value = text;
	view_note.submit();
}
function deleteNote(id) 
{
	if(confirm("是否真的要删除该笔记？")==false)
		return;
	delete_note.id.value = id;
	delete_note.submit();
}
function updateNote(id, name, title, text)
{	
	updateNoteForm.id.value = id;
	updateNoteForm.name.value = name;
	updateNoteForm.title.value = title;
	updateNoteForm.text.value = text;
	updateNoteForm.submit();
}
function imgLoad(img,index)
{

	if(img.clientWidth / img.clientHeight > 3/4)
	{
	    img.height = img.clientHeight * 110 / img.clientWidth;
	    img.width = 110;
	  
	}  
	else
	{
	    img.width = img.clientWidth * 160 / img.clientHeight;
	    img.height = 160;
	} 
} 
</script>
</head>
<form name="delete_note" action="deleteNote" method="post" >
    <input type="hidden" name = "id"/>
</form> 
<form name="view_note" action="viewNote" method="post" >
    <input type="hidden" name = "id"/>
    <input type="hidden" name = "name"/>
    <input type="hidden" name = "text"/> 
	<input type="hidden" name = "title">
</form> 
<form name="updateNoteForm" action="./update_note.jsp" method="post" >
    <input type="hidden" name = "id"/>
    <input type="hidden" name = "name"/>
    <input type="hidden" name = "text"/> 
	<input type="hidden" name = "title">
</form> 
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
		  <form id="search" style="margin:0;" method="post"  action="./search.jsp">
			<input type="text" name="key" placeholder="搜索..." />
		  </form>
		</div>
	  </nav>
	</header>
<div class="content">
    <div class="container">
		<section>
		  <div class="project_card">
            <div class="new_project">
              <a href="./create_note.jsp"></a>
            </div>
          </div>
		<c:import url="getNotes"/>
		<c:forEach var="note" items="${notes}" varStatus = "status">
			<div class="project_card">
			 <div class="project_operation">
				<div class="icon small darkediticon" title="编辑"><a href="javascript:updateNote('${note.id}','${note.name}','${note.title}','${note.text}')"></a></div>
				 <div class="icon small darkdeleteicon" title="删除"><a href="javascript:deleteNote('${note.id}')"></div> 
			  </div>
			  
			  <div class="project_label bgcolor${status.index%8+1} opaque">
				  <p>
					<a class="limit_width_project_name" href="javascript:viewNote('${note.id}','${note.name}','${note.title}','${note.text}')" title="${note.title}">
					${note.title}
					</a>
					<span class="date">${note.uploadDate}</span>
				  </p>
			  </div>
			  <c:if test="${note.name == null}">
			  <div class="project_description">${note.text}</div>
			  </c:if>
			  <c:if test="${note.name != null}">
			  <div class="pic">
				  <a href="../../BYRnote2/viewPhoto?userName=${user}&id=${note.id}" target="_blank">
						<c:url value="viewPhoto?userName=${user}&id=${note.id}" var="viewPhoto" />            
						<img id="img${status.index}" onload="imgLoad(this, ${status.index})" src="../../BYRnote2/${viewPhoto}" />
					</a>
				</div>
			  <div class="project_description_with_pic">${note.text}</div>
			  </c:if>
			</div>
		</c:forEach>
		</section>

    </div>
</div>
 <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>

</body>