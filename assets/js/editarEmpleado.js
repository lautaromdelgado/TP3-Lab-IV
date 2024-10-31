// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function editarEmpleado(idEmpleado) {
  try {
    const existingModal = document.getElementById("editarEmpleadoModal");
    if (existingModal) {
      const modal = bootstrap.Modal.getInstance(existingModal);
      if (modal) {
        modal.hide();
      }
      existingModal.remove();
    }

    const response = await fetch("modales/modalEditar.php");
    if (!response.ok) {
      throw new Error("Error al cargar la modal de editar el empleado");
    }
    const modalHTML = await response.text();

    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = modalHTML;

    document.body.appendChild(modalContainer);

    const myModal = new bootstrap.Modal(
      modalContainer.querySelector("#editarEmpleadoModal")
    );
    myModal.show();

    await cargarDatosEmpleadoEditar(idEmpleado);
  } catch (error) {
    console.error(error);
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function cargarDatosEmpleadoEditar(idEmpleado) {
  try {
    const response = await axios.get(
      `acciones/detallesEmpleado.php?id=${idEmpleado}`
    );
    if (response.status === 200) {
      const { id, nombre, edad, cedula, sexo, telefono, cargo, avatar } =
        response.data;

      console.log(id, nombre, edad, cedula, sexo, telefono, cargo, avatar);
      document.querySelector("#idempleado").value = id;
      document.querySelector("#nombre").value = nombre;
      document.querySelector("#edad").value = edad;
      document.querySelector("#cedula").value = cedula;
      document.querySelector("#telefono").value = telefono;
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
      seleccionarSexo(sexo);

      seleccionarCargo(cargo);

      document.querySelector("#avatar").value = avatar;
      let elementAvatar = document.querySelector("#avatar");
      if (avatar) {
        elementAvatar.src = `acciones/fotos_empleados/${avatar}`;
      } else {
        elementAvatar.src = "assets/imgs/sin-foto.jpg";
      }
    } else {
      console.log("Error al cargar el empleado a editar");
    }
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al cargar los detalles del empleado");
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)

function seleccionarSexo(sexoEmpleado) {
  const radioMasculino = document.querySelector("#sexo_m");
  const radioFemenino = document.querySelector("#sexo_f");

  if (sexoEmpleado === "Masculino") {
    radioMasculino.checked = true;
  } else if (sexoEmpleado === "Femenino") {
    radioFemenino.checked = true;
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
function seleccionarCargo(cargoEmpleado) {
  const selectCargo = document.querySelector("#cargo");
  selectCargo.value = cargoEmpleado;
}

async function actualizarEmpleado(event) {
  try {
    event.preventDefault();

    const formulario = document.querySelector("#formularioEmpleadoEdit");
    const formData = new FormData(formulario);
    const idempleado = formData.get("id");

    const response = await axios.post("acciones/updateEmpleado.php", formData);

    if (response.status === 200) {
      console.log("Empleado actualizado exitosamente");

      window.actualizarEmpleadoEdit(idempleado);

      if (window.toastrOptions) {
        toastr.options = window.toastrOptions;
        toastr.success("¡El empleado se actualizo correctamente!.");
      }

      setTimeout(() => {
        $("#editarEmpleadoModal").css("opacity", "");
        $("#editarEmpleadoModal").modal("hide");
      }, 600);
    } else {
      console.error("Error al actualizar el empleado");
    }
  } catch (error) {
    console.error("Error al enviar el formulario", error);
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)