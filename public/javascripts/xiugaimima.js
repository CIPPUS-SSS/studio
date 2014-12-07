function validate_required(field,alerttxt)
{
with (field)
  {
  if (value==null||value=="")
    {alert(alerttxt);return false}
  else {return true}
  }
}

function validate_form(thisform)
{
with (thisform)
  {
  if (validate_required(oPwd,"提交内容不能为空!")==false||
  	validate_required(nPwd,"提交内容不能为空!")==false||
  	validate_required(que,"提交内容不能为空!")==false)
    {oPwd.focus();return false}
  if(nPwd.value != que.value)
  	{alert("两次密码输入必须相同！");return false}
  if (oPwd.value.length<6||oPwd.value.length>16)
  	{alert("密码长度不够");return false;}
  if (nPwd.value.length<6||nPwd.value.length>16)
    {alert("密码长度不够");return false;}
  if (que.value.length<6||que.value.length>16)
    {alert("密码长度不够");return false;}
  }
}
$(document).ready(function(){
  $("#xian").hide();
  
  $("#xin2,#xin1").blur(function(){
    var x1 = $("#xin1").val();
  var x2 = $("#xin2").val();
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



 

 
 
