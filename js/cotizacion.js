//encabezado
const inputDescripcionTrabajo = document.getElementById("descripcionTrabajo");

function verDatosDocumento(noPedido, datos) {
  console.log("hola soy el numero de pedido numero: " + noPedido);
  //Llenar los Datos
  //Datos de encabezado
  inputNoPedido.value = datos.noPedido;
  /*   inputNoInterno.value = datos.noInterno; */
  inputCredito.value = datos.diasCredito;
  inputDescripcionTrabajo.value = datos.descripcionTrabajo;
  //Datos del Cliente
  inputTelefonoCliente.value = datos.telefonoCliente;
  inputNombreCliente.value = datos.nombreCliente;
  inputCorreoCliente.value = datos.correoCliente;
  inputDireccionCliente.value = datos.direccionCliente;
  buscarSelectDpa(selectDpaDireccion, datos.departamento, selectMunDireccion);
  seleccionarInSelect(selectMunDireccion, datos.municipio);
  seleccionarInSelect(selectColaborador, datos.colaborador);
  inputCodigoCliente.value = datos.codigoCliente;
  inputFechaPedido.value = datos.fechaPedido;
  inputFechaVencimiento.value = datos.fechaVencimiento;
  arregloDetalle = datos.productos;
  redibujarTabla(arregloDetalle);
  btnGuardar.removeAttribute("disabled");
  inputCodigoP.value = buscarIdMaxProductos(arregloDetalle);
  subTotal = parseFloat(datos.subTotalF);
  descuentoFinal = parseFloat(datos.descuentoF);
  totalFinal = parseFloat(datos.totalFinalF);
  inputSubTotal.value = datos.subTotalF;
  inputDescuentoTotal.value = datos.descuentoF;
  inputSumaTotal.value = datos.totalFinalF;
}

const verificarCotizacionesLocalStorage = () => {
  const cotizacionesLS = JSON.parse(localStorage.getItem("cotizaciones"));
  cotizaciones = cotizacionesLS || [];

  bodyTableDocuments.innerHTML = "";
  cotizaciones.forEach((detalle) => {
    let fila = document.createElement("TR");
    let fechaFormateada = detalle.fechaPedido.replace(/\D/g, ' ');
    let aF = fechaFormateada.split(' ');
    fila.setAttribute("id", "row" + detalle.noPedido);
    fila.innerHTML = `<td>${detalle.noPedido}</td>
                        <td ><span class="badge badge-pill badge-secondary">Factura de ${detalle.nombreCliente}</span></td>
                        <td>${aF[3] + ":" + aF[4] + " " + aF[2] + "/" + aF[1] + "/" + aF[0]}</td>
                        <td>${detalle.totalFinalF}</td>
                            `;
    let tdAcciones = document.createElement("TD");
    let btnGenPDF = document.createElement("button");
    btnGenPDF.onclick = () => {
      formatearJSONCotizacion(detalle);
    };
    btnGenPDF.classList.add("btn", "btn-danger");
    btnGenPDF.innerText = "PDF";
    btnGenPDF.setAttribute("data-dismiss", "modal");

    let btnEditarDocumento = document.createElement("button");
    btnEditarDocumento.onclick = () => {
      verDatosDocumento(detalle.noPedido, detalle);
    };
    btnEditarDocumento.classList.add("btn", "bg-watsy", "text-white");
    btnEditarDocumento.setAttribute("data-dismiss", "modal");
    let iconoBtn = document.createElement("i");
    iconoBtn.classList.add("fas", "fa-edit");
    btnEditarDocumento.appendChild(iconoBtn);

    tdAcciones.appendChild(btnGenPDF);
    tdAcciones.appendChild(btnEditarDocumento);
    fila.appendChild(tdAcciones);
    bodyTableDocuments.appendChild(fila);
  })

};

//Llamado de Funciones
verificarCotizacionesLocalStorage();

function guardarFactura() {
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
    let objCotizaciones = {
      /* noInterno: inputNoInterno.value, */
      noPedido: inputNoPedido.value,
      diasCredito: inputCredito.value,
      descripcionTrabajo: inputDescripcionTrabajo.value,
      nombreCliente: inputNombreCliente.value,
      telefonoCliente: inputTelefonoCliente.value,
      correoCliente: inputCorreoCliente.value,
      direccionCliente: inputDireccionCliente.value,
      municipio: selectMunDireccion.options[selectMunDireccion.selectedIndex].text,
      departamento: selectDpaDireccion.options[selectDpaDireccion.selectedIndex].text,
      colaborador: selectColaborador.options[selectColaborador.selectedIndex].text,
      codigoCliente: inputCodigoCliente.value,
      fechaPedido: inputFechaPedido.value,
      fechaVencimiento: inputFechaVencimiento.value,
      subTotalF: parseFloat(subTotal).toFixed(2),
      descuentoF: parseFloat(descuentoFinal).toFixed(2),
      totalFinalF: parseFloat(totalFinal).toFixed(2),
      productos: arregloDetalle
    };

    cotizaciones.push(objCotizaciones);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));

    formProducto.reset();
    borra();
    arregloDetalle = [];
    redibujarTabla();
    formatearJSONCotizacion(objCotizaciones);
  }
}

function borra() {
  inputNoPedido.value = "";
  /*  inputNoInterno.value = ""; */
  inputDescripcionTrabajo.value = "";
  inputCredito.value = "";
  inputCodigoP.value = 0;
  //datos extras
  arregloDetalle = [];
  subTotal = 0;
  descuentoFinal = 0;
  totalFinal = 0;
  inputSubTotal.value = subTotal;
  inputDescuentoTotal.value = descuentoFinal;
  inputSumaTotal.value = totalFinal;
  //Limpiar inputs
  inputTelefonoCliente.value = "";
  inputNombreCliente.value = "";
  inputCorreoCliente.value = "";
  inputDireccionCliente.value = "";
  //Datos del vendedor
  inputCodigoCliente.value = "";
  inputFechaPedido.value = "";
  inputFechaVencimiento.value = "";
}

//este es de cotizaciones
$("#descripcionTrabajo").maxLength(840, {
  showNumber: "#limiteDescripcion",
  revert: true
});

//para cambiar de input
inputTelefonoCliente.onkeyup = () => {
  if (inputTelefonoCliente.value.length == 8) {
    inputCorreoCliente.focus();
  }
};