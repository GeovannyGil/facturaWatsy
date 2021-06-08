//encabezado
const inputNoInterno = document.getElementById("noInterno");
const inputNoPedido = document.getElementById("noPedido");
const inputCredito = document.getElementById("diasCredito");
const inputNota = document.getElementById("nota");

//Datos Vendendor
const inputNitCliente = document.getElementById("nitCliente");
const inputNombreCliente = document.getElementById("nombreCliente");
const inputTelefonoCliente = document.getElementById("telefonoCliente");
const inputCorreoCliente = document.getElementById("correoCliente");
const inputDireccionCliente = document.getElementById("direccionCliente");
const selectDpaDireccion = document.getElementById("dpaDireccion");
const selectMunDireccion = document.getElementById("munDireccion");
const selectDpaDireccionE = document.getElementById("dpaDireccion2");
const selectMunDireccionE = document.getElementById("munDireccion2");
const inputDireccionECliente = document.getElementById("direccionECliente");
//Datos Cliente
const selectColaborador = document.getElementById("nombreVendedor");
const inputCodigoCliente = document.getElementById("codigoCliente");
const inputFechaPedido = document.getElementById("fechaHoraPedido");
const inputFechaVencimiento = document.getElementById("fechaVencimiento");
//Datos Producto
const formProducto = document.getElementById("formProducto");
const inputCantidad = document.getElementById("cantidad");
const inputDescripcion = document.getElementById("descripcion");
const inputPrecioUnitario = document.getElementById("precioUnitario");
const inputDescuento = document.getElementById("descuento");
const inputTotal = document.getElementById("total");
const bodyTable = document.getElementById("bodyTable");
const tableFacturas = document.getElementById("bodyTableFacturas");
//Datos Producto Actualizar
const inputCodigoPA = document.getElementById("codigoPA");
const inputCantidadU = document.getElementById("cantidadU");
const inputDescripcionU = document.getElementById("descripcionU");
const inputPrecioUnitarioU = document.getElementById("precioUnitarioU");
const inputDescuentoU = document.getElementById("descuentoU");
const inputTotalU = document.getElementById("totalU");
//Resultados finales
let inputSubTotal = document.getElementById("subTotal");
let inputDescuentoTotal = document.getElementById("descuentoTotal");
let inputSumaTotal = document.getElementById("sumaTotal");

let inputCodigoP = document.getElementById("codigoP");
//boton guardar
const btnActualizar = document.getElementById("actualizar");
const btnGuardar = document.getElementById("btnGenerarFactura");
const btnImprimir = document.getElementById("btnImprimirFactura");
let subTotal = 0;
let descuentoFinal = 0;
let totalFinal = 0;
let imprimir = "";
//arreglos
let facturas = [];
let arregloDetalle = [];
let arregloColaboradores = [
  {
    id: 1,
    nombre: "Orlando Sul"
  }, {
    id: 2,
    nombre: "Rodolfo Pac"
  }, {
    id: 3,
    nombre: "Marleny Sul"
  }, {
    id: 4,
    nombre: "Geovanny Gil"
  }, {
    id: 5,
    nombre: "José Solloy"
  }
];


let arregloDepartamentos = [
  { id: 0, departamento: "--Seleccione--" },
  { id: 1, departamento: "Alta Verapaz" },
  { id: 2, departamento: "Baja Verapaz" },
  { id: 3, departamento: "Chimaltenango" },
  { id: 4, departamento: "Chiquimula" },
  { id: 5, departamento: "Guatemala" },
  { id: 6, departamento: "El Progreso" },
  { id: 7, departamento: "Escuintla" },
  { id: 8, departamento: "Huehuetenango" },
  { id: 9, departamento: "Izabal" },
  { id: 10, departamento: "Jalapa" },
  { id: 11, departamento: "Jutiapa" },
  { id: 12, departamento: "Petén" },
  { id: 13, departamento: "Quetzaltenango" },
  { id: 14, departamento: "Quiché" },
  { id: 15, departamento: "Retalhuleu" },
  { id: 16, departamento: "Sacatepéquez" },
  { id: 17, departamento: "San Marcos" },
  { id: 18, departamento: "Santa Rosa" },
  { id: 19, departamento: "Sololá" },
  { id: 20, departamento: "Suchitepéquez" },
  { id: 21, departamento: "Totonicapán" },
  { id: 22, departamento: "Zacapa" },
];

