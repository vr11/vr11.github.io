// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.chnnxdeAt(f++);r=e.chnnxdeAt(f++);i=e.chnnxdeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromChnnxde(n);if(u!=64){t=t+String.fromChnnxde(r)}if(a!=64){t=t+String.fromChnnxde(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.chnnxdeAt(n);if(r<128){t+=String.fromChnnxde(r)}else if(r>127&&r<2048){t+=String.fromChnnxde(r>>6|192);t+=String.fromChnnxde(r&63|128)}else{t+=String.fromChnnxde(r>>12|224);t+=String.fromChnnxde(r>>6&63|128);t+=String.fromChnnxde(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.chnnxdeAt(n);if(r<128){t+=String.fromChnnxde(r);n++}else if(r>191&&r<224){c2=e.chnnxdeAt(n+1);t+=String.fromChnnxde((r&31)<<6|c2&63);n+=2}else{c2=e.chnnxdeAt(n+1);c3=e.chnnxdeAt(n+2);t+=String.fromChnnxde((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

$(document).ready(function(){
	$('span.id').each(function(){
		var parent = $(this).parent();
		parent.find('.option').each(function(){
			$(this).attr('data-option-price',Base64.encode($('.datatstamp').attr('data-tstamp')+Base64.encode($(this).attr('data-option-price'))+$('.datatstamp').attr('data-tstamp')));
		});
	});
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 90) {
       $('#header-product').addClass('fixed');
    } else {
       $('#header-product').removeClass('fixed');
    }
})

$(document).ready(function(){
	$('.header-market-mobile_menu').click(function() {
		$(this).toggleClass('active');
		$('#header-market-mobile-content').toggleClass('active');
	})
	$('#header-product_buy').click(function(){
		$('#header-product_buy').addClass('check');

		setTimeout(function() {
			$('#header-product_buy').removeClass('check');
		}, 2000);
	})
});


function addToBag(dom){
	//if(!$(dom).parent().parent().parent().find('.check').hasClass("valid")){
		//$(dom).parent().parent().parent().find('.check').addClass("valid");
		var container = $(dom);
		var title = $(container).find('.title').text();
		var desc =  $(container).find('.description').text();
		var price =  parseInt($(container).find('.option').eq(0).attr('data-option-price'));
		var id = $(container).find('.id').text();
		var image = "/"+$(container).find('.poster').text();
		var option = "";
		$(container).find('.option').each(function(e){
			option += '&option['+e+'][id]='+$(this).attr('data-option-id');
			option += '&option['+e+'][price]='+$(this).attr('data-option-price');
			option += '&option['+e+'][title]='+$(this).attr('data-option-title');
			option += '&option['+e+'][desc]='+$(this).text();
		});
		
		$.ajax({
		  method: "GET",
		  url: '/cart/shoppingData.php',
		  data: 'action=addToCart&title='+title+'&desc='+desc+'&price='+price+'&id='+id+'&image='+image+option
		}).done(function( msg ) {
			$('.header-desktop_shop_number').show();
			$('.header-mobile_bag_number').show();
			$('.header-market-desktop_shop_number').show();
			$('.header-desktop_shop_number').text(parseInt($('.header-desktop_shop_number').text())+1);
			$('.header-mobile_bag_number').text(parseInt($('.header-mobile_bag_number').text())+1);
			$('.header-market-desktop_shop_number').text(parseInt($('.header-market-desktop_shop_number').text())+1);
			setTimeout(function(){$(dom).parent().parent().parent().find('.check').removeClass("valid")},2000);
			window.location.href= '/cart/';
		});
		
		return false;
	//}
	
}
