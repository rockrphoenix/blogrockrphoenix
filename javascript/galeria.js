$(function() {
	//alert("galeria");
	//obtener todas las cajas a manipular
	var imagenPreview = $("#contenedor-preview");
	var imagenPrincipal = $("#contenedor-imagen img");
	var descripcion = $("#descripcion-imagen");
	var contenedor = $("#contenedor-imagen");
	var cajitaClickeada;
	var rutaPrincipal;
	var descripcionImagen;

	imagenPreview.click(function(event) {
		//obtiene informacion img descrp
		cajitaClickeada = $(event.target);
		rutaPrincipal = cajitaClickeada.data("ruta-principal");
		descripcionImagen = cajitaClickeada.data("descripcion");
		//ocultar el contendor
		contenedor.fadeOut("slow", function() {
			//hacer los cambios
			imagenPrincipal.attr("src", rutaPrincipal);
			descripcion.html(descripcionImagen);
			contenedor.fadeIn("slow");
		});
		
	});
}); 