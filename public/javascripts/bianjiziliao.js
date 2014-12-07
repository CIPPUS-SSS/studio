/*验证邮箱*/
 function validate_email(field,alerttxt)
{
with (field)
{

apos=value.indexOf("@")
dotpos=value.lastIndexOf(".")
if (apos<1||dotpos-apos<2) 
  {alert(alerttxt);return false}

else {return true}
}
}

function validate_form(thisform)
{
with (thisform)
{
if (validate_email(userEmail,"Not a valid e-mail address!")==false)
  {userEmail.focus();return false}


}
}

       /*验证昵称是否空*/
function validate_required(field,alerttxt)
{
with (field)
  {
  if (value==null||value=="")
    {alert(alerttxt);return false;}
  else {return true}
  }
}

function validate_form2(thisform)
{
with (thisform)
  {
  if (validate_required(userNickName,"昵称不能为空!")==false)
    {userNickName.focus();return false;}
  }
}
