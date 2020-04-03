var $banner = (function () {
    //轮播图前端页面
    var index = 1;
    var $div = $(''
        + '<div class="slider" id="slider">'
        + '<div class="slide">'
        + '<img src="img/b5.png" alt="">'
        + '</div>'
        + '<div class="slide">'
        + '<img src="img/b1.png" alt="">'
        + '</div>'
        + '<div class="slide">'
        + '<img src="img/b2.png" alt="">'
        + '</div>'
        + '<div class="slide">'
        + '<img src="img/b3.png" alt="">'
        + '</div>'
        + '<div class="slide">'
        + '<img src="img/b4.png" alt="">'
        + '</div>'
        + '<div class="slide">'
        + '<img src="img/b5.png" alt="">'
        + '</div>'
        + '<div class="slide">'
        + '<img src="img/b1.png" alt="">'
        + '</div>'
        + '</div>'
        + '<span id="left">' + '<' + '</span>'
        + '<span id="right">></span>'
        + '<ul class="nav" id="navs">'
        + '<li class="active">1</li>'
        + '<li>2</li>'
        + '<li>3</li>'
        + '<li>4</li>'
        + '<li>5</li>'
        + '</ul>'
    )

    function show(id) {
        //首先将页面加在主页div中
        var $box = $(id);
        $box.append($div);

        //初始值设置
        var onload, timer;
        //获取元素      
        var slider = document.getElementById('slider');
        var left = document.getElementById('left');
        var right = document.getElementById('right');
        var oNavlist = document.getElementById('navs').children;
        //获取css元素的样式值考虑兼容性
        function getStyle(obj, style) {
            if (getComputedStyle(obj)) {
                return getComputedStyle(obj)[style];
            } else {
                obj.currentStyle[style];
            }
        }
     
        

        //鼠标划过时两边的点击按钮出现
        $box.mouseenter(function () {
            left.style.opacity = 0.7;
            right.style.opacity = 0.7;
            clearInterval(onload)
        })
        $box.mouseleave(function () {
            left.style.opacity = 0;
            right.style.opacity = 0;
            onload = setInterval(next, 2500)

        })


        //封装函数实现图片轮播
        //time--轮播切换的时长
        //index--轮播的个数和每次div的left值进行相乘以便变化Left值
        //callback作为回调函数传入  可以随机更改index轮播对应值
        function lunbo(time,index, callback) {
            clearInterval(timer);
            timer = setInterval(function () {
                var isStop = true;
                var width = parseInt(getStyle(slider, 'left'));
                //当点击的时候速度就会相应变快 比值变大  才能实现快速跳转
                var speed = (-1200 * index - width) / 20;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                //console.log(speed)
                var now = width -10;
                if (-1200 * index !== now+10) {
                    isStop = false;
                }
                slider.style.left = width + speed + 'px';
                if (isStop) {
                    clearInterval(timer)
                    callback && callback();
                }
            }, time)
        }
        //页面一加载进行轮播
        onload = setInterval(next, 2500)

        //右箭头、向右轮播
        function next() {
            index++;
            navChange();
            lunbo(10,index, function () {
                if (index == 6) {
                    slider.style.left = '-1200px';
                    index = 1;
                }
            })
        }
        //左箭头、向左轮播
        function prev(){
            index--;
            navChange();
            lunbo(10,index, function () {
                if (index == 0) {
                    slider.style.left = '-6000px';
                    index = 5;
                }
            })
        }

        //随着图片的滑动，小按钮的样式跟着改变
        function navChange() {
            for (var i = 0; i < oNavlist.length; i++) {
                oNavlist[i].className = '';
            };
            if (index == 6) {
                oNavlist[0].className = 'active';
            } else if (index == 0) {
                oNavlist[4].className = 'active';
            } else {
                oNavlist[index - 1].className = 'active';
            }
        }

        //左箭头点击事件
        left.onclick =prev;

        //右箭头点击事件
        right.onclick = next;

        //点击小按钮，让图片滑动到对应的位置
        for(var i = 0;i<oNavlist.length;i++){
            oNavlist[i].idx = i;
            oNavlist[i].onclick = function(){
                index = this.idx + 1;
                lunbo(10,index)
                navChange();
            }
        }
    }
    return { show: show };
}());
