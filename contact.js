	function callback(txt) {
		$("#contact").text("Thank you "+$("#name_nnx").val()+" for contacting us. We will get back to you soon...");
	}
	
	function postform(event) {
		var fields = {
			name_nnx:document.getElementById("contactForm").elements["name_nnx"].value,
			email_nnx:document.getElementById("contactForm").elements["email_nnx"].value,
			affiliation_nnx:document.getElementById("contactForm").elements["affiliation_nnx"].value,
			message_nnx:document.getElementById("contactForm").elements["message_nnx"].value
		};
		
		$.post( "contact.php", fields)
			.done(function( data ) {
				callback(data);
		});
	}
	
	$( "#contact_us" ).click(function(event) {	
//		$( "#contact" ).text($("#name_nnx").val());
		
		var fields = {
			name_nnx:$("#name_nnx").val(),
			email_nnx:$("#email_nnx").val(),
			affiliation_nnx:$("#affiliation_nnx").val(),
			message_nnx:$("#message_nnx").val()
		};
		
		$.post( "contact.php", fields)
			.done(function( data ) {
				callback(data);
		});
	});
