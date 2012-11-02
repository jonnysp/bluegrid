

(function( $ ){

  $.fn.tip = function(options) {  

    var settings = $.extend( { }, options);

    return this.each(function() {        
		
		var elm = this;
		var data = $(elm).data();
		var data_class = data['class'] ? data['class'] : '';
		var data_title = data['title'] ? data['title'] : '';
		var data_target = data['target'] ? data['target'] : 'top';
		
		var tip = $('<div class="tip '+ data_class +'" >'+ data_title +'</div>').addClass(data_target).hide();
		$(tip).insertAfter(this);

		$(elm).hover(
		  function () {
			  
			var tip_width = $(tip).outerWidth();
			var tip_height = $(tip).outerHeight();
			
			var elmpos = $(this).position();
		    var elmwidth = $(this).outerWidth();
			var elmheight = $(this).outerHeight();
			
			var padding = 5;		
							
			var tp = {'top':0,'left':0};
			
			switch(data_target){
				case 'top':
					tp = {'top':elmpos.top - tip_height - padding,'left':(elmpos.left + (elmwidth / 2)) - (tip_width / 2) };
					break	
				case 'bottom':
					tp = {'top':elmpos.top + elmheight + padding,'left':(elmpos.left + (elmwidth / 2)) - (tip_width / 2) };
					break
				case 'left':
					tp = {'top':(elmpos.top + (elmheight / 2)) - (tip_height / 2),'left':elmpos.left - tip_width - padding };
					break
				case 'right':
					tp = {'top':(elmpos.top + (elmheight / 2)) - (tip_height / 2),'left':elmpos.left + elmwidth + padding };
					break
			}
			
			
			
			
			$(tip).css(tp).show();
			

				
			
			
		  }, 
		  function () {	
		  	$(tip).hide();
		   }
		);

		
      
	  
    });

  };
})( jQuery );

$(document).ready(function(){
	$('*[rel="tip"]').tip();	
});
	

