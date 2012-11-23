(function( $ ){

		function Modal(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : $(this.$element.data('target'));
			this.$close =   $(this.$element.data('close')).length > 0 ? $(this.$element.data('close')) : $(this.$element.data('close'));

			if (this.$target.length > 0){
				this.$target.data('backdrop', $('<div />').addClass('modal-backdrop').addClass('out') );
			}

			this.$class = this.$element.data('class') ? this.$element.data('class') : '';
			this.$transition = this.$element.data('transition') ? this.$element.data('transition') : '';
			
		};



	Modal.prototype = {
		
			init: function(self) {
					
					self.$target.addClass(self.$class).addClass(self.$transition);

						self.$element.click(function(){
							self.show();
						});
						
						if (self.$target.length > 0){
							self.$target.data('backdrop').click(function(){
								self.hide();
							});	
						}

			},
			
			show: function() {
				
					if (this.$target.length > 0){
						this.$target.data('backdrop').appendTo('body').addClass('in');
						this.$target.addClass('in');
					}
					this.closer()
					
			},
			
			hide: function() {
					if (this.$target.length > 0){
						this.$target.data('backdrop').removeClass('in');
						this.$target.removeClass('in');
					}
				    
			},
			
			closer:function(){
				
				if (this.$close.length > 0 && this.$close != this.$target){
						this.$close.data('backdrop').removeClass('in');
				    	this.$close.removeClass('in');
					}
				
			}

	}


	  $.fn.modal = function() {
			return this.each(function(){
				  var element = $(this);
				  if (element.data('modal')){ 
					  return element.data('modal') 
				  }else{
					  var self = new Modal(this);
					  self.init(self);
					  element.data('modal', self);
				  };
			});
	  };


})( jQuery );

$(document).ready(function(){
  var modals = $('*[rel="modal"]').modal();	
});
	