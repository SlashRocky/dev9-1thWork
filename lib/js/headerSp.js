/******************************************************************
Site Name: project
Author: mt
******************************************************************/

$(function(){
	
	// SP drawer
	$(".drawer").drawer();

	// Sp dropdown-menu
	$(".topnav").accordion({
		accordion: true,
		speed: 500,
		closedSign: '<img class="img" src="/img_new/top/arrow_down_red.png" alt="" width="10px" height="10px" />',
		openedSign: '<img class="img" src="/img_new/top/arrow_up_red.png" alt="" width="10px" height="10px" />'
	});

	// Sp footer toggle
	var hlpLst = $(".lstWrapCol .lst");
	hlpLst.on("click",function(){
		$(this).children().stop(true,false).slideToggle(700,function(){
			//矢印画像変更
			if($(this).hasClass('open')){
				$(this).parent("li").css('background-image','url("/img_new/top/arrow_down_red.png")');
			}else{
				$(this).parent("li").css('background-image','url("/img_new/top/arrow_up_red.png")');
			}
			$(this).toggleClass('open');
		});	
	});

	function setTelDisable(){
		var $tel = $('[href^="tel:"]');
		$tel.attr('tabIndex', -1);
		$tel.on('click', function(e){
			if($(window).width() > 768){
				e.preventDefault();
			}
		});
	}
	setTelDisable();

});