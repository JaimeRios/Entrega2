const hbs= require('hbs');
const fs = require('fs');

listaCursos =[];

const listarCursos = ()=>{
	try{
		listaCursos = require('../listacursos.json');
		console.log('Hay archivo')
	}catch(error){
		listaCursos =[];
		console.log('No hay archivo')
	}
}

const guardarCursos =()=>{
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('./listacursos.json', datos,(err)=>{
		if(err)throw(err);
		console.log('Archivo creado con éxito');
	})
}


hbs.registerHelper('crearCurso',(_id,_nombre,_modalidad,_valor,_descripcion,_intensidad)=>{

	listarCursos();
	let cur ={
		id: _id,
		nombre: _nombre,
		modalidad: _modalidad,
		valor: _valor,
		descripcion: _descripcion,
		intensidad: _intensidad,
		estado: 'disponible'

	};
	let texto;	
	let duplicado= listaCursos.find(curs=>curs.id ==cur.id);
	if(!duplicado){
		listaCursos.push(cur);
		console.log(listaCursos);
	
		guardarCursos();
		texto = '<table id="cursos">\
		 		 <thead> \
		 		 <th> Id </th>\
		 		 <th> Nombre </th>\
		 		 <th> Descripción </th>\
		 		 <th> Valor </th>\
		 		 <th> Modalidad </th>\
		 		 <th> Intensidad </th>\
		 		 <th> Estado </th>\
		 		 </thead> \
		 		 <tbody>'
		listaCursos.forEach(curso=>{
			texto = texto +
					'<tr>'+
					'<td>'+ curso.id + '</td>'+
					'<td>'+ curso.nombre + '</td>'+
					'<td>'+ curso.descripcion + '</td>'+
					'<td>'+ curso.valor + '</td>'+
					'<td>'+ curso.modalidad + '</td>'+
					'<td>'+ curso.intensidad + '</td>'+
					'<td>'+ curso.estado + '</td></tr>'
		})
		texto = texto +'</tbody></table>';

	}else{
		texto=' <section>Ya existe otro curso con el <b>id:</b> '+cur.id+'</section>';
	}
	return texto;
});

hbs.registerHelper('actualizarCurso',(_curso)=>{

	listarCursos();
	let texto;	
	let encontrado= listaCursos.find(curs=>curs.nombre ==_curso);
	if(!encontrado){
		console.log('No existe este estudiante: '+nom);
	}else{
		encontrado["estado"]="cerrado";
		guardarCursos();
	}

});


listaEstudiantes =[];

const listarEstudiantes = ()=>{
	try{
		listaEstudiantes = require('../listaestudiantes.json');
		console.log('Hay archivo')
	}catch(error){
		listaEstudiantes =[];
		console.log('No hay archivo')
	}
}

const guardarEstudiantes =()=>{
	let datos = JSON.stringify(listaEstudiantes);
	fs.writeFile('./listaestudiantes.json', datos,(err)=>{
		if(err)throw(err);
		console.log('Archivo creado con éxito');
	})
}


hbs.registerHelper('crearEstudiante',(_documento,_correo,_nombre,_telefono,_curso)=>{

	listarEstudiantes();
	let est ={
		documento: _documento,
		correo: _correo,
		nombre: _nombre,
		telefono: _telefono,
		curso: _curso

	};
	let texto;	
	let duplicado= listaEstudiantes.filter(estu=>estu.documento==est.documento);
	if(!duplicado){
		listaEstudiantes.push(est);
		console.log(listaEstudiantes);
	
		guardarEstudiantes();
		texto = '<section><h1> Estudiante '+est.nombre+' Inscritó con exito al curso '+est.curso+'</section>'

	}else{
		let duplicado2=duplicado.find(estu=>estu.curso==est.curso);
		if(!duplicado2){
			listaEstudiantes.push(est);
			console.log(listaEstudiantes);
			guardarEstudiantes();
			texto = '<section><h1> Estudiante '+est.nombre+' Inscritó con exito al curso '+est.curso+'</section>'
		}else{
			texto='<section><h1> Estudiante '+est.nombre+' Ya esta inscritó al curso '+est.curso+'</section>'	
		}
		
	}
	return texto;
});


