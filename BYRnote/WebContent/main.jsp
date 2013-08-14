<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<script src="../../BYRnote2/WebContent/javascript/prototype.js" type="text/javascript">
</script>
<title>BYRnote</title>
</head>
<body onLoad="table.style.visibility='visible'" background-color="#564700">
欢迎
<font color="red">
${user}
</font>
<form action="../../BYRnote2/create_note1.jsp" method="post">
    <input type="submit" value="新建笔记" />
</form>

<form name="updateNoteForm" action="../../BYRnote2/update_note.jsp" method="post" >
    <input type="hidden" name = "id"/>
    <input type="hidden" name = "name"/>
    <input type="hidden" name = "text"/> 
	<input type="hidden" name = "title">
</form> 

<form name="delete_note" action="deleteNote" method="post" >
    <input type="hidden" name = "id"/>
</form> 

<hr>
<c:import url="getNotes"/>

<table id="table" style="visibility:hidden" >
    <c:forEach var="note" items="${notes}" varStatus = "status">
	<c:if test="${status.index % 5 ==0}">
        <tr>        
		<c:set var="index" value = "${status.index}" />
	</c:if>
        <td valign="top" align="center" style="padding-left:10px;padding-right:10px" color="red">
        <div onmouseout ="div${status.index}.style.visibility = 'hidden'" onmouseover="div${status.index}.style.visibility = 'visible'">
        <table height="200" width="180" style="border:double"  > 
            <tr height="20" align="center"> 
				<td>
					<label style="font-size:12px;color=red">${note.title}</label><br/>
				</td>
			</tr>
			<tr>
				<td>
                    <label style="font-size:12px;" align="left">${note.text}</label><br/>
				</td>
			</tr>
			<c:if test="${note.name != null}">
			<tr align="center">
				<td>
				<a href="../../BYRnote2/viewPhoto?userName=${user}&id=${note.id}">
					<c:url value="viewPhoto?userName=${user}&id=${note.id}" var="viewPhoto" />            
					<img id="img${status.index}" onload="imgLoad(this, ${status.index})" style="margin-top:5px;" src="../../BYRnote2/${viewPhoto}" />
				</a>
				</td>
			</tr>
			</c:if>
                       
            <tr height="20" align="center">
                <td>
                    <div id="div${status.index}" style="visibility:hidden">
                    
                        <label style="font-size:12px"><a href="javascript:updateNote('${note.id}','${note.name}','${note.title}','${note.text}')" >修改笔记</a></label>
                        <label style="font-size:12px"><a href="javascript:deleteNote('${note.id}')" >删除笔记</a></label>
                    </div>
                </td>
            </tr>
        </table>
    </c:forEach>
</table>

<script type="text/javascript">   

function deleteNote(id) 
{
	if(confirm("是否真的要删除该笔记？")==false)
		return;
	delete_note.id.value = id;
	delete_note.submit();
	
	 

	//  定义要请求的Servlet  
/*     var url = "deleteNote";
    alert("1");
	var temp = "id="+id;
	alert(temp);
    //  创建一个Ajax.Request对象来发送请求
	var myAjax = new Ajax.Request(
	url,
	{
		//  指定请求方法为POST
		method:'post',
		//  指定请求参数
		parameters:temp,
		//  指定回调函数
		onComplete: processResponse,
		//  指定通过异步方式发出请求和接收响应信息 
		asynchronous:true
	}); 
	alert("2"); */
}
//  该方法为异步处理响应信息的函数
function processResponse(request)
{    
    var obj = request.responseText.evalJSON();
    alert(obj.message);      
    location.reload();
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

</body>
</html>
     
