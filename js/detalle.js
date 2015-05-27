// JavaScript Document
var  latitude = "";
var longitude = "";
function onSuccess(position) {
   latitude =position.coords.latitude;
   longitude = position.coords.longitude;
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

$(document).ready(function(e) { 

	setPedido($.QueryString["IDPedido"]);
	setTracking($.QueryString["IDPedido"]);
	$("#IDPedido").val($.QueryString["IDPedido"]);
	$("#regresarPanel").attr("href","panel.html?idChofer=" + $.QueryString["idChofer"]);
	
	var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
	
	$("#guardarTracking").click(function(e) {
        e.preventDefault();
		if ( $("#hora").val() == "" ){
			alert("Ingrese Tiempo Aprox. de llegada");
			//alerta("Ingrese Tiempo Aprox. de llegada");
			$("#hora").focus();
			return;
		}
		
		if ( $("#recepcionado").val() == 1 ){
			
			if ( $("#nombre").val() == "" ){
			alert("Ingrese Nombre");
			//alerta("Ingrese Nombre");
			$("#nombre").focus();
			return;
			}
			
			if ( $("#dni").val() == "" ){
			alert("Ingrese DNI");
			//alerta("Ingrese DNI");
			$("#dni").focus();
			return;
			}
			
		}
		
	var parametros = new Object();
	parametros.IDTranking = $("#IDTranking").val();	
	parametros.IDPedido = $("#IDPedido").val();	
	parametros.TiempoAproxLlegada = $("#hora").val();	
	parametros.Recepcionado = $("#recepcionado").val();	
	parametros.Nombre = $("#nombre").val();	
	parametros.DNI = $("#dni").val();	
	parametros.IDEstado = $("#estado").val();	
	parametros.Observacion = $("#observacion").val();	
	parametros.Latitud = latitude;	
	parametros.Longitud = longitude;	
	
	//console.log(parametros);
	//return;
		
	$.mobile.loading('show'); 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/GenerarTraking",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : JSON.stringify(parametros),
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
			resultado = $.parseJSON(data.d);
			$.mobile.loading('hide');
			 if ( resultado.code == 1){
				 alert(resultado.message);
				 $("#IDTranking").val(resultado.codigo);	
				 //alerta(resultado.message);
			 }
			 else{
				 alert(resultado.message);
				 //alerta(resultado.message);
			 }
        },

        error : function(jqxhr) 
        {
		  console.log(jqxhr);	
          alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		
		
		//
		
		
    });
	
});







function setTracking(idPedido){
	
	$.mobile.loading('show'); 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/ObtenerTraking",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDPedido":"'+idPedido+'"}',
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
			resultado = $.parseJSON(data.d);
			$.mobile.loading('hide');
			//console.log(resultado);
			if ( resultado.length > 0 ){
				
				for (var i = 0; i<resultado.length;i++){
					$("#hora").val(resultado[i].TiempoAproxLlegadaFormat);
		 		 	/*$(".cliente").html(resultado[i].NombreCliente);
					$(".dni").html(resultado[i].DocumentoCliente);
					$(".blt").html(resultado[i].BLT_FME);
					$(".fch_entrega").html(resultado[i].FechaEntregaFormat);
					$(".provincia").html(resultado[i].NomProvincia);
					$(".distrito").html(resultado[i].NomDistrito);
					$(".direccion").html(resultado[i].DireccionEntrega);
					$(".referencia").html(resultado[i].Referencia);
					$(".telefono").html(resultado[i].Telefono);
					$(".mail").html(resultado[i].Email);
					$(".observacion").html(resultado[i].Observacion);	*/				
					 		
					break;
				}
			}
        },

        error : function(jqxhr) 
        {	
          alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		 
	
}






function valirRecepcion(ctrlSelect){
	$(".contentDatos").slideUp("fast");
	if ( $(ctrlSelect).val() == 1 )
		$(".contentDatos").slideDown("fast");
}

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
					$(".fch_entrega").html(resultado[i].FechaEntregaFormat);
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
		   //console.log(jqxhr);	
          alerta('Error de conexi\u00f3n, contactese con sistemas!');
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
			//console.log(resultado);
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
		   //console.log(jqxhr);	
		   alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		 
	
}

function alerta(mensaje){
	
	 navigator.notification.alert(
            mensaje,  // message
            alertDismissed,         // callback
            titulo,            // title
            'Aceptar'                  // buttonName
        	);
	
}

