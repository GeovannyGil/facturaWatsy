//encabezado
const inputDescripcionTrabajo = document.getElementById("descripcionTrabajo");

const verificarCotizacionesLocalStorage = () => {
  const cotizacionesLS = JSON.parse(localStorage.getItem("cotizaciones"));
  cotizaciones = cotizacionesLS || [];
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
    btnImprimir.setAttribute("disabled", "disabled");
    let objCotizaciones = {
      noInterno: inputNoInterno.value,
      noPedido: inputNoPedido.value,
      diasCredito: inputCredito.value,
      descripcionTrabajo: inputDescripcionTrabajo.value,
      imprimir: imprimir,
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
    genPDFCotizacion(objCotizaciones);
  }
}

function borra() {
  inputNoPedido.value = "";
  inputNoInterno.value = "";
  inputDescripcionTrabajo.value = "";
  inputCredito.value = "";
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
  inputTelefonoCliente.value = "";
  inputNombreCliente.value = "";
  inputCorreoCliente.value = "";
  inputDireccionCliente.value = "";
  //Datos del vendedor
  inputCodigoCliente.value = "";
  inputFechaPedido.value = "";
  inputFechaVencimiento.value = "";
}

//Para limitar los caracteres de lo que se escribe en los inputs
/* $(function () {
  $("#descripcionTrabajo").maxLength(840, {
    showNumber: "#limit",
    revert: true
  });
}); */
