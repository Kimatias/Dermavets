// Asegúrate de importar el idioma español de flatpickr (puede variar según la implementación):
// import flatpickr from "flatpickr";
// import { Spanish } from "flatpickr/dist/l10n/es.js";
// flatpickr.localize(Spanish); // Localiza en español

// Inicialización del calendario y configuración
const calendario = flatpickr("#fecha", {
  inline: true,
  minDate: "today",
  dateFormat: "Y-m-d",
  locale: "es", // Asegúrate de tener el archivo de idioma español cargado
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
  if (selectedDates.length === 0) return; // Evita errores si no se selecciona una fecha
  const fechaSeleccionada = selectedDates[0].toISOString().split("T")[0];
  const horasOcupadas = citas
    .filter((cita) => cita.fecha === fechaSeleccionada)
    .map((cita) => cita.hora);

  [...selectHora.options].forEach(
    (option) => (option.disabled = horasOcupadas.includes(option.value))
  );
}

// Verifica si el formulario está completo y muestra mensajes específicos
function validarFormulario() {
  const fecha = calendario.input.value;
  const hora = selectHora.value;
  const consultaSeleccionada = document.querySelector("input[name='consulta']:checked");
  const modalidadSeleccionada = document.querySelector("input[name='modalidad']:checked");

  if (!fecha) {
    Swal.fire("❗ Error", "Selecciona una fecha.", "error");
    return false;
  }
  if (!hora) {
    Swal.fire("❗ Error", "Selecciona una hora.", "error");
    return false;
  }
  if (!consultaSeleccionada) {
    Swal.fire("❗ Error", "Selecciona el tipo de consulta.", "error");
    return false;
  }
  if (!modalidadSeleccionada) {
    Swal.fire("❗ Error", "Selecciona si es presencial o virtual.", "error");
    return false;
  }
  if (!termsCheckbox.checked) {
    Swal.fire("❗ Error", "Acepta los términos y condiciones.", "error");
    return false;
  }
  return true;
}

// Guarda la cita en localStorage y actualiza la interfaz
function guardarCita() {
  const fecha = calendario.input.value;
  const hora = selectHora.value;
  const consulta = document.querySelector("input[name='consulta']:checked").value;
  const modalidad = document.querySelector("input[name='modalidad']:checked").value;
  const mascotas = +document.getElementById("mascotas").value;

  // Añadir la cita a la lista
  citas.push({ fecha, hora, consulta, modalidad, mascotas });
  localStorage.setItem("citas", JSON.stringify(citas));

  actualizarDisponibilidadHoras([new Date(fecha)]);
  mostrarConfirmacion(fecha, hora, consulta, modalidad);
  resetFormulario();
}

// Muestra un mensaje de confirmación de la cita
function mostrarConfirmacion(fecha, hora, consulta, modalidad) {
  Swal.fire(
    "✅ Cita Confirmada",
    `Su cita fue agendada para el ${fecha} a las ${hora}.\nServicio: ${consulta}\nModalidad: ${modalidad}`,
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
    .map(({ fecha, hora, consulta, modalidad, mascotas }) => 
      `<li class="list-group-item">
         Fecha: ${fecha}, Hora: ${hora}, Servicio: ${consulta}, Modalidad: ${modalidad}, Mascotas: ${mascotas}
       </li>`
    )
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
