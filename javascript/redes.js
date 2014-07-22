$(function(){
	//cajas a manipular: enlace y div que tiene las imagenes
	var cerrar = $("#enlace-cerrar");
	var contenedorImagenes = $("#redes-imagenes");
	//escucho el evento click sobre el enlace
	cerrar.click(function(){
		//alert("cerrar");
		//cuando el enlace diga "cerrar" ocultar caja
		//y cambiar el enlace a abrir
		if( cerrar.html() === "cerrar" ){
			contenedorImagenes.fadeOut("slow", function() {
				cerrar.html("abrir");
			}); 	
		}
		//entonces enlace dice "abrir", mostrar la caja
		//y cambiar el text a cerrar
		else{
			contenedorImagenes.fadeIn("slow", function(){
				cerrar.html("cerrar");
			});
		}
		return false;
	});
});