function isMobile() {
  return (
    (navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/BlackBerry/i))
  );
}

let arregloMunicipios =
{
  "Alta Verapaz": [
    "Cahabón",
    "Chahal",
    "Chisec",
    "Cobán",
    "Fray Bartolomé de las Casas",
    "Lanquín",
    "Panzós",
    "Raxruha",
    "San Cristóbal Verapaz",
    "San Juan Chamelco",
    "San Pedro Carchá",
    "Santa Cruz Verapaz",
    "Senahú",
    "Tactic",
    "Tamahú",
    "Tucurú",
    "Santa Catarina La Tinta"
  ],
  "Baja Verapaz": [
    "Cubulco",
    "Granados",
    "Purulhá",
    "Rabinal",
    "Salamá",
    "San Jerónimo",
    "San Miguel Chicaj",
    "Santa Cruz El Chol"
  ],
  "Chimaltenango": [
    "Acatenango",
    "Chimaltenango",
    "El Tejar",
    "Parramos",
    "Patzicía",
    "Patzún",
    "Pochuta",
    "San Andrés Itzapa",
    "San José Poaquil",
    "San Juan Comalapa",
    "San Martín Jilotepeque",
    "Santa Apolonia",
    "Santa Cruz Balanyá",
    "Tecpán Guatemala",
    "Yepocapa",
    "Zaragoza"
  ],
  "Chiquimula": [
    "Camotán",
    "Chiquimula",
    "Concepción Las Minas",
    "Esquipulas",
    "Ipala",
    "Jocotán",
    "Olopa",
    "Quezaltepeque",
    "San Jacinto",
    "San José La Arada",
    "San Juan Ermita"
  ],
  "El Progreso": [
    "El Jícaro",
    "Guastatoya",
    "Morazán",
    "San Agustín Acasaguastlán",
    "San Antonio La Paz",
    "San Cristóbal Acasaguastlán",
    "Sanarate"
  ],
  "Escuintla": [
    "Escuintla",
    "Guanagazapa",
    "Iztapa",
    "La Democracia",
    "La Gomera",
    "Masagua",
    "Nueva Concepción",
    "Palín",
    "San José",
    "San Vicente Pacaya",
    "Santa Lucía Cotzumalguapa",
    "Siquinalá",
    "Tiquisate"
  ],
  "Guatemala": [
    "Guatemala",
    "Chinautla",
    "Chuarrancho",
    "Fraijanes",
    "Amatitlán",
    "Mixco",
    "Palencia",
    "Petapa",
    "San José del Golfo",
    "San José Pinula",
    "San Juan Sacatepéquez",
    "San Pedro Ayampuc",
    "San Pedro Sacatepéquez",
    "San Raymundo",
    "Santa Catarina Pinula",
    "Villa Canales"
  ],
  "Huehuetenango": [
    "Aguacatán",
    "Chiantla",
    "Colotenango",
    "Concepción Huista",
    "Cuilco",
    "Huehuetenango",
    "Ixtahuacán",
    "Jacaltenango",
    "La Democracia",
    "La Libertad",
    "Malacatancito",
    "Nentón",
    "San Antonio Huista",
    "San Gaspar Ixchil",
    "San Juan Atitán",
    "San Juan Ixcoy",
    "San Mateo Ixtatán",
    "San Miguel Acatán",
    "San Pedro Necta",
    "San Rafael La Independencia",
    "San Rafael Petzal",
    "San Sebastián Coatán",
    "San Sebastián Huehuetenango",
    "Santa Ana Huista",
    "Santa Bárbara",
    "Santa Cruz Barillas",
    "Santa Eulalia",
    "Santiago Chimaltenango",
    "Soloma",
    "Tectitán",
    "Todos Santos Cuchumatan"
  ],
  "Izabal": [
    "El Estor",
    "Livingston",
    "Los Amates",
    "Morales",
    "Puerto Barrios"
  ],
  "Jutiapa": [
    "Agua Blanca",
    "Asunción Mita",
    "Atescatempa",
    "Comapa",
    "Conguaco",
    "El Adelanto",
    "El Progreso",
    "Jalpatagua",
    "Jerez",
    "Jutiapa",
    "Moyuta",
    "Pasaco",
    "Quezada",
    "San José Acatempa",
    "Santa Catarina Mita",
    "Yupiltepeque",
    "Zapotitlán"
  ],
  "Petén": [
    "Dolores",
    "Flores",
    "La Libertad",
    "Melchor de Mencos",
    "Poptún",
    "San Andrés",
    "San Benito",
    "San Francisco",
    "San José",
    "San Luis",
    "Santa Ana",
    "Sayaxché",
    "Las Cruces"
  ],
  "Quetzaltenango": [
    "Almolonga",
    "Cabricán",
    "Cajolá",
    "Cantel",
    "Coatepeque",
    "Colomba",
    "Concepción Chiquirichapa",
    "El Palmar",
    "Flores Costa Cuca",
    "Génova",
    "Huitán",
    "La Esperanza",
    "Olintepeque",
    "Ostuncalco",
    "Palestina de Los Altos",
    "Quetzaltenango",
    "Salcajá",
    "San Carlos Sija",
    "San Francisco La Unión",
    "San Martín Sacatepéquez",
    "San Mateo",
    "San Miguel Sigüilá",
    "Sibilia",
    "Zunil"
  ],
  "Quiché": [
    "Canillá",
    "Chajul",
    "Chicamán",
    "Chiché",
    "Chichicastenango",
    "Chinique",
    "Cunén",
    "Ixcán",
    "Joyabaj",
    "Nebaj",
    "Pachalum",
    "Patzité",
    "Sacapulas",
    "San Andrés Sajcabajá",
    "San Antonio Ilotenango",
    "San Bartolomé Jocotenango",
    "San Juan Cotzal",
    "San Pedro Jocopilas",
    "Santa Cruz del Quiché",
    "Uspantán",
    "Zacualpa"
  ],
  "Retalhuleu": [
    "Champerico",
    "El Asintal",
    "Nuevo San Carlos",
    "Retalhuleu",
    "San Andrés Villa Seca",
    "San Felipe",
    "San Martín Zapotitlán",
    "San Sebastián",
    "Santa Cruz Muluá"
  ],
  "Sacatepéquez": [
    "Alotenango",
    "Antigua",
    "Ciudad Vieja",
    "Jocotenango",
    "Magdalena Milpas Altas",
    "Pastores",
    "San Antonio Aguas Calientes",
    "San Bartolomé Milpas Altas",
    "San Lucas Sacatepéquez",
    "San Miguel Dueñas",
    "Santa Catarina Barahona",
    "Santa Lucía Milpas Altas",
    "Santa María de Jesús",
    "Santiago Sacatepéquez",
    "Santo Domingo Xenacoj",
    "Sumpango"
  ],
  "San Marcos": [
    "Ayutla",
    "Catarina",
    "Comitancillo",
    "Concepción Tutuapa",
    "El Quetzal",
    "El Rodeo",
    "El Tumbador",
    "Esquipulas Palo Gordo",
    "Ixchiguan",
    "La Reforma",
    "Malacatán",
    "Nuevo Progreso",
    "Ocos",
    "Pajapita",
    "Río Blanco",
    "San Antonio Sacatepéquez",
    "San Cristóbal Cucho",
    "San José Ojetenam",
    "San Lorenzo",
    "San Marcos",
    "San Miguel Ixtahuacán",
    "San Pablo",
    "San Pedro Sacatepéquez",
    "San Rafael Pie de La Cuesta",
    "San Sibinal",
    "Sipacapa",
    "Tacaná",
    "Tajumulco",
    "Tejutla"
  ],
  "Jalapa": [
    "Jalapa",
    "Mataquescuintla",
    "Monjas",
    "San Carlos Alzatate",
    "San Luis Jilotepeque",
    "San Pedro Pinula",
    "San Manuel Chaparrón"
  ],
  "Santa Rosa": [
    "Barberena",
    "Casillas",
    "Chiquimulilla",
    "Cuilapa",
    "Guazacapán",
    "Nueva Santa Rosa",
    "Oratorio",
    "Pueblo Nuevo Viñas",
    "San Juan Tecuaco",
    "San Rafael Las Flores",
    "Santa Cruz Naranjo",
    "Santa María Ixhuatán",
    "Santa Rosa de Lima",
    "Taxisco"
  ],
  "Sololá": [
    "Concepción",
    "Nahualá",
    "Panajachel",
    "San Andrés Semetabaj",
    "San Antonio Palopó",
    "San José Chacaya",
    "San Juan La Laguna",
    "San Lucas Tolimán",
    "San Marcos La Laguna",
    "San Pablo La Laguna",
    "San Pedro La Laguna",
    "Santa Catarina Ixtahuacan",
    "Santa Catarina Palopó",
    "Santa Clara La Laguna",
    "Santa Cruz La Laguna",
    "Santa Lucía Utatlán",
    "Santa María Visitación",
    "Santiago Atitlán",
    "Sololá"
  ],
  "Suchitepéquez": [
    "Chicacao",
    "Cuyotenango",
    "Mazatenango",
    "Patulul",
    "Pueblo Nuevo",
    "Río Bravo",
    "Samayac",
    "San Antonio Suchitepéquez",
    "San Bernardino",
    "San Francisco Zapotitlán",
    "San Gabriel",
    "San José El Idolo",
    "San Juan Bautista",
    "San Lorenzo",
    "San Miguel Panán",
    "San Pablo Jocopilas",
    "Santa Bárbara",
    "Santo Domingo Suchitepequez",
    "Santo Tomas La Unión",
    "Zunilito"
  ],
  "Totonicapán": [
    "Momostenango",
    "San Andrés Xecul",
    "San Bartolo",
    "San Cristóbal Totonicapán",
    "San Francisco El Alto",
    "Santa Lucía La Reforma",
    "Santa María Chiquimula",
    "Totonicapán"
  ],
  "Zacapa": [
    "Cabañas",
    "Estanzuela",
    "Gualán",
    "Huité",
    "La Unión",
    "Río Hondo",
    "San Diego",
    "Teculután",
    "Usumatlán",
    "Zacapa"
  ]
};

