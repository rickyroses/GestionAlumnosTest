class Alumno {
  constructor(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materias = [];
    this.calificaciones = [];
  }

  promedio() {
    if (this.calificaciones.length === 0) return 0;
    return (
      this.calificaciones.reduce((a, b) => a + b, 0) /
      this.calificaciones.length
    );
  }
}

let alumnos = [];
let materias = [];
let grupos = [];

cargarDatos();

function mostrarFormularioAlumno() {
  mostrarFormulario("formularioAlumno");
}

function mostrarFormularioMateria() {
  mostrarFormulario("formularioMateria");
}

function mostrarFormularioInscripcion() {
  mostrarFormulario("formularioInscripcion");
  poblarSelectAlumnos("alumnoInscripcion");
  poblarSelectMaterias("materiaInscripcion");
}

function mostrarFormularioCalificaciones() {
  mostrarFormulario("formularioCalificaciones");
  poblarSelectAlumnos("alumnoCalificaciones");
  poblarSelectMaterias("materiaCalificaciones");
}

function mostrarFormularioGrupo() {
  mostrarFormulario("formularioGrupo");
  poblarSelectAlumnos("alumnosGrupo");
}

function mostrarPromedios() {
  ocultarSecciones();
  document.getElementById("promedios").style.display = "block";
  mostrarPromediosAlumnos();
}

function mostrarBusquedaOrdenamiento() {
  ocultarSecciones();
  document.getElementById("busquedaOrdenamiento").style.display = "block";
}

function mostrarFormulario(id) {
  ocultarSecciones();
  document.getElementById(id).style.display = "block";
}

function ocultarSecciones() {
  const secciones = [
    "formularioAlumno",
    "formularioMateria",
    "formularioInscripcion",
    "formularioCalificaciones",
    "formularioGrupo",
    "promedios",
    "busquedaOrdenamiento",
  ];
  secciones.forEach(
    (id) => (document.getElementById(id).style.display = "none")
  );
  document.getElementById("listaAlumnos").style.display = "block";
}

function agregarAlumno() {
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let edad = parseInt(document.getElementById("edad").value);
  let alumno = new Alumno(nombre, apellidos, edad);
  alumnos.push(alumno);
  guardarDatos();
  limpiarFormularioAlumno();
  mostrarAlumnos();
}

function limpiarFormularioAlumno() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("edad").value = "";
}

function agregarMateria() {
  let nombreMateria = document.getElementById("nombreMateria").value;
  let profesor = document.getElementById("profesor").value;
  materias.push({ nombre: nombreMateria, profesor: profesor });
  guardarDatos();
  limpiarFormularioMateria();
  mostrarMaterias();
}

function limpiarFormularioMateria() {
  document.getElementById("nombreMateria").value = "";
  document.getElementById("profesor").value = "";
}

function poblarSelectAlumnos(selectId) {
  let select = document.getElementById(selectId);
  select.innerHTML = "";
  select.appendChild(new Option("", ""));
  alumnos.forEach((alumno, index) => {
    select.appendChild(
      new Option(`${alumno.nombre} ${alumno.apellidos}`, index)
    );
  });
}

function poblarSelectMaterias(selectId) {
  let select = document.getElementById(selectId);
  select.innerHTML = "";
  select.appendChild(new Option("", ""));
  materias.forEach((materia, index) => {
    select.appendChild(new Option(materia.nombre, index));
  });
}

function inscribirAlumno() {
  let alumnoIndex = document.getElementById("alumnoInscripcion").value;
  let materiaIndex = document.getElementById("materiaInscripcion").value;
  if (alumnoIndex === "" || materiaIndex === "") return;

  let alumno = alumnos[alumnoIndex];
  if (alumno.materias.includes(parseInt(materiaIndex))) {
    alert("El alumno ya está inscrito en esta materia.");
    return;
  }

  alumno.materias.push(parseInt(materiaIndex));
  alumno.calificaciones.push(null); // Añade un espacio para la calificación
  guardarDatos();
  mostrarAlumnosInscritos();
}

function asignarCalificacion() {
  let alumnoIndex = document.getElementById("alumnoCalificaciones").value;
  let materiaIndex = document.getElementById("materiaCalificaciones").value;
  let calificacion = parseFloat(document.getElementById("calificacion").value);
  if (alumnoIndex === "" || materiaIndex === "") return;

  let alumno = alumnos[alumnoIndex];
  let materiaPosicion = alumno.materias.indexOf(parseInt(materiaIndex));
  if (materiaPosicion === -1) {
    alert("El alumno no está inscrito en esta materia.");
    return;
  }

  alumno.calificaciones[materiaPosicion] = calificacion;
  guardarDatos();
  mostrarAlumnosInscritos();
}

function crearGrupo() {
  let nombreGrupo = document.getElementById("nombreGrupo").value;
  let alumnosGrupo = Array.from(
    document.getElementById("alumnosGrupo").selectedOptions
  ).map((option) => alumnos[option.value]);
  grupos.push({ nombre: nombreGrupo, alumnos: alumnosGrupo });
  guardarDatos();
}

