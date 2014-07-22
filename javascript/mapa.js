$(function() {
	navigator.geolocation.getCurrentPosition(function(posicion) {
		var latitud = posicion.coords.latitude;
		var longitud = posicion.coords.longitude;
		$("#mapa").goMap({

			markers : [{
				latitude:latitud,
				longitude:longitud,
				draggable:true,
				icon:"../imagenes/marcadores/arrastrar.png",
				title:"curso nodejs y html5 upiita",
				
			},{
				latitude:latitud,
				longitude:longitud,
				draggable:true,
				icon:"../imagenes/marcadores/arrastrar.png",
				title:"aqui toy",
			},{
				address:"el molinito, naucalpan",
				icon:"../imagenes/marcadores/apartamento.png",
				title:"Upiita",
				html:"empresa",
			}],
			zoom : 10,
			maptype:"roadmap",

		});

	});
	//pintar el mapa

}); 