const verificarFacturasLocalStorage = () => {
  const facturasLS = JSON.parse(localStorage.getItem("facturas"));
  facturas = facturasLS || [];
  /*   tableFacturas.innerHTML = "";
  
    facturas.forEach((detalle) => {
      let fila = document.createElement("TR");
      let fechaFormateada = detalle.fechaPedido.replace(/\D/g, ' ');
      let aF = fechaFormateada.split(' ');
      fila.setAttribute("id", "row" + detalle.noPedido);
      fila.innerHTML = `<td>${detalle.noPedido}</td>
                        <td>Factura de ${detalle.nombreCliente}</td>
                        <td>${aF[3] + ":" + aF[4] + " " + aF[2] + "/" + aF[1] + "/" + aF[0]}</td>
                        <td>${detalle.totalFinalF}</td>
                            `;
      let tdAcciones = document.createElement("TD");
      let btnGenPDF = document.createElement("button");
      btnGenPDF.onclick = () => {
        genPDF(detalle);
      };
      btnGenPDF.classList.add("btn", "btn-danger");
      btnGenPDF.innerText = "PDF";
      tdAcciones.appendChild(btnGenPDF);
      fila.appendChild(tdAcciones);
      tableFacturas.appendChild(fila);
    }) */
};

verificarFacturasLocalStorage();


