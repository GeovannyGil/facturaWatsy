//DAtos de encabezado
/* const inputNoInterno = document.getElementById("noInterno"); */
const inputNoPedido = document.getElementById("noPedido");
const inputCredito = document.getElementById("diasCredito");
//Datos Generales del Cliente
const inputNombreCliente = document.getElementById("nombreCliente");
const inputTelefonoCliente = document.getElementById("telefonoCliente");
const inputCorreoCliente = document.getElementById("correoCliente");
const inputDireccionCliente = document.getElementById("direccionCliente");
const selectDpaDireccion = document.getElementById("dpaDireccion");
const selectMunDireccion = document.getElementById("munDireccion");
//Datos Extras
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
const bodyTableDocuments = document.getElementById("bodyTableLocalStorage");
//Datos Producto Actualizar
const inputCodigoPA = document.getElementById("codigoPA");
const inputCantidadU = document.getElementById("cantidadU");
const inputDescripcionU = document.getElementById("descripcionU");
const inputPrecioUnitarioU = document.getElementById("precioUnitarioU");
const inputDescuentoU = document.getElementById("descuentoU");
const inputTotalU = document.getElementById("totalU");
//Resultado de compras
let inputSubTotal = document.getElementById("subTotal");
let inputDescuentoTotal = document.getElementById("descuentoTotal");
let inputSumaTotal = document.getElementById("sumaTotal");

let inputCodigoP = document.getElementById("codigoP");
//boton guardar
const btnActualizar = document.getElementById("actualizar");
const btnGuardar = document.getElementById("btnGenerarPDF");
//Variables Globales
let subTotal = 0;
let descuentoFinal = 0;
let totalFinal = 0;
//arreglos
let cotizaciones = [];
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
    nombre: "Jos?? Solloy"
  }, {
    id: 6,
    nombre: "Erick Vargas"
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
  { id: 12, departamento: "Pet??n" },
  { id: 13, departamento: "Quetzaltenango" },
  { id: 14, departamento: "Quich??" },
  { id: 15, departamento: "Retalhuleu" },
  { id: 16, departamento: "Sacatep??quez" },
  { id: 17, departamento: "San Marcos" },
  { id: 18, departamento: "Santa Rosa" },
  { id: 19, departamento: "Solol??" },
  { id: 20, departamento: "Suchitep??quez" },
  { id: 21, departamento: "Totonicap??n" },
  { id: 22, departamento: "Zacapa" },
];

