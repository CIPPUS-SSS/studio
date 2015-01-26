$(document).ready(function(){

    $("#yichuli").hide();

   
    $(".op").change                                          //选项卡
    (
            function()
        {
            if( this.value == 0 )
            {   
                $("#weichuli").fadeIn("slow");
                $(".div1").fadeIn("slow");
                $(".div2").hide();
                $("#yichuli").hide();
            }
            if( this.value == 1 )
            {
                $("#yichuli").fadeIn("slow");
                $(".div2").fadeIn("slow");
                $(".div1").hide();
                $("#weichuli").hide();
            }
        }
    );

                                 //点击通过不通过均在dom中删除对应的条目，只是发送不同的请求   

    $(".input0").click                                    //拒绝
        (        
                   function()
                {
                      var i = $(this).parent();
                      i.attr("action","leaveMsgNo");
                       alert(i.action);
                    i.submit();
                    console.log(i);
                   // i.commit();
                     $(this).parent().remove();
                }
            
        );
 
   $(".input1").click(                                   //同意
        function()
        { var i = $(this).parent();
            i.attr("action","leaveMsgOk");
            alert(i.action);
            i.submit();
            console.log(i);
               $(this).parent().remove();
        }
    );


    $(".input2").click(                                   //删除
        function()
        { var i = $(this).parent();
            i.attr("action","leaveMsgDel");
            alert(i.action);
            i.submit();
            console.log(i);
            $(this).parent().remove();
        }
    );


    $(".input3").click(                                   //删除留言
        function()
        { var i = $(this).parent();
            i.attr("action","leaveMsgCDel");
            alert(i.action);
            i.submit();
            console.log(i);
            $(this).parent().remove();
        }
    );


    $(".input4").click(                                   //留言提交
        function()
        {
            var i = $(this).parent();
            i.attr("action","leaveMsgC");
            alert(i.action);
            i.submit();
            console.log(i);
            $(this).parent().remove();
        }
    );



    //全选
    $("#w_setall").click(
        function()
        {   
            //alert(2);
           //$("#div1 :checkbox").attr("checked", true); //"#div1 :checked"
           $(".div1 :checkbox").attr("checked",true);
        }
     );

                                                       // 全选拒绝
    $("#w_unpass").click(
           function()
              {
                  var a=[];
                  $(".input_checkbox").each(function(i,o){
                      if($(o).is(":checked")){
                          a.push($(o).val());
                      }
                  });
                  alert(a);
                  $.ajax({
                      url:"leaveMsgNoJ",
                      type:"post",
                      data:{msg:a},
                      dataType:"json",
                      success:function(){
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
                      },
                      error:function(req,txt){
                          alert("error: "+ req.status + "  " + txt);
                      }
                  })
              }
    );
                                                        //全选通过

     $("#w_pass").click(
           function()
              {
                  var a=[];
                    $(".input_checkbox").each(function(i,o){
                        if($(o).is(":checked")){
                            a.push($(o).val());
                        }
                    });
                  alert(a);
                  $.ajax({
                      url:"leaveMsgOkJ",
                      type:"post",
                      data:{msg:a},
                      dataType:"json",
                      success:function(){
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
                      },
                      error:function(req,txt){
                          alert("error: "+ req.status + "  " + txt);
                      }
                  })
              }   
    );

                                                     // 已处理的全选

             $("#y_quanxuan").click(
                function()
                {   
                   $(".div2 :checkbox").attr("checked",true);
                }
             );



                                               //已处理的全选删除
            $("#y_shanchu").click(
                   function()
                      {
                          var a=[];
                          $(".input_checkbox2").each(function(i,o){
                              if($(o).is(":checked")){
                                  a.push($(o).val());
                              }
                          });
                          $.ajax({
                              url:"leaveMsgDelJ",
                              type:"post",
                              data:{msg:a},
                              dataType:"json",
                              success:function(){
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
                              },
                              error:function(req,txt){
                                  alert("error: "+ req.status + "  " + txt);
                              }
                          })

                      }
            );



            $(".fabiao").click(
                function()
                {   
                  var x=$(this).parent().parent();
                  x.find('.textarea').toggle();
                }

            );

                                             //查看留言
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
                {
                  var t=$(this).parent().parent();  // t 是留言框的div
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