const llenarColaboradores = () => {
  arregloColaboradores.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.innerText = c.nombre;
    selectColaborador.appendChild(option);
  });
};

const llenarDepartamentos = (select, muniSelect) => {
  arregloDepartamentos.forEach((c) => {
    const option = document.createElement("option");
    if (c.departamento == "Guatemala") {
      option.setAttribute("selected", "selected");
      limpiarMunicipio(muniSelect);
      ordenarMunicipio(c.departamento, muniSelect);
    }
    option.value = c.id;
    option.innerText = c.departamento;
    select.appendChild(option);
  });
};

llenarColaboradores();
llenarDepartamentos(selectDpaDireccion, selectMunDireccion);
llenarDepartamentos(selectDpaDireccionE, selectMunDireccionE);

const cargarDatos = (codigo) => {
  //buscar el objeto
  arregloDetalle.find((detalle) => {
    if (+codigo === +detalle.codigo) {
      inputCodigoPA.value = +codigo;
      inputCantidadU.value = detalle.cant;
      inputDescripcionU.value = detalle.descripcion;
      inputPrecioUnitarioU.value = detalle.pUnitario;
      inputDescuentoU.value = detalle.descuento;
      inputTotalU.value = detalle.total;
    }
  });
}


btnActualizar.onclick = () => {
  let codigoP = inputCodigoPA.value;
  arregloDetalle = arregloDetalle.map((detalle) => {
    if (+codigoP === +detalle.codigo) {
      let fila = document.querySelector("#row" + codigoP);
      fila.children[0].innerText = inputCantidadU.value;
      fila.children[1].innerText = inputDescripcionU.value;
      fila.children[2].innerText = parseFloat(inputPrecioUnitarioU.value).toFixed(2);
      fila.children[3].innerText = parseFloat(inputDescuentoU.value).toFixed(2);
      let diferenciaDescuento;
      if (+inputDescuentoU.value > +detalle.descuento) {
        diferenciaDescuento = parseFloat(inputDescuentoU.value - detalle.descuento);
        descuentoFinal = descuentoFinal + diferenciaDescuento;
      } else if (+inputDescuentoU.value < +detalle.descuento) {
        diferenciaDescuento = parseFloat(detalle.descuento - inputDescuentoU.value);
        descuentoFinal = descuentoFinal - diferenciaDescuento;
      } else if (+inputDescuentoU.value == 0) {
        descuentoFinal = descuentoFinal - inputDescuentoU.value;
      } /* else if (+inputDescuentoU.value == +detalle.descuento) {
        inputDescuentoTotal.value = descuentoFinal + 0;
      } */
      inputDescuentoTotal.value = parseFloat(descuentoFinal).toFixed(2);

      fila.children[4].innerText = inputTotalU.value;
      let diferenciaPTotal;
      if (+inputTotalU.value > +detalle.total) {
        diferenciaPTotal = parseFloat(inputTotalU.value - detalle.total);
        subTotal = subTotal + diferenciaPTotal;
      } else if (+inputTotalU.value < +detalle.total) {
        diferenciaPTotal = parseFloat(detalle.total - inputTotalU.value);
        subTotal = subTotal - diferenciaPTotal;
      } else if (+inputTotalU.value == 0) {
        subTotal = subTotal - inputTotalU.value;
      } else if (+inputTotalU.value == +detalle.total) {
        subTotal = subTotal + 0;
      }
      inputSubTotal.value = parseFloat(subTotal).toFixed(2);

      totalFinal = parseFloat(subTotal - descuentoFinal);
      inputSumaTotal.value = parseFloat(totalFinal).toFixed(2);

      return {
        codigo: codigoP,
        cant: inputCantidadU.value,
        descripcion: inputDescripcionU.value,
        pUnitario: parseFloat(inputPrecioUnitarioU.value).toFixed(2),
        descuento: parseFloat(inputDescuentoU.value).toFixed(2),
        total: parseFloat(inputTotalU.value).toFixed(2)
      }
    }
    return detalle;
  });
  $('#modalActualizar').modal('hide');
}

