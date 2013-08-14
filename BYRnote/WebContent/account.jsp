<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<%@include file="../common/CommonHTMLHead.jsp"%>
<title>用户信息| BYRnote</title>
<script>
function checkForm()
	{
		var srcForm=document.getElementById("updateCommand");
		var rxm=document.getElementById("xm");
		var remail=document.getElementById("email");
		if (srcForm.xm == null || srcForm.xm.value == '')
			{
			$(rxm).attr("placeholder","姓名不能为空！");
			return false;
			}
		if (srcForm.email == null || srcForm.email.value == '')
			{
			$(remail).attr("placeholder","邮箱不能为空！");
			return false;
			}
		if (srcForm.repeatPassword.value != srcForm.password.value )
			{
			$(document.getElementById("pass-error")).css("display","block");	
			return false;
			}
		$(document.getElementById("pass-error")).css("display","none");	
		$(document.getElementById("signin-error")).css("display","none");	
		updateUser();
	}
	function updateUser()
    {
        //  定义要请求的Servlet  
        var url = "updateUser";
        //  将form1表单域的值转换成请求参数
        var params = $("form").serialize();
        //  创建一个Ajax.Request对象来发送请求
        $.ajax({
		  type: "POST",
		  url: url,
		  data: params,
		  success: function success(data){
				obj=JSON.parse(data);
				if(obj.message=="error")
				{
					$(document.getElementById("signin-error")).css("display","block");	
				}
				else{
				alert(obj.message);
				}
				if(obj.target != undefined)
				  location.href=obj.target;          
			}
		});
    } 
</script>
</head>

<body class="projects">
<c:import url="getUser"/>
  <div class="content">
    <div class="container sheet account">
      <h3 class="page-header">账户设置</h3>
      <div class="page-content update-user">
        <form id="updateCommand" class="form-signup" method="post" >
           <div class="input-wrapper" id="input-signup-name">
            <span class="input-icon icon-user"></span>
            <input id="name" name="name" placeholder="用户名" readonly="readonly" type="text" value="${user.name}"/>
          </div>
          <div class="input-wrapper" id="input-signup-company">
            <span class="input-icon icon-map-marker"></span>
            <input id="xm" name="xm" placeholder="您的姓名" type="text" value="${user.xm}"/>
          </div>
          <div class="input-wrapper" id="input-signup-email">
            <span class="input-icon icon-envelope"></span>
            <input id="email" name="email" placeholder="邮箱地址" type="text" value="${user.email}"/>
          </div>
          <div class="input-wrapper" id="input-signup-password">
            <span class="input-icon icon-lock"></span>
            <input id="password" name="password" placeholder="密码(留空不修改)" type="password" value=""/>
          </div>
          <div class="input-wrapper" id="input-signup-password">
            <span class="input-icon icon-lock"></span>
            <input id="repeatPassword" name="repeatPassword" placeholder="重复密码" type="password" value=""/>
          </div>
		  <div class="error input-wrapper" id="pass-error" style="display: none">
              <span class="input-icon icon-warning-sign"></span>
              <p>重复密码与密码不同！</p>
			</div>	
		  		  <div class="error input-wrapper" id="signin-error" style="display: none">
              <span class="input-icon icon-warning-sign"></span>
              <p>修改失败，请重试</p>
            </div>
          <div>
            <input class="btn btn-commit" type="button" onclick="checkForm();" value="确认修改" />
            &nbsp;&nbsp;&nbsp;
            <button onclick="javascript:history.go(-1); return false;" class="btn btn-commit">返回</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>
</html>