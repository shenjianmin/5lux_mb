	// 删除文本文档1 //
var oRegisterInput = document.querySelector("#regiter-password-input1");
var oClean1 = document.querySelector("#clean-password1");
var RegisterBtn = document.querySelector("#register-button");
var RegisterAccount = document.querySelector("#register-account");
var oRegisterPassWord  = document.querySelector("#register-password-input");
var oClean2 = document.querySelector("#clean-password2");
var oUSerErr = document.querySelector("#username-err");
var oPasswordErr = document.querySelector("#password-err");
var oSameErr = document.querySelector("#same-err");
var oClean3 = document.querySelector("#clean-password3")

// register的Ajax请求 //

RegisterBtn.addEventListener("touchstart",function(){
	console.log(oRegisterInput.value);
	console.log(oRegisterPassWord.value);
	if(oRegisterInput.value === oRegisterPassWord.value){
		
		$$.Ajax.register(RegisterAccount.value,oRegisterInput.value,function(data){
			console.log(data);
			if(data.code=== 0){
				location.href='login.html';
			}else{
				var message = data['message'];
				confirm(message);
			}
		})
	}else{
		oSameErr.style.display = "block";
		$("#same-err").animate({"height":15},200)
	}
})


// 验证输入内容 //


RegisterAccount.addEventListener("blur",function(){
		var reg1 = /^\w{3,18}$/; 
		if(reg1.test(this.value)){
		  hidden(oUSerErr);
		}else{
		  show(oUSerErr);
			$("#username-err").animate({"height":15},200)
		}
})


oRegisterInput.addEventListener("blur",function(){
		var reg = /^\w{6,18}$/; 
		if(reg.test(this.value)){
		  hidden(oPasswordErr);
		}else{
			show(oPasswordErr);
			 $("#password-err").animate({"height":15},200);
			 
		}
})


	oClean1.addEventListener("touchstart",function(){
		oRegisterInput.value = "";
		oClean1.style.display = "none";
		
		$("#password-err").animate({"height":0},100,function(){
			hidden(oPasswordErr);
		})	
	})
	
	oClean2.addEventListener("touchstart",function(){
		oRegisterPassWord.value = "";
		oClean2.style.display = "none";
		$("#same-err").animate({"height":0},100,function(){
			oSameErr.style.display = "none";
		})	
	})
	
	oClean3.addEventListener("touchstart",function(){
		RegisterAccount.value = "";
		oClean3.style.display = "none";
		console.log(oUSerErr.style.display);
		if(oUSerErr.style.display === "block"){
			$("#username-err").animate({"height":0},100,function(){
			hidden(oUSerErr);
		})	
		}
	})
		// 图标显示和隐藏 //
	oRegisterInput.addEventListener('keyup',function(){
		if($(this).val() == ""){
			oClean1.style.display = "none";
		}else{
			oClean1.style.display = "block";
		}
})
oRegisterPassWord.addEventListener("keyup",function(){
	if($(this).val() == ""){
			oClean2.style.display = "none";
		}else{
			oClean2.style.display = "block";
		}
})
RegisterAccount.addEventListener("keyup",function(){
	if($(this).val() == ""){
			oClean3.style.display = "none";
		}else{
			oClean3.style.display = "block";
		}
})
	
	// register 里button 改变颜色 //
RegisterAccount.addEventListener("keyup",RegisterBtnChange);
oRegisterInput.addEventListener("keyup",RegisterBtnChange);
oRegisterPassWord.addEventListener("keyup",RegisterBtnChange)
function RegisterBtnChange(){
		if(RegisterAccount.value != "" && oRegisterInput.value != "" && oRegisterPassWord.value != ""){
		RegisterBtn.style.backgroundColor = "red";
	}else{
		RegisterBtn.style.backgroundColor = "#cccccc";
	}
}




// 显示和隐藏的方法 //
function hidden(obj){
	obj.style.display = "none"
}
function show(obj){
	obj.style.display = "block"
}



RegisterBtn.addEventListener("touchstart",function(){
	
})