// JavaScript Document
// JavaScript Document
$(document).ready(function(e) { 

	setPedido($.QueryString["IDPedido"]);	
	$("#regresarPanel").attr("href","panel.html?idChofer=" + $.QueryString["idChofer"]);
	
});

 

function alertDismissed(){
}
//

function setPedido(idPedido){
	
	$.mobile.loading('show'); 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/ObtenerPedido",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDPedido":"'+idPedido+'"}',
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				
				for (var i = 0; i<resultado.length;i++){
					$(".oc").html(resultado[i].NroOrdenCompra);
		 		 	$(".cliente").html(resultado[i].NombreCliente);
					$(".dni").html(resultado[i].DocumentoCliente);
					$(".blt").html(resultado[i].BLT_FME);
					$(".fch_entrega").html(resultado[i].FechaEntrega);
					$(".provincia").html(resultado[i].NomProvincia);
					$(".distrito").html(resultado[i].NomDistrito);
					$(".direccion").html(resultado[i].DireccionEntrega);
					$(".referencia").html(resultado[i].Referencia);
					$(".telefono").html(resultado[i].Telefono);
					$(".mail").html(resultado[i].Email);
					$(".observacion").html(resultado[i].Observacion);					
					setDetallePedido(idPedido);					
					break;
				}
				//$( "#listProgramacion" ).listview( "refresh" );
			}
			else{
				//$("#contentProgramaciones").html("");
//				$("#contentProgramaciones").html("<h3>No se encontraron programaci&oacute;nes para el dia de hoy</h3>");
//				//Mensaje
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





function setDetallePedido(idPedido){
	
	$.mobile.loading('show'); 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/ObtenerDetallePedido",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDPedido":"'+idPedido+'"}',
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
			resultado = $.parseJSON(data.d);
			console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){				
				for (var i = 0; i<resultado.length;i++){
					$(".contentDetalle").append("<p><b>"+resultado[i].Descripcion+"</b><br><b>Tipo: </b>"+resultado[i].Tipo+"<br><b>SKU: </b>"+resultado[i].SKU+"<br><b>Cantidad: </b>"+resultado[i].Cantidad+"</p>");				 
				}
			}
			else{
				$("#contentProgramaciones").html("");
				$("#contentProgramaciones").html("<h3>No se encontro informaci&oacute;n</h3>");
//				//Mensaje
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

