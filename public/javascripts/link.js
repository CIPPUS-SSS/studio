window.onload=function(){
       var ln = document.getElementById('leftnav');
       var lna = ln.getElementsByTagName('a');
       lna[0].innerText="我的项目";
       lna[1].innerText="加入项目";
       lna[2].innerText="";
       lna[3].innerText="";
       lna[4].innerText=""; 
       lna[0].setAttribute("href","projectMy");
       lna[1].setAttribute("href","projectsList")
}
   