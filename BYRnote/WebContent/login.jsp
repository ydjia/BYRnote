<!DOCTYPE html>
<html>
<head>
<%@include file="../common/CommonHTMLHead.jsp"%>
<script type="text/javascript">
	$(document).ready(function(){
		var ilu=document.getElementById("input-login-username");
		var ilup=ilu.getElementsByTagName("input");
		var ilp=document.getElementById("input-login-password");
		var ilpp=ilp.getElementsByTagName("input");
		$(ilup).focus(function(){
			$(ilu).css("border","1px solid #00FF00");
		});
		$(ilup).blur(function(){
			$(ilu).css("border","1px solid #FFFFFF");
		});
		$(ilpp).focus(function(){
			$(ilp).css("border","1px solid #00FF00");
		});
		$(ilpp).blur(function(){
			$(ilp).css("border","1px solid #FFFFFF");
		});
		
	});
	function checkForm()
	{
		var srcForm=document.getElementById("login-form");
		var ilu=document.getElementById("input-login-username");
		var ilup=document.getElementById("input-login-username").getElementsByTagName("input");
		var ilp=document.getElementById("input-login-password");
		var ilpp=document.getElementById("input-login-password").getElementsByTagName("input");
		if (srcForm.name == null || srcForm.name.value == '')
			{
			$(ilu).css("border","1px solid #FF0000");
			$(ilup[0]).attr("placeholder","用户名不能为空！");
			return false;
			}
		$(ilu).css("border","1px solid #CFCFCF");
		if (srcForm.password == null || srcForm.password.value == '')
			{
			$(ilp).css("border","1px solid #FF0000");
			$(ilpp[0]).attr("placeholder","密码不能为空！");
			return false;
			}
		$(ilu).css("border","1px solid #CFCFCF");
		login();
	}
	function login()
    {
        //  定义要请求的Servlet  
        var url = 'login';
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

				if(obj.target != undefined)
				  location.href=obj.target;          
			}
		});
    }      
</script>
<title>登录 | BYRnote</title>
</head>
<body class="projects">
  <div id="sign-up-in-switch">
    <a href="./register.jsp">注册</a>
  </div>
  <div class="content">
    <form method="post" id="login-form" >
      <div class="container sign-in-up">
        <header>
          <div class="logo"></div>
        </header>
        <div>
          
            <div class="input-wrapper" id="input-login-username">
              <span class="input-icon icon-user"></span>
              <input name="name" placeholder="用户名" type="text">
            </div>
            <div class="input-wrapper" id="input-login-password">
              <span class="input-icon icon-lock"></span>
              <input name="password" placeholder="密码" type="password" />
            </div>   
			<div class="input-wrapper" id="signin-error" style="display: none">
              <span class="input-icon icon-warning-sign"></span>
              <p>账号或密码错误，请重试</p>
            </div>			
            <div class="input-submit">
             <!--  <button type="submit" class="btn btn-commit btn-block btn-submit" >登录</button> -->
			 <input class="btn btn-commit btn-block btn-submit" type="button" onclick="checkForm();" value="登录" />
            </div>
          
        </div>
          </label>
        </div>
      </div>
    </form>
  </div>
   <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>
</body>
</html>
