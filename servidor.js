/* obtener las librerias */
var express = require("express");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
var socketio= require("socket.io");
var http= require("http");
var sanitizer=require("sanitizer");

/*app representa la funcionalidad de la aplicacion web*/
var app = express();
var servidor = http.createServer(app);

/* esto es para conectar con openshift, si no se conecta con openshift, se conecta localmente*/
var IP= "127.0.0.1";
var PORT= 8080;
if(process.env.OPENSHIFT_NODEJS_PORT){
	PORT=process.env.OPENSHIFT_NODEJS_PORT;
	IP=process.env.OPENSHIFT_NODEJS_IP;
}
servidor.listen(PORT, IP);//se cambio de app

console.log("servidor levantado");

/*usamos body parser para recibir datos del cliente*/
app.use( bodyParser.urlencoded({
	extended: true
}) );
console.log("body parser configurado");

/*configurar vistas estaticas css, videos, imagenes, 
 * fuentes, javascript*/
app.use("/videos", express.static( __dirname + "/videos" ) );
app.use("/fuentes", express.static( __dirname + "/fuentes" ) );
app.use("/imagenes", express.static( __dirname + "/imagenes" ) );
app.use("/css", express.static( __dirname + "/css" ) );
app.use("/javascript", express.static( __dirname + "/javascript" ) );

console.log("rutas estaticas configuradas");

/*configurar la carpeta de vistas*/
nunjucks.configure( __dirname + "/vistas", {
	express: app
} );
console.log("sistemas de templates configurado");

app.get("/", function(req, res){
	//res.send("Repondiendo a la peticion get /");
	res.render("index.html");
} );

app.get("/galeria", function(req, res){
	res.render("galeria.html");
} );

app.get("/ubicacion", function(req, res){
	res.render("ubicacion.html");
} );

app.get("/contacto", function(req, res){
	res.render("contacto.html");
} );

app.get("/chat", function(req, res){
	res.render("chat.html");
} );


/*obteniendo peticiones ajax*/
app.get("/index_contenido", function(req, res){
	res.render("index_contenido.html");
} );

app.get("/chat_contenido", function(req, res){
	res.render("chat_contenido.html");
} );

app.get("/contacto_contenido", function(req, res){
	res.render("contacto_contenido.html");
} );

app.get("/contactores_contenido", function(req, res){
	res.render("contactores_contenido.html");
} );

app.get("/ubicacion_contenido", function(req, res){
	res.render("ubicacion_contenido.html");
} );

app.get("/suscrito_contenido", function(req, res){
	res.render("suscrito_contenido.html");
} );

app.get("/galeria_contenido", function(req, res){
	res.render("galeria_contenido.html");
} );
app.get("/canvas_contenido", function(req, res){
	res.render("canvas_contenido.html");
} );


/*respoder a una peticion post*/
app.post("/suscribir", function(req, res){
	var parametroEmail = req.body.correo;
	console.log("Recibi " + parametroEmail );
	// por default se responde con suscrito.html
	var respuesta="suscrito.html";
	if (req.body.esAjax) {
		respuesta="suscrito_contenido.html";	
	};
	res.render(respuesta,{
		email: parametroEmail
	});
} );

/*responder a las peticiones del formulario*/
app.post("/contactar", function(req, res){
	var nombre= req.body.nombre;
	var email= req.body.email;
	var url= req.body.url;
	var textarea= req.body.textarea;

	var respuesta="contactores.html";
	if (req.body.esAjax) {
		respuesta="contactores_contenido.html";	
	};
	res.render(respuesta,{
		nombre: nombre,
		email: email,
		url: url,
		textarea:textarea,
	});
});

/*escuchar peticiones de conexion para el chat*/
var io= socketio.listen(servidor);
var contador=0;
//escuchar mensajes de cualquier cliente
io.sockets.on("connection",function(socket){
	//actualizar contador
	contador=contador+1;
	//enviar mensaje a los clientes
	io.sockets.emit("actualizar_contador",{
		clientes:contador
	});
	
	
	//enviarle en mensaje que recibi a todos los demas clientes
	socket.on("mensaje_al_servidor",function(datos){
		console.log(datos.nombre);
		console.log(datos.mensaje);
		//enviarle mensaje al cliente
		io.sockets.emit("mensaje_al_cliente",{
			mensaje:sanitizer.escape(datos.mensaje),
			nombre:sanitizer.escape(datos.nombre),
		});
	});

//cuando alguien se desconecta diminuyo el contador de usuarios
 	socket.on("disconnect", function() {
 		//actualizar contador
 		contador = contador - 1;
 		//enviar un mensaje a los clientes
 		io.sockets.emit("actualizar_contador", {
 			clientes : contador
 		});
 	});
 
 });