let arregloMunicipios =
{
  "Alta Verapaz": [
    "Cahab??n",
    "Chahal",
    "Chisec",
    "Cob??n",
    "Fray Bartolom?? de las Casas",
    "Lanqu??n",
    "Panz??s",
    "Raxruha",
    "San Crist??bal Verapaz",
    "San Juan Chamelco",
    "San Pedro Carch??",
    "Santa Cruz Verapaz",
    "Senah??",
    "Tactic",
    "Tamah??",
    "Tucur??",
    "Santa Catarina La Tinta"
  ],
  "Baja Verapaz": [
    "Cubulco",
    "Granados",
    "Purulh??",
    "Rabinal",
    "Salam??",
    "San Jer??nimo",
    "San Miguel Chicaj",
    "Santa Cruz El Chol"
  ],
  "Chimaltenango": [
    "Acatenango",
    "Chimaltenango",
    "El Tejar",
    "Parramos",
    "Patzic??a",
    "Patz??n",
    "Pochuta",
    "San Andr??s Itzapa",
    "San Jos?? Poaquil",
    "San Juan Comalapa",
    "San Mart??n Jilotepeque",
    "Santa Apolonia",
    "Santa Cruz Balany??",
    "Tecp??n Guatemala",
    "Yepocapa",
    "Zaragoza"
  ],
  "Chiquimula": [
    "Camot??n",
    "Chiquimula",
    "Concepci??n Las Minas",
    "Esquipulas",
    "Ipala",
    "Jocot??n",
    "Olopa",
    "Quezaltepeque",
    "San Jacinto",
    "San Jos?? La Arada",
    "San Juan Ermita"
  ],
  "El Progreso": [
    "El J??caro",
    "Guastatoya",
    "Moraz??n",
    "San Agust??n Acasaguastl??n",
    "San Antonio La Paz",
    "San Crist??bal Acasaguastl??n",
    "Sanarate"
  ],
  "Escuintla": [
    "Escuintla",
    "Guanagazapa",
    "Iztapa",
    "La Democracia",
    "La Gomera",
    "Masagua",
    "Nueva Concepci??n",
    "Pal??n",
    "San Jos??",
    "San Vicente Pacaya",
    "Santa Luc??a Cotzumalguapa",
    "Siquinal??",
    "Tiquisate"
  ],
  "Guatemala": [
    "Guatemala",
    "Chinautla",
    "Chuarrancho",
    "Fraijanes",
    "Amatitl??n",
    "Mixco",
    "Palencia",
    "Petapa",
    "San Jos?? del Golfo",
    "San Jos?? Pinula",
    "San Juan Sacatep??quez",
    "San Pedro Ayampuc",
    "San Pedro Sacatep??quez",
    "San Raymundo",
    "Santa Catarina Pinula",
    "Villa Canales"
  ],
  "Huehuetenango": [
    "Aguacat??n",
    "Chiantla",
    "Colotenango",
    "Concepci??n Huista",
    "Cuilco",
    "Huehuetenango",
    "Ixtahuac??n",
    "Jacaltenango",
    "La Democracia",
    "La Libertad",
    "Malacatancito",
    "Nent??n",
    "San Antonio Huista",
    "San Gaspar Ixchil",
    "San Juan Atit??n",
    "San Juan Ixcoy",
    "San Mateo Ixtat??n",
    "San Miguel Acat??n",
    "San Pedro Necta",
    "San Rafael La Independencia",
    "San Rafael Petzal",
    "San Sebasti??n Coat??n",
    "San Sebasti??n Huehuetenango",
    "Santa Ana Huista",
    "Santa B??rbara",
    "Santa Cruz Barillas",
    "Santa Eulalia",
    "Santiago Chimaltenango",
    "Soloma",
    "Tectit??n",
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
    "Asunci??n Mita",
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
    "San Jos?? Acatempa",
    "Santa Catarina Mita",
    "Yupiltepeque",
    "Zapotitl??n"
  ],
  "Pet??n": [
    "Dolores",
    "Flores",
    "La Libertad",
    "Melchor de Mencos",
    "Popt??n",
    "San Andr??s",
    "San Benito",
    "San Francisco",
    "San Jos??",
    "San Luis",
    "Santa Ana",
    "Sayaxch??",
    "Las Cruces"
  ],
  "Quetzaltenango": [
    "Almolonga",
    "Cabric??n",
    "Cajol??",
    "Cantel",
    "Coatepeque",
    "Colomba",
    "Concepci??n Chiquirichapa",
    "El Palmar",
    "Flores Costa Cuca",
    "G??nova",
    "Huit??n",
    "La Esperanza",
    "Olintepeque",
    "Ostuncalco",
    "Palestina de Los Altos",
    "Quetzaltenango",
    "Salcaj??",
    "San Carlos Sija",
    "San Francisco La Uni??n",
    "San Mart??n Sacatep??quez",
    "San Mateo",
    "San Miguel Sig??il??",
    "Sibilia",
    "Zunil"
  ],
  "Quich??": [
    "Canill??",
    "Chajul",
    "Chicam??n",
    "Chich??",
    "Chichicastenango",
    "Chinique",
    "Cun??n",
    "Ixc??n",
    "Joyabaj",
    "Nebaj",
    "Pachalum",
    "Patzit??",
    "Sacapulas",
    "San Andr??s Sajcabaj??",
    "San Antonio Ilotenango",
    "San Bartolom?? Jocotenango",
    "San Juan Cotzal",
    "San Pedro Jocopilas",
    "Santa Cruz del Quich??",
    "Uspant??n",
    "Zacualpa"
  ],
  "Retalhuleu": [
    "Champerico",
    "El Asintal",
    "Nuevo San Carlos",
    "Retalhuleu",
    "San Andr??s Villa Seca",
    "San Felipe",
    "San Mart??n Zapotitl??n",
    "San Sebasti??n",
    "Santa Cruz Mulu??"
  ],
  "Sacatep??quez": [
    "Alotenango",
    "Antigua",
    "Ciudad Vieja",
    "Jocotenango",
    "Magdalena Milpas Altas",
    "Pastores",
    "San Antonio Aguas Calientes",
    "San Bartolom?? Milpas Altas",
    "San Lucas Sacatep??quez",
    "San Miguel Due??as",
    "Santa Catarina Barahona",
    "Santa Luc??a Milpas Altas",
    "Santa Mar??a de Jes??s",
    "Santiago Sacatep??quez",
    "Santo Domingo Xenacoj",
    "Sumpango"
  ],
  "San Marcos": [
    "Ayutla",
    "Catarina",
    "Comitancillo",
    "Concepci??n Tutuapa",
    "El Quetzal",
    "El Rodeo",
    "El Tumbador",
    "Esquipulas Palo Gordo",
    "Ixchiguan",
    "La Reforma",
    "Malacat??n",
    "Nuevo Progreso",
    "Ocos",
    "Pajapita",
    "R??o Blanco",
    "San Antonio Sacatep??quez",
    "San Crist??bal Cucho",
    "San Jos?? Ojetenam",
    "San Lorenzo",
    "San Marcos",
    "San Miguel Ixtahuac??n",
    "San Pablo",
    "San Pedro Sacatep??quez",
    "San Rafael Pie de La Cuesta",
    "San Sibinal",
    "Sipacapa",
    "Tacan??",
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
    "San Manuel Chaparr??n"
  ],
  "Santa Rosa": [
    "Barberena",
    "Casillas",
    "Chiquimulilla",
    "Cuilapa",
    "Guazacap??n",
    "Nueva Santa Rosa",
    "Oratorio",
    "Pueblo Nuevo Vi??as",
    "San Juan Tecuaco",
    "San Rafael Las Flores",
    "Santa Cruz Naranjo",
    "Santa Mar??a Ixhuat??n",
    "Santa Rosa de Lima",
    "Taxisco"
  ],
  "Solol??": [
    "Concepci??n",
    "Nahual??",
    "Panajachel",
    "San Andr??s Semetabaj",
    "San Antonio Palop??",
    "San Jos?? Chacaya",
    "San Juan La Laguna",
    "San Lucas Tolim??n",
    "San Marcos La Laguna",
    "San Pablo La Laguna",
    "San Pedro La Laguna",
    "Santa Catarina Ixtahuacan",
    "Santa Catarina Palop??",
    "Santa Clara La Laguna",
    "Santa Cruz La Laguna",
    "Santa Luc??a Utatl??n",
    "Santa Mar??a Visitaci??n",
    "Santiago Atitl??n",
    "Solol??"
  ],
  "Suchitep??quez": [
    "Chicacao",
    "Cuyotenango",
    "Mazatenango",
    "Patulul",
    "Pueblo Nuevo",
    "R??o Bravo",
    "Samayac",
    "San Antonio Suchitep??quez",
    "San Bernardino",
    "San Francisco Zapotitl??n",
    "San Gabriel",
    "San Jos?? El Idolo",
    "San Juan Bautista",
    "San Lorenzo",
    "San Miguel Pan??n",
    "San Pablo Jocopilas",
    "Santa B??rbara",
    "Santo Domingo Suchitepequez",
    "Santo Tomas La Uni??n",
    "Zunilito"
  ],
  "Totonicap??n": [
    "Momostenango",
    "San Andr??s Xecul",
    "San Bartolo",
    "San Crist??bal Totonicap??n",
    "San Francisco El Alto",
    "Santa Luc??a La Reforma",
    "Santa Mar??a Chiquimula",
    "Totonicap??n"
  ],
  "Zacapa": [
    "Caba??as",
    "Estanzuela",
    "Gual??n",
    "Huit??",
    "La Uni??n",
    "R??o Hondo",
    "San Diego",
    "Teculut??n",
    "Usumatl??n",
    "Zacapa"
  ]
};


