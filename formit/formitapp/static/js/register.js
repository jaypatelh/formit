$(document).ready(function(){
	$("#submit_btn").click(function(){
		var username = $("#id_username").val();
		var password = $("#id_password").val();
		$.post("register_user", {username: username, password: password}, function(data){
			console.log(data);
		});
	});
});