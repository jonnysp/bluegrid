

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
			  
			var tip_width = $(tip).width();
			var tip_height = $(tip).height();
			
			var elmpos = $(this).position();
			
			var tp = {'top':0,'left':0};
			
			$(tip).css(tp).show();
			

				
			
			
		  }, 
		  function () {	$(tip).hide(); }
		);

		
      
	  
    });

  };
})( jQuery );

$(document).ready(function(){
	$('*[rel="tip"]').tip();	
});
	

