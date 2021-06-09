//Leer el archivo de fuente de poppins en base64
let archivoTXT = new XMLHttpRequest();
let fileRuta = 'http://localhost/facturacion/font/fontPoppins.txt';
archivoTXT.open("GET", fileRuta, false);
archivoTXT.send(null);
const poppins = archivoTXT.responseText;

function genPDF(datosFactura) {
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
  if (datosFactura['movil'] == "") {
    image.src = 'http://localhost/facturacion/img/modelo.jpg';
  } else {
    image.src = 'http://192.168.43.231/facturacion/img/modelo.jpg';
  }

  pdf.addImage(image, 'PNG', 0, 0, width, height);


  pdf.setFontSize("7");
  if (datosFactura['noInterno'] == "") {
    pdf.text("00000", 558, 36, null, null, "left");
  } else {
    pdf.text(datosFactura['noInterno'], 568, 36, null, null, "left");
  }
  //propiedades de texto
  pdf.setFontSize("11");
  pdf.setTextColor("white");
  //texto
  pdf.text("NO. DE PEDIDO", 514, 53, null, null, "center");
  //propiedades de texto
  pdf.setFontSize("14");
  pdf.setTextColor(160, 0, 0);
  //texto
  if (datosFactura['noPedido'] == "") {
    pdf.text("No. 00000", 512, 76, null, null, "center");
  } else {
    pdf.text("No. " + datosFactura['noPedido'], 512, 76, null, null, "center");
  }

  pdf.setTextColor("black");
  let fechaFormateada = datosFactura['fechaPedido'].replace(/\D/g, ' ');
  let arrayFechaPedido = fechaFormateada.split(' ');
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
  if (datosFactura['codigoCliente'] == "") {
    pdf.text("-", 458, 247, null, null, "left");
  } else {
    pdf.text("C-" + datosFactura['codigoCliente'], 458, 247, null, null, "left");
  }

  //Cliente
  if (datosFactura['nitCliente'] == "") {
    pdf.text("CF", 96, 297, null, null, "left");
  } else {
    pdf.text(datosFactura['nitCliente'], 96, 297, null, null, "left");
  }

  if (datosFactura['nombreCliente'] == "") {
    pdf.text("Consumidor Final", 96, 314, null, null, "left");
  } else {
    pdf.text(datosFactura['nombreCliente'], 96, 314, null, null, "left");
  }

  if (datosFactura['direccionCliente'] == "") {
    pdf.text("Ciudad", 96, 331, null, null, "left");
  } else {
    pdf.text(datosFactura['direccionCliente'], 96, 331, null, null, "left");
  }

  pdf.text(datosFactura['municipio'] + ", " + datosFactura['departamento'], 96, 342, null, null, "left");

  if (datosFactura['telefonoCliente'] == "") {
    pdf.text("---- ----", 405, 297, null, null, "left");
  } else {
    var arrayTelefono = datosFactura['telefonoCliente'].split("");

    pdf.text(arrayTelefono[0] +
      arrayTelefono[1] +
      arrayTelefono[2] +
      arrayTelefono[3] +
      "-" +
      arrayTelefono[4] +
      arrayTelefono[5] +
      arrayTelefono[6] +
      arrayTelefono[7], 405, 297, null, null, "left");
  }

  if (datosFactura['correoCliente'] == "") {
    pdf.text("-", 405, 313, null, null, "left");
  } else {
    pdf.text(datosFactura['correoCliente'], 405, 313, null, null, "left");
  }


  if (datosFactura['direccionECliente'] == "") {
    pdf.text("Ciudad", 405, 331, null, null, "left");
  } else {
    pdf.text(datosFactura['direccionECliente'], 405, 331, null, null, "left");
  }

  pdf.text(datosFactura['municipioE'] + ", " + datosFactura['departamentoE'], 405, 342, null, null, "left");

  pdf.setFontSize("8");
  /*     pdf.setFont('Courier'); */
  let espacio = 386;
  let formateoPrecio;
  let conteoLetras = 0;
  let split;
  for (ob of datosFactura['productos']) {
    //contar letras
    for (let i in ob.descripcion) {
      conteoLetras = ob.descripcion.length;

    }
    pdf.text(String(ob.cant), 58, espacio, null, null, "center");

    if (conteoLetras >= 75) {
      split = pdf.splitTextToSize(ob.descripcion, 270);
      pdf.text(96, espacio - 1, split);
    } else {
      split = ob.descripcion;
      pdf.text(split, 96, espacio, null, null, "left");
    }

    pdf.text("Q", 357, espacio, null, null, "center");
    pdf.text(ob.pUnitario, 388, espacio, null, null, "center");

    pdf.text("Q", 432, espacio, null, null, "left");
    pdf.text(ob.descuento, 479, espacio, null, null, "center");

    pdf.text("Q", 518, espacio, null, null, "left");
    pdf.text(ob.total, 552, espacio, null, null, "center");

    if (conteoLetras >= 75) {
      espacio = espacio + 22;
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
  if (datosFactura["credito"] == "") {
    pdf.text("0", 85, 648, null, null, "left");
  } else {
    pdf.text(datosFactura['credito'], 85, 648, null, null, "left");
  }

  if (datosFactura['nota'] == "") {
    split = pdf.splitTextToSize("No se acepta ningun reclamo en un periodo mayor a 30 días calendario a la fecha de emisión", 330);
    pdf.text(54, 672, split);
  } else {
    split = pdf.splitTextToSize(datosFactura['nota'], 330);
    pdf.text(54, 672, split);
  }


  let valor = parseFloat(datosFactura["totalFinalF"]);
  let letras = numeroALetras(valor, {
    plural: "QUETZALES",
    singular: "QUETZAL",
    centPlural: "CENTAVOS",
    centSingular: "CENTAVO"
  });

  pdf.text(letras, 86, 659, null, null, "left");
  if (datosFactura['imprimir'] == "") {
  } else {
    pdf.autoPrint({ variant: 'non-conform' });
  }

  pdf.save(datosFactura["nombreCliente"] + " No.Pedido" + datosFactura["noPedido"] + ".pdf");

  //Vaciar todo

  espacio = 386;

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
  if (datosCotizacion['movil'] == "") {
    image.src = 'http://localhost/facturacion/img/modeloCotizacion.jpg';
  } else {
    image.src = 'http://192.168.43.231/facturacion/img/modeloCotizacion.jpg';
  }

  pdf.addImage(image, 'PNG', 0, 0, width, height);


  pdf.setFontSize("7");
  if (datosCotizacion['noInterno'] == "") {
    pdf.text("00000", 558, 36, null, null, "left");
  } else {
    pdf.text(datosCotizacion['noInterno'], 568, 36, null, null, "left");
  }
  //propiedades de texto
  pdf.setFontSize("11");
  pdf.setTextColor("white");
  //texto
  pdf.text("NO. DE COTIZACIÓN", 514, 53, null, null, "center");
  //propiedades de texto
  pdf.setFontSize("14");
  pdf.setTextColor(160, 0, 0);
  //texto
  if (datosCotizacion['noPedido'] == "") {
    pdf.text("No. 00000", 512, 76, null, null, "center");
  } else {
    pdf.text("No. " + datosCotizacion['noPedido'], 512, 76, null, null, "center");
  }

  pdf.setTextColor("black");
  let fechaFormateada = datosCotizacion['fechaPedido'].replace(/\D/g, ' ');
  let arrayFechaPedido = fechaFormateada.split(' ');
  pdf.setFontSize("7");
  pdf.text(arrayFechaPedido[3] + ":" + arrayFechaPedido[4], 422, 109, null, null, "center");
  pdf.text(arrayFechaPedido[2], 465, 109, null, null, "center");
  pdf.text(arrayFechaPedido[1], 511, 109, null, null, "center");
  pdf.text(arrayFechaPedido[0], 558, 109, null, null, "center");

  pdf.setFontSize("10");
  pdf.text(datosCotizacion['colaborador'], 458, 196, null, null, "left");
  pdf.text(datosCotizacion['fechaVencimiento'], 458, 212, null, null, "left");
  pdf.text("Central", 458, 228, null, null, "left");
  if (datosCotizacion['codigoCliente'] == "") {
    pdf.text("--------", 458, 245, null, null, "left");
  } else {
    pdf.text("C-" + datosCotizacion['codigoCliente'], 458, 245, null, null, "left");
  }

  //Cliente
  if (datosCotizacion['nombreCliente'] == "") {
    pdf.text("Consumidor Final", 96, 196, null, null, "left");
  } else {
    pdf.text(datosCotizacion['nombreCliente'], 96, 196, null, null, "left");
  }

  if (datosCotizacion['telefonoCliente'] == "") {
    pdf.text("---- ----", 96, 212, null, null, "left");
  } else {
    var arrayTelefono = datosCotizacion['telefonoCliente'].split("");

    pdf.text(arrayTelefono[0] +
      arrayTelefono[1] +
      arrayTelefono[2] +
      arrayTelefono[3] +
      "-" +
      arrayTelefono[4] +
      arrayTelefono[5] +
      arrayTelefono[6] +
      arrayTelefono[7], 96, 212, null, null, "left");
  }

  if (datosCotizacion['correoCliente'] == "") {
    pdf.text("-", 96, 228, null, null, "left");
  } else {
    pdf.text(datosCotizacion['correoCliente'], 96, 228, null, null, "left");
  }

  if (datosCotizacion['direccionCliente'] == "") {
    pdf.text("Ciudad", 96, 245, null, null, "left");
  } else {
    pdf.text(datosCotizacion['direccionCliente'], 96, 245, null, null, "left");
  }

  pdf.text(datosCotizacion['municipio'] + ", " + datosCotizacion['departamento'], 96, 257, null, null, "left");

  if (datosCotizacion['descripcionTrabajo'] == "") {
    split = pdf.splitTextToSize("No se acepta ningun reclamo en un periodo mayor a 30 días calendario a la fecha de emisión", 544);
    pdf.text(35, 303, split);
  } else {
    split = pdf.splitTextToSize(datosCotizacion['descripcionTrabajo'], 544);
    pdf.text(35, 303, split);
  }

  pdf.setFontSize("8");
  let espacio = 426;
  for (ob of datosCotizacion['productos']) {
    //contar letras
    for (let i in ob.descripcion) {
      conteoLetras = ob.descripcion.length;
    }
    pdf.text(String(ob.cant), 58, espacio, null, null, "center");

    if (conteoLetras >= 75) {
      split = pdf.splitTextToSize(ob.descripcion, 270);
      pdf.text(96, espacio - 1, split);
    } else {
      split = ob.descripcion;
      pdf.text(split, 96, espacio, null, null, "left");
    }

    pdf.text("Q", 357, espacio, null, null, "center");
    pdf.text(ob.pUnitario, 388, espacio, null, null, "center");

    pdf.text("Q", 432, espacio, null, null, "left");
    pdf.text(ob.descuento, 479, espacio, null, null, "center");

    pdf.text("Q", 518, espacio, null, null, "left");
    pdf.text(ob.total, 552, espacio, null, null, "center");

    if (conteoLetras >= 75) {
      espacio = espacio + 22;
    } else {
      espacio = espacio + 14;
    }

  }

  pdf.setFontSize("10");
  pdf.text(datosCotizacion["subTotalF"], 577, 685, null, null, "right");
  pdf.text(datosCotizacion["descuentoF"], 577, 703, null, null, "right");
  pdf.setTextColor("white");
  pdf.text(datosCotizacion["totalFinalF"], 577, 726, null, null, "right");


  if (datosCotizacion['imprimir'] == "") {
  } else {
    pdf.autoPrint({ variant: 'non-conform' });
  }

  pdf.save(datosCotizacion["nombreCliente"] + " No.Pedido" + datosCotizacion["noPedido"] + ".pdf");

  //Vaciar todo

  espacio = 386;

}