hbs.registerHelper('actualizarEstudiante',(_documento,_curso)=>{

	listarEstudiantes();
	let texto;	

	let cursosEstudiante = listaEstudiantes.filter(buscar=>buscar.documento==_documento);
	let cursosSinEstudiante = listaEstudiantes.filter(buscar=>buscar.documento!=_documento);

	let encontrado = cursosEstudiante.filter(buscar=>buscar.curso!=_curso);

	if(encontrado.length!=cursosEstudiante.length){
		texto = ' <section>Estudiante de <b>documento: </b> '+_documento+' eliminado del curso: '+_curso;
		texto = texto+'<h1 style="color:red">Puede que los cambios no se vean reflejados de inmediato, para comprobar vuelva a cargar la opcion ver inscritos del menu superior.</h1></section>'
		listaEstudiantes = cursosSinEstudiante;
		encontrado.forEach(est=>{
			listaEstudiantes.push(est);
		})
		
	}else{
		
		texto =' <section>No existe un estudiante de <b>documento: </b> '+_documento+' inscritó a: '+_curso+'</section>';
		
	}
	console.log('Lista completa de estudiantes'+JSON.stringify(listaEstudiantes));

	guardarEstudiantes();

	return texto;
});


hbs.registerHelper('listarCursos',()=>{

	listarCursos();

	let texto;	
	texto = '<table id="cursos">\
	 		 <thead> \
	 		 <th> Id </th>\
	 		 <th> Nombre </th>\
	 		 <th> Descripción </th>\
	 		 <th> Valor </th>\
	 		 <th> Modalidad </th>\
	 		 <th> Intensidad </th>\
	 		 <th> Estado </th>\
	 		 </thead> \
	 		 <tbody>'
	listaCursos.forEach(curso=>{
		texto = texto +
				'<tr>'+
				'<td>'+ curso.id + '</td>'+
				'<td>'+ curso.nombre + '</td>'+
				'<td>'+ curso.descripcion + '</td>'+
				'<td>'+ curso.valor + '</td>'+
				'<td>'+ curso.modalidad + '</td>'+
				'<td>'+ curso.intensidad + '</td>'+
				'<td>'+ curso.estado + '</td></tr>'
	})
	texto = texto +'</tbody></table>';

	return texto;
});

hbs.registerHelper('listarCursosDesplegables',()=>{

	listarCursos();

	let texto;	
	texto = '<section>'
	listaCursos.forEach(curso=>{
		if(curso.estado=="disponible"){
			texto = texto + '<section><button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo'+curso.id+
					'"><b>'+curso.nombre+':'+curso.descripcion+'</b><br>Valor:'+curso.valor+'</button>'+
					'<div id="demo'+curso.id+'" class="collapse">'+

					'<b>Nombre: </b><br>'+curso.nombre + '<br><br>'+
					'<b>Valor: </b><br>'+curso.valor + '<br><br>'+
					'<b>Descripción: </b><br>'+curso.descripcion + '<br><br>'+
					'<b>Modalidad: </b><br>'+curso.modalidad + '<br><br>'+
					'<b>Intensidad: </b><br>'+curso.intensidad + '<br><br>'+
					'</div></section>'
		}
	})
	texto = texto +'</section>';

	return texto;
});


hbs.registerHelper('listarCursosDesplegables2',()=>{

	listarCursos();
	listarEstudiantes();

	let texto;	
	texto = '<section>'
	listaCursos.forEach(curso=>{
		if(curso.estado=="disponible"){
			texto = texto + '<section><button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo'+curso.id+
					'"><b>'+curso.nombre+':'+curso.descripcion+'</b></button>'+
					'<div id="demo'+curso.id+'" class="collapse">'

					//Buscar estudiantes:
					let estudi = listaEstudiantes.filter(estu=>estu.curso==curso.nombre);

					texto = texto+ '<table id="cursos">\
					 		 <thead> \
					 		 <th> Documento </th>\
					 		 <th> Nombre </th>\
					 		 <th> Correo </th>\
					 		 <th> Telefono </th>\
					 		 </thead> \
					 		 <tbody>'
					estudi.forEach(es=>{
						texto = texto +
								'<tr>'+
								'<td>'+ es.documento + '</td>'+
								'<td>'+ es.nombre + '</td>'+
								'<td>'+ es.correo + '</td>'+
								'<td>'+ es.telefono + '</td></tr>'
					})
					texto = texto +'</tbody></table>'+
					'</div></section>'
		}
	})
	texto = texto +'</section>';

	return texto;
});

hbs.registerHelper('MostrarSeleccionCursos',()=>{

	listarCursos();

	let texto;	
	guardarCursos();
	texto = ''//<option>-</option>
	listaCursos.forEach(curso=>{
		if(curso.estado=="disponible"){
			texto = texto + '<option>'+curso.nombre+'</option>'
		}
	})

	return texto;
});
