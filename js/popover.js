(function( $ ){

  $.fn.popover = function(options) {  
   // var settings = $.extend( { }, options);



	var setpos = function(elm,popover,pos){
	
			var popover_width = $(popover).outerWidth(true);
			var popover_height = $(popover).outerHeight(true);
			var elmpos = $(elm).position();
		    var elmwidth = $(elm).outerWidth(true);
			var elmheight = $(elm).outerHeight(true);
			
			var pp = {'top':0,'left':0};
			switch(pos){
				case 'top':
					pp = {'top':elmpos.top - popover_height,'left':(elmpos.left + (elmwidth / 2)) - (popover_width / 2) };
					break	
				case 'bottom':
					pp = {'top':elmpos.top + elmheight,'left':(elmpos.left + (elmwidth / 2)) - (popover_width / 2) };
					break
				case 'left':
					pp = {'top':(elmpos.top + (elmheight / 2)) - (popover_height / 2),'left':elmpos.left - popover_width};
					break
				case 'right':
					pp = {'top':(elmpos.top + (elmheight / 2)) - (popover_height / 2),'left':elmpos.left + elmwidth};
					break
			}
			$(popover).css(pp);
	}
	
	var show = function(elm,popover,pos){
			if ($(elm).hasClass('btn')){
				$(elm).addClass('active');
			} 
			$(popover).appendTo('body');
			setpos(elm,popover,pos);
			$(popover).removeClass('out').addClass('in');
	}
	
	var hide = function(elm,popover){
		
			$(popover).removeClass('in').addClass('out');
			$(elm).removeClass('active');
		
		
		    var s = document.body.style,
			supportsTransitions =  'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s || 'Transition' in s;
		  	if (supportsTransitions){
				$(popover).one("transitionend webkitTransitionEnd otransitionend", function(){ 
					$(this).remove();
				});
			}else{
				$(popover).remove();
			}
		
			
			
			

			
	}
	
    return this.each(function() {        
		
    	var data = $(this).data();
		var data_content = $(data['content']).html() ? $(data['content']).html() : data['content'];
		var data_title = data['title'] ? data['title'] : '';
		var data_class = data['class'] ? data['class'] : '';
		var data_pos = data['pos'] ? data['pos'] : 'top';
		
		var title = $('<div>')
					.addClass('popover-title')
					.html(data_title);
					
		var content = $('<div>')
					  .addClass('popover-content')
					  .html(data_content);
		
		var popover = $('<div class="popover" />')
						.addClass(data_class)
						.addClass(data_pos)
						.append(title)
						.append(content);

		var elm = this;
		$(window).resize(function(e) {
        	setpos(elm,popover,data_pos);
    	});
		
		$(elm).toggle(
		  function () {
			show(this,popover,data_pos);
	  	  }, 
		  function () {	
		    hide(this,popover);
		   }
		);
		
    });
	
  };
  
})( jQuery );



$(document).ready(function(){
	$('*[rel="popover"]').popover();	
});
	
	
	
