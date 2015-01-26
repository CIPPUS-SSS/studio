$(document).ready(function() {
	$("#check input").hide();
	$("#qd").show();
	$("#check input").attr("checked",false);//选中的值s
	$("#s").hide();
	$("#yixuan input").hide();
	$("#yixuan img").hide();    //隐藏已选技能。
	
	$("#wei img").eq(0).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：js");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(0).fadeOut("slow");
			$("#yixuan span").eq(0).children().fadeIn("slow");
			$("#s").fadeOut("slow");
            $(".c").eq(0).attr("checked",true);
		});
	});
	$("#wei img").eq(1).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：php");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(1).fadeOut("slow");
			$("#yixuan span").eq(1).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(1).attr("checked",true);
		});
	});
	$("#wei img").eq(2).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：java");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(2).fadeOut("slow");
			$("#yixuan span").eq(2).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(2).attr("checked",true);
		});
	});
	$("#wei img").eq(3).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：python");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(3).fadeOut("slow");
			$("#yixuan span").eq(3).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(3).attr("checked",true);
		});
	});
	$("#wei img").eq(4).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：node");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(4).fadeOut("slow");
			$("#yixuan span").eq(4).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(4).attr("checked",true);
		});
	});
	$("#wei img").eq(5).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：canvas");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(5).fadeOut("slow");
			$("#yixuan span").eq(5).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(5).attr("checked",true);
		});
	});
	$("#wei img").eq(6).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：js");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(6).fadeOut("slow");
			$("#yixuan span").eq(6).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(6).attr("checked",true);
		});
	});
	$("#wei img").eq(7).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：css");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(7).fadeOut("slow");
			$("#yixuan span").eq(7).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(7).attr("checked",true);
		});
	});
	$("#wei img").eq(8).click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：webgl");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(8).fadeOut("slow");
			$("#yixuan span").eq(8).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(8).attr("checked",true);
		});
	});
	$("#wei img").eq(9).click(function(){
        var val = $("#wei input").eq(9).val();
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度："+ val);
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$("#wei span").eq(9).fadeOut("slow");
			$("#yixuan span").eq(9).children().fadeIn("slow");
			$("#s").fadeOut("slow");
			$(".c").eq(9).attr("checked",true);
		});
	});



	  


	$("#yixuan img").eq(0).click(function(){
		$("#yixuan span").eq(0).children().fadeOut("slow");
		$("#wei span").eq(0).fadeIn("slow");
		$(".c").eq(0).attr("checked",false);
	});
	$("#yixuan img").eq(1).click(function(){
		$("#yixuan span").eq(1).children().fadeOut("slow");
		$("#wei span").eq(1).fadeIn("slow");
		$(".c").eq(1).attr("checked",false);
	});
	$("#yixuan img").eq(2).click(function(){
		$("#yixuan span").eq(2).children().fadeOut("slow");
		$("#wei span").eq(2).fadeIn("slow");
		$(".c").eq(2).attr("checked",false);
	});
	$("#yixuan img").eq(3).click(function(){
		$("#yixuan span").eq(3).children().fadeOut("slow");
		$("#wei span").eq(3).fadeIn("slow");
		$(".c").eq(3).attr("checked",false);
	});
	$("#yixuan img").eq(4).click(function(){
		$("#yixuan span").eq(4).children().fadeOut("slow");
		$("#wei span").eq(4).fadeIn("slow");
		$(".c").eq(4).attr("checked",false);
	});
	$("#yixuan img").eq(5).click(function(){
		$("#yixuan span").eq(5).children().fadeOut("slow");
		$("#wei span").eq(5).fadeIn("slow");
		$(".c").eq(5).attr("checked",false);
	});
	$("#yixuan img").eq(6).click(function(){
		$("#yixuan span").eq(6).children().fadeOut("slow");
		$("#wei span").eq(6).fadeIn("slow");
		$(".c").eq(6).attr("checked",false);
	});
	$("#yixuan img").eq(7).click(function(){
		$("#yixuan span").eq(7).children().fadeOut("slow");
		$("#wei span").eq(7).fadeIn("slow");
		$(".c").eq(7).attr("checked",false);
	});
	$("#yixuan img").eq(8).click(function(){
		$("#yixuan span").eq(8).children().fadeOut("slow");
		$("#wei span").eq(8).fadeIn("slow");
		$(".c").eq(8).attr("checked",false);
	});
	$("#yixuan img").eq(9).click(function(){
		$("#yixuan span").eq(9).children().fadeOut("slow");
		$("#wei span").eq(9).fadeIn("slow");
		$(".c").eq(9).attr("checked",false);
	});

    $("#zidingyi").click(function(){
    	var a = $("#shuru").val();
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度："+a);
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});

	    $("#s input").unbind().click(function(){
			$("#yixuan").children().last().after("<span> <input class='zi' disabled value=''><img class='zi' src='/images/u53.png'></span>");
			$("input.zi").last().val(a);
			$("#check").children().last().after("<input type='checkbox' checked='checked'>");
		    $("#check input").last().val(a);
			$("#check input").last().hide();
			$("#s").fadeOut("slow");
			$("img.zi").unbind().click(function(){
			   var va = $(this).prev().val();
		       $(this).parent().fadeOut("slow");
		       $("input[value='" + va + "']").remove();
	        });
		});
	});
	
   
});
