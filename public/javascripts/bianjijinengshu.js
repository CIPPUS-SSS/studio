$(document).ready(function() {
	$("#s").hide();
	$("#yixuan input").hide();
	$("#yixuan img").hide();    //隐藏已选技能。
	
	$(".wei1").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：js");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei1").fadeOut("slow");
			$(".yi1").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei2").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：php");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei2").fadeOut("slow");
			$(".yi2").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei3").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：java");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei3").fadeOut("slow");
			$(".yi3").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei4").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：python");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei4").fadeOut("slow");
			$(".yi4").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei5").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：node");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei5").fadeOut("slow");
			$(".yi5").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei6").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：canvas");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei6").fadeOut("slow");
			$(".yi6").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei7").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：js");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei7").fadeOut("slow");
			$(".yi7").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei8").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：css");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei8").fadeOut("slow");
			$(".yi8").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei9").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：webgl");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei9").fadeOut("slow");
			$(".yi9").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});
	$(".wei0").click(function(){
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度：socket");
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});
		$("#s input").unbind().click(function(){
			$(".wei0").fadeOut("slow");
			$(".yi0").fadeIn("slow");
			$("#s").fadeOut("slow");
		});
	});



	  


	$(".yi1").click(function(){
		$(".yi1").fadeOut("slow");
		$(".wei1").fadeIn("slow");
	});
	$(".yi2").click(function(){
		$(".yi2").fadeOut("slow");
		$(".wei2").fadeIn("slow");
	});
	$(".yi3").click(function(){
		$(".yi3").fadeOut("slow");
		$(".wei3").fadeIn("slow");
	});
	$(".yi4").click(function(){
		$(".yi4").fadeOut("slow");
		$(".wei4").fadeIn("slow");
	});
	$(".yi5").click(function(){
		$(".yi5").fadeOut("slow");
		$(".wei5").fadeIn("slow");
	});
	$(".yi6").click(function(){
		$(".yi6").fadeOut("slow");
		$(".wei6").fadeIn("slow");
	});
	$(".yi7").click(function(){
		$(".yi7").fadeOut("slow");
		$(".wei7").fadeIn("slow");
	});
	$(".yi8").click(function(){
		$(".yi8").fadeOut("slow");
		$(".wei8").fadeIn("slow");
	});
	$(".yi9").click(function(){
		$(".yi9").fadeOut("slow");
		$(".wei9").fadeIn("slow");
	});
	$(".yi0").click(function(){
		$(".yi0").fadeOut("slow");
		$(".wei0").fadeIn("slow");
	});




    

    $("#zidingyi").click(function(){
    	var a = $("#shuru").val();
		$("#s").fadeIn("slow");
		$("#s p").text("熟练度："+a);
		$("#s").not("input").click(function(){
			$("#s").fadeOut();
		});

		$("#s input").unbind().click(function(){
			$("#yixuan").children().last().after("<span> <input class='zi' disabled><img class='zi' src='images/u53.png'></span>");
			$("input.zi").last().val(a);
			
		
			$("#s").fadeOut("slow");

			$("img.zi").click(function(){
		       $(this).parent().fadeOut("slow");
	        });
		});
		
	});
	
   
});
