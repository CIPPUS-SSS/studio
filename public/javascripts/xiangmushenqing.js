$(document).ready(function(){
	$("textarea").hide();
	$("#text input").click(function(){
		$("#text input").val("提 交");
		$("#text").animate({height:"300px"});
		$("#text textarea").fadeIn("slow");
	});
	$("#text1 input").click(function(){
		$("#text1 input").val("提 交");
		$("#text1").animate({height:"300px"});
		$("#text1 textarea").fadeIn("slow");
	});
	$("#text2 input").click(function(){
		$("#text2 input").val("提 交");
		$("#text2").animate({height:"300px"});
		$("#text2 textarea").fadeIn("slow");
	});
	$("#text3 input").click(function(){
		$("#text3 input")[1].val("提 交");
		$("#text3").animate({height:"300px"});
		$("#text3 textarea").fadeIn("slow");
	});
    
    $("#text1").hide();
    $("#text2").hide();
    $("#text3").hide();
	$(".field").change(function(){
        if( this.value == 1 )
        {
            $("#text").fadeIn("slow");
            $("#text1").hide();
            $("#text2").hide();
            $("#text3").hide();

            $("#text1").animate({height:"157px"});
            $("#text1 textarea").hide();
            $("#text2").animate({height:"157px"});
            $("#text2 textarea").hide();
            $("#text3").animate({height:"157px"});
            $("#text3 textarea").hide();
            
    
        }
        if( this.value == 2 )
        {
            $("#text1").fadeIn("slow");
            $("#text").hide();
            $("#text2").hide();
            $("#text3").hide();

            $("#text").animate({height:"157px"});
            $("#text textarea").hide();
            $("#text2").animate({height:"157px"});
            $("#text2 textarea").hide();
            $("#text3").animate({height:"157px"});
            $("#text3 textarea").hide();
        }
        if( this.value == 3 )
        {
            $("#text2").fadeIn("slow");
            $("#text").hide();
            $("#text1").hide();
            $("#text3").hide();

            $("#text").animate({height:"157px"});
            $("#text textarea").hide();
            $("#text1").animate({height:"157px"});
            $("#text1 textarea").hide();
            $("#text3").animate({height:"157px"});
            $("#text3 textarea").hide();
        }
        if( this.value == 4 )
        {
            $("#text3").fadeIn("slow");
            $("#text").hide();
            $("#text1").hide();
            $("#text2").hide();

            $("#text").animate({height:"157px"});
            $("#text textarea").hide();
            $("#text1").animate({height:"157px"});
            $("#text1 textarea").hide();
            $("#text2").animate({height:"157px"});
            $("#text2 textarea").hide();
        }
    });
});