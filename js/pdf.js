//Leer el archivo de fuente de poppins en base64
let archivoTXT = new XMLHttpRequest();
let fileRuta = 'http://localhost/facturacion/font/fontPoppins.txt';
archivoTXT.open("GET", fileRuta, false);
archivoTXT.send(null);
const poppins = archivoTXT.responseText;

//Leer el archivo de imagen en base64
let fechaFormateada;
let arrayFechaPedido = [];
let arrayTelefono = [];
let letras;

function formatearJSON(datosFactura) {
  /*   if (datosFactura['noInterno'] == "") {
      datosFactura['noInterno'] = "-";
    } */

  if (datosFactura['noPedido'] == "") {
    datosFactura['noPedido'] = "---";
  }
  fechaFormateada = datosFactura['fechaPedido'].replace(/\D/g, ' ');
  arrayFechaPedido = fechaFormateada.split(' ');

  if (datosFactura['codigoCliente'] == "") {
    datosFactura['codigoCliente'] = "";
  }

  //Cliente
  if (datosFactura['nitCliente'] == "") {
    datosFactura['nitCliente'] = "CF";
  }

  if (datosFactura['nombreCliente'] == "") {
    datosFactura['nombreCliente'] = "Consumidor Final";
  }

  if (datosFactura['direccionCliente'] == "") {
    datosFactura['direccionCliente'] = "-";
  }

  if (datosFactura['telefonoCliente'] == "") {
    datosFactura['telefonoCliente'] = "-";
  } else {
    arrayTelefono = datosFactura['telefonoCliente'].split("");
    datosFactura['telefonoCliente'] = arrayTelefono[0] +
      arrayTelefono[1] +
      arrayTelefono[2] +
      arrayTelefono[3] +
      "-" +
      arrayTelefono[4] +
      arrayTelefono[5] +
      arrayTelefono[6] +
      arrayTelefono[7];
  }

  if (datosFactura['correoCliente'] == "") {
    datosFactura['correoCliente'] = "-";
  }

  if (datosFactura['direccionECliente'] == "") {
    datosFactura['direccionECliente'] = "-";
  }

  if (datosFactura["diasCredito"] == "") {
    datosFactura["diasCredito"] = "0";
  }

  let formatPUnitario;
  let formatPDescuento;
  let formatPTotal;

  for (ob of datosFactura['productos']) {
    //contar letras
    formatPUnitario = ob.pUnitario.split(".");
    ob.pUnitario = parseFloat(formatPUnitario[0]).toLocaleString("en-US") + "." + formatPUnitario[1];

    formatPDescuento = ob.descuento.split(".");
    ob.descuento = parseFloat(formatPDescuento[0]).toLocaleString("en-US") + "." + formatPDescuento[1];

    formatPTotal = ob.total.split(".");
    ob.total = parseFloat(formatPTotal[0]).toLocaleString("en-US") + "." + formatPTotal[1];

  }

  let formateadoSubtotalF = datosFactura["subTotalF"].split(".");
  datosFactura["subTotalF"] = parseFloat(formateadoSubtotalF[0]).toLocaleString("en-US") + "." + formateadoSubtotalF[1];

  let formateadoDescuentoF = datosFactura["descuentoF"].split(".");
  datosFactura["descuentoF"] = parseFloat(formateadoDescuentoF[0]).toLocaleString("en-US") + "." + formateadoDescuentoF[1];

  letras = numeroALetras(parseFloat(datosFactura["totalFinalF"]), {
    plural: "QUETZALES",
    singular: "QUETZAL",
    centPlural: "CENTAVOS",
    centSingular: "CENTAVO"
  });

  let formateadoTotalFinalF = datosFactura["totalFinalF"].split(".");
  datosFactura["totalFinalF"] = parseFloat(formateadoTotalFinalF[0]).toLocaleString("en-US") + "." + formateadoTotalFinalF[1];

  generarFactura(datosFactura);
}

