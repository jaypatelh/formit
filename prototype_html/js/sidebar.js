window.sidebar = {
	init: function(){
		var colors = d3.scale.category10();
		$(".add_dancer").click(function(){
			$(".footer_dancers").before("<li><input type='text' class='dancer_name_input'></input></li>");

			$(".dancer_name_input").focus();
			
			$(".dancer_name_input").keydown(function(e){
				var code = e.keyCode ? e.keyCode : e.which;
				if(code == 13){
					var dancer_name = this.value;
					$(".footer_dancers").before("<li><a href='#'>" + dancer_name + "</a></li>")
					this.remove();
				}
			});
		});

		var color_list = "<table width='100%' height='250px' class='table_of_colors'>";
		for(var i=0;i<10;i++){
			var color_item = "<tr><td bgcolor='" + colors(i) + "'></td><input type='hidden' value='" + i + "'></input></tr>";
			color_list += color_item;
		}
		color_list += "</table>";

		$(".blocks").append("<li>" + color_list + "</li>");

		$(".table_of_colors td").click(function(){
			var val = $(this).siblings("input").val();
			$(this).css({
				'border': '5px solid',
				'border-color': 'black',
			});
			
			formation.colorSelected(val);
		});
	}
}

$(document).ready(function(){
	sidebar.init();
});