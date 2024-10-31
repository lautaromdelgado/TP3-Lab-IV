<?php
require_once("../config/config.php");
$id = $_GET['id'];

$sql = "SELECT * FROM tbl_empleados WHERE id = $id LIMIT 1";
$query = $conexion->query($sql);
$empleado = $query->fetch_assoc();

header('Content-type: application/json; charset=utf-8');
echo json_encode($empleado);
exit;

// Desarrollado por https://www.linkedin.com/in/lautaromdelgado/ "Lautaro Delgado"