function generarFactura(datosFactura) {
  var pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'letter',
    filters: ["ASCIIHexEncode"]
  });

  pdf.addFileToVFS("Poppins-Light.ttf", poppins);
  pdf.addFont("Poppins-Light.ttf", "Poppins", "normal");

  pdf.setFont("Poppins");

  var width = pdf.internal.pageSize.getWidth();
  var height = pdf.internal.pageSize.getHeight();

  var image = new Image();
  image.src = 'http://localhost/facturacion/img/factura.jpg';
  pdf.addImage(image, 'JPG', 0, 0, width, height);

  pdf.setFontSize("7");

  /*   pdf.text(datosFactura['noInterno'], 568, 36, null, null, "left"); */

  //propiedades de texto
  pdf.setFontSize("11");
  pdf.setTextColor("white");
  //texto
  pdf.text("NO. DE PEDIDO", 514, 53, null, null, "center");
  //propiedades de texto
  pdf.setFontSize("14");
  pdf.setTextColor(160, 0, 0);
  //texto
  pdf.text("No. " + datosFactura['noPedido'], 512, 76, null, null, "center");


  pdf.setTextColor("black");
  pdf.setFontSize("7");
  pdf.text(arrayFechaPedido[3] + ":" + arrayFechaPedido[4], 422, 109, null, null, "center");
  pdf.text(arrayFechaPedido[2], 465, 109, null, null, "center");
  pdf.text(arrayFechaPedido[1], 511, 109, null, null, "center");
  pdf.text(arrayFechaPedido[0], 558, 109, null, null, "center");

  pdf.setFontSize("10");
  pdf.text("103478590", 144, 194, null, null, "left");
  pdf.text("Watsy", 144, 209, null, null, "left");
  pdf.text("SmartMouse", 144, 223, null, null, "left");
  pdf.text("Avenida del Niño 5-71 Zona 4", 144, 237, null, null, "left");
  pdf.text("Sumpango, Sacatepéquez", 144, 248, null, null, "left");

  pdf.setFontSize("10");
  pdf.text(datosFactura['colaborador'], 458, 199, null, null, "left");
  pdf.text(datosFactura['fechaVencimiento'], 458, 215, null, null, "left");
  pdf.text("Central", 458, 230, null, null, "left");
  pdf.text("C-" + datosFactura['codigoCliente'], 458, 247, null, null, "left");


  //Cliente
  pdf.text(datosFactura['nitCliente'], 96, 297, null, null, "left");
  pdf.text(datosFactura['nombreCliente'], 96, 314, null, null, "left");
  pdf.text(datosFactura['telefonoCliente'], 405, 297, null, null, "left");

  /* pdf.text(datosFactura['direccionCliente'], 96, 331, null, null, "left"); */
  if (datosFactura['direccionCliente'].length > 38) {
    pdf.setFontSize("7");
    pdf.text(datosFactura['direccionCliente'], 96, 329, { maxWidth: 195, align: 'justify' });
    pdf.text(datosFactura['municipio'] + ", " + datosFactura['departamento'], 96, 346, null, null, "left");
  } else {
    pdf.text(datosFactura['direccionCliente'], 96, 331, null, null, "left");
    pdf.text(datosFactura['municipio'] + ", " + datosFactura['departamento'], 96, 342, null, null, "left");
  }

  pdf.setFontSize("10");
  pdf.text(datosFactura['correoCliente'], 405, 313, null, null, "left");
  if (datosFactura['direccionECliente'].length > 38) {
    pdf.setFontSize("7");
    pdf.text(datosFactura['direccionECliente'], 405, 329, { maxWidth: 195, align: 'justify' });
    pdf.text(datosFactura['municipioE'] + ", " + datosFactura['departamentoE'], 405, 346, null, null, "left");
  } else {
    pdf.text(datosFactura['direccionECliente'], 405, 331, null, null, "left");
    pdf.text(datosFactura['municipioE'] + ", " + datosFactura['departamentoE'], 405, 342, null, null, "left");
  }

  pdf.setFontSize("8");
  /*     pdf.setFont('Courier'); */
  let espacio = 386;
  let conteoLetras = 0;
  let split;

  for (ob of datosFactura['productos']) {
    //contar letras
    for (let i in ob.descripcion) {
      conteoLetras = ob.descripcion.length;
    }

    pdf.text(String(ob.cant), 58, espacio, null, null, "center");

    pdf.text(ob.descripcion, 96, espacio, { maxWidth: 253, align: 'justify' });

    pdf.text("Q", 357, espacio, null, null, "center");
    pdf.text(ob.pUnitario, 388, espacio, null, null, "center");

    pdf.text("Q", 432, espacio, null, null, "left");
    pdf.text(ob.descuento, 479, espacio, null, null, "center");

    pdf.text("Q", 518, espacio, null, null, "left");
    pdf.text(ob.total, 552, espacio, null, null, "center");

    if (conteoLetras >= 155) {
      espacio = espacio + 33;
    } else if (conteoLetras >= 90) {
      console.log(ob.descripcion + " Tamaño mayor a 90");
      espacio = espacio + 26;
    } else if (conteoLetras >= 53) {
      console.log(ob.descripcion + " Tamaño mayor a 155");
      espacio = espacio + 20;
    } else {
      espacio = espacio + 14;
    }

  }

  pdf.setFontSize("10");
  pdf.text(datosFactura["subTotalF"], 577, 646, null, null, "right");
  pdf.text(datosFactura["descuentoF"], 577, 664, null, null, "right");
  pdf.setTextColor("white");
  pdf.text(datosFactura["totalFinalF"], 577, 687, null, null, "right");

  pdf.setTextColor("black");
  pdf.setFontSize("7");

  pdf.text(datosFactura['diasCredito'], 85, 648, null, null, "left");


  if (datosFactura['nota'] == "") {
    split = pdf.splitTextToSize("No se acepta ningun reclamo en un periodo mayor a 30 días calendario a la fecha de emisión", 250);
    pdf.text(54, 672, split);
  } else {
    split = pdf.splitTextToSize(datosFactura['nota'], 330);
    pdf.text(54, 672, split);
  }

  pdf.text(letras, 86, 659, null, null, "left");

  pdf.save(datosFactura["nombreCliente"] + " No.Pedido" + datosFactura["noPedido"] + ".pdf");

  //Vaciar todo

  espacio = 386;

}

