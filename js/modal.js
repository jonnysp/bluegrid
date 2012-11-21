(function( $ ){

		function Modal(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : $(this.$element.data('target'));
			
			
			this.$isclose = this.$element.data('close') ? true : false;
			if (this.$isclose === true){
				this.$target = $(this.$element.data('close')).length > 0 ? $(this.$element.data('close')) : $(this.$element.data('close'));
			}else{
				this.$target.data('backdrop', $('<div />').addClass('modal-backdrop').addClass('out') );
				this.$class = this.$element.data('class') ? this.$element.data('class') : '';
				this.$transition = this.$element.data('transition') ? this.$element.data('transition') : '';
			}
			
		};



	Modal.prototype = {
		
			init: function(self) {
					
					self.$target.addClass(self.$class).addClass(self.$transition);
					if (self.$isclose === true){
						
						self.$element.click(function(){
							self.hide()
						});
						
					}else{
						
						self.$element.click(function(){
							self.show()
						});
						self.$target.data('backdrop').click(function(){
							self.hide()
						});	
					}
					
					
			},
			
			show: function() {
				
					this.$target.data('backdrop').appendTo('body').addClass('in').removeClass('out');
					this.$target.removeClass('out').addClass('in');
					
			},
			
			hide: function() {
			
					this.$target.data('backdrop').removeClass('in').addClass('out');
				    this.$target.removeClass('in').addClass('out');
					
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
	