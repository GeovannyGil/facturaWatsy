//encabezado
const inputNota = document.getElementById("nota");
//Datos Vendendor
const inputNitCliente = document.getElementById("nitCliente");
const selectDpaDireccionE = document.getElementById("dpaDireccion2");
const selectMunDireccionE = document.getElementById("munDireccion2");
const inputDireccionECliente = document.getElementById("direccionECliente");

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