$(document).ready(function(){
	$("#content").css("height","600px");
	$("#leftnav").css("height","631px");
	$("#xian").hide();
	var x1 = $("#mi1").val();
    var x2 = $("#mi2").val();
	$("#mi2").blur(function(){
		
		if( x1 != x2 )
		{
			$("#xian").fadeIn();
		}
		else
		{
			$("#xian").fadeOut();
		}
	});



});