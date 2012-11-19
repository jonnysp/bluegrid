(function( $ ){

		function Popover(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : this.$element;
			this.$popover = $('<div />').addClass("popover").addClass('out');
			this.$title = $('<div />').addClass("popover-title").appendTo(this.$popover);
			this.$content = $('<div />').addClass("popover-content").appendTo(this.$popover);
			this.$pos = 'top';
			this.$trigger = this.$element.data('trigger') ? this.$element.data('trigger') : 'toggle';
			this.$visible = false;
		};

		Popover.prototype = {
			
			init: function(self) {
				
				 switch(this.$trigger){
					  case 'hover':
					  	 self.$element.hover(
							function(){self.show()},
							function(){self.hide()}
						  );
					  break;
					  case 'focus':
					  	 self.$element.focusin(
							function(){self.show()}
						  );
						  self.$element.focusout(
							function(){self.hide()}
						  );
					  break;
					  default:
						  self.$element.toggle(
							function(){self.show()},
							function(){self.hide()}
						  );
					  break;
				}
				

				$(window).resize(function(e) {
					if (self.$visible){
						self.setpos();
					}
    			});
				
			},
			
			show: function() {
					
					this.$popover.appendTo('body');
					this.setcontent();
					this.$visible = true;
				    this.setpos();
				    this.$popover.addClass('in').removeClass('out').show();
					
				},
				
			hide: function() {
					
					this.$popover.addClass('out').removeClass('in');	
			
					var supptran = 'WebkitTransition' in document.body.style 
						|| 'MozTransition' in document.body.style 
						|| 'msTransition' in document.body.style 
						|| 'OTransition' in document.body.style 
						|| 'Transition' in document.body.style;
						
					if (supptran && this.$visible){
						this.$popover.one("transitionend webkitTransitionEnd otransitionend", function(){ 
							$(this).detach();
							this.$visible = false;
						});
					}else{
						this.$popover.detach();
						this.$visible = false;
					}

				
				},
				
			setcontent: function(){

					this.$pos = this.$element.data('pos') ? this.$element.data('pos') : 'top';

					this.$popover
						.addClass(this.$element.data('class') ? this.$element.data('class') : '')
						.addClass(this.$pos);
					
					this.$content.html($(this.$element.data('content')).html() ? $(this.$element.data('content')).html() : this.$element.data('content'));
					this.$title.html(this.$element.data('title') ? this.$element.data('title'): '');
				},	
				
			setpos: function(){

					  var pop_width = this.$popover.outerWidth(true),
						  pop_height = this.$popover.outerHeight(true),
						  elmpos = this.$target.position(),
						  elmwidth = this.$target.outerWidth(true),
						  elmheight = this.$target.outerHeight(true),
						  pp = {'top':0,'left':0};
				  
					  switch(this.$pos){
						  case 'top':
							  pp = {'top':elmpos.top - pop_height,'left':(elmpos.left + (elmwidth / 2)) - (pop_width / 2) };
							  break	
						  case 'bottom':
							  pp = {'top':elmpos.top + elmheight,'left':(elmpos.left + (elmwidth / 2)) - (pop_width / 2) };
							  break
						  case 'left':
							  pp = {'top':(elmpos.top + (elmheight / 2)) - (pop_height / 2),'left':elmpos.left - pop_width};
							  break
						  case 'right':
							  pp = {'top':(elmpos.top + (elmheight / 2)) - (pop_height / 2),'left':elmpos.left + elmwidth};
							  break
					  }
					  
					  this.$popover.css(pp);
			 }
		};	


		$.fn.popover = function() {
			  return this.each(function(){
					var element = $(this);
					if (element.data('popover')){ 
						return element.data('popover') 
					}else{
						var self = new Popover(this);
						self.init(self);
						element.data('popover', self);
					};
			  });
		};


})( jQuery );



$(document).ready(function(){
	$('*[rel="popover"]').popover();	
});
	
	
	
