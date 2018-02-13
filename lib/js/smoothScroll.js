$(function(){
	//smooth scroll
	// ★　任意のズレ高さピクセル数を入力　↓
	var headerHight = 0;
	// #で始まるアンカーをクリックした場合に処理
	jQuery('a[href^=#]').click(function() {
		// スクロールの速度
		var speed = 500; // ミリ秒
		// アンカーの値取得
		var href= jQuery(this).attr("href");
		// 移動先を取得
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top-headerHight; // ※　-headerHightでズレの処理
		// スムーズスクロール
		jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
});