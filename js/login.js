var oInput = document.querySelector("#login-password-input");
var oClean = document.querySelector("#clean-password");
var oLiginAccount = document.querySelector("#login-account");
var oLiginBtn = document.querySelector("#login-button");
var oLiginErr = document.querySelector("#Login-err");

// login的Ajax请求 //
oLiginBtn.addEventListener("touchstart", function() {
	$$.Ajax.login(oLiginAccount.value, oInput.value, function(data) {
		var dataObj = data['data'];

		if(data.code ===0){
      $$.setItem("token",dataObj['token']);
      $$.setItem("username",dataObj['username']);
			if(localStorage.backurl) {
				location.href = localStorage.backurl;
			} else {
				location.href = 'index.html';
			}
		}else{
			oLiginErr.style.display = "block";
		}
		})
})

// 图标点击事件 //
oClean.addEventListener("touchstart", function() {
	oInput.value = "";
	oClean.style.display = "none";
})

// 改变login里button颜色 //
oLiginAccount.addEventListener("keyup", BtnChange);
oInput.addEventListener("keyup", BtnChange);

function BtnChange() {
	if(oLiginAccount.value != "" && oInput.value != "") {
		oLiginBtn.style.backgroundColor = "red";
	} else {
		oLiginBtn.style.backgroundColor = "#cccccc";
	}
}

// 图标显示和隐藏 //
oInput.addEventListener('keyup', function() {
	if($(this).val() == "") {
		oClean.style.display = "none";
	} else {
		oClean.style.display = "block";
	}
})
