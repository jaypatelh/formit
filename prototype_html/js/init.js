$(document).ready(function(){
	sidebar.init();
	dance.init();
	dance.addVerticalLines();
	dance.addHorizontalLines();

	if(dance.atBeginning()) $('#previous').addClass('disabled');
	$('#delete').on('click', function(){
		dance.removeSelected();
	});
	$('#previous').on('click', function(){
		dance.previousFormation();
		dance.deselectAll();
		if(dance.atBeginning()) $(this).addClass('disabled');
		$('#next').addClass('btn-primary').removeClass('btn-success')
			.find('i').removeClass('icon-plus').addClass('icon-forward');
		$('#formation_number').html(dance.f_id + 1)
	});
	$('#next').on('click', function(){
		dance.nextFormation();
		dance.deselectAll();
		$('#previous').removeClass('disabled');
		if(dance.atEnd()) {
			$('#next').before("<img class='thumb' src='http://placehold.it/115x82'/>");
		}
		$('#formation_number').html(dance.f_id + 1)
	});
	$('svg').hammer().on('swipeleft', function(){
		dance.nextFormation();
		dance.deselectAll();
		$('#previous').removeClass('disabled');
		if(dance.atEnd()) $('#next').removeClass('btn-primary').addClass('btn-success')
			.find('i').removeClass('icon-forward').addClass('icon-plus');
		$('#formation_number').html(dance.f_id + 1)
/*		if(dance.atEnd()) {
			$('#next').before("<img class='thumb' src='http://placehold.it/115x82'/>");
		}
		$('#formation_number').html(dance.f_id + 1);*/
	});
	$('svg').hammer().on('swiperight', function(){
		dance.previousFormation();
		dance.deselectAll();
		if(dance.atBeginning()) $(this).addClass('disabled');
		$('#next').addClass('btn-primary').removeClass('btn-success')
			.find('i').removeClass('icon-plus').addClass('icon-forward');
		$('#formation_number').html(dance.f_id + 1)
	});
	$('.thumb').on('click', function(){
		var curr_thumb = $(this);
		var index = curr_thumb.parent().children('.thumb').index(curr_thumb);
		dance.showFormation(index);
	});
});