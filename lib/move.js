// JavaScript Document
 function getCss(ele,attr){
	  if(window.getComputedStyle){
	   //标准浏览器
	     return parseFloat(window.getComputedStyle(ele,null)[attr]);//parseFloat()去掉单位
	  }else{//IE678
		 return parseFloat(ele.currentStyle[attr]);  
	  }   
	}
   function move(ele,attr,target){
	   if(attr=='opacity'){
		   fadeInOut(ele,target);
	   }else{
		  //清楚动画积累问题
		  clearTimeout(ele.timer);
		  //nSpeed*=90;
		  var currPos=getCss(ele,attr);
		  var nSpeed=(target-currPos)/10;
		  if(nSpeed){//js语法的缺点，做浮点运算精确度问题、
			 nSpeed=nSpeed>0?Math.ceil(nSpeed):Math.floor(nSpeed);
			 ele.style[attr]=currPos+nSpeed+"px";
			 ele.timer=window.setTimeout(function(){move(ele,attr,target)},60);
		   }else{
			  ele.timer=null;//判断是否在动画中，做动画的依据   
		   }
	   }
   }
   function fadeInOut(ele,target){
	  clearTimeout(ele.timer);//清楚动画积累
	 var curPos=getCss(ele,'opacity');//算出当前的位置
	 var nSpeed=(target-curPos)/8;//速度
	 var temp=nSpeed>0?Math.ceil(curPos*1000):Math.floor(curPos*1000);
	  //如果速度>0则向下取整，如0.3-->0;如果速度<0则向上取整,-0.3-->-1
	 //把opacity放大1000倍，为了避免浮点数做比较，因为JS的浮点数精度取舍的时候会有误差，放大1000倍之后，将其变成整数之后，再比较
	 //这个整数是经过处理过的
	 //正常的比较应该是if(curPos===target)
	 //parseInt表示把小数点去掉
	  if(temp==target*1000){
		  //到达目的地停止
		  ele.style.opacity=target;
		  ele.style.filter="alpha(opacity="+target*100+")";//IE
		  ele.timer=null;  
	  }else{
		 //获得速度 
		// var nSpeed=(target-curPos)/10;
		 ele.style.opacity=curPos+nSpeed;
		 ele.timer=window.setTimeout(function(){
			 fadeInOut(ele,target);
		  },30);
	  }
   }