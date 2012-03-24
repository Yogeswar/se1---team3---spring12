function init() 
{
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}


function Login() 
{
	 
     //disable the Submit button so we can't resubmit while we wait
     $("#submitButton",this).attr("disabled","disabled");
     // window.location = "main.html";
     
     var user = $("#username", this).val();
     var pwd = $("#password", this).val();
     if(user != '' && pwd != '') 
     {	
    	 $.post("http://10.0.2.2:8081/SalesAssist/login.php", {username:user,password:pwd}, function(result) {
    		 if(result == true) 
    		 {
    			 window.localStorage["username"] = user;
    			 window.localStorage["password"] = pwd;
    			 $.mobile.changePage("main.html");
    		 } 
    		 else 
    		 {
    			 navigator.notification.alert("Your login failed", function() {});
    		 }
    		 $("#submitButton").removeAttr("disabled");
    	 },"json");
     }
     else
	 {
	 	navigator.notification.alert("You must enter a username and password", function() {});
	 	$("#submitButton").removeAttr("disabled");
	 }
     return false;
}

function checkPreAuth()
{
	var form = $("#loginForm");
	if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined)
	{
		 $("#username", form).val(window.localStorage["username"]);
		 $("#password", form).val(window.localStorage["password"]);
		 Login();
	}
}

function deviceReady()
{
	$("#loginForm").validationEngine('attach');
	$("#loginForm").on("submit",Login);
}