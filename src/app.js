const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');

//helpers
require('./helpers');

const directoriopublico = path.join(__dirname,'../public');
const directoriopartials = path.join(__dirname,'../partials');
app.use(express.static(directoriopublico));//es como si los documentos de la carpeta public estuvieran alojados en la carpeta raiz
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}))


app.set('view engine','hbs');

app.get('/',(req, res)=>{
	//va a mostrarle la pagina dinamica que la crearemos llamada view
	res.render('inicio');
});//a donde va a ingresar al entrar a la pagina

app.get('/crearcurso',(req, res)=>{
	res.render('crearcurso');
});

app.get('/vercursos',(req, res)=>{
	res.render('vercursos');
});

app.get('/inscribir',(req, res)=>{
	res.render('inscribir');
});

app.get('/verinscritos',(req, res)=>{
	res.render('verinscritos');
});

app.post('/cursoinscrito',(req, res)=>{
	

	res.render('cursoinscrito',{
		id: parseInt(req.body.id),
		nombre: req.body.nombre,
		modalidad: req.body.modalidad,
		valor: parseInt(req.body.valor),
		descripcion: req.body.descripcion,
		intensidad: parseInt(req.body.intensidad)
		
	});

});

app.post('/estudianteinscrito',(req, res)=>{
	
	res.render('estudianteinscrito',{
		documento: parseInt(req.body.documento),
		correo: req.body.correo,
		nombre: req.body.nombre,
		telefono: parseInt(req.body.telefono),
		curso: req.body.curso
	});

});

app.post('/actualizar',(req, res)=>{
	
	res.render('actualizar',{
		curso: req.body.curso
	});

});

app.post('/eliminarEstudiante',(req, res)=>{
   	res.render('eliminarEstudiante',{
		curso: req.body.curso,
		documento: parseInt(req.body.documento)
	});    
});

app.listen(3000,()=>{
	console.log('Escuchando en el puerto 3000');
});