const eliminarProducto = (id) => {
  arregloDetalle = arregloDetalle.filter((detalle) => {
    if (+id !== +detalle.codigo) {
      return detalle;
    } else {
      subTotal = parseFloat(inputSubTotal.value - parseFloat(detalle.total));
      inputSubTotal.value = subTotal;



      descuentoFinal = parseFloat(inputDescuentoTotal.value - parseFloat(detalle.descuento));
      inputDescuentoTotal.value = descuentoFinal;


      totalFinal = parseFloat(subTotal - descuentoFinal);
      inputSumaTotal.value = totalFinal;
      document.querySelector("#row" + detalle.codigo).remove();
    }
  });
  if (arregloDetalle.length == 0) {
    btnGuardar.setAttribute("disabled", "disabled");
    btnImprimir.setAttribute("disabled", "disabled");
  }
};

const redibujarTabla = () => {
  bodyTable.innerHTML = "";
  arregloDetalle.forEach((detalle) => {
    let fila = document.createElement("tr");
    fila.setAttribute("id", "row" + detalle.codigo);
    fila.innerHTML = `<td>${detalle.cant}</td>
                      <td>${detalle.descripcion}</td>
                      <td>${parseFloat(detalle.pUnitario).toFixed(2)}</td>
                      <td>${parseFloat(detalle.descuento).toFixed(2)}</td>
                      <td>${parseFloat(detalle.total).toFixed(2)}</td>
                      `;
    let tdAcciones = document.createElement("td");
    tdAcciones.innerHTML = `<button type="button" class="btn bg-watsy text-white" onclick="cargarDatos(${detalle.codigo})" data-toggle="modal" data-target="#modalActualizar"><i class="fas fa-edit"></i></button> `;
    let botonEliminar = document.createElement("button");
    let iconoEliminar = document.createElement('i');
    iconoEliminar.classList.add("fas", "fa-trash");
    botonEliminar.onclick = () => {
      eliminarProducto(detalle.codigo);
    };
    botonEliminar.classList.add("btn", "bg-watsy", "text-white");
    botonEliminar.appendChild(iconoEliminar);
    tdAcciones.appendChild(botonEliminar);
    fila.appendChild(tdAcciones);
    bodyTable.appendChild(fila);
  })
};