function mostrarAlumnos() {
  let listaAlumnos = document.getElementById("alumnos");
  listaAlumnos.innerHTML = "";
  alumnos.forEach((alumno) => {
    let li = document.createElement("li");
    li.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
    listaAlumnos.appendChild(li);
  });
}

function mostrarMaterias() {
  let listaMaterias = document.getElementById("materias");
  listaMaterias.innerHTML = "";
  materias.forEach((materia) => {
    let li = document.createElement("li");
    li.textContent = `${materia.nombre} - Profesor: ${materia.profesor}`;
    listaMaterias.appendChild(li);
  });
}

function mostrarAlumnosInscritos() {
  let listaInscritos = document.getElementById("alumnosInscritos");
  listaInscritos.innerHTML = "";
  alumnos.forEach((alumno) => {
    alumno.materias.forEach((materiaIndex, i) => {
      if (materiaIndex >= 0 && materiaIndex < materias.length) {
        let li = document.createElement("li");
        li.textContent = `${alumno.nombre} ${alumno.apellidos} - Materia: ${
          materias[materiaIndex].nombre
        } - Calificación: ${alumno.calificaciones[i] || "Sin calificación"}`;
        listaInscritos.appendChild(li);
      }
    });
  });
}

function mostrarPromediosAlumnos() {
  let listaPromedios = document.getElementById("listaPromedios");
  listaPromedios.innerHTML = "";
  alumnos.forEach((alumno) => {
    let li = document.createElement("li");
    li.textContent = `${alumno.nombre} ${
      alumno.apellidos
    } - Promedio: ${alumno.promedio()}`;
    listaPromedios.appendChild(li);
  });
}

function buscarPorNombreInterfaz() {
  let nombre = document.getElementById("buscarNombre").value.toLowerCase();
  let resultados = alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(nombre)
  );
  mostrarResultados(resultados);
}

function buscarPorApellidoInterfaz() {
  let apellido = document.getElementById("buscarApellido").value.toLowerCase();
  let resultados = alumnos.filter((alumno) =>
    alumno.apellidos.toLowerCase().includes(apellido)
  );
  mostrarResultados(resultados);
}

function buscarPorGrupoInterfaz() {
  let nombreGrupo = document.getElementById("buscarGrupo").value.toLowerCase();
  let grupoEncontrado = grupos.find(
    (grupo) => grupo.nombre.toLowerCase() === nombreGrupo
  );
  mostrarResultados(grupoEncontrado ? grupoEncontrado.alumnos : []);
}

function ordenarPorCalificacionInterfaz() {
  let orden = document.getElementById("ordenarCalificacion").value;
  let alumnosOrdenados = [...alumnos].sort((a, b) =>
    orden === "asc" ? a.promedio() - b.promedio() : b.promedio() - a.promedio()
  );
  mostrarResultados(alumnosOrdenados);
}

function ordenarPorEdadInterfaz() {
  let orden = document.getElementById("ordenarEdad").value;
  let alumnosOrdenados = [...alumnos].sort((a, b) =>
    orden === "asc" ? a.edad - b.edad : b.edad - a.edad
  );
  mostrarResultados(alumnosOrdenados);
}

function mostrarResultados(resultados) {
  let resultadosDiv = document.getElementById("resultadosBusqueda");
  resultadosDiv.innerHTML = "";
  if (resultados.length === 0) {
    resultadosDiv.textContent = "No se encontraron resultados.";
    return;
  }
  let ul = document.createElement("ul");
  resultados.forEach((alumno) => {
    let li = document.createElement("li");
    li.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${
      alumno.edad
    } - Promedio: ${alumno.promedio()}`;
    ul.appendChild(li);
  });
  resultadosDiv.appendChild(ul);
}

function guardarDatos() {
  const alumnosData = alumnos.map(
    ({ nombre, apellidos, edad, materias, calificaciones }) => ({
      nombre,
      apellidos,
      edad,
      materias,
      calificaciones,
    })
  );
  localStorage.setItem("alumnos", JSON.stringify(alumnosData));
  localStorage.setItem("materias", JSON.stringify(materias));
  localStorage.setItem("grupos", JSON.stringify(grupos));
}

function cargarDatos() {
  let alumnosGuardados = localStorage.getItem("alumnos");
  let materiasGuardadas = localStorage.getItem("materias");
  let gruposGuardados = localStorage.getItem("grupos");

  if (materiasGuardadas) {
    materias = JSON.parse(materiasGuardadas);
    mostrarMaterias();
  }

  if (alumnosGuardados) {
    alumnos = JSON.parse(alumnosGuardados).map((datosAlumno) => {
      let alumno = new Alumno(
        datosAlumno.nombre,
        datosAlumno.apellidos,
        datosAlumno.edad
      );
      alumno.materias = datosAlumno.materias;
      alumno.calificaciones = datosAlumno.calificaciones;
      return alumno;
    });
    mostrarAlumnos();
  }
  if (gruposGuardados) {
    grupos = JSON.parse(gruposGuardados);
  }

  mostrarAlumnosInscritos();
}

function limpiarLocalStorage() {
  localStorage.clear();
  localStorage.removeItem("alumnos");
  localStorage.removeItem("materias");
  localStorage.removeItem("grupos");
  alumnos = [];
  materias = [];
  grupos = [];
  location.reload();
}
