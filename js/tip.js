(function($){
		
		function Tip(element) {
			this.$element = $(element);
			this.$target = $(this.$element).data('target') ? $(this.$element).data('target') : this.$element;
			this.$tip = $('<div class="tip" />').addClass('out');
			this.$pos = 'top';
		};

		Tip.prototype = {
			init: function(self) {
				var elm = self.$element;
				$(elm).hover(
					function(){self.show()},
					function(){self.hide()}
				);
			},
			
			show: function() {
				
					$(this.$tip).appendTo('body');
					this.setcontent();
				    this.setpos();
				    $(this.$tip).addClass('in').removeClass('out').show();
					this.setpos();

				},
				
			hide: function() {
					$(this.$tip).addClass('out').removeClass('in').detach();
				},
				
			setcontent: function(){

					this.$pos = $(this.$element).data('pos') ? $(this.$element).data('pos') : 'top';

					$(this.$tip)
					.addClass( $(this.$element).data('class') ? $(this.$element).data('class') : '')
					.addClass(this.$pos)
					.html($($(this.$element).data('content')).html() ? $($(this.$element).data('content')).html() : $(this.$element).data('content'));

				},	
				
			setpos: function(){
				
					var tip_width = $(this.$tip).outerWidth(true),
						tip_height = $(this.$tip).outerHeight(true),
						elmpos = $(this.$target).position(),
						elmwidth = $(this.$target).outerWidth(true),
						elmheight = $(this.$target).outerHeight(true),
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
					
					$(this.$tip).css(tp);
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
						element.data('Tip', self);
					};
			  });
		};


})( jQuery );

$(document).ready(function(){
	$('*[rel="tip"]').tip();	
});
	

