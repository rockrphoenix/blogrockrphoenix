$(function(){
	//obtener la caja a manipular
	var imagenMono = $("#contenedor-mono img");
	//escuchar el evento mouseover sobre la imagen del mono
	imagenMono.hover(function(){
		//mouse sobre imagen coloco otro mono
		imagenMono.attr("src", "../imagenes/otro_mono.jpg");
	}, function(){
		//mouse afuera d ela imagen mono original
		imagenMono.attr("src", "../imagenes/mono.jpg");
	});
});
