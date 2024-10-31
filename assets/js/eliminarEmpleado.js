// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function cargarModalConfirmacion() {
  try {
    const existingModal = document.getElementById("editarEmpleadoModal");
    if (existingModal) {
      const modal = bootstrap.Modal.getInstance(existingModal);
      if (modal) {
        modal.hide();
      }
      existingModal.remove();
    }

    const response = await fetch("modales/modalDelete.php");

    if (!response.ok) {
      throw new Error("Error al cargar la modal de confirmación");
    }

    const modalHTML = await response.text();

    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = modalHTML;

    document.body.appendChild(modalContainer);

    const myModal = new bootstrap.Modal(modalContainer.querySelector(".modal"));
    myModal.show();
  } catch (error) {
    console.error(error);
  }
}

// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)

async function eliminarEmpleado(idEmpleado, avatarEmpleado) {
  try {
    await cargarModalConfirmacion();

    document
      .getElementById("confirmDeleteBtn")
      .setAttribute("data-id", idEmpleado);
    document
      .getElementById("confirmDeleteBtn")
      .setAttribute("data-avatar", avatarEmpleado);

    document
      .getElementById("confirmDeleteBtn")
      .addEventListener("click", async function () {
        var idEmpleado = this.getAttribute("data-id");
        var avatarEmpleado = this.getAttribute("data-avatar");

        try {
          const response = await axios.post("acciones/delete.php", {
            id: idEmpleado,
            avatar: avatarEmpleado,
          });

          if (response.status === 200) {
            document.querySelector(`#empleado_${idEmpleado}`).remove();
            if (window.toastrOptions) {
              toastr.options = window.toastrOptions;
              toastr.error("¡El empleado se elimino correctamente!.");
            }
          } else {
            alert(`Error al eliminar el empleado con ID ${idEmpleado}`);
          }
        } catch (error) {
          console.error(error);
          alert("Hubo un problema al eliminar al empleado");
        } finally {
          var confirmModal = bootstrap.Modal.getInstance(
            document.getElementById("confirmModal")
          );
          confirmModal.hide();
        }
      });
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al cargar la modal de confirmación");
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)