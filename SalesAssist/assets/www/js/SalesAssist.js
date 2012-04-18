	var card = new Array(4);
	var amount = new Array(4);
	var transactions = new Array(4);
	var fees = new Array(4);
	var current_expenses;
	var projected_expenses;
	var fee_amt = new Array(4);
	var Total;
    
	function GoBack() {
		window.location="contact.html";
	}
	
	fuction LogOut() {
		navigator.notification.confirm("Confirm Exit Application?", function() {
	    	navigator.app.exitApp(); 
	    	}, "Log Out", "OK,Cancel");
	}
	
    function drawPieChart() {
    
    	
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Credit Card');
        data.addColumn('number', 'Monthly Business in $');
        data.addRows([
          [card[0] , amount[0]],
          [card[1] , amount[1]],
          [card[2] , amount[2]],
          [card[3] , amount[3]],
        ]);

        var options = {
        	title: 'Business Split-Up',
        	is3D: true,
        	backgroundColor: '#E0E0E0',
        	chartArea: {left:35,top:35,width:"85%",height:"85%"}
        };

        var chart = new google.visualization.PieChart(document.getElementById('p_chart'));
		options['width'] = 400;
        options['height'] = 250;
        chart.draw(data, options);
      }
    
    function drawHistogram() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Company');
        data.addColumn('number', 'Current Fees % ');
        data.addColumn('number', 'Projected Fees in %');
        data.addRows([
          ['Fees', current_expenses, projected_expenses]
        ]);

        var options = {
          title: 'Weighted Average of Fees paid',
          hAxis: {title: 'Current vs Projected', titleTextStyle: {color: 'red'}},
          is3D: true,
          backgroundColor: '#E0E0E0',
          chartArea: {left:35,top:25,width:"50%",height:"70%"},
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('h_chart'));
		options['width'] = 400;
        options['height'] = 200;
        chart.draw(data, options);
      }
    
    function loadValues(){
    	
    	card[0] = "VISA";
    	card[1] = "MasterCard";
    	card[2] = "AmEx";
    	card[3] = "Discover";
    	
    	for(i=1;i<=4;i++)
    	{
        	Select_card = "#Select_card" + i;
        	amount_no = "#amount" + i;
        	trans = "#transactions" + i;
        	fee = "#fees" + i;
        	j= i-1;
        	
        	if($(amount_no).val() != "")
    		{
    			amount[j] = parseFloat($(amount_no).val());
    		}
    		else 
    		{
    			amount[j] = 0;
    		}
    		
    		if($(trans).val() != "")
    		{
    			transactions[j] = parseInt($(trans).val());
    		}
    		else
    		{
    			transactions[j] = 0;
    		}
    		
    		if($(fee).val() != "")
    		{
    			fees[j] = parseFloat($(fee).val());
    		}
    		else
    		{
    			fees[j] = 0;
    		}
    		
    	}
    	
    }
    
    function calculate(){
    	var i = 0;
    	Total = amount[0] + amount[1] + amount[2] + amount[3];
    	
    	if(Total > 0)
    		$("#total_buss").text("$" + Total.toFixed(2));
    	
    	var Total_trans = transactions[0]+transactions[1]+transactions[2]+transactions[3];
    	
    	if (Total_trans > 0)
    	{
    		$("#total_trans").text(Total_trans);
    	   	var Avg_ticket_size = Total / Total_trans;
    	   	Avg_ticket_size = Avg_ticket_size.toFixed(2);
    	   	if (Avg_ticket_size > 0)
    	   		$("#Average_Ticket_Size").text("$" + Avg_ticket_size);
    	}
    	else
    	{
    		$("#total_trans").text("0");
    		$("#Average_Ticket_Size").text(" ");
    	}
    	
    	fee_amt[0] = parseFloat(amount[0] * fees[0] / 100);
    	fee_amt[1] = parseFloat(amount[1] * fees[1] / 100);
    	fee_amt[2] = parseFloat(amount[2] * fees[2] / 100);
    	fee_amt[3] = parseFloat(amount[3] * fees[3] / 100);
    	
    	var Total_fees = parseFloat(fee_amt[0] + fee_amt[1] + fee_amt[2] + fee_amt[3]);
    	
    	current_expenses = Total_fees / Total * 100;
    	//current_expenses = current_expenses.toFixed(2);
    	if(current_expenses >= 0)
    		$("#Avg_fees_percent").text(current_expenses.toFixed(2) + "%");
    	
    	projected_expenses = 0.8 * current_expenses;	
    	//projected_expenses = projected_expenses.toFixed(2);
    }
    
    function Process(){
    	//$("#total_buss").text("In Process");
    	loadValues();
		calculate();
		
		if(Total > 0)
			drawPieChart();
		
		if(current_expenses > 0)
			drawHistogram();
    }