function formatearJSONCotizacion(datosCotizacion) {
  /*  if (datosCotizacion['noInterno'] == "") {
     datosCotizacion['noInterno'] = "-";
   } */
  if (datosCotizacion['noPedido'] == "") {
    datosCotizacion['noPedido'] = "---";
  }
  fechaFormateada = datosCotizacion['fechaPedido'].replace(/\D/g, ' ');
  arrayFechaPedido = fechaFormateada.split(' ');

  if (datosCotizacion['codigoCliente'] == "") {
    datosCotizacion['codigoCliente'] = "";
  }

  if (datosCotizacion['nombreCliente'] == "") {
    datosCotizacion['nombreCliente'] = "Consumidor Final";
  }

  if (datosCotizacion['direccionCliente'] == "") {
    datosCotizacion['direccionCliente'] = "-";
  }

  if (datosCotizacion['telefonoCliente'] == "") {
    datosCotizacion['telefonoCliente'] = "-";
  } else {
    arrayTelefono = datosCotizacion['telefonoCliente'].split("");
    datosCotizacion['telefonoCliente'] = arrayTelefono[0] +
      arrayTelefono[1] +
      arrayTelefono[2] +
      arrayTelefono[3] +
      "-" +
      arrayTelefono[4] +
      arrayTelefono[5] +
      arrayTelefono[6] +
      arrayTelefono[7];
  }

  if (datosCotizacion['correoCliente'] == "") {
    datosCotizacion['correoCliente'] = "-";
  }

  if (datosCotizacion['direccionECliente'] == "") {
    datosCotizacion['direccionECliente'] = "Ciudad";
  }

  if (datosCotizacion["diasCredito"] == "") {
    datosCotizacion["diasCredito"] = "0";
  }

  let formatPUnitario;
  let formatPDescuento;
  let formatPTotal;

  for (ob of datosCotizacion['productos']) {
    //contar letras
    formatPUnitario = ob.pUnitario.split(".");
    ob.pUnitario = parseFloat(formatPUnitario[0]).toLocaleString("en-US") + "." + formatPUnitario[1];

    formatPDescuento = ob.descuento.split(".");
    ob.descuento = parseFloat(formatPDescuento[0]).toLocaleString("en-US") + "." + formatPDescuento[1];

    formatPTotal = ob.total.split(".");
    ob.total = parseFloat(formatPTotal[0]).toLocaleString("en-US") + "." + formatPTotal[1];

  }

  let formateadoSubtotalF = datosCotizacion["subTotalF"].split(".");
  datosCotizacion["subTotalF"] = parseFloat(formateadoSubtotalF[0]).toLocaleString("en-US") + "." + formateadoSubtotalF[1];

  let formateadoDescuentoF = datosCotizacion["descuentoF"].split(".");
  datosCotizacion["descuentoF"] = parseFloat(formateadoDescuentoF[0]).toLocaleString("en-US") + "." + formateadoDescuentoF[1];

  let formateadoTotalFinalF = datosCotizacion["totalFinalF"].split(".");
  datosCotizacion["totalFinalF"] = parseFloat(formateadoTotalFinalF[0]).toLocaleString("en-US") + "." + formateadoTotalFinalF[1];

  genPDFCotizacion(datosCotizacion);
}

