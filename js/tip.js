(function($){
		
		function Tip(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : this.$element;
			this.$tip = $('<div />').addClass('tip').addClass('out');
			this.$pos = 'top';
			this.$visible = false;
		};

		Tip.prototype = {
			init: function(self) {
				
					self.$element.hover(
						function(){self.show()},
						function(){self.hide()}
					);
					
			},
			
			show: function() {
				
					this.$tip.appendTo('body');
					this.setcontent();
					this.$visible = true;
				    this.setpos();
				    this.$tip.addClass('in').removeClass('out').show();

				},
				
			hide: function() {
				
					this.$tip.addClass('out').removeClass('in');	
			
					var supptran = 'WebkitTransition' in document.body.style 
						|| 'MozTransition' in document.body.style 
						|| 'msTransition' in document.body.style 
						|| 'OTransition' in document.body.style 
						|| 'Transition' in document.body.style;
						
					if (supptran && this.$visible){
						this.$tip.one("transitionend webkitTransitionEnd otransitionend", function(){ 
							this.$visible = false;
							$(this).detach();
						});
					}else{
						this.$tip.detach();
						this.$visible = false;
					}

				
				},
				
			setcontent: function(){

					this.$pos = this.$element.data('pos') ? this.$element.data('pos') : 'top';
					this.$tip
						.addClass(this.$element.data('class') ? this.$element.data('class') : '')
						.addClass(this.$pos)
						.html($(this.$element.data('content')).html() ? $(this.$element.data('content')).html() : this.$element.data('content'));

				},	
				
			setpos: function(){
				
					var tip_width = this.$tip.outerWidth(true),
						tip_height = this.$tip.outerHeight(true),
						elmpos = this.$target.position(),
						elmwidth = this.$target.outerWidth(true),
						elmheight = this.$target.outerHeight(true),
						tp = {'top':0,'left':0};
				
					switch(this.$pos){
						case 'top':
							tp = {'top':elmpos.top - tip_height,'left':(elmpos.left + (elmwidth / 2)) - (tip_width / 2) };
							break	
						case 'bottom':
							tp = {'top':elmpos.top + elmheight,'left':(elmpos.left + (elmwidth / 2)) - (tip_width / 2) };
							break
						case 'left':
							tp = {'top':(elmpos.top + (elmheight / 2)) - (tip_height / 2),'left':elmpos.left - tip_width};
							break
						case 'right':
							tp = {'top':(elmpos.top + (elmheight / 2)) - (tip_height / 2),'left':elmpos.left + elmwidth};
							break
					}
					
					this.$tip.css(tp);
					
				}
		};	


		$.fn.tip = function() {
			  return this.each(function(){
					var element = $(this);
					if (element.data('tip')){ 
						return element.data('tip') 
					}else{
						var self = new Tip(this);
						self.init(self);
						element.data('tip', self);
					};
			  });
		};


})( jQuery );

$(document).ready(function(){
	$('*[rel="tip"]').tip();	
});
	

