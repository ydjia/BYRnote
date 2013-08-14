<!DOCTYPE html>
<html>
<head>
<%@include file="../common/CommonHTMLHead.jsp"%>
<script type="text/javascript">
	$(document).ready(function(){
		var rname=document.getElementById("name");
		var rxm=document.getElementById("xm");
		var remail=document.getElementById("email");
		var rpass=document.getElementById("password");
		var rpassre=document.getElementById("repeatPassword");
		$(rname).focus(function(){
			$(rname.parentNode).css("border","1px solid #00FF00");
		});
		$(rname).blur(function(){
			$(rname.parentNode).css("border","1px solid #FFFFFF");
		});
		$(rxm).focus(function(){
			$(rxm.parentNode).css("border","1px solid #00FF00");
		});
		$(rxm).blur(function(){
			$(rxm.parentNode).css("border","1px solid #FFFFFF");
		});
		$(remail).focus(function(){
			$(remail.parentNode).css("border","1px solid #00FF00");
		});
		$(remail).blur(function(){
			$(remail.parentNode).css("border","1px solid #FFFFFF");
		});
		$(rpass).focus(function(){
			$(rpass.parentNode).css("border","1px solid #00FF00");
		});
		$(rpass).blur(function(){
			$(rpass.parentNode).css("border","1px solid #FFFFFF");
		});
		$(rpassre).focus(function(){
			$(rpassre.parentNode).css("border","1px solid #00FF00");
		});
		$(rpassre).blur(function(){
			$(rpassre.parentNode).css("border","1px solid #FFFFFF");
		});
	});
	function checkForm()
	{
		var srcForm=document.getElementById("register-form");
		var rname=document.getElementById("name");
		var rxm=document.getElementById("xm");
		var remail=document.getElementById("email");
		var rpass=document.getElementById("password");
		var rpassre=document.getElementById("repeatPassword");
		if (srcForm.name == null || srcForm.name.value == '')
			{
			$(rname.parentNode).css("border","1px solid #FF0000");
			$(rname).attr("placeholder","用户名不能为空！");
			return false;
			}
		$(rname.parentNode).css("border","1px solid #CFCFCF");
		if (srcForm.xm == null || srcForm.xm.value == '')
			{
			$(rxm.parentNode).css("border","1px solid #FF0000");
			$(rxm).attr("placeholder","姓名不能为空！");
			return false;
			}
		$(rxm.parentNode).css("border","1px solid #CFCFCF");
		if (srcForm.email == null || srcForm.email.value == '')
			{
			$(remail.parentNode).css("border","1px solid #FF0000");
			$(remail).attr("placeholder","邮箱不能为空！");
			return false;
			}
		$(remail.parentNode).css("border","1px solid #CFCFCF");
		if (srcForm.password == null || srcForm.password.value == '')
			{
			$(rpass.parentNode).css("border","1px solid #FF0000");
			$(rpass).attr("placeholder","密码不能为空！");
			return false;
			}
		$(rpass.parentNode).css("border","1px solid #CFCFCF");
		if (srcForm.repeatPassword == null || srcForm.repeatPassword.value == '')
			{
			$(rpassre.parentNode).css("border","1px solid #FF0000");
			$(rpassre).attr("placeholder","重复密码不能为空！");
			return false;
			}
		$(rpassre.parentNode).css("border","1px solid #CFCFCF");
		if (srcForm.repeatPassword.value != srcForm.password.value )
			{
			$(rpassre.parentNode).css("border","1px solid #FF0000");
			$(document.getElementById("pass-error")).css("display","block");	
			return false;
			}
		$(document.getElementById("pass-error")).css("display","none");	
		if (srcForm.agree.checked !=true)
			{
			$(document.getElementById("check-error")).css("display","block");
			return false;
			}
		$(document.getElementById("check-error")).css("display","none");
		$(document.getElementById("signin-error")).css("display","none");	
		$(rpassre.parentNode).css("border","1px solid #CFCFCF");
		register();
	}
	function register()
    {
        //  定义要请求的Servlet  
        var url = 'register';
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
				alert(obj.message,"感谢您的注册!");
				}
				if(obj.target != undefined)
				  location.href=obj.target;          
			}
		});
    }      
</script>
<title>注册 | BYRnote</title>
</head>
<body class="projects">
  <div id="sign-up-in-switch">
    <a href="./login.jsp">登录</a>
  </div>
  <div class="content">
    <form id="register-form" class="form-signup" method="POST">
      <div class="container sign-in-up">
        <header>
          <div class="logo"></div>
        </header>
        <div>
          <div class="input-wrapper" id="input-signup-name">
            <span class="input-icon icon-user"></span>
            <input id="name" name="name" placeholder="用户名" type="text" value=""/>
          </div>
          <div class="input-wrapper" id="input-signup-company">
            <span class="input-icon icon-map-marker"></span>
            <input id="xm" name="xm" placeholder="您的姓名" type="text" value=""/>
          </div>
          <div class="input-wrapper" id="input-signup-email">
            <span class="input-icon icon-envelope"></span>
            <input id="email" name="email" placeholder="邮箱地址" type="text" value=""/>
          </div>
          <div class="input-wrapper" id="input-signup-password">
            <span class="input-icon icon-lock"></span>
            <input id="password" name="password" placeholder="密码" type="password" value=""/>
          </div>
          <div class="input-wrapper" id="input-signup-password">
            <span class="input-icon icon-lock"></span>
            <input id="repeatPassword" name="repeatPassword" placeholder="重复密码" type="password" value=""/>
          </div>
		  <div class="error input-wrapper" id="pass-error" style="display: none">
              <span class="input-icon icon-warning-sign"></span>
              <p>重复密码与密码不同！</p>
			</div>	
          <div class="input-wrapper no-background" id="input-signup-agree">
            <label class="checkbox" id="agreement">
              <input id="agree1" name="agree" type="checkbox" value="true"/><input type="hidden" name="_agree" value="on"/>
              我同意BYRnote的<a>《使用协议》</a>
            </label>
			<div class="error input-wrapper" id="check-error" style="display: none">
              <span class="input-icon icon-warning-sign"></span>
              <p>请阅读《使用协议》并勾选同意！</p>
			</div>	
          </div>
		  <div class="error input-wrapper" id="signin-error" style="display: none">
              <span class="input-icon icon-warning-sign"></span>
              <p>用户名已存在，请更换用户名重试</p>
            </div>	
          <div class="input-submit">
             <!--  <button type="submit" class="btn btn-commit btn-block btn-submit" >登录</button> -->
			 <input class="btn btn-commit btn-block btn-submit" type="button" onclick="checkForm();" value="注册" />
            </div>
        </div>
      </div>
    </form>
  </div>

  <a href="javascript:window.scroll(0);" style="position: fixed; right: 30px; bottom: 30px; background: lightblue; padding: 20px; border-radius: 5px;">
</a>
</body>
</html>
