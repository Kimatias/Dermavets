// Inicialización del calendario y configuración
const calendario = flatpickr("#fecha", {
  inline: true,
  minDate: "today",
  dateFormat: "Y-m-d",
  locale: "es",
  onChange: actualizarDisponibilidadHoras,
});

// Selectores y variables globales
const citas = JSON.parse(localStorage.getItem("citas")) || [];
const selectHora = document.getElementById("selectHora");
const confirmarBtn = document.getElementById("confirmarBtn");
const termsCheckbox = document.getElementById("terms");
const cancelBtn = document.getElementById("cancelBtn");
const citasList = document.getElementById("citasList");

// Actualiza la disponibilidad de horas según las citas
function actualizarDisponibilidadHoras(selectedDates) {
  const fechaSeleccionada = selectedDates[0].toISOString().split("T")[0];
  const horasOcupadas = citas
    .filter((cita) => cita.fecha === fechaSeleccionada)
    .map((cita) => cita.hora);

  [...selectHora.options].forEach(
    (option) => (option.disabled = horasOcupadas.includes(option.value))
  );
}

// Verifica si el formulario está completo
function validarFormulario() {
  const fecha = calendario.input.value;
  const hora = selectHora.value;
  const consultaSeleccionada = document.querySelector("input[name='consulta']:checked");

  if (!fecha || !hora || !consultaSeleccionada || !termsCheckbox.checked) {
    Swal.fire("❗ Error", "Completa todos los campos requeridos.", "error");
    return false;
  }
  return true;
}

// Guarda la cita en localStorage y actualiza la interfaz
function guardarCita() {
  const fecha = calendario.input.value;
  const hora = selectHora.value;
  const mascotas = +document.getElementById("mascotas").value;

  citas.push({ fecha, hora, mascotas });
  localStorage.setItem("citas", JSON.stringify(citas));

  actualizarDisponibilidadHoras([new Date(fecha)]);
  mostrarConfirmacion(fecha, hora);
  resetFormulario();
}

// Muestra un mensaje de confirmación de la cita
function mostrarConfirmacion(fecha, hora) {
  Swal.fire(
    "✅ Cita Confirmada",
    `Su cita fue agendada para el ${fecha} a las ${hora}.`,
    "success"
  );
}

// Limpia el formulario después de guardar una cita
function resetFormulario() {
  calendario.clear();
  selectHora.selectedIndex = 0;
  document.getElementById("mascotas").value = 1; // Restablece el contador
}

// Muestra la lista de citas programadas en el modal
function mostrarCitas() {
  citasList.innerHTML = citas
    .map(({ fecha, hora, mascotas }) => `<li class="list-group-item">Fecha: ${fecha}, Hora: ${hora}, Mascotas: ${mascotas}</li>`)
    .join("");
}

// Maneja la modificación de número de mascotas
function modificarMascotas(incremento) {
  const mascotasInput = document.getElementById("mascotas");
  mascotasInput.value = Math.max(1, +mascotasInput.value + incremento);
}

// Eventos
confirmarBtn.addEventListener("click", () => validarFormulario() && guardarCita());
document.getElementById("citasModal").addEventListener("show.bs.modal", mostrarCitas);
cancelBtn.addEventListener("click", resetFormulario);

document.getElementById("decrease").addEventListener("click", (e) => {
  e.preventDefault();
  modificarMascotas(-1);
});
document.getElementById("increase").addEventListener("click", (e) => {
  e.preventDefault();
  modificarMascotas(1);
});
