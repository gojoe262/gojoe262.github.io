$('#recentWork li a').click(function() {

	var $this = $(this);

	if ( !$this.parent('li').hasClass('chosen') ) {

		var url = this.href,
			height = $('.image_display img').css('height');

		$this
		  .parents('ol')
		  .find('li.chosen')
		  	.removeClass('chosen');

		$this.parent('li').addClass('chosen');
		
		$('.image_display')
		  .css('height', height)
		  .children('img')
		  	.fadeOut(400, function() {
				$(this).attr('src', url).load(function() {
					$(this).fadeIn(400);
				});
				
			$this.parents('#recentWork')
			  .find('p:last')
			  	.empty()
				.html('<p>' + $this.attr('title') + '</p>');
		});
		
	}
	
	return false;
	
});