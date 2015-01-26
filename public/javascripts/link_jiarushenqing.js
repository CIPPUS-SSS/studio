$(document).ready(function(){
    
    $("#text1").hide();
    $("#text2").hide();

    $(".op").change(function(){
        if( this.value == 0 )
        {
            $("#text0").fadeIn();
            $("#text1").hide();
            $("#text2").hide();
        }
         if( this.value == 1 )
        {   
            $("#text1").fadeIn();
            $("#text0").hide();
            $("#text2").hide();      
        }
         if( this.value == 2 )
        {   
            $("#text2").fadeIn();
            $("#text0").hide();          
            $("#text1").hide();
        }

    });



        $(".shanchu").click
        (
            function()
                 {
                     var j = $(this).siblings()[0];
                    $.ajax({
                         url:"joinMsgNoJ",
                         type:"post",
                         data:{msg: j.value},
                         dataType:"json",
                         success:function(){

                             $(this).parent().remove();
                         },
                         error:function(req,txt){
                             alert("error: " + req.status + " " + txt );
                         }
                     });

                 }
        );


        $(".queren").click
        (
            function()
                 {
                     var j = $(this).siblings()[0];
                     $.ajax({
                         url:"joinMsgOkJ",
                         type:"post",
                         data:{msg: j.value},
                         dataType:"json",
                         success:function(){
                             $(this).parent().remove();
                         },
                         error:function(req,txt){
                             alert("error: " + req.status + " " + txt );
                         }
                     });

                 }
        );
        

        $(".j1").click(
           function() {
               var a = [];
               $("#text0 input[name='msgs']").each(function (i, o) {
                   if ($(o).is(":checked")) {
                       //alert($(o).val());
                       a.push($(o).val());
                   }
               })
               alert(a);

               $.ajax({
                   url: "joinMsgNoJ",
                   type: "post",
                   data: {msg: a},
                   dataType: "json",
                   success: function (req, txt) {
                       $("#text0 .checkbox1").each
                       (
                           function () {
                               if (this.checked == true) {
                                   $(this).parent().remove();
                               }

                           }
                       )
                   },
                   error: function (err, txt) {
                       alert(err.status + "  " + txt);
                   }
               });
           });

        $(".t1").click(
           function()
              {
                  var a = [];
                  $("#text0 input[name='msgs']").each(function (i, o) {
                      if ($(o).is(":checked")) {
                          a.push($(o).val());
                      }
                  })
                  alert(a);

                  $.ajax({
                      url: "joinMsgOkJ",
                      type: "post",
                      data: {msg: a},
                      dataType: "json",
                      success: function (req, txt) {
                          $("#text0 .checkbox1").each
                          (
                              function () {
                                  if (this.checked == true) {
                                      $(this).parent().remove();
                                  }
                              }
                          )
                      },
                      error: function (err, txt) {
                          alert(err.status + "  " + txt);
                      }
                  });

               }
        );

    $(".j2").click(
        function() {
            var a = [];
            $("#text1 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    a.push($(o).val());
                }
            })
            alert(a);

            $.ajax({
                url: "joinMsgNoJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text1 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().remove();
                            }
                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });
        });

    $(".t2").click(
        function()
        {
            var a = [];
            $("#text1 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    a.push($(o).val());
                }
            })
            $.ajax({
                url: "joinMsgOkJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text1 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().remove();
                            }
                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });

        }
    );
    $(".j3").click(
        function() {
            var a = [];
            $("#text2 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    a.push($(o).val());
                }
            })
            $.ajax({
                url: "joinMsgNoJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text2 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().remove();
                            }

                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });
        });

    $(".t3").click(
        function()
        {
            var a = [];
            $("#text2 input[name='msgs']").each(function (i, o) {
                if ($(o).is(":checked")) {
                    a.push($(o).val());
                }
            })
            $.ajax({
                url: "joinMsgOkJ",
                type: "post",
                data: {msg: a},
                dataType: "json",
                success: function (req, txt) {
                    $("#text2 .checkbox1").each
                    (
                        function () {
                            if (this.checked == true) {
                                $(this).parent().remove();
                            }
                        }
                    )
                },
                error: function (err, txt) {
                    alert(err.status + "  " + txt);
                }
            });

        }
    );

});