(function( $ ){

  $.fn.popover = function(options) {  
    var settings = $.extend( { }, options);
		 
    return this.each(function() {        
		
    	var data = $(this).data();
		var data_content = $(data['content']).html() ? $(data['content']).html() : data['content'];
		var data_title = data['title'] ? data['title'] : '';
		var data_class = data['class'] ? data['class'] : '';
		var data_pos = data['pos'] ? data['pos'] : 'top';
		
		var title = $('<div>').addClass('popover-title').html(data_title);
		var content = $('<div>').addClass('popover-content').html(data_content);
		
		var popover = $('<div class="popover" />')
			.addClass(data_class)
			.addClass(data_pos)
			.append(title)
			.append(content)
			.hide();

		
		$(this).toggle(
		  function () {
			 
			if ($(this).hasClass('btn')){
				$(this).addClass('active');
			} 
			  
			$(popover).insertAfter(this);
			
			var popover_width = $(popover).outerWidth(true);
			var popover_height = $(popover).outerHeight(true);
			
			var elmpos = $(this).position();
		    var elmwidth = $(this).outerWidth(true);
			var elmheight = $(this).outerHeight(true);
			
			var pp = {'top':0,'left':0,'display':'none'};
			switch(data_pos){
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
		
			$(popover).css(pp).show();
			
	  }, 
		  function () {	
		  	$(popover).remove();
			$(this).removeClass('active');
		   }
		);

    });

  };
})( jQuery );

$(document).ready(function(){
	$('*[rel="popover"]').popover();	
});
	