//funciones globales
function alerta(iconoA, descripcionA, timerA) {
  Swal.fire({
    position: 'top-end',
    icon: iconoA,
    title: descripcionA,
    showConfirmButton: false,
    timer: timerA
  })
}

//Esta funci??n llena a los select de los nombre de los colaboradores
const llenarColaboradores = () => {
  arregloColaboradores.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.innerText = c.nombre;
    selectColaborador.appendChild(option);
  });
};

//Llena a los select con los nombres de los departamentos
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

//Esta funciona para dibujar la tabla
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

//Esta funcion sirve para agregar a la tabla el producto
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
    inputDescripcion.classList.remove("remarcar");
    inputCantidad.classList.remove("remarcar");
    inputPrecioUnitario.classList.remove("remarcar");
    inputTotal.classList.remove("remarcar");
    inputCodigoP.value = +inputCodigoP.value + 1;
    console.log(inputCodigoP.value);
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
    document.getElementById("limiteDescripcionProducto").innerText = "165";
  }
};

//Este carga los datos de tr de la tabla productos para rellenar los inputs
const cargarDatos = (codigo) => {
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

//Esta funci??n actualiza el archivo

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

//Para eliminar el producto
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
  }
};

//acciones de controles
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

//llamado de funciones globales
llenarColaboradores();
llenarDepartamentos(selectDpaDireccion, selectMunDireccion);

//Llamado de facturas
btnGuardar.onclick = () => {
  guardarFactura();
};

//limitar caracteres

$("#descripcion").maxLength(166, {
  showNumber: "#limiteDescripcionProducto",
  revert: true
});

$("#descripcionU").maxLength(166, {
  showNumber: "#limiteDescripcionProductoU",
  revert: true
});
/*
$(inputTelefonoCliente).maxLength(10, {
   showNumber: "#limiteNota", 
  revert: true
});
*/

//para buscar el id
function buscarIdMaxProductos() {
  let idMax = 0;
  for (ob of arregloDetalle) {
    //contar letras
    if (ob.codigo > idMax) {
      idMax = ob.codigo;
    }
  }
  console.log("Codigo de producto mayor " + idMax);
  return idMax;
}
//Generales para el historial de localStorage
function seleccionarInSelect(InputSelect, datoBuscar) {
  for (var i = 1; i < InputSelect.length; i++) {
    if (InputSelect.options[i].text == datoBuscar) {
      // seleccionamos el valor que coincide
      InputSelect.selectedIndex = i;
    }
  }
}

function buscarSelectDpa(InputSelect, datoBuscar, InputSelectMun) {
  for (var i = 1; i < InputSelect.length; i++) {
    if (InputSelect.options[i].text == datoBuscar) {
      // seleccionamos el valor que coincide
      InputSelect.selectedIndex = i;
      limpiarMunicipio(InputSelectMun);
      ordenarMunicipio(datoBuscar, InputSelectMun);
    }
  }
}