function alerta(iconoA, descripcionA, timerA) {
  Swal.fire({
    position: 'top-end',
    icon: iconoA,
    title: descripcionA,
    showConfirmButton: false,
    timer: timerA
  })
}

formProducto.onsubmit = (e) => {
  e.preventDefault();
  if (inputDescripcion.value == "" || inputCantidad.value == "" || inputPrecioUnitario.value == "" || inputTotal.value == "") {
    alerta('error', 'El campo no puede estar vacio.', 1000);

    if (inputDescripcion.value == "") {
      inputDescripcion.classList.add("remarcar");
    }
    if (inputCantidad.value == "") {
      inputCantidad.classList.add("remarcar");
    }
    if (inputPrecioUnitario.value == "") {
      inputPrecioUnitario.classList.add("remarcar");
    }
    if (inputTotal.value == "") {
      inputTotal.classList.add("remarcar");
    }

  } else {
    btnGuardar.removeAttribute("disabled");
    btnImprimir.removeAttribute("disabled");
    inputDescripcion.classList.remove("remarcar");
    inputCantidad.classList.remove("remarcar");
    inputPrecioUnitario.classList.remove("remarcar");
    inputTotal.classList.remove("remarcar");
    inputCodigoP.value = +inputCodigoP.value + 1;
    // Creando Objeto Detall
    if (inputDescuento.value == "") {
      inputDescuento.value = 0.0;
    }
    let varPUnitario = parseFloat(inputPrecioUnitario.value).toFixed(2);
    let varDescuento = parseFloat(inputDescuento.value).toFixed(2);
    let varTotalProducto = parseFloat(inputTotal.value).toFixed(2);

    const objDetalle = {
      codigo: inputCodigoP.value,
      cant: inputCantidad.value,
      descripcion: inputDescripcion.value,
      pUnitario: varPUnitario,
      descuento: varDescuento,
      total: varTotalProducto
    };

    arregloDetalle.push(objDetalle);

    subTotal = subTotal + parseFloat(objDetalle.total);
    if (objDetalle.descuento != "") {
      descuentoFinal = descuentoFinal + parseFloat(objDetalle.descuento);
    }

    totalFinal = subTotal - descuentoFinal;

    inputSubTotal.value = subTotal.toFixed(2);
    inputDescuentoTotal.value = descuentoFinal.toFixed(2);
    inputSumaTotal.value = totalFinal.toFixed(2);


    redibujarTabla();
    formProducto.reset();
  }
};

btnGuardar.onclick = () => {
  guardarFactura();
};

btnImprimir.onclick = () => {
  imprimir = "si";
  guardarFactura();
};

