// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function verDetallesEmpleado(idEmpleado) {
  try {
    const existingModal = document.getElementById("detalleEmpleadoModal");
    if (existingModal) {
      const modal = bootstrap.Modal.getInstance(existingModal);
      if (modal) {
        modal.hide();
      }
      existingModal.remove();
    }

    const response = await fetch("modales/modalDetalles.php");
    if (!response.ok) {
      throw new Error("Error al cargar la modal de detalles del empleado");
    }
    const modalHTML = await response.text();

    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = modalHTML;

    document.body.appendChild(modalContainer);

    const myModal = new bootstrap.Modal(
      modalContainer.querySelector("#detalleEmpleadoModal")
    );
    myModal.show();

    await cargarDetalleEmpleado(idEmpleado);
  } catch (error) {
    console.error(error);
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function cargarDetalleEmpleado(idEmpleado) {
  try {
    const response = await axios.get(
      `acciones/detallesEmpleado.php?id=${idEmpleado}`
    );
    if (response.status === 200) {
      console.log(response.data);
      const { nombre, edad, cedula, sexo, telefono, cargo, avatar } =
        response.data;
      const avatarURL = avatar ? `acciones/fotos_empleados/${avatar}` : null;
      const avatarExistente = avatarURL
        ? await verificarExistenciaImagen(avatarURL)
        : false;
      const avatarHTML = avatarExistente
        ? `<img src="${avatarURL}" alt="Avatar" style="width: 100px; height: 100px; display:block;">`
        : "No disponible";

      const ulDetalleEmpleado = document.querySelector(
        "#detalleEmpleadoContenido ul"
      );
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
      ulDetalleEmpleado.innerHTML = ` 
        <li class="list-group-item"><b>Nombre:</b> 
          ${nombre ? nombre : "No disponible"}
        </li>
        <li class="list-group-item"><b>Edad:</b> 
          ${edad ? edad : "No disponible"}
        </li>
        <li class="list-group-item"><b>Cédula:</b> 
          ${cedula ? cedula : "No disponible"}
          </li>
        <li class="list-group-item"><b>Sexo:</b>
         ${sexo ? sexo : "No disponible"}
        </li>
        <li class="list-group-item"><b>Teléfono:</b> ${
          telefono ? telefono : "No disponible"
        }</li>
        <li class="list-group-item"><b>Cargo:</b> 
          ${cargo ? cargo : "No disponible"}
        </li>
         <li class="list-group-item"><b>Avatar:</b> ${avatarHTML}</li>
      `;
    } else {
      alert(`Error al cargar los detalles del empleado con ID ${idEmpleado}`);
    }
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al cargar los detalles del empleado");
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)
async function verificarExistenciaImagen(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Error al verificar la existencia de la imagen:", error);
    return false;
  }
}
// Desarrollador por: https://www.linkedin.com/in/lautaromdelgado/ (Lautaro Delgado)