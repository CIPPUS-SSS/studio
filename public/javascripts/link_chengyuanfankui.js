$(document).ready(function(){
      
	    $(".op").change
    (
            function()
        {
            if( this.value == 0 )
            {   
                $("#weichuli").fadeIn("slow");
                $("#yichuli").hide();
            }
            if( this.value == 1 )
            {
                $("#yichuli").fadeIn("slow");
                $("#weichuli").hide();
            }
        }
    );

  

    $(".input0").click
        (        
                   function()
                {
                    var i = $(this).parent();
                    i.attr("action","feedbackDel");
                    alert(i.action);
                    i.submit();
                    $(this).parent().remove();
                }
            
        );
 //然后自己改了..
   $(".input1").click(
        function()
        {
            var i = $(this).parent();
            i.attr("action","feedbackCDel");
            alert(i.action);
            i.submit();
            $(this).parent().remove();
            //var a=$(this).parent().clone();
               //$("#yichuli_div").before(a);
           //    $(this).parent().remove();
        }
    );
    //处理  提交发表留言
    $(".input4").click(
        function()
        {
            var i = $(this).parent();
            i.attr("action","feedbackC");
            alert(i.action);
            i.submit();
            $(this).parent().remove();
            //var a=$(this).parent().clone();
            //$("#yichuli_div").before(a);
            //    $(this).parent().remove();
        }
    );


    $("#w_setall").click(
        function()
        {   
            //alert(2);
           //$("#div1 :checkbox").attr("checked", true); //"#div1 :checked"
           $("#weichuli :checkbox").attr("checked",true);
        }
     );


    $("#w_unpass").click(
           function()
              {     

                    $(".input_checkbox").each
                    (
                        function()
                        {   
                               if(this.checked==true)
                                {
                                   $(this).parent().remove();
                                }         
               
                        }
                     )
              }   
    );


     $("#w_pass").click(
           function()
              {     

                    $(".input_checkbox1").each
                    (
                        function()
                        {   
                               if(this.checked==true)
                                {
                                   $(this).parent().remove();
                                }
               
                        }
                     )
              }   
    );



             $("#y_quanxuan").click(
                function()
                {   
                   
                   //$("#div1 :checkbox").attr("checked", true); //"#div1 :checked"
                   $("#yichuli :checkbox").attr("checked",true);
                }
             );




            $("#y_shanchu").click(
                   function()
                      {
                          var a=[];
                          $("input[name='msgs']").each(function(i,o){
                              if($(o).is(":checked")){
                                  //alert($(o).val());
                                  a.push($(o).val());
                              }
                          })


                          $.ajax({
                              url:"feedbackDelJ",
                              type:"post",
                              data:{msg:a},
                              dataType:"json",
                              success:function(req,txt){
                                 // alert('success');
                                  $(".input_checkbox2").each
                                  (
                                      function()
                                      {
                                          if(this.checked==true)
                                          {
                                              $(this).parent().remove();
                                          }

                                      }
                                  )
                                  console.log(txt);
                              },
                              error:function(err,txt){
                                alert(err.status+ "  " + txt);
                              }
                          });

                      }   
            );



            $(".fabiao").click(
                function()
                {   
                  var x=$(this).parent().parent();
                  x.find('.textarea').toggle();
                }

            );

            $(".chakan").click(
                function()
                {   
                   
                  
                  var x=$(this).parent().parent();
                  x.find('.liuyankuang').toggle();
                  x.find(".textarea").hide();  

                }


            );

            $(".quxiao").click(
                function()
                {
                   $(this).parent().hide();
                }

            );
            $(".tijiao").click(
                function()
                {   var t=$(this).parent().parent();  // t 是留言框的div
                    var x=$(this).parent().find(".text").val();
                    //var y=$(this).parent().find(".textarea");
               
                    var z=$("#liuyan_moban").clone(true);

                     var this_textarea= $(t).find(".textarea");
                     

                    z.insertBefore($(this_textarea)).show();
                    //liuyan_text
                   z.find(".liuyan_text").html(x);


                }
            );


});