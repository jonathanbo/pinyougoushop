window.addEventListener('load', function () {
  var focus = document.querySelector('.focus');
  var arrow_l = document.querySelector('.arrow-l');
  var arrow_r = document.querySelector('.arrow-r');
  var focusWidth = focus.offsetWidth;
  //左右按钮显示
  focus.addEventListener('mouseover', function () {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
    //清楚定时器
    clearInterval(timer);
    //清除定时器变量
    timer = null;
  })
  //左右按钮隐藏
  focus.addEventListener('mouseout', function () {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    //启动定时器
    timer = setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);

  })

  //动态获取图片数量 创建小圆圈
  var ul = focus.querySelector('ul');
  var ol = focus.querySelector('.circle');
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li');
    ol.appendChild(li);
    li.setAttribute('index', i);
    //创建小圆圈的时候就给每个小圆圈创建点击事件  排他思想
    li.addEventListener('click', function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      this.className = 'current';
      //点击小圆圈。移动ul
      //ul的移动距离 是小圆圈的索引号 乘以图片的宽度
      var index = this.getAttribute('index');
      //点击了某个li 就把li 的索引号赋值给num 
      num = index;
      //点击了某个li 就把 li 的索引号赋值给circle 
      circle = index;
      animate(ul, -index * focusWidth);
    })
  }
  ol.children[0].className = 'current';
  //克隆第一张图片。放在最后面
  ul.appendChild(ul.children[0].cloneNode(true));
  //点击右侧按钮，图片移动
  var num = 0;
  //  circle 控制小圆圈的播放
  var circle = 0; //记录高亮小圆圈的索引
  var flag = true; //节流阀  防止事件触发过快
  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false; // 关闭节流阀
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //  点击右侧按钮，小圆圈跟着变换

      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  })

  // 左侧按钮
  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + 'px';
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //  点击左侧按钮，小圆圈跟着变换

      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  })
  //点击左右侧按钮 小圆圈变色
  function circleChange() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    ol.children[circle].className = 'current';
  }

  var timer = setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);



})