var $ = require('jquery');

$(function(){
	
	$('#getdata').on('click', function(){

		$.ajax({
			type: 'get',
			url: '/pros',
			success(data){
				console.log(data);
			}
		});
	});

});