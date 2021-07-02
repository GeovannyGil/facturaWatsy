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
  /*   inputNoInterno.value = datos.noInterno; */
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

const verificarFacturasLocalStorage = () => {
  const facturasLS = JSON.parse(localStorage.getItem("facturas"));
  facturas = facturasLS || [];
  console.log(facturas);

  bodyTableDocuments.innerHTML = "";
  facturas.forEach((detalle) => {
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
      formatearJSON(detalle);
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
      /* noInterno: inputNoInterno.value, */
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
  /*   inputNoInterno.value = ""; */
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

//para cambiar de input
inputTelefonoCliente.onkeyup = () => {
  if (inputTelefonoCliente.value.length == 8) {
    inputNombreCliente.focus();
  }
};

function nitIsValid(nit) {
  if (!nit) {
    return true;
  }

  var nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');

  if (!nitRegExp.test(nit)) {
    return false;
  }

  nit = nit.replace(/-/, '');
  var lastChar = nit.length - 1;
  var number = nit.substring(0, lastChar);
  var expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

  var factor = number.length + 1;
  var total = 0;

  for (var i = 0; i < number.length; i++) {
    var character = number.substring(i, i + 1);
    var digit = parseInt(character, 10);

    total += (digit * factor);
    factor = factor - 1;
  }

  var modulus = (11 - (total % 11)) % 11;
  var computedChecker = (modulus == 10 ? "k" : modulus.toString());

  return expectedCheker === computedChecker;
}
//para validar el numero de caracteres

$(function () {

  //para validad el numero de NIT
  $('#nitCliente').bind('change paste keyup', function (e) {
    var $this = $(this);
    var $parent = $this.parent();
    var $next = $this.next();
    var nit = $this.val();

    if (nit && nitIsValid(nit)) {
      $('#nitCliente').addClass('inputValidated');
      $('#nitCliente').removeClass('inputInvalidated');
      $("#nitCorrecto").text("Nit Correcto");
      $("#nitCorrecto").removeClass("badge-danger");

      $("#nitCorrecto").addClass("badge-success");
    } else if (nit) {
      $("#nitCorrecto").text("Nit Incorrecto");
      $("#nitCorrecto").removeClass("badge-success");
      $("#nitCorrecto").addClass("badge-danger");
      $('#nitCliente').addClass('inputInvalidated');
      $('#nitCliente').removeClass('inputValidated');
    } else {
      $("#nitCorrecto").text("");
      $('#nitCliente').removeClass('inputInvalidated');
      $('#nitCliente').removeClass('inputValidated');
    }
  });

  $("#nota").maxLength(160, {
    showNumber: "#limiteNota",
    revert: true
  });

});
