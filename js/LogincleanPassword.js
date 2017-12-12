var oInput = document.querySelector("#login-password-input");
var oClean = document.querySelector("#clean-password");


// 图标点击事件 //
oClean.addEventListener("touchstart",function(){
	oInput.value = "";
	oClean.style.display = "none";
})




// 改变login里button颜色 //
var oLiginAccount = document.querySelector("#login-account");
var oLiginBtn = document.querySelector("#login-button");
oLiginAccount.addEventListener("keyup",BtnChange);
oInput.addEventListener("keyup",BtnChange);
function BtnChange(){
		if(oLiginAccount.value != "" && oInput.value != ""){
		oLiginBtn.style.backgroundColor = "red";
	}else{
		oLiginBtn.style.backgroundColor = "#cccccc";
	}
}



// 图标显示和隐藏 //
oInput.addEventListener('keyup',function(){
	if($(this).val() == ""){
		oClean.style.display = "none";
	}else{
		oClean.style.display = "block";
	}
})
	
	




