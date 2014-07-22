//function se ejecuta cuando el DOM listo 
//la página ya se cargo por completo

$(function(){
	//alert("DOM listo!!");
	//obtener la caja (etiqueta) a manipular
	var titulo = $("#titulo h1");
	//cambie el contenido de la caja
	titulo.html("nuevo titulo");
	//alert( titulo.html() );
	//obtenengo la caja
	 var mono = $("#contenedor-mono img");
	 //obtuve el valor del atributo  src de la caja
	 var rutaMono = mono.attr("src");
	 alert(rutaMono);
	 //obtengo la caja
	 var redes = $("#redes-imagenes");
	 redes.addClass("fondo-blanco");
	 //escuchar el evento click
	 titulo.click(function(){
	 	titulo.html("Click!!");
	 });
	  
	 
});