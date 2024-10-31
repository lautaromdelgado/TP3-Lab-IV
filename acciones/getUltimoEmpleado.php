<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    include("../config/config.php");

    $sql = "SELECT * FROM tbl_empleados ORDER BY id DESC LIMIT 1";
    $resultado = $conexion->query($sql);

    if (!$resultado) {
        echo json_encode(["error" => "Error al obtener los detalles del empleado: " . $conexion->error]);
        exit();
    }

    $empleado = $resultado->fetch_assoc();

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($empleado);
    exit;
}
