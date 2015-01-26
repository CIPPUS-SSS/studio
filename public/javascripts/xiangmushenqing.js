$(document).ready(function(){
	$("textarea").hide();
	$(".text input").click(function(){
        var i= $(this).parent().parent().parent();
        if($(this).val()!="提 交"){
            $(this).val("提 交");
            i.animate({height:"300px"});
            i.find("textarea").fadeIn("slow");
        }
        else{
            $(this).parent().parent().submit();
        }

	});
    $(".text1 input").click(function(){
        var i= $(this).parent().parent().parent();
        if($(this).val()!="提 交"){
            $(this).val("提 交");
            i.animate({height:"300px"});
            i.find("textarea").fadeIn("slow");
        }
        else {
            $(this).parent().parent().submit();
        }
    });
    $(".text2 input").click(function(){
        var i= $(this).parent().parent().parent();
        if($(this).val()!="提 交"){
            $(this).val("提 交");
            i.animate({height:"300px"});
            i.find("textarea").fadeIn("slow");
        }
        else {
            $(this).parent().parent().submit();
        }
    });
    $(".text3 input").click(function(){
        var i= $(this).parent().parent().parent();
        if($(this).val()!="提 交"){
            $(this).val("提 交");
            i.animate({height:"300px"});
            i.find("textarea").fadeIn("slow");
        }
        else {
            $(this).parent().parent().submit();
        }
    });
    
    $(".text1").hide();
    $(".text2").hide();
    $(".text3").hide();
	$(".field").change(function(){
        if( this.value == 1 )
        {
            $(".text").fadeIn("slow");
            $(".text1").hide();
            $(".text2").hide();
            $(".text3").hide();

            $(".text1").animate({height:"157px"});
            $(".text1 textarea").hide();
            $(".text2").animate({height:"157px"});
            $(".text2 textarea").hide();
            $(".text3").animate({height:"157px"});
            $(".text3 textarea").hide();
            
    
        }
        if( this.value == 2 )
        {
            $(".text1").fadeIn("slow");
            $(".text").hide();
            $(".text2").hide();
            $(".text3").hide();

            $(".text").animate({height:"157px"});
            $(".text textarea").hide();
            $(".text2").animate({height:"157px"});
            $(".text2 textarea").hide();
            $(".text3").animate({height:"157px"});
            $(".text3 textarea").hide();
        }
        if( this.value == 3 )
        {
            $(".text2").fadeIn("slow");
            $(".text").hide();
            $(".text1").hide();
            $(".text3").hide();

            $(".text").animate({height:"157px"});
            $(".text textarea").hide();
            $(".text1").animate({height:"157px"});
            $(".text1 textarea").hide();
            $(".text3").animate({height:"157px"});
            $(".text3 textarea").hide();
        }
        if( this.value == 4 )
        {
            $(".text3").fadeIn("slow");
            $(".text").hide();
            $(".text1").hide();
            $(".text2").hide();

            $(".text").animate({height:"157px"});
            $(".text textarea").hide();
            $(".text1").animate({height:"157px"});
            $(".text1 textarea").hide();
            $(".text2").animate({height:"157px"});
            $(".text2 textarea").hide();
        }
    });
});