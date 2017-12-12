var oVisual = document.querySelector("#visual");
var oLoginPassWord = document.querySelector("#login-password-input")
console.log(oVisual);
// 改变密码加密&显示 //
oVisual.addEventListener("touchstart",function(){
	if(oVisual.className == "visual"){
		oVisual.className = "visual1";
		oLoginPassWord.type ="text"
		
	}else{
		oVisual.className ="visual";
		oLoginPassWord.type ="password"
	}
},false)



