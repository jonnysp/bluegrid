(function( $ ){

		function Modal(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : $(this.$element.data('target'));
			this.$close =   $(this.$element.data('close')).length > 0 ? $(this.$element.data('close')) : $(this.$element.data('close'));

		};

	Modal.prototype = {
		
			init: function(self) {
						self.$element.click(function(){
							self.show();
						});
						if (self.$target.length > 0){
							self.$target.click(function(event){
								if ($(event.target).is(this) || $(event.target).is(self.$element)){
									self.hide(self.$target);
								}
							});	
						};
						
			},
			
			show: function() {
					if (this.$target.length > 0){
						this.$target.addClass('in');
						this.hide(this.$close);
					}
			},
			
			hide: function(elm) {
				if (elm.length > 0){
					elm.removeClass('in');
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
	