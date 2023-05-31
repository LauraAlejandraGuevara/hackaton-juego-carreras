var cocheSeleccionado = null;

function seleccionarCoche(coche) {
  if (cocheSeleccionado !== null) {
    var cocheAnterior = document.getElementById(cocheSeleccionado);
    cocheAnterior.classList.remove('selected');
  }

  var cocheActual = document.getElementById(coche);
  cocheActual.classList.add('selected');

  cocheSeleccionado = coche;
}

function iniciarJuego() {
  if (cocheSeleccionado !== null) {
    location.href = "juego.html?coche=" + cocheSeleccionado;
  }
}