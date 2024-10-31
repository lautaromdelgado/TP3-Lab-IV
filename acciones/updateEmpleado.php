<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("../config/config.php");

    $id = trim($_POST['id']);
    $nombre = trim($_POST['nombre']);
    $edad = trim($_POST['edad']);
    $cedula = trim($_POST['cedula']);
    $sexo = trim($_POST['sexo']);
    $telefono = trim($_POST['telefono']);
    $cargo = trim($_POST['cargo']);

    $avatar = null;

    if (isset($_FILES['avatar']) && $_FILES['avatar']['size'] > 0) {
        $archivoTemporal = $_FILES['avatar']['tmp_name'];
        $nombreArchivo = $_FILES['avatar']['name'];

        $extension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));

        $dirLocal = "fotos_empleados";
        $nombreArchivo = substr(md5(uniqid(rand())), 0, 10) . "." . $extension;
        $rutaDestino = $dirLocal . '/' . $nombreArchivo;

        if (move_uploaded_file($archivoTemporal, $rutaDestino)) {
            $avatar = $nombreArchivo;
        }
    }

    $sql = "UPDATE tbl_empleados 
            SET nombre='$nombre', edad='$edad', cedula='$cedula', sexo='$sexo', telefono='$telefono', cargo='$cargo'";

    if ($avatar !== null) {
        $sql .= ", avatar='$avatar'";
    }

    $sql .= " WHERE id='$id'";

    if ($conexion->query($sql) === TRUE) {
        header("location:../");
    } else {
        echo "Error al actualizar el registro: " . $conexion->error;
    }
}
