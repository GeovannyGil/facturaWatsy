//encabezado
const inputNota = document.getElementById("nota");
//Datos Vendendor
const inputNitCliente = document.getElementById("nitCliente");
const selectDpaDireccionE = document.getElementById("dpaDireccion2");
const selectMunDireccionE = document.getElementById("munDireccion2");
const inputDireccionECliente = document.getElementById("direccionECliente");

function verDatosDocumento(noPedido, datos) {
  console.log("hola soy el numero de pedido numero: " + noPedido);
  //Llenar los Datos
  //Datos de encabezado
  inputNoPedido.value = datos.noPedido;
  inputNoInterno.value = datos.noInterno;
  inputCredito.value = datos.diasCredito;
  inputNota.value = datos.nota;
  //Datos del Cliente
  inputNitCliente.value = datos.nitCliente;
  inputTelefonoCliente.value = datos.telefonoCliente;
  inputNombreCliente.value = datos.nombreCliente;
  inputCorreoCliente.value = datos.correoCliente;
  inputDireccionCliente.value = datos.direccionCliente;
  buscarSelectDpa(selectDpaDireccion, datos.departamento, selectMunDireccion);
  seleccionarInSelect(selectMunDireccion, datos.municipio);
  buscarSelectDpa(selectDpaDireccionE, datos.departamentoE, selectMunDireccionE);
  seleccionarInSelect(selectMunDireccionE, datos.municipioE);
  inputDireccionECliente.value = datos.direccionECliente;
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

//para seleccionar el input
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


const verificarFacturasLocalStorage = () => {
  const facturasLS = JSON.parse(localStorage.getItem("facturas"));
  facturas = facturasLS || [];

  tableFacturas.innerHTML = "";
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
      formatearJSON(detalle);
    };

    btnGenPDF.classList.add("btn", "btn-danger");
    btnGenPDF.innerText = "PDF";
    let btnEditarDocumento = document.createElement("button");
    btnEditarDocumento.onclick = () => {
      verDatosDocumento(detalle.noPedido, detalle);
    };
    btnEditarDocumento.classList.add("btn", "btn-success");
    btnEditarDocumento.innerText = "Editar Datos";

    tdAcciones.appendChild(btnGenPDF);
    tdAcciones.appendChild(btnEditarDocumento);
    fila.appendChild(tdAcciones);
    tableFacturas.appendChild(fila);
  })
};

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
    let objFactura = {
      noInterno: inputNoInterno.value,
      noPedido: inputNoPedido.value,
      diasCredito: inputCredito.value,
      nota: inputNota.value,
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
    formatearJSON(objFactura);
  }
}

function borra() {
  inputNoPedido.value = "";
  inputNoInterno.value = "";
  inputCredito.value = "";
  inputNota.value = "";
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

//Llamado de eventos de controles
selectDpaDireccionE.onchange = () => {
  let departamentElegido = selectDpaDireccionE.options[selectDpaDireccionE.selectedIndex].text;
  limpiarMunicipio(selectMunDireccionE);
  ordenarMunicipio(departamentElegido, selectMunDireccionE);
}

llenarDepartamentos(selectDpaDireccionE, selectMunDireccionE);
verificarFacturasLocalStorage();