var location;

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
     $("#debug").append("login");
     var user = $("#username", this).val();
     var pwd = $("#password", this).val();
     latitude = -67.53;
     longitude = 107.23;
     if(user != '' && pwd != '') 
     {	
    	 $("#debug").append(location.latitude + location.longitude);
    	 $.ajaxSetup({
    		  error: function(xhr, status, error) {
    		navigator.notification.alert("An AJAX error occured: " + status + "\nError: " + error + "response" + xhr.responseText);
    		  }
    		});
    	 $.post("http://10.0.2.2:8081/SalesAssist/login.php", 
    			{username:user,password:pwd,lat:latitude,long:longitude}, 
    		function(result) {
    		 if(result.login == 'true') 
    		 {
    			 window.localStorage["username"] = user;
    			 window.localStorage["password"] = pwd;
    			 window.location = "main.html";
    			 //$.mobile.changePage("main.html");
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
	if(typeof(window.localStorage) != undefined)
	{
		 if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined)
		{
		 	$("#username", form).val(window.localStorage["username"]);
		 	$("#password", form).val(window.localStorage["password"]);
		 	Login();
		}
	}
}

function deviceReady()
{
	$("#loginForm").validationEngine('attach');
	$("#loginForm").on("submit",Login);
	getLocation();
}

function getLocation() {
	$("#debug").append("  in getlocation");
	
    var success = function(position) {                          
         location = position.coords;
         $("#debug").append("  in getlocation success");
    };
    var fail = function(e) {
    	navigator.notification.alert("Please Switch on the Location Services", function() {
    	//navigator.app.exitApp(); 
    	}, "Location Required", "Close");
    	
    };
    navigator.geolocation.getCurrentPosition(success, fail);
} 