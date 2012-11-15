(function( $ ){

  $.fn.tip = function(options) {  
    var settings = $.extend( {}, options);
		 
    return this.each(function() {        
		
		var data = $(this).data();
		var data_content = $(data['content']).html() ? $(data['content']).html() : data['content'];
		var data_class = data['class'] ? data['class'] : '';
		var data_pos = data['pos'] ? data['pos'] : 'top';
		var tip = $('<div class="tip" />')
			.addClass(data_class)
			.addClass(data_pos)
			.html(data_content).hide();
		
		$(this).hover(
		  function () {
			  
			if (data_content && data_content != '') { 
			 
				$(tip).appendTo('body');
				
				var tip_width = $(tip).outerWidth(true);
				var tip_height = $(tip).outerHeight(true);
				
				var elmpos = $(this).position();
				var elmwidth = $(this).outerWidth(true);
				var elmheight = $(this).outerHeight(true);
				
				var tp = {'top':0,'left':0};
				switch(data_pos){
					case 'top':
						tp = {'top':elmpos.top - tip_height,'left':(elmpos.left + (elmwidth / 2)) - (tip_width / 2) };
						break	
					case 'bottom':
						tp = {'top':elmpos.top + elmheight,'left':(elmpos.left + (elmwidth / 2)) - (tip_width / 2) };
						break
					case 'left':
						tp = {'top':(elmpos.top + (elmheight / 2)) - (tip_height / 2),'left':elmpos.left - tip_width};
						break
					case 'right':
						tp = {'top':(elmpos.top + (elmheight / 2)) - (tip_height / 2),'left':elmpos.left + elmwidth};
						break
				}
				
			 
				  $(tip).css(tp).addClass('in').removeClass('out').show();
			 };
			
		  }, 
		  function () {	
		  
		  	$(tip).addClass('out').removeClass('in');
		  
		 	var s = document.body.style,
			supportsTransitions =   'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s || 'Transition' in s;
		  	
			if (supportsTransitions){
				$(tip).one("transitionend webkitTransitionEnd otransitionend", function(){ 
					$(this).detach();
				});
			}else{
				$(tip).remove();
			}
			
			
			
		   }
		);

    });

  };
})( jQuery );

$(document).ready(function(){
	$('*[rel="tip"]').tip();	
});
	

