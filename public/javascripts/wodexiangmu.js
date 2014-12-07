$(document).ready(function(){
	//$("#text").hide();
	$("#text1").hide();
	$("#text2").hide();
	$("#text3").hide();
    
 
    /*var a = $(":selected").val();

    if( a == 1 )
    {
    	$("#text").fadeIn("slow");
    	$("#text1").hide();
    	$("#text3").hide();
    	$("#text3").hide();
    }
    if( a == 2 )
    {
    	$("#text1").fadeIn("slow");
    	$("#text").hide();
    	$("#text3").hide();
    	$("#text3").hide();
    }
  */
	$(".field").change(function(){
        if( this.value == 1 )
        {
            $("#text").fadeIn("slow");
            $("#text1").hide();
            $("#text2").hide();
            $("#text3").hide();

        }
        if( this.value == 2 )
        {
            $("#text1").fadeIn("slow");
            $("#text").hide();
            $("#text2").hide();
            $("#text3").hide();

        }
        if( this.value == 3 )
        {
            $("#text2").fadeIn("slow");
            $("#text").hide();
            $("#text1").hide();
            $("#text3").hide();

        }
        if( this.value == 4 )
        {
            $("#text3").fadeIn("slow");
            $("#text").hide();
            $("#text1").hide();
            $("#text2").hide();

        }
    });
});