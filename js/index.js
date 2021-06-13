//Codigo de JavaScript de inicio
let botonesInicio = document.getElementsByClassName("btnInicio");

hoverBtnInicio(0);
hoverBtnInicio(1);
hoverBtnInicio(2);


function hoverBtnInicio(numeroBoton) {
  $(botonesInicio[numeroBoton]).hover(function () {
    botonesInicio[numeroBoton].classList.add("activeHover");
    botonesInicio[numeroBoton].parentNode.classList.add("activeHover");

  }, function () {
    botonesInicio[numeroBoton].classList.remove("activeHover");
    botonesInicio[numeroBoton].parentNode.classList.remove("activeHover");
  }
  );
}
