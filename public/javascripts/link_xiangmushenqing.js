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
                         $(this).parent().remove();
                 }
        );


        $(".queren").click
        (
            function()
                 {
                         $(this).parent().remove();
                 }
        );
        

        $(".j1").click(
           function()
              {     

                    $(".checkbox1").each
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

        $(".t1").click(
           function()
              {     

                    $(".checkbox1").each
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




          $(".j2").click(
           function()
              {     

                    $(".checkbox2").each
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

        $(".t2").click(
           function()
              {     

                    $(".checkbox2").each
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


          $(".j3").click(
           function()
              {     
                    $(".checkbox1").each
                    (
                        function()
                        {   
                               if(this.checked==true)
                                {
                                   $(this).parent().remove();
                                }         
               
                        }
                     )

                    $(".checkbox2").each
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

        $(".t3").click(
           function()
              {     
                    $(".checkbox1").each
                    (
                        function()
                        {   
                               if(this.checked==true)
                                {
                                   $(this).parent().remove();
                                }         
               
                        }
                     )

                    $(".checkbox2").each
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


});