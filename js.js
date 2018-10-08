
// 定时器 --- 自动播放
var timer = null;
function autoPlay(wrap) {
    timer = setInterval(function () {
        next_pic(wrap);
    }, 5000);
}

// 圆点导航
var index = 0;
var dots = document.getElementsByTagName("span");
var alts = document.getElementsByTagName('img');
// 显示当前是第几张图片
function showCurrentDot(wrap) {
    for (var i = 0, len = dots.length; i < len; i++) {
        dots[i].className = "";
    }
    dots[index].className = "on";
}
//最开始和最后的照片修整
for (var i = 0, len = dots.length; i < len; i++) {
    console.log('len='+len);
    (function (i) {
        var wrap = document.querySelector(".wrap");
        dots[i].onclick = function () {
            var dis = index - i;
            // if (index == 4 /*&& parseInt(wrap.style.left) !== -2000 */){
            //     dis = dis - 4;
            // }
            // if (index == 0 /*&& parseInt(wrap.style.left) !== 0*/) {
            //     dis = 4 + dis;
            // }
            wrap.style.left = (parseInt(wrap.style.left) + dis * 500) + "px";
            index = i;
            showCurrentDot(wrap);

        }
    })(i);//(function (i) {})();直接调用函数，与匿名函数相似
}
console.log(index);
function next_pic(wrap) {
    console.log(index);
    index++;
    if(index>4){
        index=0;
    }
    document.getElementById('alt').innerHTML = alts[index].alt;
    showCurrentDot(wrap);
    var newleft;
    if(wrap.style.left ==="-2000px"){
        newleft = 0;
    }else{
        newleft = parseInt(wrap.style.left)-500;
    }
    console.log(wrap.style.left);
    wrap.style.left = newleft + "px";
}
function prev_pic(wrap) {
    index--;
    if (index < 0) {
        index = 4;
    }
    document.getElementById('alt').innerHTML = alts[index].alt;
    showCurrentDot(wrap);
    var newLeft;
    if (wrap.style.left === "0px") {
        newLeft = -2000;
    } else {
        newLeft = parseInt(wrap.style.left) + 500;
    }
    wrap.style.left = newLeft + "px";
}
function init() {
    var wrap = document.querySelector(".wrap");//querySelector，选中带有此标签的第一个元素
    var next = document.querySelector(".right");
    var prev = document.querySelector(".left");
    // 当鼠标点击上下箭头
    next.onclick = function () {
        next_pic(wrap);
    }
    prev.onclick = function () {
        prev_pic(wrap);
    }
    //启动定时器
    autoPlay(wrap);
    // 鼠标滑过 取消自动播放
    var container = document.querySelector(".container");
    container.onmouseenter = function () {//onmouseenter,当鼠标位于元素之上时触发事件
        clearInterval(timer);
    }
    container.onmouseleave = function () {//onmouseleave,鼠标离开时触发事件
        autoPlay(wrap);
    }
}
window.addEventListener('load', init, false);