function guardarFactura() {
  let esCelular = "";
  if (String(isMobile) == "Android") {
    esCelular = "si"
  }

  if (inputFechaPedido.value == "" || inputFechaVencimiento.value == "") {
    alerta('error', 'Los campos de fecha no pueden estar vacio', 1000);

    if (inputFechaPedido.value == "") {
      inputFechaPedido.classList.add("remarcar");
      inputFechaPedido.focus();
    }
    if (inputFechaVencimiento.value == "") {
      inputFechaVencimiento.classList.add("remarcar");
      inputFechaVencimiento.focus();
    }

  } else {
    alerta('success', 'La factura se genero satisfactoriamente.', 1000);
    inputFechaPedido.classList.remove("remarcar");
    inputFechaVencimiento.classList.remove("remarcar");
    btnGuardar.setAttribute("disabled", "disabled");
    btnImprimir.setAttribute("disabled", "disabled");
    let objFactura = {
      movil: esCelular,
      noInterno: inputNoInterno.value,
      noPedido: inputNoPedido.value,
      credito: inputCredito.value,
      nota: inputNota.value,
      imprimir: imprimir,
      nitCliente: inputNitCliente.value,
      nombreCliente: inputNombreCliente.value,
      telefonoCliente: inputTelefonoCliente.value,
      correoCliente: inputCorreoCliente.value,
      direccionCliente: inputDireccionCliente.value,
      direccionECliente: inputDireccionECliente.value,
      municipio: selectMunDireccion.options[selectMunDireccion.selectedIndex].text,
      departamento: selectDpaDireccion.options[selectDpaDireccion.selectedIndex].text,
      municipioE: selectMunDireccionE.options[selectMunDireccionE.selectedIndex].text,
      departamentoE: selectDpaDireccionE.options[selectDpaDireccionE.selectedIndex].text,
      colaborador: selectColaborador.options[selectColaborador.selectedIndex].text,
      codigoCliente: inputCodigoCliente.value,
      fechaPedido: inputFechaPedido.value,
      fechaVencimiento: inputFechaVencimiento.value,
      subTotalF: parseFloat(subTotal).toFixed(2),
      descuentoF: parseFloat(descuentoFinal).toFixed(2),
      totalFinalF: parseFloat(totalFinal).toFixed(2),
      productos: arregloDetalle
    };

    facturas.push(objFactura);
    localStorage.setItem("facturas", JSON.stringify(facturas));

    formProducto.reset();
    borra();
    arregloDetalle = [];
    redibujarTabla();
    genPDF(objFactura);
  }
}

function borra() {
  inputNoPedido.value = "";
  inputNoInterno.value = "";
  inputCredito.value = "";
  inputNota.value = "";
  inputCodigoP.value = 0;
  //datos extras
  subTotal = 0;
  descuentoFinal = 0;
  totalFinal = 0;
  inputSubTotal.value = subTotal;
  inputDescuentoTotal.value = descuentoFinal;
  imprimir = "";
  inputSumaTotal.value = totalFinal;
  //Limpiar inputs
  inputNitCliente.value = "";
  inputTelefonoCliente.value = "";
  inputNombreCliente.value = "";
  inputCorreoCliente.value = "";
  inputDireccionCliente.value = "";
  inputDireccionECliente.value = "";
  //Datos del vendedor
  inputCodigoCliente.value = "";
  inputFechaPedido.value = "";
  inputFechaVencimiento.value = "";
}

inputPrecioUnitario.onkeyup = () => {
  inputTotal.value = parseFloat(+inputCantidad.value * inputPrecioUnitario.value).toFixed(2);
};

inputPrecioUnitarioU.onkeyup = () => {
  inputTotalU.value = parseFloat(+inputCantidadU.value * inputPrecioUnitarioU.value).toFixed(2);
};

inputCantidad.onkeyup = () => {
  inputTotal.value = parseFloat(+inputCantidad.value * inputPrecioUnitario.value).toFixed(2);
}
inputCantidadU.onkeyup = () => {
  inputTotalU.value = parseFloat(+inputCantidadU.value * inputPrecioUnitarioU.value).toFixed(2);
}

function limpiarMunicipio(muniSelect) {
  for (let i = muniSelect.options.length; i >= 0; i--) {
    muniSelect.remove(i);
  }
}

function ordenarMunicipio(departamentElegido, muniSelect) {
  for (let i = 0; i < arregloMunicipios[departamentElegido].length; i++) {
    const option = document.createElement("option");
    option.value = arregloMunicipios[departamentElegido][i];
    option.innerText = arregloMunicipios[departamentElegido][i];
    muniSelect.appendChild(option);
  }
}

selectDpaDireccion.onchange = () => {
  let departamentElegido = selectDpaDireccion.options[selectDpaDireccion.selectedIndex].text;
  limpiarMunicipio(selectMunDireccion);
  ordenarMunicipio(departamentElegido, selectMunDireccion);
}

selectDpaDireccionE.onchange = () => {
  let departamentElegido = selectDpaDireccionE.options[selectDpaDireccionE.selectedIndex].text;
  limpiarMunicipio(selectMunDireccionE);
  ordenarMunicipio(departamentElegido, selectMunDireccionE);
}
