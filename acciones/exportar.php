<?php
include("../config/config.php");

$fecha_actual = date("Y-m-d");
$filename = "empleados_" . $fecha_actual . ".csv";

$fields = array('ID', 'Nombre', 'Edad', 'Cédula', 'Sexo', 'Teléfono', 'Cargo', 'Avatar');

$sql = "SELECT * FROM tbl_empleados";

$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    $fp = fopen('php://output', 'w');

    fputcsv($fp, $fields);

    while ($row = $result->fetch_assoc()) {
        fputcsv($fp, $row);
    }

    fclose($fp);

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="' . $filename . '"');

    exit();
} else {
    echo "No hay empleados para generar el reporte.";
}

$conexion->close();
