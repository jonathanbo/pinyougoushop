 
  function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var step = (target - obj.offsetLeft) / 10; //每次执行函数的时候变换的距离
      step = step > 0 ? Math.ceil(step) : Math.floor(step); 
      if (obj.offsetLeft == target) {
        clearInterval(obj.timer); //停止定时器
        callback && callback();//函数结束之后执行回调函数
      } else {
        obj.style.left = obj.offsetLeft + step + 'px';
      }     
    }, 30)
  }
 