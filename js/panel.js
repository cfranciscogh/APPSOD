// JavaScript Document
// JavaScript Document
$(document).ready(function(e) {  
	getProgramaciones();
	$("#actualizar").click(function(e) {
        getProgramaciones();
    });
});

 

function alertDismissed(){
}
//

function getProgramaciones(){
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#listProgramacion").html("");  
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/ConsultarPedidos",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDChofer":"'+$.QueryString["idChofer"]+'"}',
        //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
			//console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				$("#contentProgramaciones").find("h3").remove();
				$("#contentProgramaciones").find("form, ul").fadeIn("fast");
				var count = 0;
				for (var i = 0; i<resultado.length;i++){
					if (  resultado[i].IDEstado == 4  || resultado[i].IDEstado == 5 )
		 				$("#listProgramacion").append('<li data-icon="check"><a>'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</a></li> ');
					else {
						if (count>=0)
						$("#listProgramacion").append('<li><a data-ajax="false" href="detalle.html?IDPedido='+resultado[i].IDPedido+'&idChofer='+$.QueryString["idChofer"]+'">'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</a></li> ');
						else
							$("#listProgramacion").append('<li data-icon="false"><a>'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</a></li> ');
							
							count++;
					}
					
				}
				$( "#listProgramacion" ).listview( "refresh" );
			}
			else{
				$("#contentProgramaciones").find("form, ul").fadeOut("fast");
				$("#contentProgramaciones").find("h3").remove();
				$("#contentProgramaciones").append("<h3>No se encontraron programaci&oacute;nes para el dia de hoy</h3>");
			}
        },

        error : function(jqxhr) 
        {
		   console.log(jqxhr);	
           navigator.notification.alert(
            'Error de conexi\u00f3n, contactese con sistemas!',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
        }

    });		 
	
}
