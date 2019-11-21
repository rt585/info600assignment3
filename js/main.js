//Load Data function created to load the data from JSON /users.
	$(document).ready(function()
{
	  $("#loadData").click(function()
	  {
	  $("#displayRecords").empty();
		$.getJSON("/users", function(result)
		{
		  $.each(result, function(i, field)
		  {
			  var date= new Date();
			  var time = date.getHours()+ ":" + date.getMinutes();
			  
		   for(var r=0;r<field.length;r++)
		   {
$("#displayRecords").append(time + " - " + field[r].fullName + " , " + field[r].major + " ,  " + field[r].startYear + "<button value='" +field[r].id+ "' id ='deleteData'>Delete</button>" +"<br>" );
				console.log(field[r].id);	
			   }
				});
				});
				});
				});
				
	//Add record function created to add the record when the field values are entered and add record button is clicked.
	$(document).ready(function()
	{
	  $("#addRec").click(function()
	  {
		const startYear= document.getElementById('startYear').value;
		if (startYear <= 2000) 
		{
			window.alert('Entered year is incorrect: ' + startYear)
			return
		}
	  
	  $.ajax
	  ({
				method: 'POST',
				url: '/users/',
				type: 'POST',
				cache: false,
				data:{
			fullName:$('#fullName').val(),
			major:$('#major').val(),
			startYear: $('#startYear').val(),
			} 
		}) 
			
});
	});
			
			
			
		// Delete Data function for deleting the record  
		$(document).on("click","#deleteData",function()
		{
	   const id= $(this).val();	
	   console.log(id);
	   $.ajax(
	   {
		method: 'DELETE',
		url: '/user/'+id,
		type: '',
		cache: false,
		})
		refreshLoad();
});
			
	
		// Reload function to reload the records information when the record is deleted.	
		function refreshLoad()
					{
					document.getElementById("displayRecords").innerHTML=" ";
					$.getJSON("/users", function(result){
				  $.each(result, function(i, field){
					  var timeLog = new Date($.now()); 
				   for(var r=0;r<field.length;r++){
						$("#displayRecords").append(timeLog.getHours()+ ":" + timeLog.getMinutes()+ " - " + field[r].fullName + " , " + field[r].major + " ,  " + field[r].startYear + "<button value='" +field[r].id+ "' id ='deleteData'>Delete</button>" +"<br>" );

						console.log(field[r].id);
					   }
				  
				  });
				});
				}