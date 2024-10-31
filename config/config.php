<!-- Desarrollador por: https://lautaromdelgado.alwaysdata.net/ (Lautaro Delgado) -->

<?php
$host = "mysql-lautaromdelgado.alwaysdata.net";
$usuario = "383087_empleados";
$contrasena = "3482L@ut@r0MD";
$base_de_datos = "lautaromdelgado_bd_empleados";

$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Desarrollador por: https://lautaromdelgado.alwaysdata.net/ (Lautaro Delgado)