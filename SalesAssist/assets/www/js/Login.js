
function init() 
{
	window.latitude = 32.78;
	window.longitude = -96.80;
	document.addEventListener("deviceready", deviceReady, true);
	//delete init;
}

function bypass()
{
	window.location = "contact.html";
}

function Login() 
{
	 
     //disable the Submit button so we can't resubmit while we wait
     $("#submitButton",this).attr("disabled","disabled");
     // window.location = "main.html";
     if(window.user==undefined && window.pwd == undefined)
     {
    	 window.user = $("#username", this).val();
    	 window.pwd = $("#password", this).val(); 
     }
     if(window.user != '' && window.pwd != '') 
     {	
    	 //$("#debug").append(location.latitude + location.longitude);
    	 $.ajaxSetup({
    		  error: function(xhr, status, error) {
    		navigator.notification.alert("An AJAX error occured: " + status + "\nError: " + error + "response" + xhr.responseText);
    		$("#submitButton").removeAttr("disabled");
    		  }
    		});
    	 $.post("http://sales3.web44.net/login.php",
    	 //$.post("http://10.0.2.2:8081/SalesAssist/login.php",
    			{username:window.user,password:window.pwd,lat:window.latitude,long:window.longitude}, 
    		function(result) {
    		 if(result.login == 'true') 
    		 {
    			 window.localStorage["username"] = window.user;
    			 window.localStorage["password"] = window.pwd;
    			 window.localStorage["loggedin"] = "yes";
    			 window.location = "contact.html";
    			 //$.mobile.changePage("main.html");
    		 } 
    		 else 
    		 {
    			 navigator.notification.alert("Your login failed" + result.login , function() {});
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
		 	window.user=window.localStorage["username"];
		 	window.pwd=window.localStorage["password"];
		 	Login();
		}
		 else
		{
			 window.user='';
			 window.pwd='';
		}
	}
}

function deviceReady()
{
	//$("#loginForm").validationEngine('attach');
	$("#loginForm").on("submit",Login);
	if(window.localStorage["loggedin"] == undefined || window.localStorage["loggedin"] == "")
	{
		getLocation();
	}
}

function getLocation() {
	//$("#debug").append("  in getlocation");
	
    var success = function(position) {                          
         window.latitude = position.coords.latitude;
         window.longitude = position.coords.longitude;
         navigator.notification.alert("Congrats geo-location is working");
         checkPreAuth();
         
    };
    
    var fail = function(e) {
    	navigator.notification.alert("Please Switch on the Location Services", function() {
    	// Below Line commented to aid testing. Will be uncommented on delivery. Will quit the application
    	//navigator.app.exitApp(); 
    	}, "Location Required", "Close");
    	
    };
    
    var options = {enableHighAccuracy: true };
    
    navigator.geolocation.getCurrentPosition(success, fail, options);
} 