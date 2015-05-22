// JavaScript Document
// JavaScript Document
$(document).ready(function(e) {
    	$("#ingresar").click(function(e) {
            e.preventDefault();
			$.mobile.loading('show');
			setTimeout(loginValidar, 1000);
        });
});

var loginValidar = function(){
	
	  if ( $("#usuario").val() == "" && $("#clave").val() == "" )
   	{
	   navigator.notification.alert(
            'Ingrese usuario y contrase&ntilde;a!',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	   return;
   	} 
	 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB/TransportesMeridian/Autenticacion/LoginChofer.asmx/LoginChofer",
        type: "POST",
		crossDomain: true,
        dataType : "json",
        data : '{"usuario" : "' + $("#usuario").val() + '", "clave" : "' + $("#clave").val() + '"}',
        contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
          resultado = $.parseJSON(data.d);
		  //console.log(resultado);
		  if ( resultado.code == 1){
			   $.mobile.changePage( "panel.html", {transition: "slide", reloadPage:true} );
		  }
		  else{
			   $.mobile.loading('hide');
			   navigator.notification.alert(
					'Usuario y/o clave son incorrectos!',  // message
					alertDismissed,         // callback
					'Informaci\u00f3n',            // title
					'Aceptar'                  // buttonName
				);
			   $("#usuario").val("");
			   $("#clave").val("");
			   $("#usuario").focus();
			   $(".loadLogin").fadeOut("fast");
		  }
        },

        error : function(jqxhr) 
        {
           navigator.notification.alert(
            'Error de conexi\u00f3n, contactese con sistemas!',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
        }

    });	
	
	
	
/*   if ( $("#usuario").val() == "admin" && $("#clave").val() == "1234" )
   {
	  
   }
   else{
	   $.mobile.loading('hide');
	   navigator.notification.alert(
            'Usuario y/o clave son incorrectos!',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        );
	   $("#usuario").val("");
	   $("#clave").val("");
	   $("#usuario").focus();
	   $(".loadLogin").fadeOut("fast");
   }*/
   
};

function alertDismissed(){
}