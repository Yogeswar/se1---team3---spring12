
function nextpage(){
	window.location = "main.html";
}

function Cancel(){
	var post = document.myform;
	post.submit();
	var   e=document.getElementsByTagName("input"); 
	    for(var   i=0;i <e.length;i++) 
	    { 
	        if   (e[i].type== "text"||e[i].type=="number"||e[i].type=="email"||e[i].type=="date") 
	        { 
	            e[i].value = '';
	        } 
	    } 
}

function SaveDate(){
	
/*	$.post("http://sales3.web44.net/savecustomer.php",
	    	 //$.post("http://10.0.2.2:8081/SalesAssist/savecustomer.php",
			$("#cust_form").serialize(), 
	    		function(result) {  	 });
	     } */
}