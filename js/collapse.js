(function( $ ){

  $.fn.collapse = function(options) {  
   // var settings = $.extend( { }, options);

    return this.each(function() {        
		
    	var data = $(this).data();
		var data_target = $(data['target']);
		var data_group = data['group'];

		
		
    });
	
  };
  
})( jQuery );

$(document).ready(function(){
	$('*[rel="collapse"]').collapse();	
});
	

