window.onload=function(){
       var ln = document.getElementById('leftnav');
       var lna = ln.getElementsByTagName('a');
       lna[0].innerText="个人资料";
       lna[1].innerText="申请项目";
       lna[2].innerText="发送反馈";
       lna[3].innerText="加入项目";
       lna[4].innerText=""; 
z
       lna[0].setAttribute("href","info");
       lna[1].setAttribute("href","projectsList");
       lna[2].setAttribute("href","sendFeedBack");
       lna[3].setAttribute("href","projectsList");
}