$(document).ready(function(){
	sidebar.init();
	dance.init();
	$('#delete').on('click', function(){
		dance.removeSelected();
	});
	$('#previous').on('click', function(){
		dance.previousFormation();
	});
	$('#next').on('click', function(){
		dance.nextFormation();
	})
});