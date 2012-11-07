(function( $ ){

  $.fn.collapse = function(options) {  
   // var settings = $.extend( { }, options);

    return this.each(function() {        
		
    	var data = $(this).data();
		var data_target = $(data['target']);
		var data_group = data['group'];
		

		$(this).click(function() {
			if (data_target){
				
				if ($(data_target).hasClass('in')){
					$(this).removeClass('active');
					$(data_target).slideUp();
					$(data_target).removeClass('in').addClass('out');
				}else{
					$(this).addClass('active');
					$(data_target).slideDown();
					$(data_target).removeClass('out').addClass('in');
				}
				
			}  
		});


		
		
    });
	
  };
  
})( jQuery );

$(document).ready(function(){
	$('*[rel="collapse"]').collapse();	
});
	

