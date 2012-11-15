(function( $ ){

  $.fn.modal = function(options) {  
    var settings = $.extend( {}, options);
	
	var modalclose = function(that) {
			if ($(that).data('close') ){
				$($(that).data('close')).removeClass('in').addClass('out');
				if ($(that).data('target')){
					$($($(that).data('target'))).each(function(index, element) {
                        $(this).removeClass('active');
						var backd = $($(this).data('backdrop'));
						$(backd).removeClass('in').addClass('out');
                    });
				}
			}else{
				if ($(that).data('target')){
					$(that).removeClass('active');
					$($(that).data('target')).removeClass('in').addClass('out');
					$($(that).data('backdrop')).removeClass('in').addClass('out');
				}
			}
	} ;
	
	var modalshow = function(that){
		  if ($(that).data('target')){
				if (!$($(that).data('target')).hasClass('in')){
					$(this).addClass('active');
					$($(that).data('backdrop')).appendTo('body').addClass('in').removeClass('out');
					$($(that).data('target')).removeClass('out').addClass('in');
				}
		   }  
	};
 
    return this.each(function() {        
		
		var that = $(this);
    	var data = $(that).data();
		var data_target = data['target'];
		var data_transition = data['transition'];
		var data_class = data['class'];
		var data_close = data['close'];
		

		if (data_target && data_transition){
			$(data_target).addClass(data_transition);
		}
		if (data_target && data_class){
			$(data_target).addClass(data_class);
		}


		if (data_close){
			$(that).data('target',$('*[data-target="'+ data_close +'"]')) ;
			$(that).click(function() {
				modalclose(that);
			});
		}else{
			var backdrop =  $('<div class="modal-backdrop" />').addClass('out');
			$(that).data('backdrop',backdrop) ;
			$(backdrop).click(function() {
				modalclose(that);
			})
			$(that).click(function() {
				modalshow(that);
			});
		}

    });
	
  };
  
})( jQuery );

$(document).ready(function(){
  var modals = $('*[rel="modal"]').modal();	
});
	