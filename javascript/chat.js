$(function() {

	/*io se define cuando se importo socket io*/

	var socket = io.connect(location.origin);
	var cajita =$("#usuarios");

	/*enviar mensaje al servidor*/

	$("#boton").click(function() {

		/*obtener los datos que voy a enviar*/
		

		var nombreCliente = $("#nombre-usuario").val();

		var mensajeCliente = $("#mensaje-usuario").val();

		/* enviar datos al servidor */
		socket.emit("mensaje_al_servidor",{
			nombre: nombreCliente,
			mensaje: mensajeCliente
		});

	});

	/*recibir mensaje del servidor*/

	var mostrar_mensaje = function(nom, mens) {

		var caja = "<div class='mensaje'> <span>" + nom + " dice: </span> " + mens + "</div>";

		$("#mensajes").append(caja);

	};
	socket.on("mensaje_al_cliente",function(datos){
		mostrar_mensaje(datos.nombre,datos.mensaje);
	});
	// escuchar mensaje para actulizar el contador
	socket.on("actualizar_contador",function(datos){
		cajita.html(datos.clientes);
	});
}); 