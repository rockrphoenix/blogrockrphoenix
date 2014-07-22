$(function() {
	//alert("hola");
	var enlace = $("#menu ul li a");
	var contenido = $("#contenedor");


	/*Escuchamos el evento stateChange, que se detona cuando ocurre un cambio en la URL del navegador
 	 *window es el objeto que escucha el evento
 	 *El tercer parametro de la funcion bind es una funcion que se ejecuta cuando ocurre 
 	 el evento stateChange*/
 	History.Adapter.bind(window, 'statechange', function() {
 
 		//obtenemos el nuevo estado del historial
 		var estado = History.getState();
 		/*mediante el atributo data obtenemos el JSON que asociamos al evento stateChange
 		 así podemos obtener la rutaAJAX asociada a la nueva url*/
 		var urlAjax = estado.data.urlAJAX;
 
 		/*La primera vez que accedemos a la página WEB no lo hacemos con AJAX sino con una
 		 petición GET, por lo que urlAJAX no esta definida
 		 *Entonces tenemos que obtener la ruta AJAX asociada a la primera vista que visitamos*/
 		if ( typeof urlAjax === "undefined") {
 			/*obtenemos la ruta que tienen la url del navegador
 			 en nuestro caso las ruta pueden ser: /, /galeria, /chat, /contacto y /ubicacion*/
 			var rutaEntrada = window.location.pathname;
 			
 			/*de acuerdo a la ruta del navegador obtenemos la url AJAX*/
 			if(rutaEntrada === "/"){
 				urlAjax = "index-contenido";
 			}else{
 				urlAjax = rutaEntrada + "-contenido";
 			}
 			
 		//una manera mas corta de hacer el if-else anterior
 			//urlAjax = (rutaEntrada === "/") ? "index-contenido" : rutaEntrada + "-contenido";
 		}
 
 		console.log("url ajax:" + urlAjax);
 		
 		//cargamos la url AJAX en el navegador
 		contenido.load(urlAjax);
 	});

	
	enlace.click(function(event) {
		seccion = $(event.target);
		/*Obtenemos la ruta del nuevo contenido a cargar el contenedor
 		 esta ruta se carga mediante una petición ajax*/
 		rutaAJAX = seccion.data("ruta");
 		/*Obtenemos la ruta que originalmente se usaba para hacer GET*/
 		rutaGET = seccion.attr("href");
 
 		/*Mediante la librería "jQuery History", hacemos que cambie
 		 la URL cuando se hace una petición AJAX 
 		 * Cuando la URL cambia se detona el evento "stateChange"
 		 * El primer parametro es un JSON para asociar información al evento stateChange
 		 * El segundo parametro es una cadena con el titulo que tendra la pagina cuando cambie la URL
 		 * EL tercer parametro es es una cadena se pegara al final de la URL*/
 		History.pushState({
 			urlAJAX : rutaAJAX
 		}, "ArtesanosSW" + rutaGET, rutaGET);
 
 		return false;
 
 	});
 	
 	//delegacion de eventos
 	/*Hacemos que el DOM escuche el evento "submit" que es
 	 detonado por etiquetas con la clase formulario-ajax*/
 	$(document).on("submit", ".formulario-ajax", function(evento){
 		//obtenemos la forma que detono el evento
 		var forma = $(evento.target);
 		//obtenemos la url de la peticion POST
 		var urlPOST = forma.attr("action");
 		//con el metodo serialize obtenemos los paramteros de la petición POST
 		var parametros = forma.serialize();
 	/*le pegamos un parametro extra a la petición 
 		 esAjax servira para que el servidor devuelva el html
 		 correcto si se usa ajax y si no se usa ajax*/
 		parametros = parametros + "&esAjax=true";
 		console.log("url post:" + urlPOST);
 		
 		//realizamos la petición ajax mediante el metodo ajax() de jQuery
 		$.ajax({
 			type:"post",
 			url: urlPOST,
 			data: parametros,
 			//funciona ejecutarse una vez que se realiza la peticion AJAX
 			success: function(respuesta){
 				//respuesta contiene el html que se va a cargar en el contenedor de contenido
 				contenido.html(respuesta);
 			},
 			//funciona ejecutarse una vez que se realiza si hay errores
 			error : function(error, error2, error3) { debugger;
 
 			}
 		});
 		//DETIENE EL EVENTO DEFAULT
 		//QUE ES CAMBIAR DE PAGINA SEGUN EL HREF
		
		return false;
	});
});
