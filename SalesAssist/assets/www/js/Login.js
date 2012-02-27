function deviceReady() {

	$("#loginForm").validationEngine('attach');
 $("#loginForm").on("submit",function(e) {
	 
     //disable the button so we can't resubmit while we wait
     $("#submitButton",this).attr("disabled","disabled");
     window.location = "main.html";
 /*var user = $("#username", this).val();
 var pwd = $("#password", this).val();
 if(user != '' && pwd != '') {
     $.post("http://localhost.com:8081/SalesAssistServer/login.php", {username:user,password:pwd}, function(result) {
         if(res == true) {
             $.mobile.changePage("main.html");
         } else {
             navigator.notification.alert("Your login failed", function() {});
         }
         $("#submitButton").removeAttr("disabled");
     },"json");
}
 return false; */
}); 
     

}