function genPDFCotizacion(datosCotizacion) {
  let split;
  var pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'letter',
    filters: ["ASCIIHexEncode"]
  });

  pdf.addFileToVFS("Poppins-Light.ttf", poppins);
  pdf.addFont("Poppins-Light.ttf", "Poppins", "normal");

  pdf.setFont("Poppins");

  var width = pdf.internal.pageSize.getWidth();
  var height = pdf.internal.pageSize.getHeight();

  var image = new Image();

  image.src = 'http://localhost/facturacion/img/cotizacion.jpg';

  pdf.addImage(image, 'JPG', 0, 0, width, height);


  pdf.setFontSize("7");

  /*   pdf.text(datosCotizacion['noInterno'], 568, 36, null, null, "left"); */

  //propiedades de texto
  pdf.setFontSize("11");
  pdf.setTextColor("white");
  //texto
  pdf.text("NO. DE COTIZACIÓN", 514, 53, null, null, "center");
  //propiedades de texto
  pdf.setFontSize("14");
  pdf.setTextColor(160, 0, 0);
  //texto

  pdf.text("No. " + datosCotizacion['noPedido'], 512, 76, null, null, "center");


  pdf.setTextColor("black");
  pdf.setFontSize("7");
  pdf.text(arrayFechaPedido[3] + ":" + arrayFechaPedido[4], 422, 109, null, null, "center");
  pdf.text(arrayFechaPedido[2], 465, 109, null, null, "center");
  pdf.text(arrayFechaPedido[1], 511, 109, null, null, "center");
  pdf.text(arrayFechaPedido[0], 558, 109, null, null, "center");

  pdf.setFontSize("10");
  pdf.text(datosCotizacion['colaborador'], 458, 196, null, null, "left");
  pdf.text(datosCotizacion['fechaVencimiento'], 458, 212, null, null, "left");
  pdf.text("Central", 458, 228, null, null, "left");
  pdf.text("C-" + datosCotizacion['codigoCliente'], 458, 245, null, null, "left");


  //Cliente

  pdf.text(datosCotizacion['nombreCliente'], 96, 196, null, null, "left");

  pdf.text(datosCotizacion['telefonoCliente'], 96, 212, null, null, "left");

  pdf.text(datosCotizacion['correoCliente'], 96, 228, null, null, "left");

  if (datosCotizacion['direccionCliente'].length > 38) {
    pdf.setFontSize("7");
    pdf.text(datosCotizacion['direccionCliente'], 96, 242, { maxWidth: 195, align: 'justify' });
    pdf.text(datosCotizacion['municipio'] + ", " + datosCotizacion['departamento'], 96, 261, null, null, "left");
  } else {
    pdf.text(datosCotizacion['direccionCliente'], 96, 245, null, null, "left");
    pdf.text(datosCotizacion['municipio'] + ", " + datosCotizacion['departamento'], 96, 257, null, null, "left");
  }


  pdf.setFontSize("10");
  if (datosCotizacion['descripcionTrabajo'] == "") {
    split = pdf.splitTextToSize("No se acepta ningun reclamo en un periodo mayor a 30 días calendario a la fecha de emisión", 544);
    pdf.text(35, 303, split);
  } else {
    split = pdf.splitTextToSize(datosCotizacion['descripcionTrabajo'], 544);
    pdf.text(35, 303, split);
  }

  pdf.setFontSize("8");
  let espacio = 426;
  let conteoLetras = 0;

  for (ob of datosCotizacion['productos']) {
    //contar letras
    for (let i in ob.descripcion) {
      conteoLetras = ob.descripcion.length;
    }
    pdf.text(String(ob.cant), 58, espacio, null, null, "center");

    pdf.text(ob.descripcion, 96, espacio, { maxWidth: 253, align: 'justify' });

    pdf.text("Q", 357, espacio, null, null, "center");
    pdf.text(ob.pUnitario, 388, espacio, null, null, "center");

    pdf.text("Q", 432, espacio, null, null, "left");
    pdf.text(ob.descuento, 479, espacio, null, null, "center");

    pdf.text("Q", 518, espacio, null, null, "left");
    pdf.text(ob.total, 552, espacio, null, null, "center");

    if (conteoLetras >= 155) {
      espacio = espacio + 33;
    } else if (conteoLetras >= 90) {
      espacio = espacio + 26;
    } else if (conteoLetras >= 53) {
      espacio = espacio + 20;
    } else {
      espacio = espacio + 14;
    }

  }

  pdf.text(datosCotizacion["diasCredito"], 101, 682, null, null, "left");


  pdf.setFontSize("10");
  pdf.text(datosCotizacion["subTotalF"], 577, 685, null, null, "right");
  pdf.text(datosCotizacion["descuentoF"], 577, 703, null, null, "right");
  pdf.setTextColor("white");
  pdf.text(datosCotizacion["totalFinalF"], 577, 726, null, null, "right");


  pdf.save(datosCotizacion["nombreCliente"] + " No.Cotizacion" + datosCotizacion["noPedido"] + ".pdf");

  //Vaciar todo

  espacio = 386;

}

