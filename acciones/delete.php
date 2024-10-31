<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("../config/config.php");

// Desarrollado por https://www.linkedin.com/in/lautaromdelgado/ "Lautaro Delgado"
    $json_data = file_get_contents("php://input");
// Desarrollado por https://www.linkedin.com/in/lautaromdelgado/ "Lautaro Delgado"
    $data = json_decode($json_data, true);


// Desarrollado por https://www.linkedin.com/in/lautaromdelgado/ "Lautaro Delgado"
    if ($data !== null) {
        $id = $data['id'];
        $avatarName = $data['avatar'];

        $sql = "DELETE FROM tbl_empleados WHERE id=$id";
        if ($conexion->query($sql) === TRUE) {
// Desarrollado por https://www.linkedin.com/in/lautaromdelgado/ "Lautaro Delgado"
            $dirLocal = "fotos_empleados";
            $filePath = $dirLocal . '/' . $avatarName;
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            echo json_encode(array("success" => true, "message" => "Empleado eliminado correctamente"));
        } else {
            echo json_encode(array("success" => false, "message" => "El parámetro 'id' no se proporcionó"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "La acción no se proporcionó"));
    }
}
