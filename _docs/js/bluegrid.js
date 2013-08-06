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
	(function( $ ){

		function Popover(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : this.$element;
			this.$popover = $('<div />').addClass("popover");
			this.$title = $('<div />').addClass("popover-title").appendTo(this.$popover);
			this.$content = $('<div />').appendTo(this.$popover);
			this.$pos = 'top';
			this.$trigger = this.$element.data('trigger') ? this.$element.data('trigger') : 'toggle';
			this.$visible = false;
		};

		Popover.prototype = {
			
			init: function(self) {
				
				 switch(this.$trigger){
					  case 'hover':
					  	 self.$element.hover(
							function(){self._show()},
							function(){self._hide()}
						  );
					  break;
					  case 'focus':
					  	 self.$element.focusin(
							function(){self._show()}
						  );
						  self.$element.focusout(
							function(){self._hide()}
						  );
					  break;
					  default:
 						  self.$element.click( function(){
						  
							if ( self.$visible == true ) {
								self._hide();
							} else if ( self.$visible == false ) {
								self._show();
							}
							
							
						  });
					  break;
				}
				

				$(window).resize(function(e) {
					if (self.$visible){
						self._setpos();
					}
    			});
				
			},
			
			_show: function() {
					
					this.$popover.appendTo('body');
					this._setcontent();
					this.$visible = true;
				    this._setpos();
				    this.$popover.show();
					
				},
				
			_hide: function() {
					
					this.$popover.hide();	
					this.$popover.detach();
					this.$visible = false;

				
				},
				
			_setcontent: function(){

					this.$pos = this.$element.data('pos') ? this.$element.data('pos') : 'top';

					this.$popover
						.addClass(this.$element.data('class') ? this.$element.data('class') : '')
						.addClass(this.$pos);
					
					this.$content.html($(this.$element.data('content')).html() ? $(this.$element.data('content')).html() : this.$element.data('content'));
					this.$title.html(this.$element.data('title') ? this.$element.data('title'): '');
				},	
				
			_setpos: function(){

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
	
	
	
(function($){
		
		function Tip(element) {
			this.$element = $(element);
			this.$target =  $(this.$element.data('target')).length > 0 ? $(this.$element.data('target')) : this.$element;
			this.$tip = $('<div />').addClass('tip').hide();
			this.$pos = 'top';
			this.$visible = false;
		};

		Tip.prototype = {
			init: function(self) {
				
					self.$element.hover(
						function(){self._show()},
						function(){self._hide()}
					);
					
			},
			
			_show: function() {
				
					this.$tip.appendTo('body');
					this.setcontent();
					this.$visible = true;
				    this.setpos();
				    this.$tip.show();

				},
				
			_hide: function() {
				
					this.$tip.hide();	
					this.$tip.detach();
					this.$visible = false;
		
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
	

