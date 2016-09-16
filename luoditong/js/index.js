// slide
$(function(){
  var $slide = $('#slide');
  var $slide_next = $slide.children('.next');
  var $slide_prev = $slide.children('.prev');
  var $slide_navs = $slide.find('ol li');
  var $slide_ul   = $slide.children('ul');
  var index = 0;   //当前角标的索引值
  var timer;

  // 向后按钮
  $slide_next.click(function(event) {
    // 函数截流
    if($slide_ul.is(':animated')){
      return ;
    }

    if(index < $slide_navs.length - 1){
      index++;
      //角标的工作
      $slide_navs.eq(index).addClass('cur').siblings().removeClass('cur');

      //图片的工作
      $slide_ul.animate({left:'-' + (index + 1) + '00%'}, 500);
    }else{   //如果最后一个图片的时候
      //角标的工作
      $slide_navs.eq(0).addClass('cur').siblings().removeClass('cur');

      //图片的工作
      index++;
      $slide_ul.animate({left:'-' + (index + 1) + '00%'}, 500, 'swing', function(){
        $slide_ul.css({left:'-100%'});
        index = 0;
      });
    }
  });

  // 向前按钮
  $slide_prev.click(function(event) {
    // 函数截流
    if($slide_ul.is(':animated')){
      return ;
    }

    if(index > 0){
      index--;
      //角标的工作
      $slide_navs.eq(index).addClass('cur').siblings().removeClass('cur');

      //图片的工作
      $slide_ul.animate({left:'-' + (index + 1) + '00%'}, 500);
    }else{  //如果当前图片是第一个
      //角标的工作
      $slide_navs.eq($slide_navs.length - 1).addClass('cur').siblings().removeClass('cur');

      //图片的工作
      index--;
      $slide_ul.animate({left:'-' + (index + 1) + '00%'}, 500, 'swing', function(){
        index = $slide_navs.length - 1;
        $slide_ul.css({left:'-500%'});
      });
    }
  });

  // 当点击角标的时候
  $slide_navs.mouseenter(function(event) {
    if(index == 0 && $(this).index() == $slide_navs.length - 1){ /*如果原来是第一个，单击的是最后一个，就相当于单击了向前按钮*/
      $slide_prev.click();
    }else if(index == $slide_navs.length - 1 && $(this).index() == 0){  /*如果原来是最后一个，单击的是第一个，就相当于单击了向后按钮*/
      $slide_next.click();
    }else{
      index = $(this).index();

      //角标的工作
      $slide_navs.eq(index).addClass('cur').siblings().removeClass('cur');

      //图片的工作
      $slide_ul.animate({left:'-' + (index + 1) + '00%'}, 500);
    }
  });

  // 自动播放
  clearInterval(timer);
  timer = setInterval(function(){
    // 相当于，每个一段时间触发了向后按钮
    $slide_next.click();
  }, 3000);

  $slide.mouseenter(function(event) {
    clearInterval(timer);

    $slide_next.show();
    $slide_prev.show();
  }).mouseleave(function(event) {
    // 自动播放
    clearInterval(timer);
    timer = setInterval(function(){
      // 相当于，每个一段时间触发了向后按钮
      $slide_next.click();
    }, 3000);

    $slide_next.hide();
    $slide_prev.hide();
  });
});