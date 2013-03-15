$(document).ready(function(){
	sidebar.init();
	dance.init();
	dance.addVerticalLines();
	dance.addHorizontalLines();

	if(dance.atBeginning()) $('#previous').addClass('disabled');
	$('#delete').on('click', function(){
		dance.removeSelected();
	});
	$('#next').hammer().on('tap', function(){
		dance.newFormation();
		//dance.nextFormation();
		dance.deselectAll();
		
		$('#next').before("<img class='thumb' src='http://placehold.it/115x82'/>");
		var children = $('.thumbnail_container').children('.thumb');
		children.removeClass('selected_thumb');
		$('#next').prev().addClass('selected_thumb');
		$('#formation_number').html(dance.formations.length - 1);
	});
	$('svg').hammer().on('swipeleft', function(){
		// go to next formation if it exists, else create new formation
		var bool = dance.nextFormation();
		dance.deselectAll();
		// ADD THUMBNAIL TO TIMELINE - only in case nextFormation calls newFormation
		if(!bool && dance.atEnd()) {
			// add thumbnail to timeline
			$('#next').before("<img class='thumb' src='http://placehold.it/115x82'/>");

			// make thumbnail selected
			var children = $('.thumbnail_container').children('.thumb');
			children.removeClass('selected_thumb');
			$('#next').prev().addClass('selected_thumb');
		}
		$('#formation_number').html(dance.f_id + 1);
	});
	$('svg').hammer().on('swiperight', function(){
		dance.previousFormation();
		dance.deselectAll();
		if(dance.atBeginning()) $(this).addClass('disabled');
		$('#formation_number').html(dance.f_id + 1)
	});
	$('.timeline').hammer().on('tap', '.thumb', function(){
		var curr_thumb = $(this);
		var index = curr_thumb.parent().children('.thumb').index(curr_thumb);
		console.log("showing index " + index);
		dance.showFormation(index);
	});
});