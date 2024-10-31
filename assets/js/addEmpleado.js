// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function modalRegistrarEmpleado() {
  try {
    const existingModal = document.getElementById("detalleEmpleadoModal");
    if (existingModal) {
      const modal = bootstrap.Modal.getInstance(existingModal);
      if (modal) {
        modal.hide();
      }
      existingModal.remove();
    }

    const response = await fetch("modales/modalAdd.php");

    if (!response.ok) {
      throw new Error("Error al cargar la modal");
    }

    const data = await response.text();

    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = data;

    document.body.appendChild(modalContainer);

    const myModal = new bootstrap.Modal(
      modalContainer.querySelector("#agregarEmpleadoModal")
    );
    myModal.show();
  } catch (error) {
    console.error(error);
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)

async function registrarEmpleado(event) {
  try {
    event.preventDefault();

    const formulario = document.querySelector("#formularioEmpleado");

    const formData = new FormData(formulario);

    const response = await axios.post("acciones/acciones.php", formData);


    if (response.status === 200) {

      window.insertEmpleadoTable();

      setTimeout(() => {
        $("#agregarEmpleadoModal").css("opacity", "");
        $("#agregarEmpleadoModal").modal("hide");

        toastr.options = window.toastrOptions;
        toastr.success("¡El empleado se actualizo correctamente!.");
      }, 600);
    } else {
      console.error("Error al registrar el empleado");
    }
  } catch (error) {
    console.error("Error al enviar el formulario", error);
  }
}

// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)