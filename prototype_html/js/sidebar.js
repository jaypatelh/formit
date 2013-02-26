window.sidebar = {
	init: function(){
		$(".add_dancer").click(function(){
			$(".footer_dancers").before("<li><input type='text' class='dancer_name_input'></input></li>");

			$(".dancer_name_input").focus();
			
			$(".dancer_name_input").keydown(function(e){
				var code = e.keyCode ? e.keyCode : e.which;
				if(code == 13){
					var dancer_name = this.value;
					$(".footer_dancers").before("<li><a href='#'>" + dancer_name + "</a><input type='hidden' value='" + dancer_name + "'></input></li>");
					$(".footer_dancers").prev().click(function(){
						var name = $(this).find("input").val();
						console.log("selected dancer name: " + name);
						formation.nameSelected(name);
					});
					this.remove();
				}
			});
		});

		var color_list = "<table width='100%' class='table_of_colors'>";
		for(var i=0;i<5;i++){
			var color_item = "<tr><td height='25px' bgcolor='" + colors(i) + "' style='border:none'></td><input type='hidden' value='" + i + "'></input></tr>";
			color_list += color_item;
		}
		color_list += "</table>";

		$(".blocks").append("<li>" + color_list + "</li>");

		$(".table_of_colors td").click(function(){
			var val = $(this).siblings("input").val();
			$(".table_of_colors td").css({
				'border': 'none',
				'height': '25px',
				'width': '100%'
			});

			$(this).css({
				'border': '3px solid',
				'border-color': 'black',
			});

			console.log("selected color: " + val);
			formation.colorSelected(parseInt(val));

			/*if(formation.colorSelected(val) == true){
				$(".table_of_colors td").css({
					'border': 'none',
					'height': '25px',
					'width': '100%'
				});
			}*/
		});
	}
}

$(document).ready(function(){
	sidebar.init();
});