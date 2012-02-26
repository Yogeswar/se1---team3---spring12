var card = new Array(4);
	var amount = new Array(4);
	var transactions = new Array(4);
	var fees = new Array(4);
	var current_expenses;
	var projected_expenses;
	
    
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
          title: 'Business Split-Up'
        };

        var chart = new google.visualization.PieChart(document.getElementById('p_chart'));
        chart.draw(data, options);
      }
    
    function drawHistogram() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Company');
        data.addColumn('number', 'Current Expenses');
        data.addColumn('number', 'Projected Expenses');
        data.addRows([
          ['Expenses', current_expenses, projected_expenses]
        ]);

        var options = {
          title: 'Weighted Average of Fees paid',
          hAxis: {title: 'Current vs Projected', titleTextStyle: {color: 'red'}}
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('h_chart'));
        chart.draw(data, options);
      }
    
    function loadValues(){
    	card[0] = $("#select_card_1").val();
		amount[0] = parseInt($("#amount1").val());
		transactions[0] = parseInt($("#transactions1").val());
		fees[0] = parseInt($("#fees1").val());

		card[1] = $("#select_card_2").val();
		amount[1] = parseInt($("#amount2").val());
		transactions[1] = parseInt($("#transactions2").val());
		fees[1] = parseInt($("#fees2").val());
		
		card[2] = $("#select_card_3").val();
		amount[2] = parseInt($("#amount3").val());
		transactions[2] = parseInt($("#transactions3").val());
		fees[2] = parseInt($("#fees3").val());
		
		card[3] = $("#select_card_4").val();
		amount[3] = parseInt($("#amount4").val());
		transactions[3] = parseInt($("#transactions4").val());
		fees[3] = parseInt($("#fees4").val());

    }
    
    function calculate(){
    	var Total = amount[0] + amount[1] + amount[2] + amount[3];
    	$("#total_fees").text("Total Fees : $" + Total);
    	
    	var Avg_ticket_size = amount[0] + amount[1] + amount[2] + amount[3];
    	$("#Average_Ticket_Size").text("Average Ticket Size : $" + Avg_ticket_size);
    	
    	current_expenses = Total;
    	projected_expenses = 0.8 * Total;
    }
